import React, { useState } from 'react';
import { Candidate, RecruitmentTemplate, ExcludeItem, ApiKeyItem, ScanFilters, CandidateStatus } from '../../types/torn';
import { Smartphone, Zap, MessageSquare, Send, X, Shield, Filter, Users, Key, FileText, ChevronRight } from 'lucide-react';

interface MobileSimulatorFrameProps {
  candidates: Candidate[];
  templates: RecruitmentTemplate[];
  excludeList: ExcludeItem[];
  apiKeys: ApiKeyItem[];
  filters: ScanFilters;
  onSelectCandidateForMessage: (candidate: Candidate) => void;
  onUpdateCandidateStatus: (candidateId: number, newStatus: CandidateStatus) => void;
  onExcludeCandidate: (candidateId: number, name: string) => void;
}

export const MobileSimulatorFrame: React.FC<MobileSimulatorFrameProps> = ({
  candidates,
  templates,
  excludeList,
  apiKeys,
  filters,
  onSelectCandidateForMessage,
  onUpdateCandidateStatus,
  onExcludeCandidate
}) => {
  const [panelOpen, setPanelOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'candidates' | 'filters' | 'templates'>('candidates');

  return (
    <div className="flex flex-col items-center justify-center py-6 px-2">
      <div className="text-center mb-4">
        <h3 className="text-sm font-bold text-white flex items-center justify-center gap-2">
          <Smartphone className="w-4 h-4 text-emerald-400" />
          TornPDA Mobile Viewport Simulator
        </h3>
        <p className="text-xs text-slate-400">
          Preview how the lightweight floating side-panel UI adapts to mobile touchscreens in TornPDA
        </p>
      </div>

      {/* Phone device mockup */}
      <div className="relative w-[360px] h-[700px] bg-slate-950 rounded-[40px] border-4 border-slate-700 shadow-2xl overflow-hidden flex flex-col">
        {/* Phone Notch / Speaker */}
        <div className="absolute top-0 inset-x-0 h-6 bg-slate-900 z-50 flex items-center justify-center">
          <div className="w-20 h-3 bg-black rounded-full" />
        </div>

        {/* Torn Mock Page Background */}
        <div className="flex-1 bg-[#181b20] text-slate-300 pt-7 flex flex-col overflow-hidden relative font-sans text-xs">
          {/* Mock Torn Mobile Header */}
          <div className="bg-[#242a32] px-3 py-2 border-b border-[#30363d] flex items-center justify-between">
            <span className="font-bold text-white text-xs">TORN CITY</span>
            <div className="flex items-center gap-2 text-[10px] text-emerald-400">
              <span>⚡ 100/100</span>
              <span>♥ 100%</span>
            </div>
          </div>

          {/* Mock In-Game Content */}
          <div className="p-3 space-y-2.5 opacity-40 pointer-events-none select-none">
            <div className="h-14 bg-slate-800 rounded-lg animate-pulse" />
            <div className="h-20 bg-slate-800 rounded-lg" />
            <div className="h-24 bg-slate-800 rounded-lg" />
          </div>

          {/* Floating Toggle Button (if panel closed) */}
          {!panelOpen && (
            <button
              onClick={() => setPanelOpen(true)}
              className="absolute bottom-6 right-4 z-40 bg-emerald-600 text-white font-bold text-[11px] px-3 py-2 rounded-full shadow-lg flex items-center gap-1.5 border border-emerald-400/40 animate-bounce"
            >
              <span>⚡</span> Recruiter
            </button>
          )}

          {/* Injected Mobile Side-Panel Drawer */}
          {panelOpen && (
            <div className="absolute inset-0 z-40 bg-[#161b22] flex flex-col text-slate-200 animate-in slide-in-from-bottom-5 duration-200">
              {/* Header */}
              <div className="p-3 bg-[#21262d] border-b border-[#30363d] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold text-xs">🎯 Recruiter Suite</span>
                  <span className="px-1.5 py-0.5 bg-emerald-500/20 text-emerald-400 text-[9px] rounded font-bold">
                    TornPDA
                  </span>
                </div>
                <button
                  onClick={() => setPanelOpen(false)}
                  className="p-1 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Sub-tabs */}
              <div className="flex border-b border-[#30363d] bg-[#1a1f26]">
                <button
                  onClick={() => setActiveTab('candidates')}
                  className={`flex-1 py-2 text-[11px] font-semibold text-center border-b-2 ${
                    activeTab === 'candidates' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400'
                  }`}
                >
                  Found ({candidates.length})
                </button>
                <button
                  onClick={() => setActiveTab('filters')}
                  className={`flex-1 py-2 text-[11px] font-semibold text-center border-b-2 ${
                    activeTab === 'filters' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400'
                  }`}
                >
                  Stats Filter
                </button>
                <button
                  onClick={() => setActiveTab('templates')}
                  className={`flex-1 py-2 text-[11px] font-semibold text-center border-b-2 ${
                    activeTab === 'templates' ? 'border-emerald-400 text-emerald-400' : 'border-transparent text-slate-400'
                  }`}
                >
                  Pitches
                </button>
              </div>

              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
                {activeTab === 'candidates' && (
                  <div className="space-y-2">
                    {candidates.slice(0, 6).map(c => (
                      <div key={c.id} className="bg-[#0d1117] p-2.5 rounded-lg border border-[#30363d]">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-white text-[11px]">
                            {c.name} <span className="font-mono text-slate-500 font-normal">[{c.id}]</span>
                          </span>
                          <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-800 text-emerald-400 font-semibold">
                            {c.employment.title.split(' ')[0]}
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-1 my-1.5 text-center text-[10px]">
                          <div className="bg-[#161b22] py-0.5 rounded">
                            <span className="text-slate-400 block text-[8px]">MAN</span>
                            <span className="font-bold text-emerald-400">{c.stats.manual.toLocaleString()}</span>
                          </div>
                          <div className="bg-[#161b22] py-0.5 rounded">
                            <span className="text-slate-400 block text-[8px]">INT</span>
                            <span className="font-bold text-blue-400">{c.stats.intelligence.toLocaleString()}</span>
                          </div>
                          <div className="bg-[#161b22] py-0.5 rounded">
                            <span className="text-slate-400 block text-[8px]">END</span>
                            <span className="font-bold text-amber-400">{c.stats.endurance.toLocaleString()}</span>
                          </div>
                        </div>

                        <div className="flex gap-1.5 mt-2">
                          <button
                            onClick={() => onSelectCandidateForMessage(c)}
                            className="flex-1 py-1 bg-emerald-600 text-white font-bold rounded text-[10px] flex items-center justify-center gap-1"
                          >
                            <Send className="w-2.5 h-2.5" /> Pitch
                          </button>
                          <button
                            onClick={() => onExcludeCandidate(c.id, c.name)}
                            className="px-2 py-1 bg-slate-800 text-slate-300 rounded text-[10px]"
                            title="Exclude"
                          >
                            Shield
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'filters' && (
                  <div className="space-y-2 text-[11px]">
                    <div>
                      <span className="text-slate-400 block">Min Total Work Stats</span>
                      <input
                        type="number"
                        value={filters.minTotal}
                        readOnly
                        className="w-full bg-[#0d1117] border border-[#30363d] rounded p-1 text-white font-mono"
                      />
                    </div>
                    <div>
                      <span className="text-slate-400 block">Employment Filter</span>
                      <div className="bg-[#0d1117] border border-[#30363d] rounded p-1 text-emerald-400 font-semibold">
                        {filters.employmentType === 'unemployed' ? 'Unemployed Only' : 'City Jobs'}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'templates' && (
                  <div className="space-y-2">
                    {templates.map(t => (
                      <div key={t.id} className="bg-[#0d1117] p-2 rounded border border-[#30363d] text-[10px]">
                        <span className="font-bold text-emerald-400 block">{t.name}</span>
                        <p className="text-slate-400 line-clamp-2 mt-0.5">{t.body}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Status Bar */}
              <div className="p-2 bg-[#0d1117] border-t border-[#30363d] flex justify-between text-[10px] text-slate-400">
                <span>Active Keys: {apiKeys.length}</span>
                <span className="text-emerald-400">Watchdog OK</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
