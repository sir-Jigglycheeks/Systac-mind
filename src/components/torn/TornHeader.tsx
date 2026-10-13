import React from 'react';
import { ShieldCheck, Cpu, Code2, Download, Smartphone, Monitor, RefreshCw, AlertCircle } from 'lucide-react';

interface TornHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  viewMode: 'desktop' | 'mobile';
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  onOpenCodeModal: () => void;
  onDownloadScript: () => void;
  watchdogActive: boolean;
  totalKeys: number;
  activeCandidatesCount: number;
}

export const TornHeader: React.FC<TornHeaderProps> = ({
  activeTab,
  setActiveTab,
  viewMode,
  setViewMode,
  onOpenCodeModal,
  onDownloadScript,
  watchdogActive,
  totalKeys,
  activeCandidatesCount
}) => {
  return (
    <header className="bg-slate-900 border-b border-slate-800 text-slate-100 sticky top-0 z-40 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Status */}
        <div className="flex items-center gap-3.5">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 shadow-lg shadow-emerald-500/20 border border-emerald-400/30">
            <span className="text-xl font-black text-white tracking-tighter">TC</span>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-bold text-white tracking-wide">
                Torn Recruiter <span className="text-emerald-400 font-black">Suite</span>
              </h1>
              <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-md">
                v2.5.0
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700 rounded-md">
                <ShieldCheck className="w-3 h-3 text-emerald-400" /> Legal Torn API
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-2">
              <span>Optimized for Tampermonkey & TornPDA</span>
              <span className="text-slate-600">•</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                <Cpu className="w-3 h-3" />
                Watchdog: {watchdogActive ? 'Armed & Active' : 'Idle'}
              </span>
            </p>
          </div>
        </div>

        {/* Viewport switch & script download */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Viewport Switcher */}
          <div className="bg-slate-800/80 p-0.5 rounded-lg border border-slate-700/80 flex items-center">
            <button
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'desktop'
                  ? 'bg-slate-700 text-emerald-400 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Desktop Browser Side-Panel View"
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop Panel</span>
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                viewMode === 'mobile'
                  ? 'bg-slate-700 text-emerald-400 shadow-sm font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="TornPDA Mobile Viewport Simulator"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">TornPDA Mobile</span>
            </button>
          </div>

          {/* Code & Download actions */}
          <button
            onClick={onOpenCodeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 transition shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5 text-blue-400" />
            <span>Userscript (.user.js)</span>
          </button>

          <button
            onClick={onDownloadScript}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm shadow-emerald-700/20 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install / Download</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto no-scrollbar border-t border-slate-800/80 bg-slate-900/60">
        {[
          { id: 'scout', label: '1. Scout & Filters' },
          { id: 'candidates', label: `2. Candidates (${activeCandidatesCount})` },
          { id: 'templates', label: '3. Multi-Templates' },
          { id: 'exclude', label: '4. Anti-Poaching / Exclude' },
          { id: 'keys', label: `5. Multi-API Keys (${totalKeys})` },
          { id: 'data', label: '6. Storage & Export' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 text-xs font-semibold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.id
                ? 'border-emerald-400 text-emerald-400 bg-emerald-500/5'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </header>
  );
};
