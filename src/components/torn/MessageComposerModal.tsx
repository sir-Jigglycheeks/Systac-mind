import React, { useState, useEffect } from 'react';
import { Candidate, RecruitmentTemplate } from '../../types/torn';
import { X, Copy, Check, MessageSquare, Mail, Zap, ExternalLink, Sparkles, Send, ShieldAlert } from 'lucide-react';

interface MessageComposerModalProps {
  candidate: Candidate | null;
  templates: RecruitmentTemplate[];
  directorName: string;
  onClose: () => void;
  onMarkAsContacted: (candidateId: number, templateName: string) => void;
}

export const MessageComposerModal: React.FC<MessageComposerModalProps> = ({
  candidate,
  templates,
  directorName,
  onClose,
  onMarkAsContacted
}) => {
  if (!candidate) return null;

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(
    templates[0]?.id || ''
  );
  const [copied, setCopied] = useState(false);
  const [preferredRouting, setPreferredRouting] = useState<'dm_first' | 'mail_direct'>('dm_first');

  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0];

  // Render placeholders
  const renderMessage = (templateText: string): string => {
    if (!templateText) return '';
    return templateText
      .replace(/\[NAME\]/g, candidate.name)
      .replace(/\[ID\]/g, candidate.id.toString())
      .replace(/\[MAN\]/g, candidate.stats.manual.toLocaleString())
      .replace(/\[INT\]/g, candidate.stats.intelligence.toLocaleString())
      .replace(/\[END\]/g, candidate.stats.endurance.toLocaleString())
      .replace(/\[TOTAL_STATS\]/g, candidate.stats.total.toLocaleString())
      .replace(/\[COMPANY_NAME\]/g, selectedTemplate?.companyName || 'our company')
      .replace(/\[SALARY\]/g, selectedTemplate?.salary || '$200,000/day')
      .replace(/\[TRAINS\]/g, (selectedTemplate?.trainsPerDay || 2).toString())
      .replace(/\[DIRECTOR_NAME\]/g, directorName || 'Company Director');
  };

  const renderedSubject = renderMessage(selectedTemplate?.subject || 'Company Recruitment Offer');
  const renderedBody = renderMessage(selectedTemplate?.body || '');

  const handleCopy = () => {
    navigator.clipboard.writeText(renderedBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenTornMail = () => {
    handleCopy();
    onMarkAsContacted(candidate.id, selectedTemplate?.name || 'Recruitment Pitch');
    const mailUrl = `https://www.torn.com/messages.php#/p=compose&XID=${candidate.id}&text=${encodeURIComponent(renderedBody)}`;
    window.open(mailUrl, '_blank');
  };

  const handleOpenTornDM = () => {
    handleCopy();
    onMarkAsContacted(candidate.id, selectedTemplate?.name || 'Recruitment Pitch');
    // Open profile or direct message
    const profileUrl = `https://www.torn.com/profiles.php?XID=${candidate.id}`;
    window.open(profileUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-4 sm:p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                Recruit: <span className="text-emerald-400">{candidate.name}</span>
                <span className="text-xs font-mono text-slate-400">[{candidate.id}]</span>
              </h3>
              <p className="text-xs text-slate-400">
                Work Stats: {candidate.stats.total.toLocaleString()} total ({candidate.stats.manual.toLocaleString()} MAN / {candidate.stats.intelligence.toLocaleString()} INT / {candidate.stats.endurance.toLocaleString()} END)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {/* Communication Routing Banner */}
          <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-xl p-3.5 flex items-start gap-3">
            <Zap className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-slate-300">
              <span className="font-bold text-emerald-400">Advanced Communication Routing:</span>
              <p className="mt-0.5 text-slate-400">
                In Torn, sending in-game emails enforces a strict <strong>10-second spam delay</strong> between messages.
                Using <strong>Direct Chat / DMs</strong> bypasses this delay entirely. If a player has DMs disabled in privacy settings, fallback to in-game email with 1 click.
              </p>
            </div>
          </div>

          {/* Template Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Select Recruitment Template
              </label>
              <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Auto-populated with stats
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {templates.map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTemplateId(t.id)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition ${
                    selectedTemplateId === t.id
                      ? 'bg-emerald-500/10 border-emerald-500 text-white font-semibold shadow-sm'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                  }`}
                >
                  <span className="font-semibold block truncate">{t.name}</span>
                  <span className="text-[10px] text-slate-500 block mt-0.5">{t.companyName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Rendered Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-1">Subject Line</label>
            <input
              type="text"
              readOnly
              value={renderedSubject}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none font-medium"
            />
          </div>

          {/* Rendered Pitch Body */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-400">Rendered Pitch</label>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 text-[11px] text-emerald-400 hover:text-emerald-300 transition"
              >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied to Clipboard!' : 'Copy to Clipboard'}
              </button>
            </div>
            <textarea
              readOnly
              rows={6}
              value={renderedBody}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono leading-relaxed outline-none focus:border-emerald-500/50 resize-none"
            />
          </div>

          {/* DM Privacy Indicator */}
          {candidate.dmsOpen === false && (
            <div className="bg-amber-950/40 border border-amber-500/30 rounded-lg p-2.5 flex items-center gap-2 text-xs text-amber-300">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                Note: Candidate settings indicate DMs may be restricted. Recommend using <strong>Send In-Game Mail</strong> fallback.
              </span>
            </div>
          )}
        </div>

        {/* Modal Actions Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span>Status after send:</span>
            <span className="font-semibold text-amber-400">Marked as Contacted</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Direct DM / Bypass 10s cooldown */}
            <button
              onClick={handleOpenTornDM}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg shadow-md shadow-emerald-700/20 transition"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Send via Chat DM (No Delay)</span>
            </button>

            {/* In-game mail fallback */}
            <button
              onClick={handleOpenTornMail}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold rounded-lg border border-slate-700 transition"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send In-Game Mail</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
