import React, { useState } from 'react';
import { TAMPERMONKEY_SCRIPT_SOURCE } from '../../data/tampermonkeyScript';
import { X, Copy, Download, Check, Code2, BookOpen, Smartphone, ShieldCheck, Terminal } from 'lucide-react';

interface UserscriptViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDownload: () => void;
}

export const UserscriptViewerModal: React.FC<UserscriptViewerModalProps> = ({
  isOpen,
  onClose,
  onDownload
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'code' | 'install'>('code');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(TAMPERMONKEY_SCRIPT_SOURCE);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in duration-150">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white">Torn Recruiter & Scouting Suite</h3>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 rounded border border-emerald-500/40">
                  .user.js
                </span>
              </div>
              <p className="text-xs text-slate-400">Production-ready Tampermonkey & TornPDA userscript</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-blue-400" />}
              <span>{copied ? 'Copied Script!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={onDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .user.js</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 bg-slate-950/70 px-4">
          <button
            onClick={() => setActiveTab('code')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition ${
              activeTab === 'code'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Complete JavaScript Code</span>
          </button>
          <button
            onClick={() => setActiveTab('install')}
            className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border-b-2 transition ${
              activeTab === 'install'
                ? 'border-emerald-400 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Installation Guide (Desktop & TornPDA)</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {activeTab === 'code' ? (
            <div className="relative">
              <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] sm:text-xs font-mono text-emerald-300 leading-relaxed overflow-x-auto whitespace-pre selection:bg-emerald-900 selection:text-white max-h-[62vh]">
                {TAMPERMONKEY_SCRIPT_SOURCE}
              </pre>
            </div>
          ) : (
            <div className="space-y-6 text-slate-300 text-xs leading-relaxed max-w-3xl mx-auto">
              {/* Desktop Tampermonkey */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  1. Desktop Tampermonkey Installation (Chrome, Firefox, Edge, Opera, Brave)
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1">
                  <li>
                    Install the official <strong>Tampermonkey</strong> browser extension from the Chrome Web Store or Firefox Add-ons.
                  </li>
                  <li>
                    Click the Tampermonkey icon in your browser toolbar and select <strong>"Create a new script"</strong>.
                  </li>
                  <li>
                    Select and delete all default template code in the Tampermonkey editor.
                  </li>
                  <li>
                    Click the <strong>"Copy Code"</strong> button above, paste the entire script into Tampermonkey, and press <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">Ctrl + S</kbd> (or <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-700 rounded text-slate-300">Cmd + S</kbd>) to save.
                  </li>
                  <li>
                    Navigate to any page on <code className="text-emerald-400">https://www.torn.com</code>. The floating green <strong>"⚡ Recruiter Suite"</strong> button will appear in the lower-right corner!
                  </li>
                </ol>
              </div>

              {/* TornPDA Mobile */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-slate-800 space-y-3">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  2. TornPDA Mobile App Installation (Android & iOS)
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-slate-300 pl-1">
                  <li>Open the <strong>TornPDA</strong> app on your mobile device.</li>
                  <li>Go to <strong>Settings</strong> &gt; <strong>Custom Scripts</strong> (or Userscripts Manager).</li>
                  <li>Tap <strong>"Add New Script"</strong>.</li>
                  <li>Set Title to <code className="text-emerald-400">Torn Company Recruiter</code>.</li>
                  <li>Paste the script source code into the code field.</li>
                  <li>Enable the script and save. Open Torn in the TornPDA in-app browser—the lightweight side panel is fully touch-optimized!</li>
                </ol>
              </div>

              {/* Torn Legal Compliance */}
              <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-emerald-500/30 space-y-2">
                <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" />
                  Torn Rule Compliance & Legal Architecture
                </h4>
                <p className="text-slate-400">
                  This script adheres strictly to Torn's scripting and API rules:
                </p>
                <ul className="list-disc list-inside space-y-1 text-slate-300">
                  <li><strong>Zero Automation of In-Game Actions:</strong> It never sends game actions, crimes, or attacks automatically.</li>
                  <li><strong>Official Public API Only:</strong> All player scouting data is retrieved through Torn's legal public API endpoints.</li>
                  <li><strong>Strict Rate-Limit Safeguards:</strong> Capped at safe buffers under 100 requests per minute with exponential backoff on HTTP 429.</li>
                  <li><strong>Local Storage:</strong> All API keys, contact notes, and exclude lists reside solely in your device's IndexedDB.</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
