import React, { useState } from 'react';
import { Candidate, CandidateStatus } from '../../types/torn';
import { Send, MessageSquare, UserX, Clock, Briefcase, Award, CheckCircle, Search, Edit3, MessageCircle, Mail } from 'lucide-react';

interface CandidatesListProps {
  candidates: Candidate[];
  onSelectCandidateForMessage: (candidate: Candidate) => void;
  onUpdateCandidateStatus: (candidateId: number, newStatus: CandidateStatus) => void;
  onSaveCandidateNote: (candidateId: number, note: string) => void;
  onExcludeCandidate: (candidateId: number, name: string) => void;
  onRemoveCandidate: (candidateId: number) => void;
}

export const CandidatesList: React.FC<CandidatesListProps> = ({
  candidates,
  onSelectCandidateForMessage,
  onUpdateCandidateStatus,
  onSaveCandidateNote,
  onExcludeCandidate,
  onRemoveCandidate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);
  const [tempNote, setTempNote] = useState('');

  const filteredCandidates = candidates.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const startEditNote = (c: Candidate) => {
    setEditingNoteId(c.id);
    setTempNote(c.notes || '');
  };

  const saveNote = (id: number) => {
    onSaveCandidateNote(id, tempNote);
    setEditingNoteId(null);
  };

  return (
    <div className="space-y-4">
      {/* Controls Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by player name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:border-emerald-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Filter Status:</span>
          {['all', 'not_contacted', 'contacted', 'replied', 'hired'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium capitalize whitespace-nowrap transition ${
                statusFilter === st
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-semibold'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Candidate Cards Grid */}
      {filteredCandidates.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center text-slate-400">
          <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-500">
            <UserX className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-300">No candidates match current criteria</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your work stats filters, changing the employment type, or starting a legal scan in the Scout tab.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCandidates.map(c => (
            <div
              key={c.id}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700/80 rounded-xl p-4 shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-slate-800/70">
                  <div>
                    <div className="flex items-center gap-2">
                      <a
                        href={`https://www.torn.com/profiles.php?XID=${c.id}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-bold text-white hover:text-emerald-400 transition flex items-center gap-1.5"
                      >
                        {c.name}
                        <span className="text-xs font-mono font-normal text-slate-400">[{c.id}]</span>
                      </a>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-semibold">
                        Lvl {c.level}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {c.lastAction}
                      </span>
                      <span className="text-slate-600">•</span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="w-3 h-3 text-slate-500" />
                        {c.employment.title}
                      </span>
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={c.status}
                    onChange={(e) => onUpdateCandidateStatus(c.id, e.target.value as CandidateStatus)}
                    className={`text-[11px] font-semibold px-2 py-1 rounded-md border outline-none cursor-pointer ${
                      c.status === 'not_contacted'
                        ? 'bg-slate-800 text-slate-300 border-slate-700'
                        : c.status === 'contacted'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                        : c.status === 'replied'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                        : c.status === 'hired'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                        : 'bg-red-500/10 text-red-400 border-red-500/30'
                    }`}
                  >
                    <option value="not_contacted">Not Contacted</option>
                    <option value="contacted">Contacted</option>
                    <option value="replied">Replied</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="hired">Hired</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                {/* Work Stats Tri-Box */}
                <div className="grid grid-cols-3 gap-2 my-3">
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">MAN</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {c.stats.manual.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">INT</span>
                    <span className="text-xs font-mono font-bold text-blue-400">
                      {c.stats.intelligence.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">END</span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {c.stats.endurance.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center text-[11px] text-slate-400 px-1 mb-2">
                  <span>Total Work Stats:</span>
                  <span className="font-mono font-bold text-white text-xs">{c.stats.total.toLocaleString()}</span>
                </div>

                {/* Notes Section */}
                <div className="bg-slate-950/70 p-2.5 rounded-lg border border-slate-800/80 mb-3 text-xs">
                  {editingNoteId === c.id ? (
                    <div className="space-y-2">
                      <textarea
                        value={tempNote}
                        onChange={(e) => setTempNote(e.target.value)}
                        placeholder="Add custom candidate notes (e.g. wants $300k, on trip)..."
                        className="w-full bg-slate-900 border border-slate-700 rounded p-1.5 text-xs text-white focus:border-emerald-500 outline-none"
                        rows={2}
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          onClick={() => setEditingNoteId(null)}
                          className="px-2 py-0.5 text-[11px] text-slate-400 hover:text-slate-200"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => saveNote(c.id)}
                          className="px-2.5 py-0.5 text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between gap-2 group">
                      <p className="text-[11px] text-slate-300 italic line-clamp-2">
                        {c.notes ? c.notes : <span className="text-slate-500 not-italic">No custom notes yet.</span>}
                      </p>
                      <button
                        onClick={() => startEditNote(c)}
                        className="opacity-60 group-hover:opacity-100 text-slate-400 hover:text-white transition p-0.5"
                        title="Edit note"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                    </div>
                  )}

                  {c.lastContactedAt && (
                    <div className="mt-1.5 pt-1.5 border-t border-slate-800/60 flex items-center justify-between text-[10px] text-slate-500">
                      <span>Last Contacted: {c.lastContactedAt}</span>
                      {c.templateUsed && <span className="truncate max-w-[130px]">{c.templateUsed}</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80">
                <button
                  onClick={() => onSelectCandidateForMessage(c)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Pitch / Copy</span>
                </button>

                <button
                  onClick={() => onExcludeCandidate(c.id, c.name)}
                  className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition"
                  title="Add to Anti-Poaching Exclude List"
                >
                  <UserX className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
