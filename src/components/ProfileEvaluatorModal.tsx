import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Calendar, 
  Clock, 
  Award, 
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Building2,
  DollarSign
} from 'lucide-react';
import { DestinationCountry, StudyLevel, University } from '../types';
import { CountryFlag } from './CountryFlag';

interface ProfileEvaluatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  universities: University[];
  onSelectUniversity: (uni: University) => void;
  onShareDetails?: (details: { 
    fullName: string; 
    targetCountry: DestinationCountry; 
    degree: StudyLevel; 
    gpa: number; 
    budgetUSD: number; 
    intake: string 
  }) => void;
}

export const ProfileEvaluatorModal: React.FC<ProfileEvaluatorModalProps> = ({
  isOpen,
  onClose,
  universities,
  onSelectUniversity,
  onShareDetails,
}) => {
  const [step, setStep] = useState<'form' | 'result' | 'booked'>('form');

  // Form states
  const [country, setCountry] = useState<DestinationCountry>('UK');
  const [degree, setDegree] = useState<StudyLevel>('Postgraduate');
  const [gpa, setGpa] = useState<number>(3.6);
  const [englishScore, setEnglishScore] = useState<string>('7.0');
  const [budgetUSD, setBudgetUSD] = useState<number>(35000);
  const [intake, setIntake] = useState<string>('Autumn 2026');

  // Booking details
  const [bookingDate, setBookingDate] = useState<string>('2026-09-20');
  const [bookingTime, setBookingTime] = useState<string>('15:00');
  const [studentName, setStudentName] = useState<string>('Arjun Mehta');
  const [studentPhone, setStudentPhone] = useState<string>('+1 (416) 555-0192');

  if (!isOpen) return null;

  // Compute profile strength score
  const gpaPoints = Math.min(40, (gpa / 4.0) * 40);
  const englishPoints = Math.min(30, (parseFloat(englishScore) / 9.0) * 30);
  const budgetPoints = budgetUSD >= 30000 ? 25 : budgetUSD >= 15000 ? 20 : 15;
  const totalScore = Math.round(gpaPoints + englishPoints + budgetPoints);

  // Recommended Universities based on country and GPA
  const countryUnis = universities.filter((u) => u.country === country);
  const reachUnis = countryUnis.filter((u) => u.minGpa >= gpa).slice(0, 2);
  const targetUnis = countryUnis.filter((u) => u.minGpa < gpa && u.minGpa >= gpa - 0.3).slice(0, 2);
  const safeUnis = countryUnis.filter((u) => u.minGpa < gpa - 0.3).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5 animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-2xl text-white shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {step !== 'form' && (
              <button
                id="btn-evaluator-header-back"
                onClick={() => setStep(step === 'booked' ? 'result' : 'form')}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors flex items-center gap-1.5 text-xs font-semibold mr-1"
                aria-label="Go back"
                title={step === 'booked' ? 'Back to Evaluation Results' : 'Back to Profile Form'}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </button>
            )}
            <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/30 shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base font-['Outfit']">
                Systac Mind • University & Visa Eligibility Evaluator
              </h3>
              <p className="text-xs text-slate-400">Instant AI-assisted profile benchmarking for 2026</p>
            </div>
          </div>
          <button
            id="btn-evaluator-modal-close"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 text-xs">
          
          {step === 'form' && (
            <div className="space-y-4">
              <p className="text-slate-300 text-xs leading-relaxed">
                Provide your academic credentials and budget preferences to receive an immediate admissions probability assessment and university recommendations.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Target Destination</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value as DestinationCountry)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="UK">UK • United Kingdom</option>
                    <option value="USA">USA • United States</option>
                    <option value="Canada">Canada</option>
                    <option value="Europe">Europe (Germany / France / Ireland)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">Intended Degree Level</label>
                  <select
                    value={degree}
                    onChange={(e) => setDegree(e.target.value as StudyLevel)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Postgraduate">Postgraduate (Masters/MBA)</option>
                    <option value="Undergraduate">Undergraduate (Bachelors)</option>
                    <option value="Doctorate">Doctorate (PhD)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    Undergraduate / High School GPA (out of 4.0)
                  </label>
                  <input
                    type="number"
                    step="0.05"
                    min="2.0"
                    max="4.0"
                    value={gpa}
                    onChange={(e) => setGpa(parseFloat(e.target.value) || 3.0)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">e.g. 3.82 (Equivalent to 82%+)</span>
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1.5">
                    IELTS / English Score (Overall Band)
                  </label>
                  <select
                    value={englishScore}
                    onChange={(e) => setEnglishScore(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-semibold focus:outline-none focus:border-blue-500"
                  >
                    <option value="8.5">Band 8.5 (Expert)</option>
                    <option value="8.0">Band 8.0 (Very Good)</option>
                    <option value="7.5">Band 7.5 (Solid)</option>
                    <option value="7.0">Band 7.0 (Good)</option>
                    <option value="6.5">Band 6.5 (Standard)</option>
                    <option value="6.0">Band 6.0 (Threshold)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1.5">
                  Annual Tuition Budget (USD): ${budgetUSD.toLocaleString()} / year
                </label>
                <input
                  type="range"
                  min="5000"
                  max="70000"
                  step="2500"
                  value={budgetUSD}
                  onChange={(e) => setBudgetUSD(parseInt(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$5,000 (Subsidized EU)</span>
                  <span>$35,000 (UK/Canada Average)</span>
                  <span>$70,000+ (US Elite)</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="btn-submit-evaluator"
                  onClick={() => {
                    setStep('result');
                    if (onShareDetails) {
                      onShareDetails({
                        fullName: studentName,
                        targetCountry: country,
                        degree,
                        gpa,
                        budgetUSD,
                        intake
                      });
                    }
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-colors cursor-pointer"
                >
                  <span>Generate Evaluation Report</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="space-y-5">
              
              {/* Score Meter Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/60 via-slate-800 to-indigo-900/60 border border-blue-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[11px] uppercase font-bold text-blue-300 tracking-wider">
                    Admissions Profile Rating
                  </span>
                  <h4 className="text-xl font-extrabold text-white font-['Outfit'] mt-0.5">
                    {totalScore >= 85 ? '🌟 High Competitive Tier (Reach / Ivy Eligible)' : totalScore >= 70 ? '✓ Strong Academic Candidate' : 'Moderate Candidate'}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1">
                    Based on GPA {gpa}, IELTS {englishScore}, and budget preferences for {country}.
                  </p>
                </div>
                <div className="w-20 h-20 rounded-full bg-slate-900 border-4 border-blue-500 flex flex-col items-center justify-center shrink-0">
                  <span className="text-xl font-black text-white">{totalScore}</span>
                  <span className="text-[9px] text-slate-400 uppercase font-bold">/ 100</span>
                </div>
              </div>

              {/* Categorized University Matches */}
              <div>
                <h4 className="font-bold text-slate-200 mb-2.5 uppercase tracking-wide text-[11px]">
                  Custom Shortlisted Matches for Your Profile:
                </h4>
                <div className="space-y-2">
                  {countryUnis.slice(0, 3).map((u) => (
                    <div 
                      key={u.id}
                      className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-3">
                        <CountryFlag country={u.specificCountry || u.country} size="xs" />
                        <div>
                          <p className="font-bold text-white text-xs">{u.name}</p>
                          <p className="text-[11px] text-slate-400">
                            QS #{u.qsRank} • Tuition: ${u.tuitionPerYearUSD.toLocaleString()}/yr • Min GPA: {u.minGpa}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          onSelectUniversity(u);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shrink-0"
                      >
                        Inspect
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking CTA Banner */}
              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <h5 className="font-bold text-amber-300">Ready to secure scholarship funding?</h5>
                  <p className="text-xs text-slate-300">Schedule a free 30-minute 1-on-1 strategy call with a country specialist.</p>
                </div>
                <button
                  onClick={() => setStep('booked')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shrink-0 text-xs"
                >
                  Book 1-on-1 Session
                </button>
              </div>

              <div className="flex justify-between items-center pt-2">
                <button
                  id="btn-adjust-credentials"
                  onClick={() => setStep('form')}
                  className="text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors text-xs"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Adjust Profile & Credentials</span>
                </button>
              </div>

            </div>
          )}

          {step === 'booked' && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold font-['Outfit'] text-white">
                Consultation Confirmed!
              </h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                Your 1-on-1 admissions and visa advisory session has been scheduled with <strong>Dr. Eleanor Vance</strong>. A calendar invite and Google Meet link have been dispatched to <strong>arjun.mehta.edu@outlook.com</strong>.
              </p>

              <div className="p-4 rounded-xl bg-slate-800 border border-slate-700 max-w-sm mx-auto text-left text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Date & Time:</span>
                  <span className="font-bold text-white">September 20, 2026 at 3:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Topic:</span>
                  <span className="font-bold text-emerald-400">{country} 2026 Admissions & CAS/I-20 Strategy</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  id="btn-back-to-evaluation"
                  onClick={() => setStep('result')}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Profile Evaluation</span>
                </button>

                <button
                  id="btn-evaluator-return-dashboard"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-colors shadow-lg shadow-blue-600/30"
                >
                  Return to Dashboard
                </button>
              </div>

              <div className="pt-1">
                <button
                  id="btn-retest-profile"
                  onClick={() => setStep('form')}
                  className="text-xs text-slate-400 hover:text-white underline underline-offset-4 decoration-slate-600 hover:decoration-slate-400 transition-colors"
                >
                  Or start a fresh evaluation with new credentials
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
