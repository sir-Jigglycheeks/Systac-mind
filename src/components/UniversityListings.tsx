import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  GraduationCap, 
  DollarSign, 
  Clock, 
  Award, 
  ArrowUpDown, 
  Plus, 
  Check, 
  ExternalLink,
  ChevronRight,
  Scale,
  X,
  Building,
  Sparkles
} from 'lucide-react';
import { DestinationCountry, StudyLevel, University } from '../types';
import { UniversityDetailModal } from './UniversityDetailModal';
import { CountryFlag } from './CountryFlag';

interface UniversityListingsProps {
  universities: University[];
  appliedUniversityIds: string[];
  onApplyUniversity: (uni: University) => void;
  onSelectCountryVisa: (country: DestinationCountry) => void;
  initialFilterCountry?: DestinationCountry | 'All';
  initialSearchQuery?: string;
}

export const UniversityListings: React.FC<UniversityListingsProps> = ({
  universities,
  appliedUniversityIds,
  onApplyUniversity,
  onSelectCountryVisa,
  initialFilterCountry = 'All',
  initialSearchQuery = '',
}) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedCountry, setSelectedCountry] = useState<DestinationCountry | 'All'>(initialFilterCountry);
  const [selectedLevel, setSelectedLevel] = useState<StudyLevel | 'All'>('All');
  const [budgetFilter, setBudgetFilter] = useState<'All' | 'Low' | 'Medium' | 'High'>('All');
  const [sortBy, setSortBy] = useState<'rank' | 'tuitionAsc' | 'tuitionDesc' | 'acceptance'>('rank');

  // Selected for comparison
  const [comparedUnis, setComparedUnis] = useState<University[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Active modal inspection
  const [inspectingUni, setInspectingUni] = useState<University | null>(null);

  // Filter logic
  const filteredUniversities = useMemo(() => {
    return universities.filter((u) => {
      // Country
      if (selectedCountry !== 'All' && u.country !== selectedCountry) {
        return false;
      }
      // Study level
      if (selectedLevel !== 'All' && !u.degrees.includes(selectedLevel)) {
        return false;
      }
      // Budget
      if (budgetFilter === 'Low' && u.tuitionPerYearUSD > 15000) return false;
      if (budgetFilter === 'Medium' && (u.tuitionPerYearUSD <= 15000 || u.tuitionPerYearUSD > 40000)) return false;
      if (budgetFilter === 'High' && u.tuitionPerYearUSD <= 40000) return false;

      // Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q);
        const matchesLoc = u.location.toLowerCase().includes(q);
        const matchesCountry = u.specificCountry.toLowerCase().includes(q);
        const matchesDomain = u.domain ? u.domain.toLowerCase().includes(q) : false;
        const matchesPrograms = u.topPrograms.some((p) => p.toLowerCase().includes(q));
        const matchesHighlight = u.highlights.some((h) => h.toLowerCase().includes(q));
        if (!matchesName && !matchesLoc && !matchesCountry && !matchesDomain && !matchesPrograms && !matchesHighlight) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rank') return a.qsRank - b.qsRank;
      if (sortBy === 'tuitionAsc') return a.tuitionPerYearUSD - b.tuitionPerYearUSD;
      if (sortBy === 'tuitionDesc') return b.tuitionPerYearUSD - a.tuitionPerYearUSD;
      if (sortBy === 'acceptance') return b.acceptanceRate - a.acceptanceRate;
      return 0;
    });
  }, [universities, selectedCountry, selectedLevel, budgetFilter, searchQuery, sortBy]);

  const toggleCompare = (uni: University) => {
    if (comparedUnis.some((c) => c.id === uni.id)) {
      setComparedUnis(comparedUnis.filter((c) => c.id !== uni.id));
    } else {
      if (comparedUnis.length >= 3) {
        alert('You can compare up to 3 universities at once.');
        return;
      }
      setComparedUnis([...comparedUnis, uni]);
    }
  };

  const countriesList: { label: string; value: DestinationCountry | 'All'; flag: string }[] = [
    { label: 'All Destinations', value: 'All', flag: '🌐' },
    { label: 'United Kingdom', value: 'UK', flag: '🇬🇧' },
    { label: 'United States', value: 'USA', flag: '🇺🇸' },
    { label: 'Canada', value: 'Canada', flag: '🇨🇦' },
    { label: 'Europe (EU)', value: 'Europe', flag: '🇪🇺' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400 mb-1.5">
            <GraduationCap className="w-4 h-4" />
            <span>Accredited Global Institutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-['Outfit']">
            University Listings & Program Directory
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Explore verified tuition rates, admission requirements, language benchmarks, and post-study work authorization across the UK, USA, Canada, and Europe.
          </p>
        </div>

        {/* Quick Country Visa Hub Shortcut */}
        {selectedCountry !== 'All' && (
          <button
            id="btn-shortcut-country-visa"
            onClick={() => onSelectCountryVisa(selectedCountry)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 text-xs font-bold transition-colors self-start md:self-auto"
          >
            <span>View {selectedCountry} Student Visa Guide</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm mb-8 space-y-4">
        
        {/* Country Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {countriesList.map((c) => (
            <button
              key={c.value}
              id={`filter-country-${c.value.toLowerCase()}`}
              onClick={() => setSelectedCountry(c.value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCountry === c.value
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/20'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c.value === 'All' ? (
                <span>🌐</span>
              ) : (
                <CountryFlag country={c.value} size="xs" />
              )}
              <span>{c.label}</span>
              {c.value !== 'All' && (
                <span className="text-[10px] opacity-80 ml-0.5">
                  ({universities.filter((u) => u.country === c.value).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search & Secondary Filter Dropdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          
          {/* Search box */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              id="uni-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search university, program, city..."
              className="w-full h-10 pl-9 pr-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-none focus:border-blue-500"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Degree Level */}
          <div>
            <select
              id="filter-degree-level"
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value as StudyLevel | 'All')}
              aria-label="Filter by degree level"
              className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">All Degrees (Bachelors, Masters, PhD)</option>
              <option value="Postgraduate">Postgraduate (Masters / MBA)</option>
              <option value="Undergraduate">Undergraduate (Bachelors)</option>
              <option value="Doctorate">Doctorate (PhD / Research)</option>
            </select>
          </div>

          {/* Budget Range */}
          <div>
            <select
              id="filter-budget-range"
              value={budgetFilter}
              onChange={(e) => setBudgetFilter(e.target.value as any)}
              aria-label="Filter by tuition budget range"
              className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="All">Annual Tuition: Any Budget</option>
              <option value="Low">Low / Subsidized (&lt; $15k USD/yr)</option>
              <option value="Medium">Moderate ($15k - $40k USD/yr)</option>
              <option value="High">Premium ($40k+ USD/yr)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <select
              id="filter-sort-by"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              aria-label="Sort universities"
              className="w-full h-10 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl text-slate-700 font-semibold focus:bg-white focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              <option value="rank">Sort: QS World Ranking (Best First)</option>
              <option value="tuitionAsc">Sort: Tuition (Low to High)</option>
              <option value="tuitionDesc">Sort: Tuition (High to Low)</option>
              <option value="acceptance">Sort: Acceptance Rate (High to Low)</option>
            </select>
          </div>

        </div>

        {/* Active Filter Metrics */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Showing <strong>{filteredUniversities.length}</strong> accredited universities</span>
          {(searchQuery || selectedCountry !== 'All' || selectedLevel !== 'All' || budgetFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCountry('All');
                setSelectedLevel('All');
                setBudgetFilter('All');
              }}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* University Cards Grid */}
      {filteredUniversities.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-sm max-w-lg mx-auto">
          <GraduationCap className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800 font-['Outfit']">No universities matched your filters</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try adjusting your search criteria or resetting filters to browse all destination countries.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCountry('All');
              setSelectedLevel('All');
              setBudgetFilter('All');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-bold"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUniversities.map((uni) => {
            const isApplied = appliedUniversityIds.includes(uni.id);
            const isCompared = comparedUnis.some((c) => c.id === uni.id);

            return (
              <div
                key={uni.id}
                id={`uni-card-${uni.id}`}
                className="group bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Card Banner Image */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                  <img
                    src={uni.image}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-black/20" />

                  {/* QS Rank Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold border border-white/10 shadow">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>QS #{uni.qsRank}</span>
                  </div>

                  {/* Country Flag & Label */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold border border-white/10 shadow">
                    <CountryFlag country={uni.specificCountry || uni.country} size="xs" />
                    <span>{uni.specificCountry}</span>
                  </div>

                  {/* Compare Toggle Button */}
                  <button
                    id={`btn-compare-${uni.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCompare(uni);
                    }}
                    className={`absolute bottom-3 right-3 p-1.5 rounded-lg text-xs font-medium flex items-center gap-1 backdrop-blur-md transition-colors ${
                      isCompared
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-900/80 text-slate-300 hover:text-white border border-white/10'
                    }`}
                    title="Compare university"
                  >
                    <Scale className="w-3.5 h-3.5" />
                    <span>{isCompared ? 'Comparing' : 'Compare'}</span>
                  </button>

                  {/* Campus type label */}
                  <div className="absolute bottom-3 left-3 text-[11px] font-medium text-slate-200 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400" />
                    <span className="truncate max-w-[200px]">{uni.location}</span>
                  </div>
                </div>

                {/* Card Main Body */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h3 
                        onClick={() => setInspectingUni(uni)}
                        className="text-lg font-bold text-slate-900 font-['Outfit'] group-hover:text-blue-600 transition-colors cursor-pointer line-clamp-1 flex-1"
                      >
                        {uni.name}
                      </h3>
                      {uni.isOfficialScorecardVerified && (
                        <span className="shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300" title="Verified via US Dept of Education College Scorecard">
                          Scorecard ✓
                        </span>
                      )}
                    </div>

                    {/* Domain & Post-study work permit pill */}
                    <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                      {uni.domain && (
                        <span className="inline-flex items-center text-[10px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          🌐 {uni.domain}
                        </span>
                      )}
                      <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        <span>✓ {uni.postStudyWork}</span>
                      </div>
                    </div>

                    {/* Key stats row */}
                    <div className="grid grid-cols-3 gap-2 mt-3.5 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-center">
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Tuition / yr</span>
                        <span className="text-xs font-extrabold text-slate-800">
                          ${(uni.tuitionPerYearUSD / 1000).toFixed(1)}k <span className="text-[10px] font-normal text-slate-500">USD</span>
                        </span>
                      </div>
                      <div className="border-x border-slate-200">
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Acceptance</span>
                        <span className="text-xs font-extrabold text-amber-600">{uni.acceptanceRate}%</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block uppercase font-bold">Min IELTS</span>
                        <span className="text-xs font-extrabold text-slate-800">{uni.minIelts} Band</span>
                      </div>
                    </div>

                    {/* Top programs pills */}
                    <div className="mt-3.5">
                      <span className="text-[11px] font-bold text-slate-400 block mb-1.5 uppercase tracking-wide">Popular Majors:</span>
                      <div className="flex flex-wrap gap-1">
                        {uni.topPrograms.slice(0, 3).map((prog, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 text-slate-700"
                          >
                            {prog}
                          </span>
                        ))}
                        {uni.topPrograms.length > 3 && (
                          <span className="text-[11px] font-medium px-1.5 py-0.5 text-slate-400">
                            +{uni.topPrograms.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Bottom CTA Actions */}
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                    <button
                      id={`btn-view-details-${uni.id}`}
                      onClick={() => setInspectingUni(uni)}
                      className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors text-center"
                    >
                      View Details
                    </button>

                    <button
                      id={`btn-apply-card-${uni.id}`}
                      onClick={() => onApplyUniversity(uni)}
                      disabled={isApplied}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                        isApplied
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm shadow-blue-500/20 cursor-pointer'
                      }`}
                    >
                      {isApplied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>In Tracker</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Apply via Portal</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* University Detail Modal */}
      <UniversityDetailModal
        university={inspectingUni}
        onClose={() => setInspectingUni(null)}
        onApply={onApplyUniversity}
        isAlreadyApplied={inspectingUni ? appliedUniversityIds.includes(inspectingUni.id) : false}
      />

      {/* University Comparison Floating Bar */}
      {comparedUnis.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700 flex items-center gap-4 max-w-xl w-11/12">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-blue-400 shrink-0" />
            <span className="text-xs font-bold">
              Comparing ({comparedUnis.length}/3 universities)
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-1 overflow-x-auto">
            {comparedUnis.map((c) => (
              <span 
                key={c.id} 
                className="text-[11px] font-semibold bg-slate-800 px-2 py-1 rounded-lg border border-slate-700 flex items-center gap-1 whitespace-nowrap"
              >
                <CountryFlag country={c.specificCountry || c.country} size="xs" />
                <span className="max-w-[90px] truncate">{c.name}</span>
                <button 
                  onClick={() => toggleCompare(c)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              id="btn-open-compare-modal"
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold"
            >
              Compare Side-by-Side
            </button>
            <button
              onClick={() => setComparedUnis([])}
              className="p-1.5 text-slate-400 hover:text-white"
              title="Clear comparison"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Side-by-Side Comparison Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto text-white p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-400" />
                <h3 className="text-lg font-bold font-['Outfit']">Side-by-Side University Comparison</h3>
              </div>
              <button
                onClick={() => setIsCompareModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-4 text-xs">
              {/* Metric Labels Column */}
              <div className="space-y-4 font-bold text-slate-400 pt-32">
                <div className="h-8 flex items-center">QS World Ranking</div>
                <div className="h-8 flex items-center">Destination & Region</div>
                <div className="h-8 flex items-center">Annual Tuition (USD)</div>
                <div className="h-8 flex items-center">Estimated Living Cost</div>
                <div className="h-8 flex items-center">Acceptance Rate</div>
                <div className="h-8 flex items-center">Min IELTS Requirement</div>
                <div className="h-8 flex items-center">Min GPA Threshold</div>
                <div className="h-10 flex items-center">Post-Study Work Route</div>
              </div>

              {/* Compared University Columns */}
              {comparedUnis.map((uni) => (
                <div key={uni.id} className="space-y-4 p-4 rounded-xl bg-slate-850 border border-slate-750">
                  <div className="h-28 flex flex-col justify-between">
                    <div>
                      <div className="mb-2">
                        <CountryFlag country={uni.specificCountry || uni.country} size="md" />
                      </div>
                      <h4 className="font-bold text-sm text-white font-['Outfit'] line-clamp-2">{uni.name}</h4>
                    </div>
                    <button
                      onClick={() => onApplyUniversity(uni)}
                      disabled={appliedUniversityIds.includes(uni.id)}
                      className={`w-full py-1.5 rounded-lg text-xs font-bold ${
                        appliedUniversityIds.includes(uni.id)
                          ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                          : 'bg-blue-600 hover:bg-blue-500 text-white'
                      }`}
                    >
                      {appliedUniversityIds.includes(uni.id) ? 'In Tracker' : 'Add to Tracker'}
                    </button>
                  </div>

                  <div className="h-8 flex items-center font-bold text-amber-400">QS #{uni.qsRank}</div>
                  <div className="h-8 flex items-center text-slate-200">{uni.specificCountry}</div>
                  <div className="h-8 flex items-center font-bold text-white">${uni.tuitionPerYearUSD.toLocaleString()} / yr</div>
                  <div className="h-8 flex items-center text-emerald-400">${uni.annualLivingCostUSD.toLocaleString()} / yr</div>
                  <div className="h-8 flex items-center text-slate-200">{uni.acceptanceRate}%</div>
                  <div className="h-8 flex items-center text-slate-200">{uni.minIelts} Band</div>
                  <div className="h-8 flex items-center text-slate-200">{uni.minGpa} / 4.0</div>
                  <div className="h-10 flex items-center font-semibold text-sky-300 text-[11px] leading-tight">{uni.postStudyWork}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
