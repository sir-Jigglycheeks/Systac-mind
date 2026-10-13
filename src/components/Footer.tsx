import React from 'react';
import { 
  GraduationCap, 
  ShieldCheck, 
  MapPin, 
  Mail, 
  Phone, 
  Globe2, 
  Award, 
  CheckCircle2 
} from 'lucide-react';
import { DestinationCountry } from '../types';
import { SystacMindLogo } from './SystacMindLogo';
import { CountryFlag } from './CountryFlag';

interface FooterProps {
  onSelectTab: (tab: 'explore' | 'universities' | 'visa' | 'portal' | 'vault') => void;
  onSelectCountryVisa: (country: DestinationCountry) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectTab,
  onSelectCountryVisa,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Top Advisory Network Strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-300 font-medium">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Official Licensed Advisory & Certified ICEF Education Agency #4812</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>British Council Trained</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>AIRC Certified (USA)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Canada Course Graduate (CCG)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" />
              <span>DAAD Germany Specialist</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand & Mission */}
        <div className="lg:col-span-2 space-y-4">
          <SystacMindLogo variant="onDark" size="lg" />

          <p className="text-slate-400 leading-relaxed max-w-sm">
            Guiding ambitious scholars through tier-1 university admissions, competitive scholarship securing, and stringent visa compliance across the United Kingdom, United States, Canada, and Europe.
          </p>

          <div className="pt-2 flex items-center gap-3 text-slate-300">
            <div className="flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-blue-400" />
              <a 
                href="mailto:admissions@infosystacmindcom.com" 
                className="hover:text-blue-400 transition-colors"
              >
                <span>admissions@infosystacmindcom.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Destination Countries */}
        <div>
          <h4 className="font-bold text-white text-sm font-['Outfit'] mb-3">
            Destinations & Visas
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button 
                onClick={() => onSelectCountryVisa('UK')}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <CountryFlag country="UK" size="xs" />
                <span>UK Student Route</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCountryVisa('USA')}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <CountryFlag country="USA" size="xs" />
                <span>USA F-1 & STEM OPT Visa</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCountryVisa('Canada')}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <CountryFlag country="CA" size="xs" />
                <span>Canada Study Permit & PAL</span>
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectCountryVisa('Europe')}
                className="hover:text-white transition-colors flex items-center gap-2"
              >
                <CountryFlag country="EU" size="xs" />
                <span>Europe & Germany Blocked Account</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Student Portal & Tools */}
        <div>
          <h4 className="font-bold text-white text-sm font-['Outfit'] mb-3">
            Platform & Services
          </h4>
          <ul className="space-y-2 text-slate-400">
            <li>
              <button 
                onClick={() => onSelectTab('universities')}
                className="hover:text-white transition-colors"
              >
                Find & Compare Universities
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectTab('portal')}
                className="hover:text-white transition-colors"
              >
                Live Application Tracker
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectTab('vault')}
                className="hover:text-white transition-colors"
              >
                Secure AES-256 Document Vault
              </button>
            </li>
            <li>
              <button 
                onClick={() => onSelectTab('visa')}
                className="hover:text-white transition-colors"
              >
                Financial Proofs Calculator
              </button>
            </li>
          </ul>
        </div>

        {/* Global Advisory Hubs */}
        <div>
          <h4 className="font-bold text-white text-sm font-['Outfit'] mb-3">
            Global Advisory Hubs
          </h4>
          <div className="space-y-2.5 text-slate-400">
            <div>
              <p className="font-bold text-slate-200">London Office</p>
              <p className="text-[11px] text-slate-500">14 Bedford Square, Bloomsbury, London WC1B 3JA</p>
            </div>
            <div>
              <p className="font-bold text-slate-200">Toronto Office</p>
              <p className="text-[11px] text-slate-500">181 Bay Street, Suite 2400, Toronto, ON M5J 2T3</p>
            </div>
            <div>
              <p className="font-bold text-slate-200">New York Office</p>
              <p className="text-[11px] text-slate-500">450 Lexington Ave, New York, NY 10017</p>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Disclaimer */}
      <div className="border-t border-slate-900 bg-slate-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© 2026 Systac Mind Consultants. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            Disclaimer: Systac Mind Consultants is an independent educational consultancy and representative for partner universities. Visa issuance remains at the sole statutory discretion of relevant national immigration authorities (UKVI, US Dept of State, IRCC, and Schengen Consulates).
          </p>
        </div>
      </div>
    </footer>
  );
};
