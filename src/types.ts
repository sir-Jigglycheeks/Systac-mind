export type DestinationCountry = 'UK' | 'USA' | 'Canada' | 'Europe';

export type StudyLevel = 'Undergraduate' | 'Postgraduate' | 'Doctorate';

export interface University {
  id: string;
  name: string;
  location: string;
  country: DestinationCountry;
  specificCountry: string; // e.g. "Germany", "France", "England"
  countryFlag: string;
  qsRank: number;
  nationalRank: number;
  logo: string;
  image: string;
  tuitionPerYearUSD: number;
  tuitionLocalFormatted: string;
  annualLivingCostUSD: number;
  acceptanceRate: number; // e.g. 14 for 14%
  degrees: StudyLevel[];
  topPrograms: string[];
  intakes: string[];
  minGpa: number; // on 4.0 scale
  minIelts: number;
  minToefl?: number;
  postStudyWork: string; // e.g. "2-year Graduate Route", "3-year STEM OPT"
  applicationDeadlines: {
    term: string;
    deadline: string;
    decisionDate: string;
  }[];
  description: string;
  highlights: string[];
  scholarshipInfo: string;
  campusType: 'Urban' | 'Suburban' | 'Campus Town';
  accreditations: string[];
  officialWebsite?: string;
  domain?: string;
  isOfficialScorecardVerified?: boolean;
}

export type ApplicationStage =
  | 'Profile Evaluation'
  | 'University Shortlisting'
  | 'Documents Verified'
  | 'Application Submitted'
  | 'Offer Received'
  | 'CAS / I-20 / PAL Issued'
  | 'Visa Lodged'
  | 'Visa Approved';

export interface CounselorNote {
  id: string;
  author: string;
  role: string;
  date: string;
  message: string;
  type: 'info' | 'action' | 'milestone';
}

export interface ApplicationRecord {
  id: string;
  universityId: string;
  universityName: string;
  country: DestinationCountry;
  specificCountry: string;
  program: string;
  degreeLevel: StudyLevel;
  intake: string;
  currentStage: ApplicationStage;
  stageProgress: number; // 0 to 100
  appliedDate: string;
  lastUpdated: string;
  offerType?: 'Conditional' | 'Unconditional' | 'Pending';
  trackingNumber: string;
  nextAction: string;
  nextActionDueDate: string;
  counselor: {
    name: string;
    title: string;
    email: string;
    phone: string;
    avatar: string;
  };
  notes: CounselorNote[];
}

export type DocumentCategory = 'Identity' | 'Academic' | 'Language' | 'Financial' | 'Statements';

export interface UploadedFileMeta {
  fileName: string;
  fileSize: string;
  fileType: string;
  uploadedAt: string;
  dataUrl?: string;
  sha256Hash: string;
  isEncrypted: boolean;
  securityLevel: string;
}

export interface DocumentRequirement {
  id: string;
  category: DocumentCategory;
  name: string;
  description: string;
  acceptedFormats: string;
  maxSizeMB: number;
  mandatory: boolean;
  applicableCountries: DestinationCountry[];
  uploadedFile?: UploadedFileMeta;
  status: 'verified' | 'pending_review' | 'action_required' | 'not_uploaded';
  counselorFeedback?: string;
}

export interface VisaCountryGuide {
  country: DestinationCountry;
  countryName: string;
  visaSubclass: string;
  flag: string;
  bannerImage: string;
  overview: string;
  processingTimeWeeks: string;
  applicationFeeUSD: number;
  applicationFeeLocal: string;
  visaSuccessRate: number; // e.g. 98.4
  postStudyWorkDuration: string;
  workWhileStudying: string;
  financialBenchmark: {
    headline: string;
    livingExpensesMonthly: string;
    minimumLiquidMonths: string;
    tuitionFeeProof: string;
    acceptedProofTypes: string[];
    specialRequirementName?: string;
    specialRequirementDesc?: string;
  };
  steps: {
    stepNumber: number;
    title: string;
    duration: string;
    description: string;
    keyDeliverable: string;
  }[];
  documentChecklist: {
    category: string;
    items: { name: string; detail: string; critical: boolean }[];
  }[];
  frequentInterviewQuestions: {
    question: string;
    intent: string;
    recommendedAnswer: string;
    counselorTip: string;
  }[];
}

export interface StudentProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  currentEducation: string;
  currentGpa: number;
  preferredCountries: DestinationCountry[];
  preferredDegree: StudyLevel;
  budgetPerYearUSD: number;
  englishTestTaken: 'IELTS' | 'TOEFL' | 'PTE' | 'Duolingo' | 'None Yet';
  englishScore: string;
  targetIntake: string;
  assignedSeniorCounselor: string;
}
