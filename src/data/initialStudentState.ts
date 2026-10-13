import { ApplicationRecord, DocumentRequirement, StudentProfile } from '../types';

export const INITIAL_STUDENT_PROFILE: StudentProfile = {
  id: 'STU-2026-9812',
  fullName: 'Arjun Mehta',
  email: 'arjun.mehta.edu@outlook.com',
  phone: '+1 (416) 555-0192',
  currentEducation: 'B.Tech in Computer Science & Engineering',
  currentGpa: 3.82,
  preferredCountries: ['UK', 'Canada', 'Europe', 'USA'],
  preferredDegree: 'Postgraduate',
  budgetPerYearUSD: 38000,
  englishTestTaken: 'IELTS',
  englishScore: '8.0 Overall (L: 8.5, R: 8.0, W: 7.5, S: 7.5)',
  targetIntake: 'Autumn / Fall 2026',
  assignedSeniorCounselor: 'Dr. Eleanor Vance (Senior Director of Global Admissions)'
};

export const INITIAL_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'APP-UK-2026-081',
    universityId: 'imperial',
    universityName: 'Imperial College London',
    country: 'UK',
    specificCountry: 'United Kingdom',
    program: 'MSc Artificial Intelligence & Machine Learning',
    degreeLevel: 'Postgraduate',
    intake: 'Autumn 2026 (September)',
    currentStage: 'Offer Received',
    stageProgress: 65,
    appliedDate: 'Nov 12, 2025',
    lastUpdated: 'Yesterday at 3:45 PM',
    offerType: 'Conditional',
    trackingNumber: 'ICL-PG-992014-AM',
    nextAction: 'Submit final degree transcript & pay £3,000 tuition deposit for CAS generation',
    nextActionDueDate: 'Oct 15, 2025',
    counselor: {
      name: 'Dr. Eleanor Vance',
      title: 'Head of UK & European Admissions',
      email: 'eleanor.vance@systacmind.com',
      phone: '+44 20 7946 0912',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    notes: [
      {
        id: 'n1',
        author: 'Dr. Eleanor Vance',
        role: 'Admissions Counselor',
        date: 'Yesterday at 3:45 PM',
        message: 'Congratulations! Official Conditional Offer received from Imperial College. Conditions: Minimum 80% in final semester and proof of tuition deposit to release the CAS.',
        type: 'milestone'
      },
      {
        id: 'n2',
        author: 'Dr. Eleanor Vance',
        role: 'Admissions Counselor',
        date: 'Dec 02, 2025',
        message: 'Application successfully acknowledged by Department of Computing. Departmental interview waiver granted based on outstanding GRE quant score.',
        type: 'info'
      },
      {
        id: 'n3',
        author: 'Systac Visa Desk',
        role: 'Immigration Specialist',
        date: 'Jan 10, 2026',
        message: 'Please review the 28-day funds checklist in the Visa Guidance section. Ensure £12,006 plus remainder tuition is locked in your savings account.',
        type: 'action'
      }
    ]
  },
  {
    id: 'APP-CA-2026-114',
    universityId: 'utoronto',
    universityName: 'University of Toronto',
    country: 'Canada',
    specificCountry: 'Canada',
    program: 'MEng in Computer Engineering (Applied AI Concentration)',
    degreeLevel: 'Postgraduate',
    intake: 'Fall 2026 (September)',
    currentStage: 'Application Submitted',
    stageProgress: 45,
    appliedDate: 'Dec 08, 2025',
    lastUpdated: '3 days ago',
    offerType: 'Pending',
    trackingNumber: 'UofT-SGS-481902',
    nextAction: 'Departmental Faculty Review in progress. Next update expected mid-March',
    nextActionDueDate: 'Mar 25, 2026',
    counselor: {
      name: 'Marcus Sterling',
      title: 'Canada Immigration & Admissions Lead',
      email: 'marcus.sterling@systacmind.com',
      phone: '+1 416 908 4210',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80'
    },
    notes: [
      {
        id: 'n4',
        author: 'Marcus Sterling',
        role: 'Canada Admissions Specialist',
        date: 'Dec 08, 2025',
        message: 'SGS portal completed. Letter of Reference 1 and 2 received from Prof. Sharma and Dr. Reynolds.',
        type: 'milestone'
      },
      {
        id: 'n5',
        author: 'Marcus Sterling',
        role: 'Canada Admissions Specialist',
        date: 'Jan 18, 2026',
        message: 'IRCC Provincial Attestation Letter (PAL) quota is confirmed reserved for U of T Master students. Once LOA arrives, we will initiate the GIC.',
        type: 'info'
      }
    ]
  },
  {
    id: 'APP-EU-2026-449',
    universityId: 'tum',
    universityName: 'Technical University of Munich (TUM)',
    country: 'Europe',
    specificCountry: 'Germany',
    program: 'MSc Informatics (English Curriculum)',
    degreeLevel: 'Postgraduate',
    intake: 'Winter Semester 2026/27',
    currentStage: 'Documents Verified',
    stageProgress: 35,
    appliedDate: 'Jan 04, 2026',
    lastUpdated: '1 week ago',
    offerType: 'Pending',
    trackingNumber: 'TUMonline-2026-W-881',
    nextAction: 'Uni-Assist VPD evaluation verified. Awaiting TUM Aptitude Assessment stage 1 outcome',
    nextActionDueDate: 'Apr 10, 2026',
    counselor: {
      name: 'Katrin Becker',
      title: 'EU & DAAD Specialist Counselor',
      email: 'katrin.becker@systacmind.com',
      phone: '+49 89 289 104',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80'
    },
    notes: [
      {
        id: 'n6',
        author: 'Katrin Becker',
        role: 'DAAD Specialist',
        date: 'Jan 04, 2026',
        message: 'APS Certificate and curricular analysis matrix uploaded to TUMonline portal. All credits aligned with Munich standards.',
        type: 'milestone'
      }
    ]
  },
  {
    id: 'APP-US-2026-720',
    universityId: 'columbia',
    universityName: 'Columbia University',
    country: 'USA',
    specificCountry: 'United States',
    program: 'MS in Computer Science (Machine Learning Track)',
    degreeLevel: 'Postgraduate',
    intake: 'Fall 2026',
    currentStage: 'University Shortlisting',
    stageProgress: 20,
    appliedDate: 'Jan 15, 2026',
    lastUpdated: '2 weeks ago',
    offerType: 'Pending',
    trackingNumber: 'SEAS-2026-55910',
    nextAction: 'Finalize personal statement revision #2 addressing why Columbia Fu Foundation SEAS',
    nextActionDueDate: 'Feb 15, 2026',
    counselor: {
      name: 'Dr. Eleanor Vance',
      title: 'Head of Global Admissions',
      email: 'eleanor.vance@systacmind.com',
      phone: '+44 20 7946 0912',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    notes: [
      {
        id: 'n7',
        author: 'Dr. Eleanor Vance',
        role: 'Admissions Counselor',
        date: 'Jan 15, 2026',
        message: 'Columbia profile added to tracker. Working on personal statement draft to accentuate computational research background.',
        type: 'info'
      }
    ]
  }
];

export const INITIAL_DOCUMENTS: DocumentRequirement[] = [
  {
    id: 'doc-passport',
    category: 'Identity',
    name: 'Valid International Passport (Bio-data pages)',
    description: 'Color scan of photo page and address page. Must have at least 18 months validity before intended departure date.',
    acceptedFormats: 'PDF, JPG, PNG',
    maxSizeMB: 10,
    mandatory: true,
    applicableCountries: ['UK', 'USA', 'Canada', 'Europe'],
    status: 'verified',
    counselorFeedback: 'Passport scanned in high resolution (300 DPI), verified valid until November 2029.',
    uploadedFile: {
      fileName: 'Passport_Arjun_Mehta_Valid2029.pdf',
      fileSize: '2.4 MB',
      fileType: 'application/pdf',
      uploadedAt: 'Oct 20, 2025',
      sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      isEncrypted: true,
      securityLevel: 'AES-256 GCM Client-Side Encrypted'
    }
  },
  {
    id: 'doc-transcripts',
    category: 'Academic',
    name: 'Official Degree Transcripts & Consolidated Marksheets',
    description: 'Semester-wise marksheet certified by the university registrar with grading scale explanation.',
    acceptedFormats: 'PDF',
    maxSizeMB: 15,
    mandatory: true,
    applicableCountries: ['UK', 'USA', 'Canada', 'Europe'],
    status: 'verified',
    counselorFeedback: 'Verified official university seal. Cumulative CGPA: 3.82/4.00 (Equivalent to UK 1st Class Honours / German 1.3).',
    uploadedFile: {
      fileName: 'Consolidated_Transcripts_Sem1_to_Sem8.pdf',
      fileSize: '4.8 MB',
      fileType: 'application/pdf',
      uploadedAt: 'Oct 22, 2025',
      sha256Hash: '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08',
      isEncrypted: true,
      securityLevel: 'AES-256 GCM Client-Side Encrypted'
    }
  },
  {
    id: 'doc-ielts',
    category: 'Language',
    name: 'IELTS Academic / TOEFL Official Score Report',
    description: 'TRF (Test Report Form) showing candidate number and sub-scores for verification on the e-portal.',
    acceptedFormats: 'PDF, PNG',
    maxSizeMB: 5,
    mandatory: true,
    applicableCountries: ['UK', 'USA', 'Canada', 'Europe'],
    status: 'verified',
    counselorFeedback: 'IELTS Academic Overall Band 8.0 verified with British Council portal.',
    uploadedFile: {
      fileName: 'IELTS_Academic_TRF_Band8.0.pdf',
      fileSize: '1.2 MB',
      fileType: 'application/pdf',
      uploadedAt: 'Nov 02, 2025',
      sha256Hash: '5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',
      isEncrypted: true,
      securityLevel: 'AES-256 GCM Client-Side Encrypted'
    }
  },
  {
    id: 'doc-bank-statement',
    category: 'Financial',
    name: 'Financial Solvency Proof / Bank Statement',
    description: '6 months bank statement showing liquid savings or approved education loan sanction letter.',
    acceptedFormats: 'PDF',
    maxSizeMB: 12,
    mandatory: true,
    applicableCountries: ['UK', 'USA', 'Canada', 'Europe'],
    status: 'pending_review',
    counselorFeedback: 'Uploaded 2 days ago. Senior finance officer currently calculating 28-day minimum balance rule for UKVI and CAD GIC requirements.',
    uploadedFile: {
      fileName: 'HDFC_Bank_Savings_6Month_Statement.pdf',
      fileSize: '3.6 MB',
      fileType: 'application/pdf',
      uploadedAt: '2 days ago',
      sha256Hash: '4b227777d4dd1fc61c6f884f48641d02b4d121d3fd328cb08b5531fcacdabf8a',
      isEncrypted: true,
      securityLevel: 'AES-256 GCM Client-Side Encrypted'
    }
  },
  {
    id: 'doc-sop',
    category: 'Statements',
    name: 'Statement of Purpose (SOP) / Personal Motivation Essay',
    description: 'Tailored 1,000-word statement highlighting academic foundation, motivation, project experience, and 5-year post-study ambitions.',
    acceptedFormats: 'PDF, DOCX',
    maxSizeMB: 5,
    mandatory: true,
    applicableCountries: ['UK', 'USA', 'Canada', 'Europe'],
    status: 'action_required',
    counselorFeedback: 'Draft #2 is solid, but please add 2 specific research papers published by Imperial College and U of T professors in the AI section before final sign-off.',
    uploadedFile: {
      fileName: 'Statement_of_Purpose_Draft_v2.pdf',
      fileSize: '650 KB',
      fileType: 'application/pdf',
      uploadedAt: 'Jan 12, 2026',
      sha256Hash: 'ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564afe39d',
      isEncrypted: true,
      securityLevel: 'AES-256 GCM Client-Side Encrypted'
    }
  },
  {
    id: 'doc-lor1',
    category: 'Statements',
    name: 'Academic Letter of Recommendation (LOR 1)',
    description: 'Signed on university institutional letterhead by Department Head or thesis supervisor with official institutional email.',
    acceptedFormats: 'PDF',
    maxSizeMB: 5,
    mandatory: true,
    applicableCountries: ['UK', 'USA', 'Canada', 'Europe'],
    status: 'verified',
    counselorFeedback: 'Verified on university letterhead with institutional seal.',
    uploadedFile: {
      fileName: 'LOR_Prof_Sharma_HOD_CSE.pdf',
      fileSize: '890 KB',
      fileType: 'application/pdf',
      uploadedAt: 'Nov 15, 2025',
      sha256Hash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
      isEncrypted: true,
      securityLevel: 'AES-256 GCM Client-Side Encrypted'
    }
  },
  {
    id: 'doc-lor2',
    category: 'Statements',
    name: 'Professional / Research Recommendation (LOR 2)',
    description: 'Recommendation from project lead, internship manager, or second academic professor.',
    acceptedFormats: 'PDF',
    maxSizeMB: 5,
    mandatory: true,
    applicableCountries: ['UK', 'USA', 'Canada', 'Europe'],
    status: 'not_uploaded',
    counselorFeedback: 'Awaiting submission from your software engineering internship lead at Microsoft Research.'
  },
  {
    id: 'doc-cv',
    category: 'Academic',
    name: 'Europass / Academic Curriculum Vitae (CV)',
    description: 'Chronological resume detailing technical projects, GitHub portfolio, publications, leadership roles, and hackathons.',
    acceptedFormats: 'PDF',
    maxSizeMB: 5,
    mandatory: true,
    applicableCountries: ['UK', 'USA', 'Canada', 'Europe'],
    status: 'verified',
    counselorFeedback: 'Format compliant with Harvard/Oxford academic resume guidelines.',
    uploadedFile: {
      fileName: 'Arjun_Mehta_Academic_CV_2026.pdf',
      fileSize: '410 KB',
      fileType: 'application/pdf',
      uploadedAt: 'Oct 25, 2025',
      sha256Hash: '01ba4719c80b6fe911b091a7c05124b64eeece964e09c058ef8f9805daca546b',
      isEncrypted: true,
      securityLevel: 'AES-256 GCM Client-Side Encrypted'
    }
  },
  {
    id: 'doc-tb-test',
    category: 'Identity',
    name: 'Tuberculosis (TB) Panel Screening Certificate',
    description: 'Mandatory for UK student visa applications from designated countries. Valid for 6 months.',
    acceptedFormats: 'PDF, JPG',
    maxSizeMB: 5,
    mandatory: false,
    applicableCountries: ['UK'],
    status: 'not_uploaded',
    counselorFeedback: 'Required once CAS is released. Book clinic appointment 6 weeks before visa filing date.'
  }
];
