import React, { useState } from 'react';
import { 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Clock, 
  FileCheck2, 
  Globe2, 
  Building2, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';
import { DestinationCountry } from '../types';
import { CountryFlag } from './CountryFlag';

interface HeroSectionProps {
  onSearch: (country: DestinationCountry | 'All', query: string) => void;
  onSelectCountryVisa: (country: DestinationCountry) => void;
  onOpenEvaluator: () => void;
  onGoToPortal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSearch,
  onSelectCountryVisa,
  onOpenEvaluator,
  onGoToPortal,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<DestinationCountry | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCountry, searchQuery);
  };

  const countries = [
    {
      code: 'UK' as DestinationCountry,
      name: 'United Kingdom',
      flag: '🇬🇧',
      accent: 'border-blue-500/30 hover:border-blue-500 text-blue-400',
      tag: 'Russell Group & Golden Triangle',
      postStudy: '2-Year Graduate Route',
      livingFund: '£9,207 - £12,006 (28-day rule)',
      topUniversities: 'Oxford, Imperial, Edinburgh, Manchester',
      keyPerk: '1-Year Intensive Master Degrees'
    },
    {
      code: 'USA' as DestinationCountry,
      name: 'United States',
      flag: '🇺🇸',
      accent: 'border-rose-500/30 hover:border-rose-500 text-rose-400',
      tag: 'Ivy League & Tier-1 STEM',
      postStudy: '3-Year STEM OPT Extension',
      livingFund: 'Full 1st Year I-20 Cost (Tuition + Living)',
      topUniversities: 'MIT, UC Berkeley, Columbia, UT Austin',
      keyPerk: 'Silicon Valley & Fortune 500 Industry Hubs'
    },
    {
      code: 'Canada' as DestinationCountry,
      name: 'Canada',
      flag: '🇨🇦',
      accent: 'border-emerald-500/30 hover:border-emerald-500 text-emerald-400',
      tag: 'U15 Research Heavyweights',
      postStudy: '3-Year PGWP Work Permit',
      livingFund: 'CAD $20,635 GIC + 1st Year Tuition',
      topUniversities: 'Toronto, UBC, McGill, Waterloo',
      keyPerk: 'PR Pathways & Paid Co-op Work Options'
    },
    {
      code: 'Europe' as DestinationCountry,
      name: 'Europe (EU)',
      flag: '🇪🇺',
      accent: 'border-amber-500/30 hover:border-amber-500 text-amber-400',
      tag: 'Germany, France, Ireland, Netherlands',
      postStudy: '18-Mo Job Seeker / 2-Yr Stamp 1G',
      livingFund: '€11,208 Sperrkonto (Blocked Account)',
      topUniversities: 'TUM Munich, Sorbonne, Trinity Dublin, TU Delft',
      keyPerk: 'Subsidized/Low Tuition & Schengen Mobility'
    }
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0e1d38] via-[#172e59] to-[#0e1d38] border-b border-blue-900/40 text-white">
      {/* Subtle geometric pattern backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      {/* Ambient glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-16 lg:pb-24">
        
        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-['Outfit'] text-white leading-tight mb-4">
            Your Future Abroad, <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
              Tracked, Secured, and Simplified.
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            From university selection to visa approval, experience stress-free admissions backed by authorized expertise and secure digital vaults.
          </p>
        </div>

        {/* Interactive Fast-Search Bar */}
        <div className="max-w-3xl mx-auto mb-12 bg-slate-800/80 p-3 sm:p-4 rounded-2xl border border-slate-700 shadow-2xl backdrop-blur-md">
          <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2.5">
            
            {/* Country Selector */}
            <div className="relative sm:w-48">
              <select
                id="hero-country-select"
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value as DestinationCountry | 'All')}
                aria-label="Filter by destination country"
                className="w-full h-12 bg-slate-900 border border-slate-700 rounded-xl px-3.5 text-sm font-semibold text-white focus:outline-none focus:border-blue-500 appearance-none cursor-pointer"
              >
                <option value="All">All Destinations (Global)</option>
                <option value="UK">UK • United Kingdom</option>
                <option value="USA">USA • United States</option>
                <option value="Canada">Canada</option>
                <option value="Europe">Europe (Schengen / EU)</option>
              </select>
            </div>

            {/* Keyword Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                id="hero-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search university, program (e.g. Computer Science, AI, Business), city..."
                className="w-full h-12 bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Submit Button */}
            <button
              id="hero-submit-search"
              type="submit"
              className="h-12 px-6 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 transition-colors cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Filter Tags */}
          <div className="mt-3 pt-3 border-t border-slate-700/60 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
            <span className="font-medium text-slate-400">Popular Inquiries:</span>
            <div className="flex flex-wrap gap-1.5">
              {['MSc AI (Imperial)', 'Computer Science (Waterloo)', 'TUM Germany €0 Tuition', 'STEM OPT (USA)', 'GIC CAD $20,635'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => {
                    setSearchQuery(tag);
                    onSearch(selectedCountry, tag);
                  }}
                  className="px-2.5 py-1 rounded-md bg-slate-900/80 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700/80 transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4 Country Cards Grid */}
        <div className="mb-14">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-blue-400" />
              <span>Target Country Focus & Policy Briefs (2026 Admissions)</span>
            </h2>
            <span className="text-xs text-slate-400">Select country to view visa breakdown</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {countries.map((c) => (
              <div
                key={c.code}
                id={`country-card-${c.code.toLowerCase()}`}
                onClick={() => onSelectCountryVisa(c.code)}
                className="group relative bg-slate-900/90 rounded-2xl p-5 border border-slate-800 hover:border-slate-700 hover:bg-slate-850/90 transition-all cursor-pointer shadow-md hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <CountryFlag country={c.code} size="lg" className="rounded-md shadow-sm" />
                    <div>
                      <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors font-['Outfit']">
                        {c.name}
                      </h3>
                      <p className="text-[11px] text-slate-400">{c.tag}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors">
                    {c.code}
                  </span>
                </div>

                <div className="space-y-2 text-xs border-t border-slate-800/80 pt-3">
                  <div className="flex items-start justify-between gap-1 text-slate-300">
                    <span className="text-slate-400">Work Permit:</span>
                    <span className="font-semibold text-right text-emerald-400">{c.postStudy}</span>
                  </div>
                  <div className="flex items-start justify-between gap-1 text-slate-300">
                    <span className="text-slate-400">Living Funds:</span>
                    <span className="font-semibold text-right text-amber-300">{c.livingFund}</span>
                  </div>
                  <div className="flex items-start justify-between gap-1 text-slate-300">
                    <span className="text-slate-400">Highlight:</span>
                    <span className="font-medium text-right text-slate-200">{c.keyPerk}</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <span>Visa & Docs Guide</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credibility & Trust Proof Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black font-['Outfit'] text-white">98.6%</p>
              <p className="text-xs text-slate-400">Visa Success Record</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 shrink-0">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black font-['Outfit'] text-white">450+</p>
              <p className="text-xs text-slate-400">Partner Institutions</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black font-['Outfit'] text-white">$14.5M+</p>
              <p className="text-xs text-slate-400">Scholarships Secured</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center text-indigo-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xl font-black font-['Outfit'] text-white">AES-256</p>
              <p className="text-xs text-slate-400">Encrypted Document Vault</p>
            </div>
          </div>
        </div>

        {/* Fast Action CTA Banner */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-blue-900/40 via-indigo-900/40 to-slate-900 border border-blue-500/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Need an urgent profile evaluation for 2026 intakes?</h4>
              <p className="text-xs text-slate-300">Get matched with target, reach, and safe universities across UK, US, Canada, and Europe.</p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              id="cta-profile-evaluation"
              onClick={onOpenEvaluator}
              className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
            >
              Evaluate Profile Free
            </button>
            <button
              id="cta-open-portal"
              onClick={onGoToPortal}
              className="px-4 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
            >
              Open Student Portal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
