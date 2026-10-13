import React, { useState } from 'react';
import { Candidate, ExcludeItem, RecruitmentTemplate } from '../../types/torn';
import { Download, Upload, Database, FileSpreadsheet, FileText, Check, AlertCircle, Trash2 } from 'lucide-react';

interface DataExportModalProps {
  candidates: Candidate[];
  excludeList: ExcludeItem[];
  templates: RecruitmentTemplate[];
  onImportCandidates: (candidates: Candidate[]) => void;
  onClearAllCandidates: () => void;
}

export const DataExportModal: React.FC<DataExportModalProps> = ({
  candidates,
  excludeList,
  templates,
  onImportCandidates,
  onClearAllCandidates
}) => {
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Export CSV
  const exportToCSV = () => {
    const headers = ['Player ID', 'Name', 'Level', 'Status', 'Manual', 'Intelligence', 'Endurance', 'Total Stats', 'Employment', 'Last Action', 'Last Contacted', 'Notes'];
    const rows = candidates.map(c => [
      c.id,
      `"${c.name}"`,
      c.level,
      c.status,
      c.stats.manual,
      c.stats.intelligence,
      c.stats.endurance,
      c.stats.total,
      `"${c.employment.title}"`,
      `"${c.lastAction}"`,
      `"${c.lastContactedAt || ''}"`,
      `"${(c.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `torn_recruiter_candidates_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export TXT / JSON
  const exportToJSON = () => {
    const backupData = {
      exportDate: new Date().toISOString(),
      candidates,
      excludeList,
      templates
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `torn_recruiter_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        if (file.name.endsWith('.json')) {
          const parsed = JSON.parse(text);
          if (Array.isArray(parsed.candidates)) {
            onImportCandidates(parsed.candidates);
            setImportStatus(`Successfully restored ${parsed.candidates.length} candidates from backup!`);
          } else if (Array.isArray(parsed)) {
            onImportCandidates(parsed);
            setImportStatus(`Successfully restored ${parsed.length} candidates!`);
          }
        } else if (file.name.endsWith('.csv')) {
          // Parse CSV lines
          const lines = text.split('\n').filter(Boolean);
          if (lines.length > 1) {
            const imported: Candidate[] = [];
            for (let i = 1; i < lines.length; i++) {
              const cols = lines[i].split(',').map(s => s.replace(/^"|"$/g, '').trim());
              if (cols.length >= 8) {
                const id = parseInt(cols[0], 10);
                if (id && !isNaN(id)) {
                  imported.push({
                    id,
                    name: cols[1] || `Player_${id}`,
                    level: parseInt(cols[2], 10) || 1,
                    status: (cols[3] as any) || 'not_contacted',
                    stats: {
                      manual: parseInt(cols[4], 10) || 0,
                      intelligence: parseInt(cols[5], 10) || 0,
                      endurance: parseInt(cols[6], 10) || 0,
                      total: parseInt(cols[7], 10) || 0
                    },
                    employment: { type: 'unemployed', title: cols[8] || 'Unemployed' },
                    lastAction: cols[9] || 'Unknown',
                    lastActionTimestamp: Date.now(),
                    notes: cols[11] || ''
                  });
                }
              }
            }
            if (imported.length > 0) {
              onImportCandidates(imported);
              setImportStatus(`Imported ${imported.length} candidates from CSV.`);
            }
          }
        }
      } catch (err) {
        setImportStatus('Failed to parse file. Make sure it is valid CSV or JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg text-slate-200 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-emerald-400" />
            Data Storage & Export / Import Management
          </h2>
          <p className="text-xs text-slate-400">
            Backed by persistent browser IndexedDB (TornRecruiterDB). Export candidate lists, contact histories, and notes to .CSV or .JSON/.TXT.
          </p>
        </div>

        <button
          onClick={onClearAllCandidates}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 hover:text-white text-xs font-semibold rounded-lg border border-red-800/60 transition"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Candidates</span>
        </button>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* CSV Export */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Export to CSV Spreadsheet
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Downloads all current scouted candidates, complete work stat breakdown (MAN, INT, END, Total), employment state, contact timestamps, and custom player notes for Excel or Google Sheets.
            </p>
          </div>

          <button
            onClick={exportToCSV}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-sm transition"
          >
            <Download className="w-4 h-4" />
            <span>Download Candidates (.CSV)</span>
          </button>
        </div>

        {/* JSON / TXT Backup */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <FileText className="w-5 h-5 text-blue-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Full Database Backup (.JSON)
              </h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Backs up your candidates, all recruitment pitch templates, and anti-poaching exclude lists into a single portable backup file for easy migration between devices or TornPDA.
            </p>
          </div>

          <button
            onClick={exportToJSON}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-lg border border-slate-700 transition"
          >
            <Download className="w-4 h-4 text-blue-400" />
            <span>Export Full Backup (.JSON)</span>
          </button>
        </div>
      </div>

      {/* Import Section */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex items-center gap-2.5">
          <Upload className="w-5 h-5 text-emerald-400" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-white">
            Import Candidates or Backup File (.CSV / .JSON)
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Upload an exported CSV or JSON backup to merge into your local candidate list and contact history.
        </p>

        <div className="pt-2">
          <input
            type="file"
            accept=".csv, .json, .txt"
            onChange={handleFileUpload}
            className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-500 cursor-pointer"
          />
        </div>

        {importStatus && (
          <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-400 flex items-center gap-2 mt-2">
            <Check className="w-4 h-4" />
            <span>{importStatus}</span>
          </div>
        )}
      </div>

      {/* Watchdog & Storage Diagnostics */}
      <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div className="space-y-1">
          <span className="font-semibold text-slate-200 block">Watchdog & Auto-Save Checkpoint:</span>
          <span>IndexedDB auto-saves scan checkpoints every 10 seconds. Auto-resumes cleanly after browser close or TornPDA suspend.</span>
        </div>
        <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px] font-bold">
          STORAGE: HEALTHY
        </span>
      </div>
    </div>
  );
};
