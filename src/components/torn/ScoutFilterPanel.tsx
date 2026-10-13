import React, { useState } from 'react';
import { ScanFilters } from '../../types/torn';
import { Play, Pause, RotateCcw, Filter, CheckCircle2, Shield, AlertTriangle, Zap, Activity } from 'lucide-react';

interface ScoutFilterPanelProps {
  filters: ScanFilters;
  setFilters: React.Dispatch<React.SetStateAction<ScanFilters>>;
  isScanning: boolean;
  scanProgress: {
    scanned: number;
    matched: number;
    target: number;
    currentKey: string;
    rateRemaining: number;
  };
  onStartScan: () => void;
  onPauseScan: () => void;
  onResumeScan: () => void;
  onResetFilters: () => void;
}

const CITY_JOB_OPTIONS = [
  { id: 'grocer', label: 'Grocer (Energy cans)' },
  { id: 'army', label: 'Army (Defense/Strength)' },
  { id: 'casino', label: 'Casino (Tokens/Luck)' },
  { id: 'medical', label: 'Medical (Reviving/Morphine)' },
  { id: 'education', label: 'Education (Work stats)' },
  { id: 'law', label: 'Law Firm (Bail/Busts)' }
];

export const ScoutFilterPanel: React.FC<ScoutFilterPanelProps> = ({
  filters,
  setFilters,
  isScanning,
  scanProgress,
  onStartScan,
  onPauseScan,
  onResumeScan,
  onResetFilters
}) => {
  const [activePreset, setActivePreset] = useState<string>('custom');

  const applyPreset = (presetName: string) => {
    setActivePreset(presetName);
    if (presetName === '10star_sweet') {
      setFilters(prev => ({
        ...prev,
        minManual: 10000,
        minInt: 8000,
        minEnd: 15000,
        minTotal: 35000,
        employmentType: 'unemployed',
        excludePlayerCompanies: true,
        maxInactiveDays: 2
      }));
    } else if (presetName === 'oil_rig') {
      setFilters(prev => ({
        ...prev,
        minManual: 35000,
        minInt: 10000,
        minEnd: 35000,
        minTotal: 80000,
        employmentType: 'all',
        excludePlayerCompanies: true,
        maxInactiveDays: 3
      }));
    } else if (presetName === 'starter_training') {
      setFilters(prev => ({
        ...prev,
        minManual: 1000,
        minInt: 1000,
        minEnd: 1000,
        minTotal: 5000,
        employmentType: 'city',
        excludePlayerCompanies: true,
        maxInactiveDays: 1
      }));
    }
  };

  const toggleCityJob = (jobId: string) => {
    setFilters(prev => {
      const exists = prev.selectedCityJobs.includes(jobId);
      return {
        ...prev,
        selectedCityJobs: exists
          ? prev.selectedCityJobs.filter(j => j !== jobId)
          : [...prev.selectedCityJobs, jobId]
      };
    });
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg text-slate-200">
      {/* Header & Quick Presets */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            Candidate Scanner & Filters
          </h2>
          <p className="text-xs text-slate-400">
            Scan Torn profiles legally using the Public API with real-time rate limit management.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-semibold text-slate-500 mr-1">Presets:</span>
          <button
            onClick={() => applyPreset('10star_sweet')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition ${
              activePreset === '10star_sweet'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            10★ Sweet Shop
          </button>
          <button
            onClick={() => applyPreset('oil_rig')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition ${
              activePreset === 'oil_rig'
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Heavy / Oil Rig
          </button>
          <button
            onClick={() => applyPreset('starter_training')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition ${
              activePreset === 'starter_training'
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/40'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            City / Starter
          </button>
        </div>
      </div>

      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
        {/* Work Stats Minima */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between mb-3">
            <span>Work Stats (Minima)</span>
            <span className="text-[10px] text-slate-400 normal-case font-normal">Values in points</span>
          </label>

          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Manual Labor (MAN)</span>
                <span className="font-mono text-emerald-400 font-semibold">{filters.minManual.toLocaleString()}</span>
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={filters.minManual}
                onChange={(e) => setFilters(prev => ({ ...prev, minManual: Number(e.target.value) || 0 }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Intelligence (INT)</span>
                <span className="font-mono text-emerald-400 font-semibold">{filters.minInt.toLocaleString()}</span>
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={filters.minInt}
                onChange={(e) => setFilters(prev => ({ ...prev, minInt: Number(e.target.value) || 0 }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span>Endurance (END)</span>
                <span className="font-mono text-emerald-400 font-semibold">{filters.minEnd.toLocaleString()}</span>
              </div>
              <input
                type="number"
                min="0"
                step="500"
                value={filters.minEnd}
                onChange={(e) => setFilters(prev => ({ ...prev, minEnd: Number(e.target.value) || 0 }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1">
                <span className="font-semibold text-emerald-300">Total Work Stats (MAN+INT+END)</span>
                <span className="font-mono text-emerald-400 font-bold">{filters.minTotal.toLocaleString()}</span>
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                value={filters.minTotal}
                onChange={(e) => setFilters(prev => ({ ...prev, minTotal: Number(e.target.value) || 0 }))}
                className="w-full bg-slate-900 border border-emerald-500/40 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Employment & Company Settings */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">
          <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between mb-3">
            <span>Employment Status Filter</span>
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
          </label>

          <div className="space-y-3.5">
            <div>
              <label className="block text-xs text-slate-300 mb-1.5">Employment Category</label>
              <select
                value={filters.employmentType}
                onChange={(e) => setFilters(prev => ({ ...prev, employmentType: e.target.value as any }))}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500 outline-none"
              >
                <option value="unemployed">Unemployed Only (No Company, No City Job)</option>
                <option value="city">City Jobs Only (Poach from City)</option>
                <option value="all">Any Status (Include Private Companies)</option>
              </select>
            </div>

            {/* City job multi-select if city selected */}
            {filters.employmentType === 'city' && (
              <div className="p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg">
                <span className="block text-[11px] font-semibold text-slate-400 mb-2">Target City Job Positions:</span>
                <div className="grid grid-cols-2 gap-1.5">
                  {CITY_JOB_OPTIONS.map(job => (
                    <label key={job.id} className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.selectedCityJobs.includes(job.id)}
                        onChange={() => toggleCityJob(job.id)}
                        className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-0"
                      />
                      <span className="text-[11px]">{job.label.split(' ')[0]}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-1">
              <label className="flex items-start gap-2 text-xs text-slate-300 cursor-pointer p-2 rounded-lg bg-slate-900/60 hover:bg-slate-900 border border-slate-800 transition">
                <input
                  type="checkbox"
                  checked={filters.excludePlayerCompanies}
                  onChange={(e) => setFilters(prev => ({ ...prev, excludePlayerCompanies: e.target.checked }))}
                  className="mt-0.5 rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-0"
                />
                <div>
                  <span className="font-semibold text-white">Exclude Player-Owned Companies</span>
                  <p className="text-[11px] text-slate-400">
                    Prevents poaching from other directors' player companies to maintain diplomatic peace.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Activity & Scan Quota */}
        <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 flex flex-col justify-between">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between mb-3">
              <span>Activity & Limits</span>
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
            </label>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Max Inactivity Window</span>
                  <span className="text-emerald-400 font-semibold">{filters.maxInactiveDays} days</span>
                </div>
                <select
                  value={filters.maxInactiveDays}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxInactiveDays: Number(e.target.value) }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
                >
                  <option value={1}>Active within 24 hours (Top activity)</option>
                  <option value={3}>Active within 3 days (Standard)</option>
                  <option value={7}>Active within 7 days (Relaxed)</option>
                  <option value={14}>Active within 14 days (Deep scout)</option>
                </select>
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Target Candidate Goal</span>
                  <span className="text-emerald-400 font-semibold">{filters.targetCount} players</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={filters.targetCount}
                  onChange={(e) => setFilters(prev => ({ ...prev, targetCount: Number(e.target.value) }))}
                  className="w-full accent-emerald-500"
                />
                <div className="flex justify-between text-[10px] text-slate-500">
                  <span>5 (Quick)</span>
                  <span>25</span>
                  <span>50</span>
                  <span>100 (Deep)</span>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-300 mb-1">Scan Batch Size</label>
                <select
                  value={filters.scanBatchSize}
                  onChange={(e) => setFilters(prev => ({ ...prev, scanBatchSize: Number(e.target.value) }))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
                >
                  <option value={10}>10 profiles per chunk (Fastest feedback)</option>
                  <option value={25}>25 profiles per chunk (Balanced)</option>
                  <option value={50}>50 profiles per chunk (High throughput)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 mt-3 flex items-center justify-between text-xs text-slate-400">
            <span>Rate buffer: 95 calls/min</span>
            <button
              onClick={onResetFilters}
              className="text-slate-400 hover:text-slate-200 underline text-[11px]"
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      </div>

      {/* Live Scan Control & Progress Meter */}
      <div className="mt-5 p-4 bg-slate-950 border border-slate-800 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Progress Bar & Status */}
        <div className="w-full md:w-3/5 space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-300 flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${isScanning ? 'bg-emerald-400 animate-ping' : 'bg-slate-600'}`} />
              {isScanning ? 'Scanner Active (Rotating Keys)' : 'Scanner Ready'}
            </span>
            <span className="font-mono text-xs text-slate-400">
              Matched: <strong className="text-emerald-400">{scanProgress.matched}</strong> / Goal: {filters.targetCount}
              <span className="mx-2 text-slate-600">|</span>
              Evaluated: {scanProgress.scanned}
            </span>
          </div>

          <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(100, (scanProgress.matched / Math.max(1, filters.targetCount)) * 100)}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Current Key: <span className="font-mono text-slate-300">{scanProgress.currentKey || 'Alpha Rotator'}</span></span>
            <span className="flex items-center gap-1 text-emerald-400">
              <Zap className="w-3 h-3" /> Rate remaining: {scanProgress.rateRemaining}/100 req
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
          {!isScanning ? (
            <button
              onClick={onStartScan}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-emerald-700/25 transition active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Start Legal Scan</span>
            </button>
          ) : (
            <button
              onClick={onPauseScan}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-lg shadow-lg shadow-amber-700/25 transition active:scale-95"
            >
              <Pause className="w-4 h-4 fill-white" />
              <span>Pause Scan</span>
            </button>
          )}

          <button
            onClick={onResumeScan}
            title="Auto-resume previous session from IndexedDB checkpoint"
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Resume</span>
          </button>
        </div>
      </div>
    </div>
  );
};
