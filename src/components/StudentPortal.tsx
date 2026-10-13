import React, { useState } from 'react';
import { 
  UserCheck, 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Calendar, 
  Mail, 
  Phone, 
  FileText, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  MessageSquare, 
  Send, 
  ShieldCheck,
  Building2,
  Award,
  ArrowRight,
  HelpCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';
import { ApplicationRecord, ApplicationStage, DestinationCountry, StudentProfile, StudyLevel, University } from '../types';

interface StudentPortalProps {
  studentProfile: StudentProfile;
  applications: ApplicationRecord[];
  universities: University[];
  onAddNewApplication: (app: Partial<ApplicationRecord>) => void;
  onGoToVault: () => void;
  onGoToUniversities: () => void;
  isStudentLoggedIn?: boolean;
  onOpenEvaluator?: () => void;
}

const STAGES: ApplicationStage[] = [
  'Profile Evaluation',
  'University Shortlisting',
  'Documents Verified',
  'Application Submitted',
  'Offer Received',
  'CAS / I-20 / PAL Issued',
  'Visa Lodged',
  'Visa Approved'
];

export const StudentPortal: React.FC<StudentPortalProps> = ({
  studentProfile,
  applications,
  universities,
  onAddNewApplication,
  onGoToVault,
  onGoToUniversities,
  isStudentLoggedIn = true,
  onOpenEvaluator,
}) => {
  const [selectedAppId, setSelectedAppId] = useState<string>(applications[0]?.id || '');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [expandedNotesAppId, setExpandedNotesAppId] = useState<string | null>(applications[0]?.id || null);

  const initials = studentProfile.fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'ST';

  // If user has not shared details or evaluated profile, prompt with the free profile check
  if (!isStudentLoggedIn) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 border border-amber-100 flex items-center justify-center mx-auto mb-6 shadow-xs">
            <Sparkles className="w-8 h-8" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2 block">
            Admissions & Visa Tracker
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit'] mb-3">
            Systac Mind Student Portal
          </h2>
          <p className="text-sm text-slate-600 max-w-xl mx-auto mb-8 leading-relaxed">
            Submit our Free Profile Check to instantly generate your personalized admissions pipeline, track offer statuses, manage tuition deposits, and monitor visa documentation.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto mb-6">
            {onOpenEvaluator && (
              <button
                id="portal-gateway-evaluate-btn"
                onClick={onOpenEvaluator}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Start Free Profile Check</span>
              </button>
            )}
          </div>

          <div className="pt-6 border-t border-slate-100 flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Authorized Official University Admissions Portal • No Account Required</span>
          </div>
        </div>
      </div>
    );
  }

  // New Note state
  const [newNoteMessage, setNewNoteMessage] = useState('');

  // Add Application Form state
  const [newAppCountry, setNewAppCountry] = useState<DestinationCountry>('UK');
  const [newAppUniId, setNewAppUniId] = useState<string>('');
  const [customUniName, setCustomUniName] = useState<string>('');
  const [newAppProgram, setNewAppProgram] = useState<string>('');
  const [newAppDegree, setNewAppDegree] = useState<StudyLevel>('Postgraduate');
  const [newAppIntake, setNewAppIntake] = useState<string>('Autumn 2026');

  // Filter universities for new application dropdown
  const countryUnis = universities.filter((u) => u.country === newAppCountry);

  const handleCreateApplication = (e: React.FormEvent) => {
    e.preventDefault();
    const matchedUni = universities.find((u) => u.id === newAppUniId);
    const uniName = matchedUni ? matchedUni.name : customUniName || 'Custom University Application';

    const newApp: Partial<ApplicationRecord> = {
      universityId: newAppUniId || 'custom-uni-' + Date.now(),
      universityName: uniName,
      country: newAppCountry,
      specificCountry: matchedUni ? matchedUni.specificCountry : newAppCountry,
      program: newAppProgram || 'Master of Science (General Program)',
      degreeLevel: newAppDegree,
      intake: newAppIntake,
      currentStage: 'University Shortlisting',
      stageProgress: 20,
      appliedDate: 'Just now',
      lastUpdated: 'Today',
      offerType: 'Pending',
      trackingNumber: `SMC-${newAppCountry}-${Date.now().toString().slice(-5)}`,
      nextAction: 'Upload official transcripts and degree certificate to Document Vault for verification',
      nextActionDueDate: 'In 7 days',
      counselor: {
        name: 'Dr. Eleanor Vance',
        title: 'Senior Global Admissions Lead',
        email: 'eleanor.vance@systacmind.com',
        phone: '+44 20 7946 0912',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
      },
      notes: [
        {
          id: 'note-' + Date.now(),
          author: 'Systac Admissions Team',
          role: 'Admissions Desk',
          date: 'Just now',
          message: `Application entry initiated for ${uniName}. Please proceed to the Document Vault to submit mandatory requirements.`,
          type: 'info'
        }
      ]
    };

    onAddNewApplication(newApp);
    setIsAddModalOpen(false);
    setNewAppProgram('');
    setCustomUniName('');
  };

  const handleAddStudentQuestion = (appId: string) => {
    if (!newNoteMessage.trim()) return;

    const targetApp = applications.find((a) => a.id === appId);
    if (!targetApp) return;

    targetApp.notes.unshift({
      id: 'student-note-' + Date.now(),
      author: studentProfile.fullName,
      role: 'Student Question',
      date: 'Just now',
      message: newNoteMessage,
      type: 'action'
    });

    setNewNoteMessage('');
  };

  // Metrics
  const totalOffers = applications.filter((a) => a.currentStage === 'Offer Received' || a.currentStage === 'CAS / I-20 / PAL Issued' || a.currentStage === 'Visa Approved').length;
  const inReviewCount = applications.filter((a) => a.currentStage === 'Application Submitted' || a.currentStage === 'Documents Verified').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Student Profile Header Bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-850 to-blue-950 rounded-3xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl mb-8 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 text-white flex items-center justify-center text-xl font-black shadow-lg shadow-blue-600/30 border border-white/20">
              {initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-extrabold font-['Outfit']">{studentProfile.fullName}</h2>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                  ID: {studentProfile.id}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span>{studentProfile.currentEducation}</span>
                <span>•</span>
                <span>CGPA: <strong className="text-emerald-400">{studentProfile.currentGpa} / 4.0</strong></span>
                <span>•</span>
                <span>IELTS: <strong className="text-amber-300">{studentProfile.englishScore}</strong></span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              id="btn-portal-add-app"
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-600/20 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Track New University</span>
            </button>
            <button
              id="btn-portal-open-vault"
              onClick={onGoToVault}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Document Vault</span>
            </button>
          </div>

        </div>

        {/* Overview Stat Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-slate-800/80">
          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Total In Progress</span>
            <span className="text-xl font-extrabold text-white">{applications.length} Applications</span>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Admissions Offers</span>
            <span className="text-xl font-extrabold text-emerald-400">{totalOffers} Received</span>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Under Evaluation</span>
            <span className="text-xl font-extrabold text-amber-300">{inReviewCount} In Review</span>
          </div>

          <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/60">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Senior Counselor</span>
            <span className="text-xs font-bold text-sky-300 truncate block mt-1">
              {studentProfile.assignedSeniorCounselor.split('(')[0]}
            </span>
          </div>
        </div>
      </div>

      {/* Applications List & Stage Pipeline */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] flex items-center gap-2">
            <UserCheck className="w-5 h-5 text-blue-600" />
            <span>Active University Application Trackers</span>
          </h3>
          <span className="text-xs text-slate-500 font-semibold">
            Live synchronization with admissions offices
          </span>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-800 font-['Outfit']">No applications tracked yet</h4>
            <p className="text-xs text-slate-500 mt-1 mb-4">
              Browse our verified university directory or add a custom institution to start tracking your journey.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={onGoToUniversities}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
              >
                Browse Universities
              </button>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-4 py-2 bg-slate-100 text-slate-800 rounded-xl text-xs font-bold"
              >
                Add Custom Application
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => {
              const currentStageIndex = STAGES.indexOf(app.currentStage);
              const isNotesExpanded = expandedNotesAppId === app.id;

              return (
                <div
                  key={app.id}
                  id={`app-card-${app.id}`}
                  className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden transition-all hover:border-slate-300"
                >
                  {/* App Card Header */}
                  <div className="p-5 sm:p-6 bg-slate-50/70 border-b border-slate-150 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-xs font-bold uppercase tracking-wide px-2.5 py-0.5 rounded-md bg-blue-100 text-blue-800">
                          {app.specificCountry} ({app.country})
                        </span>
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-200/80 text-slate-700">
                          Tracking ID: {app.trackingNumber}
                        </span>
                        {app.offerType && app.offerType !== 'Pending' && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 border border-emerald-300">
                            🎉 {app.offerType} Offer Received
                          </span>
                        )}
                      </div>
                      
                      <h4 className="text-xl font-extrabold text-slate-900 font-['Outfit']">
                        {app.universityName}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
                        {app.program} • <span className="text-slate-500">{app.degreeLevel} • {app.intake}</span>
                      </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Status</span>
                        <span className="text-xs font-extrabold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200 inline-block mt-0.5">
                          {app.currentStage}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 8-Stage Progress Stepper Bar */}
                  <div className="p-5 sm:p-6 border-b border-slate-100">
                    <div className="mb-3 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">Application Pipeline:</span>
                      <span className="font-semibold text-slate-500">Stage {currentStageIndex + 1} of 8</span>
                    </div>

                    {/* Stepper Dots & Line */}
                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                      {STAGES.map((stageName, idx) => {
                        const isCompleted = idx < currentStageIndex;
                        const isCurrent = idx === currentStageIndex;
                        const isUpcoming = idx > currentStageIndex;

                        return (
                          <div key={idx} className="flex flex-col items-center text-center">
                            <div 
                              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold mb-1.5 transition-colors ${
                                isCompleted
                                  ? 'bg-emerald-600 text-white'
                                  : isCurrent
                                  ? 'bg-blue-600 text-white ring-4 ring-blue-100 shadow'
                                  : 'bg-slate-100 text-slate-400 border border-slate-200'
                              }`}
                            >
                              {isCompleted ? '✓' : idx + 1}
                            </div>
                            <span 
                              className={`text-[10px] leading-tight font-medium ${
                                isCurrent 
                                  ? 'font-bold text-blue-700' 
                                  : isCompleted 
                                  ? 'text-slate-700' 
                                  : 'text-slate-400'
                              }`}
                            >
                              {stageName}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Urgent Next Action & Assigned Counselor */}
                  <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50/50">
                    
                    {/* Next Action Item */}
                    <div className="md:col-span-2 p-4 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                            Immediate Action Required:
                          </span>
                          <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-amber-200/70 text-amber-900 border border-amber-300">
                            Due by: {app.nextActionDueDate}
                          </span>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 leading-relaxed">
                          {app.nextAction}
                        </p>
                        <div className="mt-2.5 flex items-center gap-2">
                          <button
                            onClick={onGoToVault}
                            className="text-xs font-bold text-amber-900 underline hover:text-amber-950"
                          >
                            Open Document Vault to Fulfill →
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Assigned Counselor Card */}
                    <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={app.counselor.avatar}
                          alt={app.counselor.name}
                          className="w-10 h-10 rounded-full object-cover border border-slate-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{app.counselor.name}</p>
                          <p className="text-[10px] text-slate-500">{app.counselor.title}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center gap-2 text-xs">
                        <a
                          href={`mailto:${app.counselor.email}`}
                          className="flex-1 py-1.5 px-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Email</span>
                        </a>
                        <a
                          href={`tel:${app.counselor.phone}`}
                          className="py-1.5 px-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Call</span>
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* Expandable Activity & Counselor Notes Feed */}
                  <div className="px-5 sm:px-6 py-3 border-t border-slate-150 flex items-center justify-between text-xs">
                    <button
                      onClick={() => setExpandedNotesAppId(isNotesExpanded ? null : app.id)}
                      className="flex items-center gap-2 font-bold text-blue-700 hover:text-blue-800"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>
                        Admissions Log & Counselor Notes ({app.notes.length})
                      </span>
                      {isNotesExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                    <span className="text-slate-400 text-[11px]">Last synced: {app.lastUpdated}</span>
                  </div>

                  {isNotesExpanded && (
                    <div className="p-5 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-4">
                      
                      {/* Existing Notes Feed */}
                      <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                        {app.notes.map((note) => (
                          <div
                            key={note.id}
                            className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                              note.type === 'milestone'
                                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                                : note.type === 'action'
                                ? 'bg-amber-50 border-amber-200 text-amber-950'
                                : 'bg-white border-slate-200 text-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1 text-[11px] font-bold">
                              <span className="flex items-center gap-1">
                                <span>{note.author}</span>
                                <span className="opacity-70 font-normal">({note.role})</span>
                              </span>
                              <span className="opacity-60">{note.date}</span>
                            </div>
                            <p>{note.message}</p>
                          </div>
                        ))}
                      </div>

                      {/* Add Question to Counselor */}
                      <div className="pt-2 flex gap-2">
                        <input
                          type="text"
                          value={newNoteMessage}
                          onChange={(e) => setNewNoteMessage(e.target.value)}
                          placeholder="Type a question or note for your assigned admissions counselor..."
                          className="flex-1 bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-900 focus:outline-none focus:border-blue-500"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleAddStudentQuestion(app.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => handleAddStudentQuestion(app.id)}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>Send</span>
                        </button>
                      </div>

                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add New Application Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
          <div className="bg-white rounded-2xl w-full max-w-lg border border-slate-200 shadow-2xl overflow-hidden">
            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <PlusCircle className="w-5 h-5 text-blue-400" />
                <h3 className="font-bold text-base font-['Outfit']">Track New University Application</h3>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateApplication} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Destination Country</label>
                <div className="grid grid-cols-4 gap-2">
                  {(['UK', 'USA', 'Canada', 'Europe'] as DestinationCountry[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => {
                        setNewAppCountry(c);
                        setNewAppUniId('');
                      }}
                      className={`py-2 px-1 rounded-xl font-bold text-center border transition-colors ${
                        newAppCountry === c
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Select Institution</label>
                <select
                  value={newAppUniId}
                  onChange={(e) => setNewAppUniId(e.target.value)}
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold focus:outline-none focus:border-blue-500"
                >
                  <option value="">Select from our verified directory or specify below</option>
                  {countryUnis.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} (QS #{u.qsRank})
                    </option>
                  ))}
                  <option value="other">Other / Custom University</option>
                </select>
              </div>

              {(!newAppUniId || newAppUniId === 'other') && (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Custom University Name</label>
                  <input
                    type="text"
                    value={customUniName}
                    onChange={(e) => setCustomUniName(e.target.value)}
                    placeholder="e.g. University of Manchester"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                    required={!newAppUniId}
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 mb-1">Degree Program & Specialization</label>
                <input
                  type="text"
                  value={newAppProgram}
                  onChange={(e) => setNewAppProgram(e.target.value)}
                  placeholder="e.g. MSc Data Science and Artificial Intelligence"
                  className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Degree Level</label>
                  <select
                    value={newAppDegree}
                    onChange={(e) => setNewAppDegree(e.target.value as StudyLevel)}
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 font-semibold"
                  >
                    <option value="Postgraduate">Postgraduate (Masters/MBA)</option>
                    <option value="Undergraduate">Undergraduate (Bachelors)</option>
                    <option value="Doctorate">Doctorate (PhD)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Intake</label>
                  <input
                    type="text"
                    value={newAppIntake}
                    onChange={(e) => setNewAppIntake(e.target.value)}
                    placeholder="e.g. Autumn 2026"
                    className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold shadow-md"
                >
                  Create Application Tracker
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
