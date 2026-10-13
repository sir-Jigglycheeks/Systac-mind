import React, { useState } from 'react';
import { ApiKeyItem } from '../../types/torn';
import { KeyRound, Plus, Trash2, CheckCircle2, AlertTriangle, RefreshCw, Zap, Shield, HelpCircle } from 'lucide-react';

interface ApiKeyManagerProps {
  apiKeys: ApiKeyItem[];
  onAddKey: (newKey: string, label: string) => void;
  onRemoveKey: (key: string) => void;
  onTestKey: (key: string) => Promise<boolean>;
}

export const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({
  apiKeys,
  onAddKey,
  onRemoveKey,
  onTestKey
}) => {
  const [keyInput, setKeyInput] = useState('');
  const [labelInput, setLabelInput] = useState('');
  const [testingKey, setTestingKey] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ [key: string]: 'valid' | 'invalid' }>({});

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyInput.trim()) return;
    onAddKey(keyInput.trim(), labelInput.trim() || `API Key #${apiKeys.length + 1}`);
    setKeyInput('');
    setLabelInput('');
  };

  const testKey = async (key: string) => {
    setTestingKey(key);
    const isValid = await onTestKey(key);
    setTestResult(prev => ({ ...prev, [key]: isValid ? 'valid' : 'invalid' }));
    setTestingKey(null);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg text-slate-200 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <KeyRound className="w-4 h-4 text-emerald-400" />
            Torn Public API Keys & Load Balancer
          </h2>
          <p className="text-xs text-slate-400">
            Add multiple Torn Public API keys (e.g. from co-directors or alts) to distribute rate limits (100 calls/min each) and accelerate candidate scouting.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 text-xs">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Active Quota: <strong className="text-emerald-400">{apiKeys.length * 100} req/min</strong></span>
        </div>
      </div>

      {/* API Key Security Notice */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 flex items-start gap-3">
        <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-300">
          <span className="font-bold text-white">Torn API Safe Usage & Legal Standards:</span>
          <p className="mt-0.5 text-slate-400 leading-relaxed">
            Only provide <strong>Public / Minimal</strong> API keys. The scouting engine only reads public profile data (Work Stats, Activity, Position). Never share Full Access keys. All keys remain encrypted locally in your browser's IndexedDB.
          </p>
        </div>
      </div>

      {/* Add New Key Form */}
      <form onSubmit={handleAdd} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Register New Public API Key
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="block text-[11px] text-slate-400 mb-1">API Key (16 Characters) *</label>
            <input
              type="password"
              required
              placeholder="e.g. abcd1234efgh5678"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-mono focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Label / Owner</label>
            <input
              type="text"
              placeholder="e.g. Director Key #1"
              value={labelInput}
              onChange={(e) => setLabelInput(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>
        </div>

        <div className="flex justify-end mt-3">
          <button
            type="submit"
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Key to Rotator</span>
          </button>
        </div>
      </form>

      {/* Keys List with Rate Limit Gauges */}
      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs text-slate-400 px-1">
          <span>Configured API Keys: <strong className="text-white">{apiKeys.length}</strong></span>
          <span className="text-[11px]">Round-robin load balancing with exponential backoff</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {apiKeys.map((item, idx) => (
            <div
              key={item.key}
              className="bg-slate-950 p-4 rounded-xl border border-slate-800 hover:border-slate-700 transition space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white">{item.label || `Key #${idx + 1}`}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      item.status === 'active'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'cooldown'
                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <span className="font-mono text-xs text-slate-500 mt-1 block">
                    {item.key.slice(0, 4)}••••••••{item.key.slice(-4)}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => testKey(item.key)}
                    disabled={testingKey === item.key}
                    className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-900 transition"
                    title="Test Key Health"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${testingKey === item.key ? 'animate-spin text-emerald-400' : ''}`} />
                  </button>
                  <button
                    onClick={() => onRemoveKey(item.key)}
                    className="p-1.5 text-slate-500 hover:text-red-400 rounded hover:bg-slate-900 transition"
                    title="Remove Key"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Rate limit meter */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>Current 60s window:</span>
                  <span className="font-mono font-semibold text-slate-200">
                    {item.callsThisMinute} / {item.maxPerMinute} calls
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      item.callsThisMinute > 85 ? 'bg-amber-400' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, (item.callsThisMinute / item.maxPerMinute) * 100)}%` }}
                  />
                </div>
              </div>

              {testResult[item.key] && (
                <div className={`text-[11px] flex items-center gap-1.5 pt-1 ${
                  testResult[item.key] === 'valid' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {testResult[item.key] === 'valid' ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Key verified with Torn API (Public access valid)</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Key failed check. Check permissions or rate limits.</span>
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
