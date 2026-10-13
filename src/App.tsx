import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { UniversityListings } from './components/UniversityListings';
import { VisaGuidance } from './components/VisaGuidance';
import { StudentPortal } from './components/StudentPortal';
import { DocumentVault } from './components/DocumentVault';
import { ProfileEvaluatorModal } from './components/ProfileEvaluatorModal';
import { CountryFlag } from './components/CountryFlag';
import { Footer } from './components/Footer';
import { 
  UNIVERSITIES 
} from './data/universitiesData';
import { 
  INITIAL_APPLICATIONS, 
  INITIAL_DOCUMENTS, 
  INITIAL_STUDENT_PROFILE 
} from './data/initialStudentState';
import { 
  ApplicationRecord, 
  DestinationCountry, 
  DocumentRequirement, 
  StudentProfile, 
  StudyLevel,
  University, 
  UploadedFileMeta 
} from './types';
import { CheckCircle2, Info, X, GraduationCap, ShieldCheck, FileText, ArrowRight, Award, MapPin } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'explore' | 'universities' | 'visa' | 'portal' | 'vault'>('explore');
  const [selectedCountryVisa, setSelectedCountryVisa] = useState<DestinationCountry>('UK');
  
  // Search parameters passed from Hero into University Listings
  const [uniSearchCountry, setUniSearchCountry] = useState<DestinationCountry | 'All'>('All');
  const [uniSearchQuery, setUniSearchQuery] = useState<string>('');

  // Evaluator modal
  const [isEvaluatorOpen, setIsEvaluatorOpen] = useState<boolean>(false);

  // Student Profile Gate:
  // The student-profile-pill and portal are hidden until a student shares details or documents
  const [isStudentLoggedIn, setIsStudentLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('systacmind_student_logged_in') === 'true';
    } catch {
      return false;
    }
  });

  // Notifications
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type: 'success' | 'info' } | null>(null);

  // Student Profile, Applications, and Documents with LocalStorage caching
  const [studentProfile, setStudentProfile] = useState<StudentProfile>(() => {
    try {
      const saved = localStorage.getItem('systacmind_student_profile') || localStorage.getItem('beacon_student_profile');
      return saved ? JSON.parse(saved) : INITIAL_STUDENT_PROFILE;
    } catch {
      return INITIAL_STUDENT_PROFILE;
    }
  });

  const [applications, setApplications] = useState<ApplicationRecord[]>(() => {
    try {
      const saved = localStorage.getItem('systacmind_applications') || localStorage.getItem('beacon_applications');
      return saved ? JSON.parse(saved) : INITIAL_APPLICATIONS;
    } catch {
      return INITIAL_APPLICATIONS;
    }
  });

  const [documents, setDocuments] = useState<DocumentRequirement[]>(() => {
    try {
      const saved = localStorage.getItem('systacmind_documents') || localStorage.getItem('beacon_documents');
      return saved ? JSON.parse(saved) : INITIAL_DOCUMENTS;
    } catch {
      return INITIAL_DOCUMENTS;
    }
  });

  // Sync changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('systacmind_student_logged_in', String(isStudentLoggedIn));
    } catch (e) {
      // Ignore storage error
    }
  }, [isStudentLoggedIn]);

  useEffect(() => {
    try {
      localStorage.setItem('systacmind_student_profile', JSON.stringify(studentProfile));
    } catch (e) {
      // Ignore storage error
    }
  }, [studentProfile]);

  useEffect(() => {
    try {
      localStorage.setItem('systacmind_applications', JSON.stringify(applications));
    } catch (e) {
      // Ignore storage error
    }
  }, [applications]);

  useEffect(() => {
    try {
      localStorage.setItem('systacmind_documents', JSON.stringify(documents));
    } catch (e) {
      // Ignore storage error
    }
  }, [documents]);

  const showToast = (title: string, desc: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Hero Search handler
  const handleHeroSearch = (country: DestinationCountry | 'All', query: string) => {
    setUniSearchCountry(country);
    setUniSearchQuery(query);
    setActiveTab('universities');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Country Visa Selection
  const handleSelectCountryVisa = (country: DestinationCountry) => {
    setSelectedCountryVisa(country);
    setActiveTab('visa');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Apply to a university
  const handleApplyUniversity = (uni: University) => {
    const alreadyExists = applications.some((app) => app.universityId === uni.id);
    if (alreadyExists) {
      showToast(
        'Already Shortlisted',
        `${uni.name} is already active in your Student Portal tracker.`,
        'info'
      );
      setActiveTab('portal');
      return;
    }

    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      universityId: uni.id,
      universityName: uni.name,
      country: uni.country,
      specificCountry: uni.specificCountry,
      program: uni.topPrograms[0] || 'MSc Graduate Program',
      degreeLevel: uni.degrees.includes('Postgraduate') ? 'Postgraduate' : uni.degrees[0],
      intake: uni.intakes[0] || 'Autumn 2026',
      currentStage: 'University Shortlisting',
      stageProgress: 25,
      appliedDate: new Date().toISOString().split('T')[0],
      lastUpdated: 'Just now',
      offerType: 'Pending',
      trackingNumber: `SMC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      nextAction: 'Upload verified academic transcripts & passport in Secure Vault',
      nextActionDueDate: 'Within 7 Days',
      counselor: {
        name: 'Dr. Eleanor Vance',
        title: 'Senior Admissions Director',
        email: 'e.vance@systacmind.edu',
        phone: '+44 20 7946 0821',
        avatar: 'EV'
      },
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'Dr. Eleanor Vance',
          role: 'Senior Admissions Director',
          date: 'Just now',
          message: `Application dossier initialized for ${uni.name} (${uni.specificCountry}). Please ensure mandatory documents are uploaded in your Secure Vault.`,
          type: 'milestone'
        }
      ]
    };

    setApplications((prev) => [newApp, ...prev]);
    setIsStudentLoggedIn(true);
    showToast(
      'Application Added to Portal',
      `${uni.name} has been added to your active applications tracker.`,
      'success'
    );
  };

  // Add custom application from Student Portal modal
  const handleAddNewApplication = (appPartial: Partial<ApplicationRecord>) => {
    const newApp: ApplicationRecord = {
      id: `app-${Date.now()}`,
      universityId: appPartial.universityId || `custom-${Date.now()}`,
      universityName: appPartial.universityName || 'Partner University',
      country: appPartial.country || 'UK',
      specificCountry: appPartial.specificCountry || 'United Kingdom',
      program: appPartial.program || 'MSc Computer Science',
      degreeLevel: appPartial.degreeLevel || 'Postgraduate',
      intake: appPartial.intake || 'Autumn 2026',
      currentStage: 'Profile Evaluation',
      stageProgress: 15,
      appliedDate: new Date().toISOString().split('T')[0],
      lastUpdated: 'Just now',
      offerType: 'Pending',
      trackingNumber: `SMC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      nextAction: 'Complete initial counselor verification & document check',
      nextActionDueDate: 'Within 5 Days',
      counselor: {
        name: 'Dr. Eleanor Vance',
        title: 'Senior Admissions Director',
        email: 'e.vance@systacmind.edu',
        phone: '+44 20 7946 0821',
        avatar: 'EV'
      },
      notes: [
        {
          id: `note-${Date.now()}`,
          author: 'Admissions Desk',
          role: 'Case Coordinator',
          date: 'Just now',
          message: `New application record created for ${appPartial.universityName} (${appPartial.program}).`,
          type: 'info'
        }
      ]
    };

    setApplications((prev) => [newApp, ...prev]);
    setIsStudentLoggedIn(true);
    showToast(
      'New Application Registered',
      `Tracking initiated for ${newApp.universityName}.`,
      'success'
    );
  };

  // Upload Document into Vault
  const handleUploadDocument = (docId: string, fileMeta: UploadedFileMeta) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              uploadedFile: fileMeta,
              status: 'verified',
              counselorFeedback: 'Cryptographic SHA-256 checksum verified. Document approved for embassy & university submission.'
            }
          : doc
      )
    );
    setIsStudentLoggedIn(true);
    showToast(
      'Document Encrypted & Verified',
      `${fileMeta.fileName} is now stored with AES-256 protection.`,
      'success'
    );
  };

  // Delete Document from Vault
  const handleDeleteDocumentFile = (docId: string) => {
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === docId
          ? {
              ...doc,
              uploadedFile: undefined,
              status: 'not_uploaded',
              counselorFeedback: undefined
            }
          : doc
      )
    );
    showToast(
      'Document Removed',
      'File has been purged from your local encrypted vault.',
      'info'
    );
  };

  // Share details from Profile Evaluator
  const handleShareProfileDetails = (details: {
    fullName: string;
    targetCountry: DestinationCountry;
    degree: StudyLevel;
    gpa: number;
    budgetUSD: number;
    intake: string;
  }) => {
    setStudentProfile((prev) => ({
      ...prev,
      fullName: details.fullName || prev.fullName,
      currentGpa: details.gpa,
      preferredCountries: [details.targetCountry],
      preferredDegree: details.degree,
      budgetPerYearUSD: details.budgetUSD,
      targetIntake: details.intake
    }));
    setIsStudentLoggedIn(true);
    showToast(
      'Student Profile Activated',
      `Welcome, ${details.fullName}! Your Student Portal is now unlocked.`,
      'success'
    );
  };

  const handleLogout = () => {
    setIsStudentLoggedIn(false);
    if (activeTab === 'portal') {
      setActiveTab('explore');
    }
    showToast(
      'Session Closed',
      'You have exited your active student portal session.',
      'info'
    );
  };

  const verifiedDocsCount = documents.filter((d) => d.status === 'verified').length;
  const appliedUniversityIds = applications.map((a) => a.universityId);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        studentProfile={studentProfile}
        applicationsCount={applications.length}
        documentsVerifiedCount={verifiedDocsCount}
        totalDocumentsCount={documents.length}
        onOpenEvaluator={() => setIsEvaluatorOpen(true)}
        isStudentLoggedIn={isStudentLoggedIn}
        onLogout={handleLogout}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-slate-900 text-white px-4 py-3.5 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 animate-in fade-in slide-in-from-bottom-4">
          {toastMessage.type === 'success' ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          )}
          <div className="flex-1 text-xs">
            <p className="font-bold text-white text-sm">{toastMessage.title}</p>
            <p className="text-slate-300 mt-0.5 leading-relaxed">{toastMessage.desc}</p>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        {activeTab === 'explore' && (
          <div>
            <HeroSection
              onSearch={handleHeroSearch}
              onSelectCountryVisa={handleSelectCountryVisa}
              onOpenEvaluator={() => setIsEvaluatorOpen(true)}
              onGoToPortal={() => {
                setActiveTab('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* Featured Universities Spotlight on Overview */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    Verified Global Directory
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                    Featured Partner & Tier-1 Universities
                  </h2>
                </div>
                <button
                  onClick={() => {
                    setUniSearchCountry('All');
                    setUniSearchQuery('');
                    setActiveTab('universities');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 cursor-pointer"
                >
                  <span>Browse All {UNIVERSITIES.length} Universities</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {UNIVERSITIES.slice(0, 6).map((uni) => {
                  const isApplied = appliedUniversityIds.includes(uni.id);
                  return (
                    <div
                      key={uni.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
                    >
                      <div>
                        <div className="relative h-44 overflow-hidden bg-slate-900">
                          <img
                            src={uni.image}
                            alt={uni.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-900/85 backdrop-blur-xs text-white text-xs font-bold">
                            <CountryFlag country={uni.country} size="sm" />
                            <span>{uni.specificCountry}</span>
                          </div>
                          <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-extrabold shadow-sm">
                            QS #{uni.qsRank}
                          </div>
                          <div className="absolute bottom-3 left-3 right-3 text-white">
                            <h3 className="font-bold text-lg leading-snug font-['Outfit'] line-clamp-1">
                              {uni.name}
                            </h3>
                            <p className="text-xs text-slate-300 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                              <span>{uni.location}</span>
                            </p>
                          </div>
                        </div>

                        <div className="p-5">
                          <div className="grid grid-cols-2 gap-3 pb-4 mb-4 border-b border-slate-100 text-xs">
                            <div>
                              <span className="text-slate-400 block">Annual Tuition</span>
                              <span className="font-bold text-slate-800">{uni.tuitionLocalFormatted}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">Post-Study Work</span>
                              <span className="font-bold text-emerald-600">{uni.postStudyWork}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1.5 mb-2">
                            {uni.topPrograms.slice(0, 3).map((prog) => (
                              <span
                                key={prog}
                                className="px-2 py-0.5 text-[11px] font-medium bg-slate-100 text-slate-700 rounded-md"
                              >
                                {prog}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                        <button
                          onClick={() => handleApplyUniversity(uni)}
                          className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                            isApplied
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-blue-600 hover:bg-blue-500 text-white shadow-sm'
                          }`}
                        >
                          {isApplied ? '✓ In Student Portal' : 'Shortlist & Track'}
                        </button>
                        <button
                          onClick={() => {
                            setUniSearchCountry(uni.country);
                            setUniSearchQuery(uni.name);
                            setActiveTab('universities');
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                          className="py-2.5 px-3 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Quick Workflow Strip */}
            <section className="bg-white border-y border-slate-200 py-14">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-10">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
                    End-to-End Digital Ecosystem
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
                    How Systac Mind Simplifies Your Journey
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div
                    onClick={() => setActiveTab('universities')}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-4 shadow-md shadow-blue-600/20">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] group-hover:text-blue-600 transition-colors">
                      1. Compare & Shortlist
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Filter verified universities across the UK, USA, Canada, and Europe by GPA, IELTS/TOEFL requirements, tuition fees, and post-study work rights.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('vault')}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center mb-4 shadow-md shadow-emerald-600/20">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] group-hover:text-emerald-600 transition-colors">
                      2. Encrypt & Verify Documents
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Upload transcripts, passports, and financial proofs into your AES-256 Document Vault with automatic SHA-256 integrity verification.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('visa')}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 transition-all cursor-pointer group"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center mb-4 shadow-md shadow-amber-500/20">
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-['Outfit'] group-hover:text-amber-600 transition-colors">
                      3. Master Visa Compliance
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      Calculate exact liquid maintenance funds (UK 28-Day Rule, US I-20, Canadian GIC, German Sperrkonto) and prepare with real embassy interview Q&As.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {activeTab === 'universities' && (
          <UniversityListings
            universities={UNIVERSITIES}
            appliedUniversityIds={appliedUniversityIds}
            onApplyUniversity={handleApplyUniversity}
            onSelectCountryVisa={handleSelectCountryVisa}
            initialFilterCountry={uniSearchCountry}
            initialSearchQuery={uniSearchQuery}
          />
        )}

        {activeTab === 'visa' && (
          <VisaGuidance
            selectedCountry={selectedCountryVisa}
            onSelectCountry={setSelectedCountryVisa}
            onGoToVault={() => {
              setActiveTab('vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'portal' && (
          <StudentPortal
            studentProfile={studentProfile}
            applications={applications}
            universities={UNIVERSITIES}
            onAddNewApplication={handleAddNewApplication}
            onGoToVault={() => {
              setActiveTab('vault');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onGoToUniversities={() => {
              setActiveTab('universities');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            isStudentLoggedIn={isStudentLoggedIn}
            onOpenEvaluator={() => setIsEvaluatorOpen(true)}
          />
        )}

        {activeTab === 'vault' && (
          <DocumentVault
            documents={documents}
            onUploadDocument={handleUploadDocument}
            onDeleteDocumentFile={handleDeleteDocumentFile}
            onGoToVisaGuidance={() => {
              setActiveTab('visa');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Profile Evaluator Modal */}
      <ProfileEvaluatorModal
        isOpen={isEvaluatorOpen}
        onClose={() => setIsEvaluatorOpen(false)}
        universities={UNIVERSITIES}
        onSelectUniversity={(uni) => {
          handleApplyUniversity(uni);
          setIsEvaluatorOpen(false);
          setActiveTab('portal');
        }}
        onShareDetails={handleShareProfileDetails}
      />

      {/* Footer */}
      <Footer
        onSelectTab={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectCountryVisa={handleSelectCountryVisa}
      />
    </div>
  );
}
