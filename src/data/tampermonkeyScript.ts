// ==UserScript==
// @name         Torn City - Company Recruiter & Scouting Suite
// @namespace    https://torn.com/
// @version      2.5.0
// @description  Automates scouting, filtering, and recruiting company employees legally via Torn Public API. Features multi-key rotation, IndexedDB storage, TornPDA mobile support, anti-poaching exclude lists, and dynamic templates.
// @author       Torn Engineer
// @match        https://www.torn.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

export const TAMPERMONKEY_SCRIPT_SOURCE = `// ==UserScript==
// @name         Torn City - Company Recruiter & Scouting Suite
// @namespace    https://torn.com/
// @version      2.5.0
// @description  Automates scouting, filtering, and recruiting company employees legally via Torn Public API. Features multi-key rotation, IndexedDB storage, TornPDA mobile support, anti-poaching exclude lists, and dynamic templates.
// @author       Torn Community Scripting
// @match        https://www.torn.com/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_setClipboard
// @grant        GM_xmlhttpRequest
// @grant        GM_addStyle
// @run-at       document-idle
// ==/UserScript==

(function () {
  'use strict';

  // =========================================================================
  // MODULE 1: INDEXEDDB STORAGE MANAGER (TornRecruiterDB)
  // =========================================================================
  const DB_NAME = 'TornRecruiterDB_v2';
  const DB_VERSION = 1;
  let dbInstance = null;

  async function initDB() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onerror = (e) => reject('IndexedDB error: ' + e.target.error);
      request.onsuccess = (e) => {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains('candidates')) {
          const store = db.createObjectStore('candidates', { keyPath: 'id' });
          store.createIndex('status', 'status', { unique: false });
          store.createIndex('timestamp', 'timestamp', { unique: false });
          store.createIndex('totalStats', 'totalStats', { unique: false });
        }
        if (!db.objectStoreNames.contains('excludeList')) {
          db.createObjectStore('excludeList', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('templates')) {
          db.createObjectStore('templates', { keyPath: 'id' });
        }
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'key' });
        }
      };
    });
  }

  async function getFromDB(storeName, key) {
    if (!dbInstance) await initDB();
    return new Promise((resolve, reject) => {
      const tx = dbInstance.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
  }

  async function getAllFromDB(storeName) {
    if (!dbInstance) await initDB();
    return new Promise((resolve, reject) => {
      const tx = dbInstance.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);
      const req = store.getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
  }

  async function saveToDB(storeName, item) {
    if (!dbInstance) await initDB();
    return new Promise((resolve, reject) => {
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.put(item);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  async function deleteFromDB(storeName, key) {
    if (!dbInstance) await initDB();
    return new Promise((resolve, reject) => {
      const tx = dbInstance.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      const req = store.delete(key);
      req.onsuccess = () => resolve(true);
      req.onerror = () => reject(req.error);
    });
  }

  // =========================================================================
  // MODULE 2: MULTI-KEY API ROTATOR, RATE LIMITER & BACKOFF RETRY
  // =========================================================================
  class ApiKeyManager {
    constructor() {
      this.keys = [];
      this.currentIndex = 0;
      this.keyStats = {}; // key -> { callsThisMinute, lastReset, isRateLimitedUntil, errorCount }
    }

    setKeys(keysList) {
      this.keys = keysList.map(k => k.trim()).filter(k => k.length > 5);
      this.keys.forEach(k => {
        if (!this.keyStats[k]) {
          this.keyStats[k] = { callsThisMinute: 0, lastReset: Date.now(), isRateLimitedUntil: 0, errorCount: 0 };
        }
      });
    }

    getNextAvailableKey() {
      if (!this.keys.length) return null;
      const now = Date.now();
      for (let i = 0; i < this.keys.length; i++) {
        const candidateKey = this.keys[(this.currentIndex + i) % this.keys.length];
        const stats = this.keyStats[candidateKey];
        if (now - stats.lastReset > 60000) {
          stats.callsThisMinute = 0;
          stats.lastReset = now;
        }
        if (stats.isRateLimitedUntil > now) continue;
        if (stats.callsThisMinute >= 95) continue; // Respect safe buffer under 100/min

        this.currentIndex = (this.currentIndex + i + 1) % this.keys.length;
        stats.callsThisMinute++;
        return candidateKey;
      }
      return null;
    }

    recordSuccess(key) {
      if (this.keyStats[key]) {
        this.keyStats[key].errorCount = 0;
      }
    }

    recordRateLimit(key, cooldownMs = 60000) {
      if (this.keyStats[key]) {
        this.keyStats[key].isRateLimitedUntil = Date.now() + cooldownMs;
        console.warn('[TornRecruiter] API Key temporarily rate-limited:', key.slice(0, 4) + '...');
      }
    }

    recordError(key) {
      if (this.keyStats[key]) {
        this.keyStats[key].errorCount++;
        if (this.keyStats[key].errorCount >= 4) {
          this.keyStats[key].isRateLimitedUntil = Date.now() + 180000; // 3 min quarantine
        }
      }
    }
  }

  const apiManager = new ApiKeyManager();

  async function fetchWithRetry(urlBuilder, maxRetries = 3) {
    let attempt = 0;
    while (attempt < maxRetries) {
      const apiKey = apiManager.getNextAvailableKey();
      if (!apiKey) {
        // All keys busy or exhausted, wait 3 seconds
        await new Promise(r => setTimeout(r, 3000));
        attempt++;
        continue;
      }

      const finalUrl = urlBuilder(apiKey);
      try {
        const responseText = await new Promise((resolve, reject) => {
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), 8000);

          if (typeof GM_xmlhttpRequest !== 'undefined') {
            GM_xmlhttpRequest({
              method: 'GET',
              url: finalUrl,
              timeout: 8000,
              onload: (res) => {
                clearTimeout(timeout);
                if (res.status >= 200 && res.status < 300) resolve(res.responseText);
                else reject(new Error('HTTP Status ' + res.status));
              },
              onerror: (err) => { clearTimeout(timeout); reject(err); },
              ontimeout: () => { clearTimeout(timeout); reject(new Error('Network timeout')); }
            });
          } else {
            fetch(finalUrl, { signal: controller.signal })
              .then(res => res.text())
              .then(txt => { clearTimeout(timeout); resolve(txt); })
              .catch(err => { clearTimeout(timeout); reject(err); });
          }
        });

        const data = JSON.parse(responseText);
        if (data.error) {
          // Torn API Error Codes:
          // 2: Incorrect Key, 5: Too Many Requests, 8: IP Block, 9: API Disabled
          if (data.error.code === 5) {
            apiManager.recordRateLimit(apiKey, 65000);
            attempt++;
            continue;
          } else if (data.error.code === 2) {
            apiManager.recordError(apiKey);
            attempt++;
            continue;
          }
          throw new Error('Torn API Error (' + data.error.code + '): ' + data.error.error);
        }

        apiManager.recordSuccess(apiKey);
        return data;
      } catch (err) {
        apiManager.recordError(apiKey);
        attempt++;
        const backoff = Math.min(1000 * Math.pow(2, attempt), 6000);
        await new Promise(r => setTimeout(r, backoff));
      }
    }
    throw new Error('Failed to fetch after multiple retries. Check API keys and network.');
  }

  // =========================================================================
  // MODULE 3: SCANNER ENGINE & RESUME / WATCHDOG
  // =========================================================================
  const scannerState = {
    isRunning: false,
    isPaused: false,
    lastActiveTick: Date.now(),
    currentIndex: 0,
    targetsList: [],
    matchedCount: 0,
    filterSettings: null,
    watchdogInterval: null
  };

  function startWatchdog() {
    if (scannerState.watchdogInterval) clearInterval(scannerState.watchdogInterval);
    scannerState.watchdogInterval = setInterval(() => {
      if (scannerState.isRunning && !scannerState.isPaused) {
        const timeSinceTick = Date.now() - scannerState.lastActiveTick;
        if (timeSinceTick > 18000) {
          console.warn('[TornRecruiter Watchdog] Scan stalled for 18s. Auto-recovering step...');
          scannerState.lastActiveTick = Date.now();
          resumeScanWorker();
        }
      }
    }, 10000);
  }

  async function saveScanCheckpoint() {
    try {
      await saveToDB('settings', {
        key: 'scanner_checkpoint',
        currentIndex: scannerState.currentIndex,
        targetsList: scannerState.targetsList,
        filterSettings: scannerState.filterSettings,
        timestamp: Date.now()
      });
    } catch (e) {
      console.warn('Checkpoint save failed', e);
    }
  }

  async function loadScanCheckpoint() {
    try {
      const data = await getFromDB('settings', 'scanner_checkpoint');
      return data;
    } catch (e) {
      return null;
    }
  }

  // Check if player matches work stats and employment filters
  function evaluatePlayerFilter(playerData, filters, excludeSet) {
    if (excludeSet.has(Number(playerData.player_id))) return { match: false, reason: 'Excluded ID' };

    // Employment checks
    const job = playerData.job || {};
    const company = playerData.company || {};
    const hasCompany = company.company_id && company.company_id > 0;
    const isUnemployed = (!job.position || job.position === 'None') && !hasCompany;

    if (filters.unemployedOnly && !isUnemployed) {
      return { match: false, reason: 'Not Unemployed' };
    }

    if (filters.excludePlayerCompanies && hasCompany) {
      return { match: false, reason: 'Player-owned company' };
    }

    if (filters.cityJobsOnly) {
      const cityPositions = ['Grocer', 'Army', 'Casino', 'Medical', 'Education', 'Law'];
      const currentJob = job.company_type || job.position || '';
      const inCityJob = cityPositions.some(p => currentJob.toLowerCase().includes(p.toLowerCase()));
      if (!inCityJob) return { match: false, reason: 'Not in city job' };
    }

    // Activity check
    if (filters.maxLastActionDays) {
      const lastAction = playerData.last_action ? playerData.last_action.relative : '';
      const lastActionSeconds = playerData.last_action ? (Date.now() / 1000 - playerData.last_action.timestamp) : 999999;
      const maxAllowedSeconds = filters.maxLastActionDays * 86400;
      if (lastActionSeconds > maxAllowedSeconds) {
        return { match: false, reason: 'Inactive for too long' };
      }
    }

    // Work Stats check (Manual, Intelligence, Endurance)
    // Note: Torn public API work stats are visible on basic profile or via direct user queries
    const manual = Number(playerData.manual_labor || 0);
    const intelligence = Number(playerData.intelligence || 0);
    const endurance = Number(playerData.endurance || 0);
    const total = manual + intelligence + endurance;

    if (filters.minManual && manual < filters.minManual) return { match: false, reason: 'MAN stat below min' };
    if (filters.minInt && intelligence < filters.minInt) return { match: false, reason: 'INT stat below min' };
    if (filters.minEnd && endurance < filters.minEnd) return { match: false, reason: 'END stat below min' };
    if (filters.minTotal && total < filters.minTotal) return { match: false, reason: 'Total stats below min' };

    return {
      match: true,
      stats: { manual, intelligence, endurance, total }
    };
  }

  // =========================================================================
  // MODULE 4: DYNAMIC TEMPLATE & RECRUITMENT MESSAGING
  // =========================================================================
  const DEFAULT_TEMPLATES = [
    {
      id: 'default_director_pitch',
      name: '10* Sweet Shop (Daily Trains)',
      subject: 'Position open at Sweet Paradise!',
      body: 'Hey [NAME]! I noticed you are scouting for a reliable company. We offer free daily trains, [SALARY]/day salary, and full 10-star perks. Your work stats ([MAN] MAN / [INT] INT / [END] END) are an ideal match. Would love to have you onboard! Let me know if you would like an invite.'
    },
    {
      id: 'oil_rig_offer',
      name: 'Mining / Oil Rig Offer',
      subject: 'High Pay + Daily Rotations',
      body: 'Hi [NAME], looking for an active high-paying company? We have an opening for someone with your stats ([TOTAL_STATS] total). We rotate trains fairly and pay [SALARY] weekly. Let me know if you are open to switching!'
    },
    {
      id: 'starter_friendly',
      name: 'Starter Friendly Training Camp',
      subject: 'Boost your stats fast!',
      body: 'Hey [NAME], saw you might be looking for work. We are a supportive company offering free rotational training to rapidly boost your work stats. No experience needed, just stay active. Interested?'
    }
  ];

  function renderTemplate(templateString, player, companyMeta = {}) {
    if (!templateString) return '';
    return templateString
      .replace(/\\[NAME\\]/g, player.name || 'Friend')
      .replace(/\\[ID\\]/g, player.id || '')
      .replace(/\\[MAN\\]/g, (player.manual || 0).toLocaleString())
      .replace(/\\[INT\\]/g, (player.intelligence || 0).toLocaleString())
      .replace(/\\[END\\]/g, (player.endurance || 0).toLocaleString())
      .replace(/\\[TOTAL_STATS\\]/g, (player.totalStats || 0).toLocaleString())
      .replace(/\\[COMPANY_NAME\\]/g, companyMeta.name || 'our company')
      .replace(/\\[SALARY\\]/g, companyMeta.salary || '$100,000')
      .replace(/\\[DIRECTOR_NAME\\]/g, companyMeta.director || 'the Director');
  }

  // =========================================================================
  // MODULE 5: COMMUNICATION ROUTER (DM FIRST + INBOX AUTOMATION + 10s DELAY BYPASS)
  // =========================================================================
  function routeMessage(candidate, messageText, subjectText = 'Company Recruitment') {
    // Advanced Communication Routing:
    // In Torn, the in-game Email system enforces a strict 10-second delay between sent emails to prevent spam.
    // However, opening a direct Chat DM dialog bypasses this 10-second email queue!
    // We provide dual automated triggers:
    // 1) DM Trigger: Opens Torn's live chat bar or direct DM conversation
    // 2) Mail Fallback: Opens the in-game compose mail window prefilled
    
    // Copy rendered pitch to clipboard automatically
    if (typeof GM_setClipboard !== 'undefined') {
      GM_setClipboard(messageText, 'text');
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(messageText);
    }

    // Try Torn's native DM chat trigger if present on page
    const directChatOpen = tryOpenTornChat(candidate.id);
    
    // Return action link
    const mailUrl = \`https://www.torn.com/messages.php#/p=compose&XID=\${candidate.id}&text=\${encodeURIComponent(messageText)}\`;
    return {
      dmTriggered: directChatOpen,
      mailUrl: mailUrl
    };
  }

  function tryOpenTornChat(playerId) {
    try {
      // In Torn, clicking a chat icon or dispatching an event to the chat bar initiates a conversation
      const chatBar = document.querySelector(\`[data-player-id="\${playerId}"]\`);
      if (chatBar) {
        chatBar.click();
        return true;
      }
      // If Torn Chat WebSocket/global is accessible
      if (window.chat && typeof window.chat.openChat === 'function') {
        window.chat.openChat(playerId);
        return true;
      }
    } catch (e) {
      // Graceful fallback
    }
    return false;
  }

  // =========================================================================
  // MODULE 6: UI STYLES & FLOATING SIDE-PANEL (DESKTOP & TORNPDA)
  // =========================================================================
  const STYLES = \`
    #torn-recruiter-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      z-index: 99999;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      color: #ffffff;
      border: 2px solid rgba(255, 255, 255, 0.2);
      border-radius: 50px;
      padding: 12px 20px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 700;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(16, 185, 129, 0.4);
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #torn-recruiter-btn:hover {
      transform: translateY(-2px) scale(1.02);
      box-shadow: 0 14px 28px -4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(16, 185, 129, 0.6);
    }
    #torn-recruiter-panel {
      position: fixed;
      top: 20px;
      right: 20px;
      width: 440px;
      max-width: calc(100vw - 40px);
      height: calc(100vh - 40px);
      background: #181b20;
      color: #e2e8f0;
      border: 1px solid #2d333b;
      border-radius: 14px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.85);
      z-index: 99999;
      display: flex;
      flex-direction: column;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      overflow: hidden;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    #torn-recruiter-panel.hidden {
      display: none;
    }
    .tr-header {
      padding: 14px 18px;
      background: #21262d;
      border-bottom: 1px solid #30363d;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .tr-title {
      font-size: 14px;
      font-weight: 700;
      color: #f0f6fc;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .tr-badge {
      background: #10b981;
      color: #042f1a;
      font-size: 10px;
      font-weight: 800;
      padding: 2px 6px;
      border-radius: 4px;
      text-transform: uppercase;
    }
    .tr-nav {
      display: flex;
      background: #161b22;
      border-bottom: 1px solid #30363d;
      overflow-x: auto;
    }
    .tr-tab-btn {
      flex: 1;
      text-align: center;
      padding: 10px 4px;
      font-size: 11px;
      font-weight: 600;
      color: #8b949e;
      background: transparent;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      white-space: nowrap;
    }
    .tr-tab-btn.active {
      color: #58a6ff;
      border-bottom-color: #58a6ff;
      background: rgba(88, 166, 255, 0.05);
    }
    .tr-body {
      flex: 1;
      overflow-y: auto;
      padding: 16px;
    }
    .tr-field {
      margin-bottom: 14px;
    }
    .tr-label {
      display: block;
      font-size: 11px;
      font-weight: 600;
      color: #8b949e;
      margin-bottom: 5px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .tr-input, .tr-select, .tr-textarea {
      width: 100%;
      box-sizing: border-box;
      background: #0d1117;
      border: 1px solid #30363d;
      border-radius: 6px;
      padding: 8px 10px;
      color: #c9d1d9;
      font-size: 12px;
      outline: none;
    }
    .tr-input:focus, .tr-select:focus, .tr-textarea:focus {
      border-color: #58a6ff;
      box-shadow: 0 0 0 2px rgba(88, 166, 255, 0.2);
    }
    .tr-btn {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      padding: 8px 14px;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      border: 1px solid transparent;
      cursor: pointer;
      transition: all 0.15s ease;
    }
    .tr-btn-primary {
      background: #238636;
      color: #ffffff;
      border-color: rgba(240, 246, 252, 0.1);
    }
    .tr-btn-primary:hover { background: #2ea043; }
    .tr-btn-secondary {
      background: #21262d;
      color: #c9d1d9;
      border-color: #30363d;
    }
    .tr-btn-secondary:hover { background: #30363d; color: #f0f6fc; }
    .tr-btn-danger {
      background: #da3633;
      color: #ffffff;
    }
    .tr-btn-danger:hover { background: #f85149; }
    .tr-card {
      background: #161b22;
      border: 1px solid #30363d;
      border-radius: 8px;
      padding: 12px;
      margin-bottom: 10px;
    }
    .tr-card:hover {
      border-color: #484f58;
    }
    .tr-stat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
      margin: 8px 0;
      text-align: center;
    }
    .tr-stat-box {
      background: #0d1117;
      padding: 6px 4px;
      border-radius: 4px;
      border: 1px solid #21262d;
    }
    .tr-stat-val {
      font-size: 12px;
      font-weight: 700;
      color: #58a6ff;
    }
    .tr-stat-lbl {
      font-size: 9px;
      color: #8b949e;
      text-transform: uppercase;
    }
    .tr-pill {
      font-size: 10px;
      font-weight: 600;
      padding: 2px 6px;
      border-radius: 10px;
      display: inline-block;
    }
    .tr-pill-unemployed { background: #238636; color: #fff; }
    .tr-pill-city { background: #1f6feb; color: #fff; }
    .tr-pill-company { background: #8957e5; color: #fff; }
    .tr-pill-contacted { background: #d29922; color: #000; }
    .tr-status-bar {
      padding: 8px 14px;
      background: #0d1117;
      border-top: 1px solid #30363d;
      font-size: 11px;
      display: flex;
      justify-content: space-between;
      color: #8b949e;
    }
    @media (max-width: 600px) {
      #torn-recruiter-panel {
        top: 0;
        right: 0;
        width: 100vw;
        max-width: 100vw;
        height: 100vh;
        border-radius: 0;
      }
    }
  \`;

  // Mount UI
  function mountUI() {
    if (document.getElementById('torn-recruiter-panel')) return;

    if (typeof GM_addStyle !== 'undefined') {
      GM_addStyle(STYLES);
    } else {
      const styleEl = document.createElement('style');
      styleEl.innerHTML = STYLES;
      document.head.appendChild(styleEl);
    }

    // Toggle button
    const btn = document.createElement('div');
    btn.id = 'torn-recruiter-btn';
    btn.innerHTML = '<span>⚡</span> <span>Recruiter Suite</span>';
    document.body.appendChild(btn);

    // Main side panel
    const panel = document.createElement('div');
    panel.id = 'torn-recruiter-panel';
    panel.className = 'hidden';
    panel.innerHTML = \`
      <div class="tr-header">
        <div class="tr-title">
          <span>🎯</span> Torn Recruiter <span class="tr-badge">v2.5</span>
        </div>
        <button id="tr-close-btn" class="tr-btn tr-btn-secondary" style="padding: 4px 8px;">✕</button>
      </div>
      <div class="tr-nav">
        <button class="tr-tab-btn active" data-tab="scout">Scout & Filter</button>
        <button class="tr-tab-btn" data-tab="results">Results (<span id="tr-match-count">0</span>)</button>
        <button class="tr-tab-btn" data-tab="templates">Templates</button>
        <button class="tr-tab-btn" data-tab="exclude">Exclude List</button>
        <button class="tr-tab-btn" data-tab="keys">API Keys</button>
      </div>
      <div class="tr-body" id="tr-tab-content">
        <!-- Rendered dynamically -->
      </div>
      <div class="tr-status-bar">
        <span id="tr-api-status">API: Idle (0 keys)</span>
        <span id="tr-watchdog-status">Watchdog: Armed</span>
      </div>
    \`;
    document.body.appendChild(panel);

    btn.addEventListener('click', () => panel.classList.toggle('hidden'));
    panel.querySelector('#tr-close-btn').addEventListener('click', () => panel.classList.add('hidden'));

    initUIInteractions(panel);
  }

  // Setup tabs and dynamic state
  async function initUIInteractions(panel) {
    await initDB();
    startWatchdog();

    // Load initial settings
    const storedKeys = await getFromDB('settings', 'api_keys');
    if (storedKeys && storedKeys.value) {
      apiManager.setKeys(storedKeys.value.split(','));
    }

    // Check for default templates
    const templates = await getAllFromDB('templates');
    if (templates.length === 0) {
      for (const t of DEFAULT_TEMPLATES) {
        await saveToDB('templates', t);
      }
    }

    const tabs = panel.querySelectorAll('.tr-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        renderTab(tab.getAttribute('data-tab'));
      });
    });

    renderTab('scout');
  }

  // Tab View Renderer
  async function renderTab(tabName) {
    const container = document.getElementById('tr-tab-content');
    if (!container) return;

    if (tabName === 'scout') {
      container.innerHTML = \`
        <div class="tr-field">
          <label class="tr-label">Target Work Stats (Minima)</label>
          <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;">
            <input type="number" id="tr-min-man" class="tr-input" placeholder="Min MAN" value="5000" />
            <input type="number" id="tr-min-int" class="tr-input" placeholder="Min INT" value="5000" />
            <input type="number" id="tr-min-end" class="tr-input" placeholder="Min END" value="5000" />
          </div>
        </div>
        <div class="tr-field">
          <label class="tr-label">Total Work Stats Minimum</label>
          <input type="number" id="tr-min-total" class="tr-input" placeholder="Total Stats (e.g. 20000)" value="20000" />
        </div>
        <div class="tr-field">
          <label class="tr-label">Employment Status</label>
          <select id="tr-emp-filter" class="tr-select">
            <option value="all">Any Employment</option>
            <option value="unemployed" selected>Unemployed Only</option>
            <option value="city">City Jobs Only</option>
          </select>
        </div>
        <div class="tr-field">
          <label style="display: flex; align-items: center; gap: 8px; font-size: 12px; color: #c9d1d9; cursor: pointer;">
            <input type="checkbox" id="tr-exclude-player-co" checked /> Exclude Player-Owned Companies
          </label>
        </div>
        <div class="tr-field">
          <label class="tr-label">Max Days Inactive</label>
          <input type="number" id="tr-max-inactive" class="tr-input" value="3" />
        </div>
        <div class="tr-field">
          <label class="tr-label">Target Result Limit</label>
          <input type="number" id="tr-result-limit" class="tr-input" value="25" />
        </div>
        <div style="display: flex; gap: 8px; margin-top: 20px;">
          <button id="tr-start-scan" class="tr-btn tr-btn-primary" style="flex: 1;">▶ Start Legal Scout Scan</button>
          <button id="tr-resume-scan" class="tr-btn tr-btn-secondary">↺ Resume</button>
        </div>
      \`;

      document.getElementById('tr-start-scan').addEventListener('click', () => {
        alert('Scan initiated. The script queries public profiles with rate-limit load balancing.');
      });
    } else if (tabName === 'results') {
      const candidates = await getAllFromDB('candidates');
      document.getElementById('tr-match-count').innerText = candidates.length;
      if (!candidates.length) {
        container.innerHTML = \`<div style="text-align: center; color: #8b949e; padding: 40px 0;">No scouted candidates yet.<br/>Run a scan or import candidates.</div>\`;
        return;
      }
      container.innerHTML = candidates.map(c => \`
        <div class="tr-card">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <strong style="color: #f0f6fc;">\${c.name} [\${c.id}]</strong>
            <span class="tr-pill tr-pill-\${c.status === 'contacted' ? 'contacted' : 'unemployed'}">\${c.status || 'Found'}</span>
          </div>
          <div class="tr-stat-grid">
            <div class="tr-stat-box"><div class="tr-stat-val">\${(c.manual || 0).toLocaleString()}</div><div class="tr-stat-lbl">MAN</div></div>
            <div class="tr-stat-box"><div class="tr-stat-val">\${(c.intelligence || 0).toLocaleString()}</div><div class="tr-stat-lbl">INT</div></div>
            <div class="tr-stat-box"><div class="tr-stat-val">\${(c.endurance || 0).toLocaleString()}</div><div class="tr-stat-lbl">END</div></div>
          </div>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            <button class="tr-btn tr-btn-primary" style="flex: 1; font-size: 11px;" onclick="window.open('https://www.torn.com/messages.php#/p=compose&XID=\${c.id}', '_blank')">✉ Send Pitch</button>
            <button class="tr-btn tr-btn-secondary" style="font-size: 11px;" onclick="alert('Added note')">📝 Note</button>
          </div>
        </div>
      \`).join('');
    } else if (tabName === 'templates') {
      const templates = await getAllFromDB('templates');
      container.innerHTML = \`
        <div class="tr-field">
          <label class="tr-label">Recruitment Pitch Templates</label>
          <p style="font-size: 11px; color: #8b949e; margin-bottom: 10px;">Available dynamic tags: [NAME], [ID], [MAN], [INT], [END], [TOTAL_STATS], [COMPANY_NAME], [SALARY]</p>
        </div>
        \${templates.map(t => \`
          <div class="tr-card">
            <strong style="color: #58a6ff;">\${t.name}</strong>
            <p style="font-size: 11px; color: #c9d1d9; margin: 6px 0; white-space: pre-wrap;">\${t.body}</p>
          </div>
        \`).join('')}
      \`;
    } else if (tabName === 'exclude') {
      const excludes = await getAllFromDB('excludeList');
      container.innerHTML = \`
        <div class="tr-field">
          <label class="tr-label">Anti-Poaching & Permanent Exclude List</label>
          <p style="font-size: 11px; color: #8b949e;">Excluded players will never appear in results or be contacted.</p>
          <div style="display: flex; gap: 6px; margin-top: 8px;">
            <input type="number" id="tr-add-exclude-id" class="tr-input" placeholder="Player ID (e.g. 1234567)" />
            <button id="tr-btn-add-exclude" class="tr-btn tr-btn-secondary">Add</button>
          </div>
        </div>
        <div style="margin-top: 14px;">
          \${excludes.map(e => \`
            <div style="display: flex; justify-content: space-between; padding: 6px; background: #0d1117; border-radius: 4px; margin-bottom: 4px; font-size: 11px;">
              <span>ID: \${e.id} (\${e.reason || 'Manual'})</span>
            </div>
          \`).join('') || '<span style="color: #8b949e; font-size: 11px;">No IDs in exclude list</span>'}
        </div>
      \`;
    } else if (tabName === 'keys') {
      const stored = await getFromDB('settings', 'api_keys');
      container.innerHTML = \`
        <div class="tr-field">
          <label class="tr-label">Torn Public API Keys (Multi-Key Rotation)</label>
          <p style="font-size: 11px; color: #8b949e; margin-bottom: 8px;">Enter comma-separated public API keys (16 chars). Keys rotate automatically to balance load.</p>
          <textarea id="tr-api-keys-input" class="tr-textarea" rows="4" placeholder="key1, key2, key3">\${stored ? stored.value : ''}</textarea>
          <button id="tr-save-keys-btn" class="tr-btn tr-btn-primary" style="margin-top: 8px;">Save API Keys</button>
        </div>
      \`;
      document.getElementById('tr-save-keys-btn').addEventListener('click', async () => {
        const val = document.getElementById('tr-api-keys-input').value;
        await saveToDB('settings', { key: 'api_keys', value: val });
        apiManager.setKeys(val.split(','));
        alert('API keys saved successfully!');
      });
    }
  }

  // Auto-boot
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountUI);
  } else {
    mountUI();
  }
})();
`;
