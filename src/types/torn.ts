export interface TornWorkStats {
  manual: number;
  intelligence: number;
  endurance: number;
  total: number;
}

export type EmploymentType = 'unemployed' | 'city' | 'company';

export type CandidateStatus = 'not_contacted' | 'contacted' | 'replied' | 'interviewing' | 'hired' | 'declined';

export interface Candidate {
  id: number;
  name: string;
  level: number;
  lastAction: string;
  lastActionTimestamp: number;
  stats: TornWorkStats;
  employment: {
    type: EmploymentType;
    title: string;
    companyName?: string;
    companyId?: number;
    isPlayerOwned?: boolean;
  };
  status: CandidateStatus;
  statusUpdatedAt?: string;
  lastContactedAt?: string;
  notes: string;
  templateUsed?: string;
  dmsOpen?: boolean;
}

export interface RecruitmentTemplate {
  id: string;
  name: string;
  category: 'Company Director' | 'Starter Friendly' | 'High Pay / Trains' | 'Custom';
  subject: string;
  body: string;
  salary: string;
  trainsPerDay: number;
  companyName: string;
}

export interface ExcludeItem {
  id: number;
  name?: string;
  reason: 'Friend' | 'Faction Member' | 'Allied Company' | 'Blacklisted' | 'Manual';
  addedAt: string;
}

export interface ApiKeyItem {
  key: string;
  label?: string;
  addedAt: string;
  callsThisMinute: number;
  maxPerMinute: number;
  errorCount: number;
  isRateLimited: boolean;
  rateLimitedUntil?: number;
  status: 'active' | 'cooldown' | 'error';
}

export interface ScanFilters {
  minManual: number;
  maxManual?: number;
  minInt: number;
  maxInt?: number;
  minEnd: number;
  maxEnd?: number;
  minTotal: number;
  maxTotal?: number;
  employmentType: 'all' | 'unemployed' | 'city';
  selectedCityJobs: string[];
  excludePlayerCompanies: boolean;
  maxInactiveDays: number;
  targetCount: number;
  scanBatchSize: number;
}
