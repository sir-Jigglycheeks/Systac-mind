import { VisaCountryGuide } from '../types';

export const VISA_GUIDANCE: VisaCountryGuide[] = [
  {
    country: 'UK',
    countryName: 'United Kingdom',
    visaSubclass: 'Student Route Visa (formerly Tier 4)',
    flag: '🇬🇧',
    bannerImage: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1200&q=80',
    overview: 'The UK Student Route is a points-based immigration system. International students need 70 points: 50 points for Confirmation of Acceptance for Studies (CAS), 10 points for financial requirement, and 10 points for English language requirement.',
    processingTimeWeeks: '3 to 4 weeks (Priority service: 5 working days)',
    applicationFeeUSD: 625,
    applicationFeeLocal: '£490 visa fee + £776/yr Immigration Health Surcharge (IHS)',
    visaSuccessRate: 98.6,
    postStudyWorkDuration: '2-Year Graduate Route (3 years for PhD)',
    workWhileStudying: 'Up to 20 hours/week during term time; full-time during holidays',
    financialBenchmark: {
      headline: 'Tuition Balance + Living Expenses held for 28 consecutive days',
      livingExpensesMonthly: '£1,334/month in London | £1,023/month outside London',
      minimumLiquidMonths: '9 months (maximum cap of £12,006 in London or £9,207 outside London)',
      tuitionFeeProof: 'Full 1st year tuition minus any advance deposit recorded on the CAS',
      acceptedProofTypes: [
        'Personal bank account statements (student or parents with sponsorship letter)',
        'Education loan sanction letter from regulated financial institution',
        'Official government or corporate scholarship award letter'
      ],
      specialRequirementName: 'The Strict 28-Day Rule',
      specialRequirementDesc: 'Funds must be continuously maintained in the account for at least 28 consecutive days. The bank statement closing date cannot be older than 31 days from your visa application submission.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Receive Unconditional Offer & CAS',
        duration: '1 - 2 weeks',
        description: 'Fulfill all academic conditions, pay the initial tuition deposit (usually £2,000 - £5,000), and request your Confirmation of Acceptance for Studies (CAS) reference number from the university.',
        keyDeliverable: 'CAS Statement containing Sponsor License Number and Course Fees'
      },
      {
        stepNumber: 2,
        title: 'Maintain Maintenance Funds (28 Days)',
        duration: '28 consecutive days',
        description: 'Ensure required tuition balance plus £9,207 - £12,006 remains untouched in your or your parents’ bank account without dipping below the required threshold for even a single day.',
        keyDeliverable: 'Official Bank Statement with stamp & verification contact'
      },
      {
        stepNumber: 3,
        title: 'Undergo Tuberculosis (TB) Screening',
        duration: '1 - 3 days',
        description: 'Book a chest X-ray screening at an approved UK Home Office panel clinic if residing in a listed country. Must be issued within 6 months of filing.',
        keyDeliverable: 'Official IOM / Home Office TB Clearance Certificate'
      },
      {
        stepNumber: 4,
        title: 'Complete Online Visa Form & Pay Fees',
        duration: '2 - 3 hours',
        description: 'Complete the UK Visas and Immigration (UKVI) online application, pay the £490 fee and Immigration Health Surcharge (£776 per year of study) which gives full access to NHS free healthcare.',
        keyDeliverable: 'GWF Application Reference & Payment Receipt'
      },
      {
        stepNumber: 5,
        title: 'Biometrics Appointment at VFS / TLScontact',
        duration: 'Half day',
        description: 'Attend the visa application center for facial photograph and fingerprint scanning. Bring physical passport and checklist.',
        keyDeliverable: 'Biometrics Stamped Slip and Passport Submission'
      },
      {
        stepNumber: 6,
        title: 'Receive Decision & eVisa / Vignette',
        duration: '15 working days',
        description: 'Collect your 90-day travel vignette passport sticker, or access your digital UKVI eVisa share code before flying to the UK.',
        keyDeliverable: 'Entry Vignette + Decision Letter'
      }
    ],
    documentChecklist: [
      {
        category: 'Official Identity & Travel',
        items: [
          { name: 'Current Valid Passport', detail: 'Must have at least 6 months validity and at least 2 blank pages', critical: true },
          { name: 'Previous Passports / Travel History', detail: 'All expired passports showing previous international visas', critical: false },
          { name: 'TB Test Certificate', detail: 'From a UKVI-approved panel clinic (valid for 6 months)', critical: true }
        ]
      },
      {
        category: 'Academic & CAS Verification',
        items: [
          { name: 'CAS Reference Document', detail: 'Issued by licensed UK university sponsor', critical: true },
          { name: 'Certificates Listed on CAS', detail: 'Original transcripts, degrees, and language certificates mentioned in CAS section', critical: true },
          { name: 'ATAS Certificate (if required)', detail: 'Academic Technology Approval Scheme clearance for specific STEM & security subjects', critical: false }
        ]
      },
      {
        category: 'Financial Evidence',
        items: [
          { name: '28-Day Bank Statement', detail: 'Bank account held for minimum 28 days with zero dips below required limit', critical: true },
          { name: 'Consent & Affidavit of Sponsorship', detail: 'If using parents’ funds, include birth certificate + signed sponsorship letter', critical: true },
          { name: 'Education Loan Sanction Letter', detail: 'Must state unconditional disbursement to student or university directly', critical: false }
        ]
      }
    ],
    frequentInterviewQuestions: [
      {
        question: 'Why did you choose this specific UK university over other institutions in your home country?',
        intent: 'Verifies genuine student status and research into course syllabus and faculty.',
        recommendedAnswer: 'Highlight specific course modules, renowned faculty members, lab facilities, and the unique 1-year Masters structure compared to traditional 2-year programs back home.',
        counselorTip: 'Never give generic answers like "It is a famous university." Mention at least 2 specific core/elective modules and professors.'
      },
      {
        question: 'How will you finance your tuition fees and living expenses throughout the course?',
        intent: 'Checks credibility of financial sponsors and awareness of costs.',
        recommendedAnswer: 'State the exact annual tuition fee, the amount already deposited, and specify your family savings, sanctioned education loan, or scholarship covering the remainder.',
        counselorTip: 'Be crystal clear on the exact figures on your bank statement down to the currency conversion.'
      },
      {
        question: 'What are your career plans after completing this qualification?',
        intent: 'Ensures student does not express intent to permanently overstay without legal immigration channels.',
        recommendedAnswer: 'Explain how the degree qualifies you for senior target roles in industry, and mention utilizing the 2-year Graduate Route for international work exposure before advancing your career.',
        counselorTip: 'Reference specific job titles, industries, and prospective companies in your target sector.'
      }
    ]
  },
  {
    country: 'USA',
    countryName: 'United States',
    visaSubclass: 'F-1 Academic Student Visa',
    flag: '🇺🇸',
    bannerImage: 'https://images.unsplash.com/photo-1508433957232-3107f5fd5995?auto=format&fit=crop&w=1200&q=80',
    overview: 'The F-1 visa is the most popular visa for academic study at US colleges, universities, and seminaries. The process culminates in an in-person Consular Interview where applicants must demonstrate academic readiness, sufficient funding, and non-immigrant intent under INA Section 214(b).',
    processingTimeWeeks: '2 to 8 weeks (Appointment wait times vary by US embassy/consulate)',
    applicationFeeUSD: 535,
    applicationFeeLocal: '$350 SEVIS I-901 fee + $185 MRV Visa Appointment fee',
    visaSuccessRate: 96.8,
    postStudyWorkDuration: '1-Year OPT (Optional Practical Training) + 24-Month STEM OPT Extension (Total 3 Years)',
    workWhileStudying: 'On-campus employment up to 20 hours/week during active semesters',
    financialBenchmark: {
      headline: 'Full First-Year Cost of Attendance (Tuition + Living + Health Insurance)',
      livingExpensesMonthly: '$1,500 - $2,200/month depending on state and city',
      minimumLiquidMonths: '12 months (Total amount indicated on Box 8 of Form I-20)',
      tuitionFeeProof: 'Liquid assets equal to or exceeding the total estimate on the I-20',
      acceptedProofTypes: [
        'Savings bank accounts & fixed deposits (liquid)',
        'Approved education loan sanction letters from recognized financial institutions',
        'Provident fund (PF/PPF) statements and liquid mutual funds',
        'Official university graduate assistantship / fellowship award letter'
      ],
      specialRequirementName: 'Form I-20 & SEVIS I-901 Activation',
      specialRequirementDesc: 'Once admitted, your university Designated School Official (DSO) issues Form I-20 with a unique SEVIS ID (N00...). You must pay the $350 SEVIS fee before scheduling your visa interview.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Obtain Form I-20 from University',
        duration: '1 - 3 weeks',
        description: 'Submit proof of financial solvency to the admitted university DSO to generate your Certificate of Eligibility for Nonimmigrant Student Status (Form I-20).',
        keyDeliverable: 'Signed Form I-20 with SEVIS ID'
      },
      {
        stepNumber: 2,
        title: 'Pay SEVIS I-901 Fee ($350)',
        duration: 'Instant (online)',
        description: 'Visit FMJfee.com and submit payment with your SEVIS number and university school code.',
        keyDeliverable: 'Form I-797 SEVIS Payment Confirmation Receipt'
      },
      {
        stepNumber: 3,
        title: 'Complete Form DS-160 Online',
        duration: '2 - 4 hours',
        description: 'Fill out the comprehensive US Nonimmigrant Visa Application (DS-160) on CEAC portal, providing educational history, family details, and security questionnaire.',
        keyDeliverable: 'DS-160 Confirmation Barcode Page'
      },
      {
        stepNumber: 4,
        title: 'Pay MRV Visa Fee & Schedule Two Appointments',
        duration: '1 day',
        description: 'Create profile on US Visa Scheduling portal, pay the $185 MRV fee, and book two appointments: (1) Biometrics at Visa Application Center (VAC/OFC) and (2) Consular Interview at US Embassy/Consulate.',
        keyDeliverable: 'US Visa Appointment Confirmation Sheet'
      },
      {
        stepNumber: 5,
        title: 'Attend OFC Biometrics Appointment',
        duration: '1 hour',
        description: 'Visit the VAC 1–2 days prior to your interview to have your fingerprints scanned and digital photograph taken.',
        keyDeliverable: 'Biometrics Stamped DS-160 Confirmation'
      },
      {
        stepNumber: 6,
        title: 'Consular Visa Interview',
        duration: '2 - 5 minutes with Consular Officer',
        description: 'Meet face-to-face with a US Consular Officer. Communicate confidently about your university choice, study plans, funding, and career objectives.',
        keyDeliverable: 'Visa Approval Status / Passport Collected for Stamping'
      }
    ],
    documentChecklist: [
      {
        category: 'Mandatory Visa Filings',
        items: [
          { name: 'Original Form I-20', detail: 'Signed by DSO and student', critical: true },
          { name: 'SEVIS I-901 Fee Receipt', detail: '$350 official payment confirmation', critical: true },
          { name: 'DS-160 Confirmation Page', detail: 'With legible CEAC barcode', critical: true },
          { name: 'Appointment Confirmation Letter', detail: 'Showing VAC and Consular date/time', critical: true },
          { name: 'Valid Passport', detail: 'Valid for at least 6 months beyond intended period of stay', critical: true }
        ]
      },
      {
        category: 'Academic Credentials',
        items: [
          { name: 'Standardized Test Scorecards', detail: 'Official GRE / GMAT and TOEFL / IELTS score reports', critical: true },
          { name: 'Degree Certificates & Transcripts', detail: 'Consolidated semester marksheets and provisional/final degrees', critical: true },
          { name: 'Resume / Curriculum Vitae', detail: 'Detailing academic projects, internships, publications', critical: false }
        ]
      },
      {
        category: 'Financial Solvency Dossier',
        items: [
          { name: 'Bank Account Statements & FD Receipts', detail: 'Original 6-month statements with bank seal', critical: true },
          { name: 'Education Loan Sanction Letter', detail: 'Specifying collateral/non-collateral approval and terms', critical: true },
          { name: 'Affidavit of Support (Form I-134)', detail: 'From financial sponsors (parents/family)', critical: true },
          { name: 'Tax Returns (ITR) / Form 16', detail: 'Last 3 years tax filing documents of sponsors', critical: false }
        ]
      }
    ],
    frequentInterviewQuestions: [
      {
        question: 'Why did you select this particular university in the United States?',
        intent: 'Testing genuine intent vs visa shopping; verifying course knowledge.',
        recommendedAnswer: 'Highlight the unique curriculum, research labs (e.g. CSAIL, Media Lab), specific faculty publications, and alignment with your career trajectory.',
        counselorTip: 'Do not talk about ranking alone; explain what is in their syllabus that you cannot learn elsewhere.'
      },
      {
        question: 'Who is sponsoring your education and what do they do?',
        intent: 'Ensures financial stability and clear source of funds without sudden large unexplained deposits.',
        recommendedAnswer: 'Clearly state: "My education is sponsored by my father, who is the Chief Operations Officer at XYZ Corp earning $X annually, supported by a $40,000 sanctioned education loan and $35,000 in liquid family savings."',
        counselorTip: 'Answer in 1-2 concise, confident sentences. Keep financial documents in your hand ready to show if requested.'
      },
      {
        question: 'What do you plan to do after you graduate from your program?',
        intent: 'Assessing non-immigrant intent under INA 214(b). You must not declare intent to settle permanently in the US.',
        recommendedAnswer: 'Emphasize your plan to gain hands-on technical proficiency through OPT, then return home to join high-growth technology sectors where your skills command premium leadership roles.',
        counselorTip: 'Mention names of prominent enterprises or startup ecosystems in your home country.'
      }
    ]
  },
  {
    country: 'Canada',
    countryName: 'Canada',
    visaSubclass: 'Study Permit & Provincial Attestation Letter (PAL)',
    flag: '🇨🇦',
    bannerImage: 'https://images.unsplash.com/photo-1517935703635-27c945dfab77?auto=format&fit=crop&w=1200&q=80',
    overview: 'Canada remains one of the top destinations for international students due to its welcoming multicultural society, top-tier research universities, and post-graduation pathways. Recent IRCC updates require a Provincial Attestation Letter (PAL) and increased GIC living expense proof.',
    processingTimeWeeks: '4 to 8 weeks (IRCC processing averages)',
    applicationFeeUSD: 175,
    applicationFeeLocal: 'CAD $150 study permit fee + CAD $85 biometric fee',
    visaSuccessRate: 97.2,
    postStudyWorkDuration: 'Up to 3-Year Post-Graduation Work Permit (PGWP)',
    workWhileStudying: 'Up to 24 hours/week off-campus during academic terms; unlimited during breaks',
    financialBenchmark: {
      headline: 'Guaranteed Investment Certificate (GIC) + Full 1st Year Tuition',
      livingExpensesMonthly: 'CAD $1,720/month',
      minimumLiquidMonths: 'CAD $20,635 minimum GIC requirement (updated IRCC benchmark)',
      tuitionFeeProof: 'Receipt showing payment of first year full tuition fees to the DLI',
      acceptedProofTypes: [
        'Guaranteed Investment Certificate (GIC) from an approved Canadian bank (CIBC, Scotiabank, RBC, ICICI Canada)',
        'Tuition fee payment receipt from your Designated Learning Institution (DLI)',
        'Education loan approval from a recognized banking institution',
        'Bank statements showing funds maintained for past 4-6 months'
      ],
      specialRequirementName: 'Provincial Attestation Letter (PAL) & Designated Learning Institution (DLI) Quota',
      specialRequirementDesc: 'Under updated IRCC and Statistics Canada Postsecondary Student Information System (PSIS) classifications, all international students in undergraduate programs and non-exempt college certificates require a Provincial Attestation Letter (PAL) issued directly by their province (Ontario, BC, Alberta, Quebec, etc.) allocated under federal caps.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Obtain Letter of Acceptance (LOA) & PAL',
        duration: '2 - 4 weeks',
        description: 'Accept your university offer, pay the tuition deposit, and obtain your official LOA and Provincial Attestation Letter (PAL) from your institution.',
        keyDeliverable: 'Official DLI LOA + Provincial Attestation Letter'
      },
      {
        stepNumber: 2,
        title: 'Purchase Guaranteed Investment Certificate (GIC)',
        duration: '3 - 5 business days',
        description: 'Transfer CAD $20,635 to a designated Canadian bank (e.g. Scotiabank, CIBC, RBC) to generate your GIC Certificate of Deposit.',
        keyDeliverable: 'GIC Investment Confirmation Certificate'
      },
      {
        stepNumber: 3,
        title: 'Pay Full First-Year Tuition to University',
        duration: '2 - 3 business days',
        description: 'Pay full year tuition via Flywire / CIBC International Student Pay and obtain official university ledger receipt.',
        keyDeliverable: 'Official Tuition Fee Payment Receipt'
      },
      {
        stepNumber: 4,
        title: 'Upfront Medical Exam & Police Clearance',
        duration: '3 - 5 days',
        description: 'Book an upfront medical exam with an IRCC panel physician (eMedical sheet) and obtain Police Clearance Certificate (PCC).',
        keyDeliverable: 'eMedical Information Sheet (IMM 1017B)'
      },
      {
        stepNumber: 5,
        title: 'Submit Study Permit via IRCC Portal',
        duration: '1 day',
        description: 'Create IRCC secure account, fill Form IMM 1294, upload SOP / Letter of Explanation, and pay CAD $235 total fees.',
        keyDeliverable: 'IRCC Submission Confirmation & Biometric Instruction Letter (BIL)'
      },
      {
        stepNumber: 6,
        title: 'Biometrics & Passport Submission',
        duration: '2 - 4 weeks for approval',
        description: 'Provide biometrics at local VFS. Upon approval, receive Passport Request Letter (OPR) to receive your counterfoil visa and Port of Entry (POE) Letter of Introduction.',
        keyDeliverable: 'POE Introduction Letter & Counterfoil Visa'
      }
    ],
    documentChecklist: [
      {
        category: 'Immigration & Acceptance',
        items: [
          { name: 'Letter of Acceptance (LOA)', detail: 'From a Designated Learning Institution with DLI #', critical: true },
          { name: 'Provincial Attestation Letter (PAL)', detail: 'Provincial allocation quota certificate', critical: true },
          { name: 'Valid Passport', detail: 'Clear scan of bio pages and travel history', critical: true },
          { name: 'Statement of Purpose / Study Plan', detail: 'Explaining choice of program, progression, and home ties', critical: true }
        ]
      },
      {
        category: 'Financial & Banking Proof',
        items: [
          { name: 'GIC Certificate (CAD $20,635)', detail: 'Guaranteed Investment Certificate from designated Canadian bank', critical: true },
          { name: '1st Year Tuition Payment Receipt', detail: 'Receipt directly from the Canadian university', critical: true },
          { name: 'Additional Family Proof of Funds', detail: 'Bank accounts, property evaluation, and tax returns for added strength', critical: false }
        ]
      },
      {
        category: 'Health & Background',
        items: [
          { name: 'Upfront eMedical Sheet', detail: 'Issued by IRCC authorized panel physician', critical: true },
          { name: 'Police Clearance Certificate (PCC)', detail: 'Issued within past 6 months by national passport/police authorities', critical: true }
        ]
      }
    ],
    frequentInterviewQuestions: [
      {
        question: 'Why did you choose Canada and this specific institution over other global options?',
        intent: 'Checks clarity of purpose, high educational standard awareness, and safety.',
        recommendedAnswer: 'Highlight Canada’s world-renowned academic rigor, welcoming multicultural safety, and the university’s specialized co-op work-integrated learning curriculum.',
        counselorTip: 'Emphasize how the specific Canadian curriculum bridges gaps between theory and industry.'
      },
      {
        question: 'How does this program fit into your previous educational background?',
        intent: 'Verifies academic progression and avoids career mismatch refusals.',
        recommendedAnswer: 'Clearly demonstrate logical academic progression: "My Bachelor’s in Computer Engineering gave me fundamentals in software development; this Master’s in Data Analytics provides specialized training in AI systems."',
        counselorTip: 'If changing fields or having career gaps, provide a concrete justification with portfolio or work experience.'
      },
      {
        question: 'What ties do you have to your home country that ensure you will return?',
        intent: 'IRCC dual intent requires satisfying the officer that you will respect Canadian immigration rules.',
        recommendedAnswer: 'Outline family business commitments, elderly dependents, inherited family assets, and exponential demand for your specialized skillset in your domestic economy.',
        counselorTip: 'Mention real economic figures and corporate growth in your home country.'
      }
    ]
  },
  {
    country: 'Europe',
    countryName: 'European Union (Germany, France, Ireland & Netherlands)',
    visaSubclass: 'National Student Visa (Type D) / Schengen Long Stay',
    flag: '🇪🇺',
    bannerImage: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1200&q=80',
    overview: 'Studying in continental Europe offers unmatched quality, heavily subsidized tuition (often free or nominal fees in Germany and France), and the ability to travel freely across 29 Schengen member states with generous post-study work routes.',
    processingTimeWeeks: '4 to 10 weeks (Embassy visa appointments require early booking)',
    applicationFeeUSD: 95,
    applicationFeeLocal: '€75 - €100 National Visa Fee',
    visaSuccessRate: 98.1,
    postStudyWorkDuration: 'Germany: 18-Month Job Seeker | Ireland: 2-Year Stamp 1G | Netherlands: 1-Year Zoekjaar | France: 2-Year APS',
    workWhileStudying: 'Germany: 140 full days / 280 half days per year | France: 60% of annual working hours | Ireland: 20 hrs/week',
    financialBenchmark: {
      headline: 'Blocked Bank Account (Sperrkonto) or Guaranteed Living Allowance',
      livingExpensesMonthly: 'Germany: €934/month | France: €615/month | Ireland: €833/month',
      minimumLiquidMonths: 'Germany: €11,208/year in a Blocked Account | Ireland: €10,000 liquid funds',
      tuitionFeeProof: 'Tuition receipt or fee waiver certificate (German public universities have €0 tuition, only ~€300 semester contribution)',
      acceptedProofTypes: [
        'Official Blocked Account (Sperrkonto) confirmation via Expatrio, Coracle, or Fintiba',
        'Official German Verpflichtungserklärung (formal obligation letter from a sponsor resident in Germany)',
        'DAAD or Erasmus+ scholarship award letters',
        'Liquid bank balance held for 6 months (Ireland / Netherlands)'
      ],
      specialRequirementName: 'Germany: APS Certificate & Sperrkonto',
      specialRequirementDesc: 'Applicants from specified regions (e.g. India, China, Vietnam) must obtain an Akademische Prüfstelle (APS) authenticity certificate before applying for student visa. A Blocked Account holding €11,208 ensures monthly living allowance.'
    },
    steps: [
      {
        stepNumber: 1,
        title: 'Obtain University Admission Letter (Zulassungsbescheid)',
        duration: '2 - 6 weeks',
        description: 'Apply via Uni-Assist or directly to the European university and receive unconditional admission letter.',
        keyDeliverable: 'Admission Letter / Letter of Acceptance'
      },
      {
        stepNumber: 2,
        title: 'Open & Fund Blocked Account (Sperrkonto)',
        duration: '2 - 4 business days',
        description: 'Open a Sperrkonto with an approved provider (Expatrio, Fintiba, Coracle) and deposit €11,208 plus buffer fee.',
        keyDeliverable: 'Official Sperrkonto 06 Blocked Amount Confirmation'
      },
      {
        stepNumber: 3,
        title: 'Secure Statutory Health Insurance',
        duration: '1 day',
        description: 'Register for public health insurance (e.g., Techniker Krankenkasse TK, Barmer, or AOK) or European travel health cover.',
        keyDeliverable: 'Insurance Certificate (M10 Confirmation)'
      },
      {
        stepNumber: 4,
        title: 'Book Embassy / VFS Visa Appointment',
        duration: 'Book 8-12 weeks in advance',
        description: 'Secure slot at German/French/Irish Embassy or VFS Global center for document verification and biometric submission.',
        keyDeliverable: 'Appointment Confirmation Slip'
      },
      {
        stepNumber: 5,
        title: 'Attend Visa Interview & Document Lodgement',
        duration: 'Half day',
        description: 'Present original motivation letter, APS certificate, blocked account proof, and academic dossier to the consular officer.',
        keyDeliverable: 'Consular Receipt and Passport Submission'
      },
      {
        stepNumber: 6,
        title: 'Collect Type D National Visa & Travel',
        duration: '4 - 8 weeks',
        description: 'Receive multi-entry Type D Schengen student visa sticker in your passport. Register local address (Anmeldung in Germany) upon arrival.',
        keyDeliverable: 'Schengen Type D Multi-Entry Visa'
      }
    ],
    documentChecklist: [
      {
        category: 'Admission & Authenticity',
        items: [
          { name: 'University Admission Letter', detail: 'Zulassung or French EEF acceptance letter', critical: true },
          { name: 'APS Certificate (for Germany)', detail: 'Academic authenticity verification by German Embassy APS unit', critical: true },
          { name: 'Curriculum Vitae (CV / Lebenslauf)', detail: 'Chronological CV without unexplained time gaps', critical: true },
          { name: 'Motivation Letter / Statement of Purpose', detail: 'Detailed personal letter stating academic and career reasons', critical: true }
        ]
      },
      {
        category: 'Financial Evidence',
        items: [
          { name: 'Blocked Account (Sperrkonto) Proof (€11,208)', detail: 'Expatrio / Coracle official confirmation letter', critical: true },
          { name: 'Statutory Health Insurance Cover', detail: 'Public health insurance confirmation (TK/Barmer/AOK)', critical: true },
          { name: 'Scholarship Award Letter (if applicable)', detail: 'DAAD, Erasmus Mundus, or Eiffel fellowship', critical: false }
        ]
      },
      {
        category: 'Academic Background',
        items: [
          { name: 'Language Proficiency Certificate', detail: 'IELTS / TOEFL for English-taught, or Goethe / TestDaF for German', critical: true },
          { name: 'All Academic Certificates & Transcripts', detail: 'Apostilled or certified copies of degree and high school records', critical: true }
        ]
      }
    ],
    frequentInterviewQuestions: [
      {
        question: 'Why choose Germany/Europe instead of English-speaking nations like the USA or UK?',
        intent: 'Checks if candidate appreciates European technical excellence and low/no tuition policy.',
        recommendedAnswer: 'Highlight the combination of zero/low tuition, high industrial integration with leaders like BMW, Siemens, and SAP, research funding, and the EU Blue Card immigration pathway.',
        counselorTip: 'State that European universities focus heavily on applied engineering and practical internships.'
      },
      {
        question: 'Do you know any German or French? How will you manage everyday living?',
        intent: 'Assesses cultural adaptation and integration mindset.',
        recommendedAnswer: 'Explain: "While my Master program is 100% taught in English, I have already completed basic A1 German on Duolingo/Goethe Institut and plan to achieve B1 level during my studies to integrate smoothly into local society."',
        counselorTip: 'Showing even basic language enthusiasm (A1 level) greatly impresses the visa officer.'
      },
      {
        question: 'How is your blocked account funded and how will you receive the money?',
        intent: 'Checks procedural understanding of Sperrkonto.',
        recommendedAnswer: 'Confirm that €11,208 has been deposited via your sponsor into the blocked account, which will automatically disburse €934 each month into your local checking account (Girokonto) upon arrival and registration.',
        counselorTip: 'Be familiar with terms like Sperrkonto, Girokonto, and Anmeldung.'
      }
    ]
  }
];
