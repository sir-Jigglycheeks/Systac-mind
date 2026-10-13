import React, { useState } from 'react';
import { RecruitmentTemplate } from '../../types/torn';
import { Plus, Trash2, Edit2, Check, Sparkles, Building2, DollarSign, Award, FileText } from 'lucide-react';

interface TemplateManagerProps {
  templates: RecruitmentTemplate[];
  onSaveTemplate: (template: RecruitmentTemplate) => void;
  onDeleteTemplate: (templateId: string) => void;
  directorName: string;
  setDirectorName: (name: string) => void;
}

const DYNAMIC_TAGS = [
  { tag: '[NAME]', label: 'Player Name' },
  { tag: '[ID]', label: 'Player ID' },
  { tag: '[MAN]', label: 'Manual Stat' },
  { tag: '[INT]', label: 'Intelligence' },
  { tag: '[END]', label: 'Endurance' },
  { tag: '[TOTAL_STATS]', label: 'Total Work Stats' },
  { tag: '[COMPANY_NAME]', label: 'Company Name' },
  { tag: '[SALARY]', label: 'Daily Salary' },
  { tag: '[TRAINS]', label: 'Trains/Day' },
  { tag: '[DIRECTOR_NAME]', label: 'Your Director Name' }
];

export const TemplateManager: React.FC<TemplateManagerProps> = ({
  templates,
  onSaveTemplate,
  onDeleteTemplate,
  directorName,
  setDirectorName
}) => {
  const [editingTemplate, setEditingTemplate] = useState<RecruitmentTemplate | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const startNew = () => {
    setIsCreatingNew(true);
    setEditingTemplate({
      id: `template_${Date.now()}`,
      name: 'New Custom Recruitment Pitch',
      category: 'Custom',
      companyName: 'My Torn Company [10★]',
      salary: '$250,000/day',
      trainsPerDay: 2,
      subject: 'Vacancy at [COMPANY_NAME] for [NAME]',
      body: 'Hi [NAME]! We noticed your stats ([TOTAL_STATS] total: [MAN] MAN / [INT] INT / [END] END). We offer [SALARY] and [TRAINS] free daily trains. Interested?'
    });
  };

  const insertTag = (tag: string) => {
    if (!editingTemplate) return;
    setEditingTemplate(prev => {
      if (!prev) return null;
      return {
        ...prev,
        body: prev.body + ' ' + tag
      };
    });
  };

  const handleSave = () => {
    if (!editingTemplate) return;
    onSaveTemplate(editingTemplate);
    setEditingTemplate(null);
    setIsCreatingNew(false);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-lg text-slate-200 space-y-6">
      {/* Header & Global Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <FileText className="w-4 h-4 text-emerald-400" />
            Recruitment Pitch Templates
          </h2>
          <p className="text-xs text-slate-400">
            Create tailored pitches for different company types (Sweet Shop, Oil Rig, Pub, Starter Camp). Switch instantly during scouting.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <span className="text-[11px] text-slate-400">Director Name:</span>
            <input
              type="text"
              value={directorName}
              onChange={(e) => setDirectorName(e.target.value)}
              placeholder="Your Torn Name"
              className="bg-transparent text-xs text-white font-semibold outline-none w-28 placeholder-slate-600"
            />
          </div>

          <button
            onClick={startNew}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Template</span>
          </button>
        </div>
      </div>

      {/* Editor Modal / Inline form */}
      {editingTemplate && (
        <div className="bg-slate-950 p-4 sm:p-5 rounded-xl border border-emerald-500/40 space-y-4 shadow-xl">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              {isCreatingNew ? 'Create New Template' : `Edit: ${editingTemplate.name}`}
            </h3>
            <button
              onClick={() => { setEditingTemplate(null); setIsCreatingNew(false); }}
              className="text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs text-slate-300 mb-1">Template Label</label>
              <input
                type="text"
                value={editingTemplate.name}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, name: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Company Name</label>
              <input
                type="text"
                value={editingTemplate.companyName}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, companyName: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-300 mb-1">Offered Daily Salary</label>
              <input
                type="text"
                value={editingTemplate.salary}
                onChange={(e) => setEditingTemplate({ ...editingTemplate, salary: e.target.value })}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Subject Line</label>
            <input
              type="text"
              value={editingTemplate.subject}
              onChange={(e) => setEditingTemplate({ ...editingTemplate, subject: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:border-emerald-500 outline-none"
            />
          </div>

          {/* Quick Dynamic Tag Buttons */}
          <div>
            <span className="block text-[11px] font-semibold text-slate-400 mb-1.5">
              Click to insert dynamic placeholder:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {DYNAMIC_TAGS.map(item => (
                <button
                  key={item.tag}
                  type="button"
                  onClick={() => insertTag(item.tag)}
                  className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-emerald-400 text-[11px] font-mono border border-slate-700 transition"
                  title={item.label}
                >
                  {item.tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs text-slate-300 mb-1">Pitch Body</label>
            <textarea
              rows={5}
              value={editingTemplate.body}
              onChange={(e) => setEditingTemplate({ ...editingTemplate, body: e.target.value })}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-xs text-white font-mono focus:border-emerald-500 outline-none"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              onClick={() => { setEditingTemplate(null); setIsCreatingNew(false); }}
              className="px-3 py-1.5 text-xs text-slate-400 hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save Template</span>
            </button>
          </div>
        </div>
      )}

      {/* Templates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map(t => (
          <div
            key={t.id}
            className="bg-slate-950/70 border border-slate-800 hover:border-slate-700 rounded-xl p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-800">
                <div>
                  <h4 className="text-xs font-bold text-white line-clamp-1">{t.name}</h4>
                  <span className="text-[10px] text-emerald-400 font-medium">{t.companyName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => { setEditingTemplate(t); setIsCreatingNew(false); }}
                    className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                    title="Edit Template"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  {templates.length > 1 && (
                    <button
                      onClick={() => onDeleteTemplate(t.id)}
                      className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
                      title="Delete Template"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <div className="my-2.5 space-y-1 text-[11px] text-slate-400">
                <div className="flex justify-between">
                  <span>Pay:</span>
                  <span className="text-slate-200 font-semibold">{t.salary}</span>
                </div>
                <div className="flex justify-between">
                  <span>Trains:</span>
                  <span className="text-slate-200 font-semibold">{t.trainsPerDay}/day</span>
                </div>
              </div>

              <div className="bg-slate-900/90 rounded-lg p-2.5 border border-slate-800 text-[11px] text-slate-300 font-mono line-clamp-4 leading-relaxed whitespace-pre-wrap">
                {t.body}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500">
              <span>Dynamic placeholders active</span>
              <span className="text-emerald-400">Ready</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
