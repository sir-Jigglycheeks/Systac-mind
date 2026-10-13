import React, { useState } from 'react';
import { ExcludeItem } from '../../types/torn';
import { ShieldCheck, UserX, Plus, Trash2, ShieldAlert, FileText, CheckCircle2 } from 'lucide-react';

interface ExcludeListManagerProps {
  excludeList: ExcludeItem[];
  onAddExclude: (item: ExcludeItem) => void;
  onRemoveExclude: (id: number) => void;
  onBulkAddExcludes: (items: ExcludeItem[]) => void;
}

export const ExcludeListManager: React.FC<ExcludeListManagerProps> = ({
  excludeList,
  onAddExclude,
  onRemoveExclude,
  onBulkAddExcludes
}) => {
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newReason, setNewReason] = useState<ExcludeItem['reason']>('Faction Member');
  const [bulkInput, setBulkInput] = useState('');
  const [showBulkModal, setShowBulkModal] = useState(false);

  const handleSingleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedId = parseInt(newId.trim(), 10);
    if (!parsedId || isNaN(parsedId)) return;

    if (excludeList.some(item => item.id === parsedId)) {
      alert('This Player ID is already on the Exclude List.');
      return;
    }

    onAddExclude({
      id: parsedId,
      name: newName.trim() || undefined,
      reason: newReason,
      addedAt: new Date().toISOString().split('T')[0]
    });

    setNewId('');
    setNewName('');
  };

  const handleBulkAdd = () => {
    if (!bulkInput.trim()) return;
    const lines = bulkInput.split(/[\n, ]+/).map(s => s.trim()).filter(Boolean);
    const newItems: ExcludeItem[] = [];

    lines.forEach(line => {
      const parsed = parseInt(line, 10);
      if (parsed && !isNaN(parsed) && !excludeList.some(e => e.id === parsed)) {
        newItems.push({
          id: parsed,
          reason: 'Faction Member',
          addedAt: new Date().toISOString().split('T')[0]
        });
      }
    });

    if (newItems.length > 0) {
      onBulkAddExcludes(newItems);
      setBulkInput('');
      setShowBulkModal(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg text-slate-200 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Anti-Poaching & Permanent Exclude List
          </h2>
          <p className="text-xs text-slate-400">
            Permanently shield friends, faction members, and allied company employees from being scouted or contacted.
          </p>
        </div>

        <button
          onClick={() => setShowBulkModal(!showBulkModal)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 transition"
        >
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          <span>Bulk Import IDs</span>
        </button>
      </div>

      {/* Bulk Import Drawer */}
      {showBulkModal && (
        <div className="bg-slate-950 p-4 rounded-xl border border-blue-500/30 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Bulk Import Player IDs (Faction or Allies)
            </h4>
            <button
              onClick={() => setShowBulkModal(false)}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Close
            </button>
          </div>
          <p className="text-xs text-slate-400">
            Paste comma-, space-, or newline-separated Torn Player IDs (e.g. your entire faction member list):
          </p>
          <textarea
            rows={3}
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder="1849201, 2490192, 3109281, 2901824..."
            className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono focus:border-blue-500 outline-none"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowBulkModal(false)}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleBulkAdd}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition"
            >
              Add Valid IDs
            </button>
          </div>
        </div>
      )}

      {/* Add Single ID Form */}
      <form onSubmit={handleSingleAdd} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
        <span className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
          Add Player or Company ID to Exclude
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Player ID *</label>
            <input
              type="number"
              required
              placeholder="e.g. 2910482"
              value={newId}
              onChange={(e) => setNewId(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Player Name (Optional)</label>
            <input
              type="text"
              placeholder="e.g. TornViper"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] text-slate-400 mb-1">Reason / Category</label>
            <select
              value={newReason}
              onChange={(e) => setNewReason(e.target.value as any)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
            >
              <option value="Faction Member">Faction Member</option>
              <option value="Friend">Friend</option>
              <option value="Allied Company">Allied Company</option>
              <option value="Blacklisted">Blacklisted</option>
              <option value="Manual">Manual</option>
            </select>
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Shield Player</span>
            </button>
          </div>
        </div>
      </form>

      {/* Exclude List Table */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs text-slate-400 px-1">
          <span>Protected Entities: <strong className="text-white">{excludeList.length}</strong></span>
          <span className="flex items-center gap-1 text-emerald-400">
            <CheckCircle2 className="w-3 h-3" /> Auto-filtered during scanning
          </span>
        </div>

        {excludeList.length === 0 ? (
          <div className="bg-slate-950 p-8 rounded-xl border border-slate-800 text-center text-slate-500 text-xs">
            No players in the Exclude List. Add IDs above to protect factions and friends.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 max-h-96 overflow-y-auto pr-1">
            {excludeList.map(item => (
              <div
                key={item.id}
                className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center justify-between gap-2 hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold text-white">ID: {item.id}</span>
                    {item.name && <span className="text-xs text-slate-300">({item.name})</span>}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                    <span className="px-1.5 py-0.2 bg-slate-800 text-slate-300 rounded font-medium">
                      {item.reason}
                    </span>
                    <span>Added: {item.addedAt}</span>
                  </div>
                </div>

                <button
                  onClick={() => onRemoveExclude(item.id)}
                  className="p-1 text-slate-500 hover:text-red-400 rounded hover:bg-slate-900 transition"
                  title="Remove from Exclude List"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
