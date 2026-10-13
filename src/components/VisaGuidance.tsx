import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Calculator, 
  Clock, 
  DollarSign, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Briefcase, 
  ShieldCheck, 
  FileCheck, 
  Calendar,
  Building,
  Sparkles,
  Info
} from 'lucide-react';
import { DestinationCountry, VisaCountryGuide } from '../types';
import { VISA_GUIDANCE } from '../data/visaGuidanceData';
import { CountryFlag } from './CountryFlag';

interface VisaGuidanceProps {
  selectedCountry: DestinationCountry;
  onSelectCountry: (country: DestinationCountry) => void;
  onGoToVault: () => void;
}

export const VisaGuidance: React.FC<VisaGuidanceProps> = ({
  selectedCountry,
  onSelectCountry,
  onGoToVault,
}) => {
  const currentGuide = VISA_GUIDANCE.find((g) => g.country === selectedCountry) || VISA_GUIDANCE[0];

  // Financial Calculator State
  const [tuitionInput, setTuitionInput] = useState<number>(30000);
  const [ukLondonLocation, setUkLondonLocation] = useState<boolean>(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Calculate required liquid funds based on active country
  const calculateFinancials = () => {
    switch (currentGuide.country) {
      case 'UK': {
        const monthlyCost = ukLondonLocation ? 1334 : 1023;
        const livingTotal = monthlyCost * 9; // capped at 9 months
        const totalGBP = tuitionInput + livingTotal;
        return {
          currency: '£ (GBP)',
          tuition: tuitionInput,
          living: livingTotal,
          total: totalGBP,
          note: `Strict 28-day rule applies. Must maintain £${totalGBP.toLocaleString()} continuously without dipping below for 28 consecutive days before visa lodgement.`
        };
      }
      case 'USA': {
        const livingEstimate = 18500;
        const totalUSD = tuitionInput + livingEstimate;
        return {
          currency: '$ (USD)',
          tuition: tuitionInput,
          living: livingEstimate,
          total: totalUSD,
          note: `Must match or exceed Box 8 of Form I-20 (~$${totalUSD.toLocaleString()} USD) in liquid savings, fixed deposits, or sanctioned loan.`
        };
      }
      case 'Canada': {
        const gicRequired = 20635; // Updated IRCC standard
        const totalCAD = tuitionInput + gicRequired;
        return {
          currency: 'CAD $',
          tuition: tuitionInput,
          living: gicRequired,
          total: totalCAD,
          note: `Mandatory CAD $20,635 Guaranteed Investment Certificate (GIC) + receipt of 1st year tuition fee payment to your DLI.`
        };
      }
      case 'Europe': {
        const blockedAccountEUR = 11208; // German Sperrkonto standard
        const totalEUR = tuitionInput + blockedAccountEUR;
        return {
          currency: '€ (EUR)',
          tuition: tuitionInput,
          living: blockedAccountEUR,
          total: totalEUR,
          note: `Sperrkonto (Blocked Account) of €11,208 required to disburse €934/month living allowance + semester fees.`
        };
      }
    }
  };

  const calculatedFunds = calculateFinancials();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 mb-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>2026 Student Immigration Protocols</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            Country-Specific Student Visa Guidance Hub
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Official visa frameworks, financial calculation benchmarks, embassy interview preparation, and step-by-step roadmaps for the UK, USA, Canada, and Europe.
          </p>
        </div>

        <button
          id="btn-visa-to-vault"
          onClick={onGoToVault}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-colors shadow-md self-start md:self-auto cursor-pointer"
        >
          <FileCheck className="w-4 h-4 text-emerald-400" />
          <span>Upload Documents in Secure Vault</span>
        </button>
      </div>

      {/* Country Switcher Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {VISA_GUIDANCE.map((guide) => {
          const isSelected = selectedCountry === guide.country;
          return (
            <button
              key={guide.country}
              id={`visa-tab-${guide.country.toLowerCase()}`}
              onClick={() => onSelectCountry(guide.country)}
              className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20'
                  : 'bg-white border-slate-200 text-slate-800 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <CountryFlag country={guide.country} size="md" />
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {guide.visaSuccessRate}% Approval
                </span>
              </div>
              <h3 className="font-bold text-sm font-['Outfit']">{guide.countryName}</h3>
              <p
                className={`text-[11px] mt-0.5 truncate ${
                  isSelected ? 'text-blue-100' : 'text-slate-500'
                }`}
              >
                {guide.visaSubclass}
              </p>
            </button>
          );
        })}
      </div>

      {/* Selected Country Overview Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl mb-10 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <CountryFlag country={currentGuide.country} size="sm" />
              <span className="text-xs uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-md bg-blue-500/20 text-blue-400 border border-blue-500/30">
                Official Visa Category: {currentGuide.visaSubclass}
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-['Outfit'] text-white">
              {currentGuide.countryName} Visa Framework
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
              {currentGuide.overview}
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 shrink-0">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Processing Time</span>
              <span className="text-xs font-bold text-white">{currentGuide.processingTimeWeeks}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Embassy Fee</span>
              <span className="text-xs font-bold text-white">${currentGuide.applicationFeeUSD} USD</span>
              <span className="text-[10px] text-slate-400 block truncate">{currentGuide.applicationFeeLocal}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Post-Study Work</span>
              <span className="text-xs font-bold text-emerald-400">{currentGuide.postStudyWorkDuration}</span>
            </div>
            <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-700 text-[11px] text-slate-300 flex items-center gap-1.5">
              <Briefcase className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span>In-Study Work Rights: <strong>{currentGuide.workWhileStudying}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid: Left Roadmap & Documents, Right Financial Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        
        {/* Step-by-Step Application Stepper (2 Columns) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Timeline Process */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Step-by-Step Visa Lodgement Roadmap
                </h3>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                {currentGuide.steps.length} Key Milestones
              </span>
            </div>

            <div className="space-y-6 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200">
              {currentGuide.steps.map((step) => (
                <div key={step.stepNumber} className="relative flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-extrabold shrink-0 ring-4 ring-white shadow z-10">
                    {step.stepNumber}
                  </div>
                  <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-150">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                      <h4 className="font-bold text-slate-900 text-sm">{step.title}</h4>
                      <span className="text-[11px] font-semibold text-blue-700 bg-blue-100 px-2 py-0.5 rounded self-start">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                      {step.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-700 bg-white p-2 rounded-lg border border-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Key Output: {step.keyDeliverable}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Document Checklist */}
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                  Mandatory Visa Application Checklist
                </h3>
              </div>
              <button
                onClick={onGoToVault}
                className="text-xs font-bold text-blue-600 hover:text-blue-700"
              >
                Upload to Vault →
              </button>
            </div>

            <div className="space-y-4">
              {currentGuide.documentChecklist.map((categoryGroup, idx) => (
                <div key={idx} className="border border-slate-100 rounded-xl overflow-hidden">
                  <div className="bg-slate-100/80 px-4 py-2 text-xs font-bold text-slate-700 uppercase tracking-wide">
                    {categoryGroup.category}
                  </div>
                  <div className="divide-y divide-slate-100 p-2">
                    {categoryGroup.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="p-2.5 flex items-start justify-between gap-3 text-xs">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${item.critical ? 'text-blue-600' : 'text-slate-400'}`} />
                          <div>
                            <span className="font-bold text-slate-900">{item.name}</span>
                            <p className="text-[11px] text-slate-500 mt-0.5">{item.detail}</p>
                          </div>
                        </div>
                        {item.critical && (
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 shrink-0">
                            Critical
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Sidebar: Interactive Financial Calculator & Special Notes */}
        <div className="space-y-6">
          
          {/* Financial Requirement Calculator Card */}
          <div className="bg-gradient-to-b from-blue-900 to-slate-900 text-white rounded-2xl p-6 border border-blue-800 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Calculator className="w-5 h-5 text-amber-400" />
              <h3 className="font-bold text-base font-['Outfit']">
                Visa Proof-of-Funds Calculator
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Calculate exact liquid funding required by {currentGuide.countryName} immigration authorities.
            </p>

            {/* Interactive Inputs */}
            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Estimated 1st Year Tuition ({calculatedFunds.currency})
                </label>
                <input
                  type="number"
                  value={tuitionInput}
                  onChange={(e) => setTuitionInput(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white font-bold text-sm focus:outline-none focus:border-blue-400"
                />
              </div>

              {/* Country-specific conditional options */}
              {currentGuide.country === 'UK' && (
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">
                    Study Location in the UK
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUkLondonLocation(true)}
                      className={`py-2 px-3 rounded-lg font-bold text-center border transition-colors ${
                        ukLondonLocation
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Inside London (£1,334/mo)
                    </button>
                    <button
                      type="button"
                      onClick={() => setUkLondonLocation(false)}
                      className={`py-2 px-3 rounded-lg font-bold text-center border transition-colors ${
                        !ukLondonLocation
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-800 border-slate-700 text-slate-400'
                      }`}
                    >
                      Outside London (£1,023/mo)
                    </button>
                  </div>
                </div>
              )}

              {/* Calculated Breakdown Box */}
              <div className="mt-4 p-4 rounded-xl bg-slate-800/90 border border-slate-700 space-y-2">
                <div className="flex justify-between text-slate-300">
                  <span>Tuition Balance:</span>
                  <span className="font-bold text-white">{calculatedFunds.currency} {calculatedFunds.tuition.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Mandatory Living Proof:</span>
                  <span className="font-bold text-amber-300">{calculatedFunds.currency} {calculatedFunds.living.toLocaleString()}</span>
                </div>
                <div className="pt-2 border-t border-slate-700 flex justify-between text-sm font-extrabold text-white">
                  <span>Total Liquid Funds Required:</span>
                  <span className="text-emerald-400">{calculatedFunds.currency} {calculatedFunds.total.toLocaleString()}</span>
                </div>
              </div>

              {/* Advisory note */}
              <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-700/60 text-[11px] text-blue-200 flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <p>{calculatedFunds.note}</p>
              </div>
            </div>
          </div>

          {/* Special Protocol Highlight Card */}
          {currentGuide.financialBenchmark.specialRequirementName && (
            <div className="bg-amber-50 rounded-2xl p-5 border border-amber-200">
              <div className="flex items-center gap-2 text-amber-800 font-bold text-sm mb-1.5 font-['Outfit']">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                <span>{currentGuide.financialBenchmark.specialRequirementName}</span>
              </div>
              <p className="text-xs text-amber-900/90 leading-relaxed">
                {currentGuide.financialBenchmark.specialRequirementDesc}
              </p>
            </div>
          )}

          {/* Accepted Funds Verification Types */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-xs">
            <h4 className="font-bold text-slate-900 mb-2.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Recognized Financial Instruments</span>
            </h4>
            <ul className="space-y-2 text-slate-600">
              {currentGuide.financialBenchmark.acceptedProofTypes.map((type, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0 mt-1.5" />
                  <span>{type}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Consular Interview Simulator / Q&A Accordion */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
        <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-['Outfit']">
                {currentGuide.countryName} Consular Interview Simulator & Defense
              </h3>
              <p className="text-xs text-slate-500">
                Toughest questions frequently posed by visa officers, officer intentions, and counselor-approved response frameworks.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {currentGuide.frequentInterviewQuestions.map((qa, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div 
                key={index} 
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 bg-slate-50 hover:bg-slate-100/80 transition-colors"
                >
                  <span className="font-bold text-sm text-slate-800">
                    Q: {qa.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="p-5 bg-white space-y-3 border-t border-slate-200 text-xs">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block mb-1">
                        Visa Officer Intent / Behind the Question:
                      </span>
                      <p className="text-slate-600 bg-rose-50/60 p-2.5 rounded-lg border border-rose-100">
                        {qa.intent}
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">
                        Recommended Answer Framework:
                      </span>
                      <p className="text-slate-700 bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-100 font-medium">
                        "{qa.recommendedAnswer}"
                      </p>
                    </div>

                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block mb-1">
                        Systac Mind Counselor Pro-Tip & Trap to Avoid:
                      </span>
                      <p className="text-slate-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
                        {qa.counselorTip}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
