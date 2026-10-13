import React, { useState } from 'react';
import { 
  GraduationCap, 
  Compass, 
  FileText, 
  ShieldCheck, 
  UserCheck, 
  Menu, 
  X, 
  PhoneCall,
  Sparkles,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { StudentProfile } from '../types';
import { SystacMindLogo } from './SystacMindLogo';

interface NavbarProps {
  activeTab: 'explore' | 'universities' | 'visa' | 'portal' | 'vault';
  setActiveTab: (tab: 'explore' | 'universities' | 'visa' | 'portal' | 'vault') => void;
  studentProfile: StudentProfile;
  applicationsCount: number;
  documentsVerifiedCount: number;
  totalDocumentsCount: number;
  onOpenEvaluator: () => void;
  isStudentLoggedIn: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  studentProfile,
  applicationsCount,
  documentsVerifiedCount,
  totalDocumentsCount,
  onOpenEvaluator,
  isStudentLoggedIn,
  onLogout,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const initials = studentProfile.fullName
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'ST';

  const navItems = [
    { id: 'explore' as const, label: 'Overview', icon: Compass },
    { 
      id: 'universities' as const, 
      label: 'University Listings', 
      icon: GraduationCap,
      badge: 'UK, US, CA, EU'
    },
    { 
      id: 'visa' as const, 
      label: 'Visa Guidance', 
      icon: FileText
    },
    { 
      id: 'portal' as const, 
      label: 'Student Portal', 
      icon: UserCheck,
      badge: `${applicationsCount} Active`
    },
    { 
      id: 'vault' as const, 
      label: 'Secure Vault', 
      icon: ShieldCheck,
      badge: `${documentsVerifiedCount}/${totalDocumentsCount}`
    }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#101e38]/95 backdrop-blur-md border-b border-[#1e3a6a] text-white transition-all shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Identity */}
          <div 
            id="brand-logo"
            onClick={() => setActiveTab('explore')}
            className="flex items-center cursor-pointer group"
          >
            <SystacMindLogo variant="onDark" size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-800/60 p-1.5 rounded-xl border border-slate-700/60">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span 
                      className={`text-[11px] font-bold px-1.5 py-0.5 rounded-full ${
                        isActive 
                          ? 'bg-blue-800 text-blue-100' 
                          : 'bg-slate-700 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Status & Action CTA */}
          <div className="hidden md:flex items-center gap-2.5">
            <button
              id="btn-evaluate-profile"
              onClick={onOpenEvaluator}
              className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30 hover:bg-amber-500/25 transition-colors cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Free Profile Check</span>
            </button>

            {/* Active Student Pill: ONLY rendered when student has submitted details or documents */}
            {isStudentLoggedIn && (
              <div className="flex items-center gap-1.5">
                <div 
                  id="student-profile-pill"
                  onClick={() => setActiveTab('portal')}
                  className="flex items-center gap-2.5 pl-3 pr-3.5 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-600 cursor-pointer transition-colors group"
                  title="Open Student Portal"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-teal-500 text-white flex items-center justify-center text-xs font-bold ring-2 ring-blue-500/30">
                    {initials}
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center gap-1">
                      <span>{studentProfile.fullName}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    </div>
                    <div className="text-[10px] text-slate-400">Target Fall 2026</div>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <button
                  id="btn-navbar-logout"
                  onClick={onLogout}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/80 transition-colors cursor-pointer"
                  title="Exit Student Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu trigger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="btn-mobile-menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm font-semibold ${
                  isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-5 h-5 text-blue-400" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 mt-3 border-t border-slate-800 space-y-2">
            <button
              id="mobile-btn-evaluate"
              onClick={() => {
                onOpenEvaluator();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold"
            >
              <Sparkles className="w-4 h-4" />
              <span>Evaluate My Profile (Free)</span>
            </button>

            {isStudentLoggedIn && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800/80">
                <div 
                  onClick={() => {
                    setActiveTab('portal');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold">
                    {initials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{studentProfile.fullName}</p>
                    <p className="text-xs text-slate-400">Portal: {applicationsCount} Active Applications</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 text-xs"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
