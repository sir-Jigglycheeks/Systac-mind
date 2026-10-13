import React from 'react';
import { 
  X, 
  MapPin, 
  Award, 
  DollarSign, 
  GraduationCap, 
  Calendar, 
  CheckCircle2, 
  Briefcase, 
  BookOpen, 
  Clock, 
  FileText,
  ShieldCheck,
  Building,
  PlusCircle,
  Globe,
  ExternalLink
} from 'lucide-react';
import { University } from '../types';
import { CountryFlag } from './CountryFlag';

interface UniversityDetailModalProps {
  university: University | null;
  onClose: () => void;
  onApply: (uni: University) => void;
  isAlreadyApplied: boolean;
}

export const UniversityDetailModal: React.FC<UniversityDetailModalProps> = ({
  university,
  onClose,
  onApply,
  isAlreadyApplied,
}) => {
  if (!university) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div 
        id="university-detail-modal"
        className="relative bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden"
      >
        {/* Header Hero Banner */}
        <div className="relative h-48 sm:h-56 w-full shrink-0 overflow-hidden">
          <img 
            src={university.image} 
            alt={university.name}
            className="w-full h-full object-cover brightness-[0.75]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

          {/* Close button */}
          <button
            id="btn-close-uni-modal"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Title & Location over banner */}
          <div className="absolute bottom-4 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <CountryFlag country={university.specificCountry || university.country} size="sm" />
                <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-blue-600/90 text-white shadow">
                  {university.specificCountry}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  QS Rank #{university.qsRank}
                </span>
                {university.isOfficialScorecardVerified && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    US Scorecard Verified
                  </span>
                )}
                {university.officialWebsite && (
                  <a 
                    href={university.officialWebsite}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-xs font-medium px-2 py-0.5 rounded-md bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 flex items-center gap-1 transition-colors"
                  >
                    <Globe className="w-3 h-3 text-blue-400" />
                    <span>{university.domain || 'Official Website'}</span>
                    <ExternalLink className="w-2.5 h-2.5 opacity-70" />
                  </a>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                {university.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                <span>{university.location}</span>
                <span className="mx-1">•</span>
                <Building className="w-3.5 h-3.5 text-slate-400" />
                <span>{university.campusType} Campus</span>
              </p>
            </div>

            <div className="shrink-0">
              <button
                id="btn-modal-apply"
                onClick={() => {
                  onApply(university);
                  onClose();
                }}
                disabled={isAlreadyApplied}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all shadow-lg ${
                  isAlreadyApplied
                    ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30 cursor-pointer'
                }`}
              >
                {isAlreadyApplied ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>In Application Tracker</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Add to My Application Tracker</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-300">
          
          {/* Key Metric Blocks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Annual Tuition</span>
              <p className="text-base font-bold text-white">{university.tuitionLocalFormatted}</p>
              <p className="text-[11px] text-slate-400">~${university.tuitionPerYearUSD.toLocaleString()} USD</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Estimated Living Cost</span>
              <p className="text-base font-bold text-emerald-400">${university.annualLivingCostUSD.toLocaleString()}/yr</p>
              <p className="text-[11px] text-slate-400">Dorm / private housing</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Acceptance Rate</span>
              <p className="text-base font-bold text-amber-300">{university.acceptanceRate}%</p>
              <p className="text-[11px] text-slate-400">Competitive selectivity</p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/80">
              <span className="text-[11px] font-semibold text-slate-400 block mb-1">Post-Study Work</span>
              <p className="text-xs font-bold text-sky-400">{university.postStudyWork}</p>
            </div>
          </div>

          {/* Overview */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Institution Overview
            </h3>
            <p className="leading-relaxed text-slate-200">
              {university.description}
            </p>
          </div>

          {/* Admission Requirements & Test Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-slate-850 border border-slate-750">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-400 mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                <span>Minimum Entry Requirements</span>
              </h4>
              <ul className="space-y-2 text-xs">
                <li className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">Minimum GPA:</span>
                  <span className="font-bold text-white">{university.minGpa} / 4.0 scale (or equivalent)</span>
                </li>
                <li className="flex items-center justify-between py-1 border-b border-slate-800">
                  <span className="text-slate-400">IELTS Academic:</span>
                  <span className="font-bold text-white">{university.minIelts} Overall (no band &lt; 6.0)</span>
                </li>
                {university.minToefl && (
                  <li className="flex items-center justify-between py-1 border-b border-slate-800">
                    <span className="text-slate-400">TOEFL iBT:</span>
                    <span className="font-bold text-white">{university.minToefl}+</span>
                  </li>
                )}
                <li className="flex items-center justify-between py-1">
                  <span className="text-slate-400">Offered Degree Levels:</span>
                  <span className="font-bold text-emerald-400">{university.degrees.join(', ')}</span>
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-850 border border-slate-750">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Upcoming Intakes & Application Deadlines</span>
              </h4>
              <div className="space-y-2.5">
                {university.applicationDeadlines.map((d, i) => (
                  <div key={i} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-white">{d.term}</p>
                      <p className="text-[11px] text-slate-400">Decision by: {d.decisionDate}</p>
                    </div>
                    <span className="text-xs font-bold px-2 py-1 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30">
                      {d.deadline}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Top Programs */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span>Flagship Programs & High-Demand Concentrations</span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {university.topPrograms.map((prog, idx) => (
                <span 
                  key={idx}
                  className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold"
                >
                  {prog}
                </span>
              ))}
            </div>
          </div>

          {/* Key Highlights */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2">
              <Award className="w-4 h-4 text-amber-400" />
              <span>Campus Distinctions & Career Pipelines</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {university.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Scholarship & Funding Opportunities */}
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/25">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              <span>Scholarships & Financial Aid Availability</span>
            </h4>
            <p className="text-xs text-amber-100/90 leading-relaxed">
              {university.scholarshipInfo}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Admissions handled via Systac Mind Accredited Partner Agreement</span>
          </div>
          <button
            id="btn-modal-bottom-close"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
