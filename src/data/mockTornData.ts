import { Candidate, RecruitmentTemplate, ExcludeItem, ApiKeyItem } from '../types/torn';

export const INITIAL_API_KEYS: ApiKeyItem[] = [
  {
    key: 'TORN_PUB_DEMO_KEY_ALPHA1',
    label: 'Primary Public Key (Alpha)',
    addedAt: '2026-09-20',
    callsThisMinute: 14,
    maxPerMinute: 100,
    errorCount: 0,
    isRateLimited: false,
    status: 'active'
  },
  {
    key: 'TORN_PUB_DEMO_KEY_BETA2',
    label: 'Secondary Key (Director Alt)',
    addedAt: '2026-09-22',
    callsThisMinute: 6,
    maxPerMinute: 100,
    errorCount: 0,
    isRateLimited: false,
    status: 'active'
  }
];

export const INITIAL_EXCLUDE_LIST: ExcludeItem[] = [
  { id: 1849201, name: 'IronVanguard', reason: 'Faction Member', addedAt: '2026-09-18' },
  { id: 2490192, name: 'ShadowCourier', reason: 'Friend', addedAt: '2026-09-19' },
  { id: 3109281, name: 'ApexLogistics_Dir', reason: 'Allied Company', addedAt: '2026-09-21' }
];

export const INITIAL_TEMPLATES: RecruitmentTemplate[] = [
  {
    id: 'sweet_shop_10star',
    name: '10* Sweet Shop (Free Daily Trains + 200k)',
    category: 'Company Director',
    companyName: 'Sweet Tooth Empire [10★]',
    salary: '$200,000/day',
    trainsPerDay: 2,
    subject: 'Open Spot at Sweet Tooth Empire 10★',
    body: `Hey [NAME]! I noticed you are currently looking for a high-performance company.

We have an opening at [COMPANY_NAME]! We offer:
• [SALARY] guaranteed daily pay
• Guaranteed [TRAINS] free company training rotations per day
• Full 10-star perks (Energy cans + Happy jumps)
• Active, friendly Discord server with company contests

Your current stats ([MAN] MAN / [INT] INT / [END] END — [TOTAL_STATS] total) are an ideal match for our current opening.

Would love to have you onboard! Let me know if you would like an invite or if you have any questions.

Best,
[DIRECTOR_NAME]`
  },
  {
    id: 'oil_rig_heavy',
    name: 'Oil Rig / Mining Specialist Pitch',
    category: 'High Pay / Trains',
    companyName: 'Titan Deep Drilling Co.',
    salary: '$750,000/day',
    trainsPerDay: 3,
    subject: 'High Earner Vacancy - Titan Deep Drilling',
    body: `Hi [NAME],

Saw your profile and work stats ([TOTAL_STATS] total stats: [MAN] MAN, [INT] INT, [END] END). We are looking for dependable, active staff at [COMPANY_NAME].

We provide [SALARY] straight to your cashier, high train rotation, and zero inactivity tolerance so our stars stay maxed.

If you are ready for a serious upgrade, reply here or hit me up in chat!

Cheers!`
  },
  {
    id: 'starter_growth',
    name: 'Starter Friendly Growth Hub (Fast Stat Boost)',
    category: 'Starter Friendly',
    companyName: 'Neon City Logistics',
    salary: '$75,000/day',
    trainsPerDay: 1,
    subject: 'Fast-track your Torn work stats!',
    body: `Hey [NAME],

Looking for your first solid company or stepping out of city jobs? [COMPANY_NAME] specializes in rapid stat growth for newer active players!

We provide free daily training, friendly advice, and steady pay ([SALARY]). No crazy requirements—just log in and work!

Interested in joining us? Let me know and I will send an official contract right away.`
  }
];

export const MOCK_POOL_CANDIDATES: Candidate[] = [
  {
    id: 2841904,
    name: 'ViperStrike',
    level: 42,
    lastAction: 'Online (2m ago)',
    lastActionTimestamp: Date.now() - 120000,
    stats: { manual: 18500, intelligence: 14200, endurance: 22800, total: 55500 },
    employment: { type: 'unemployed', title: 'Unemployed' },
    status: 'not_contacted',
    notes: 'High endurance candidate, looking for daily trains.',
    dmsOpen: true
  },
  {
    id: 1958203,
    name: 'NightHawk_X',
    level: 38,
    lastAction: 'Idle (11m ago)',
    lastActionTimestamp: Date.now() - 660000,
    stats: { manual: 24100, intelligence: 9800, endurance: 16400, total: 50300 },
    employment: { type: 'city', title: 'Grocer (Store Clerk)' },
    status: 'not_contacted',
    notes: 'Currently in city Grocer job, eager for private company perks.',
    dmsOpen: true
  },
  {
    id: 3129482,
    name: 'CyberRonin',
    level: 56,
    lastAction: 'Online (4m ago)',
    lastActionTimestamp: Date.now() - 240000,
    stats: { manual: 31200, intelligence: 28900, endurance: 35100, total: 95200 },
    employment: { type: 'unemployed', title: 'Unemployed' },
    status: 'contacted',
    lastContactedAt: '2026-09-23 18:45',
    templateUsed: '10* Sweet Shop (Free Daily Trains + 200k)',
    notes: 'Sent initial DM pitch. Said he would decide after weekly chain ends.',
    dmsOpen: true
  },
  {
    id: 2548190,
    name: 'KiraNova',
    level: 29,
    lastAction: '1 hour ago',
    lastActionTimestamp: Date.now() - 3600000,
    stats: { manual: 8400, intelligence: 19500, endurance: 11200, total: 39100 },
    employment: { type: 'city', title: 'Medical (Nurse)' },
    status: 'not_contacted',
    notes: 'High intelligence stat, suitable for Medical / Law Firm / Logistics.',
    dmsOpen: false
  },
  {
    id: 2991823,
    name: 'RustBlade',
    level: 48,
    lastAction: '3 hours ago',
    lastActionTimestamp: Date.now() - 10800000,
    stats: { manual: 42000, intelligence: 12000, endurance: 38000, total: 92000 },
    employment: { type: 'company', title: 'Car Dealership', companyName: 'Rusty Motors', isPlayerOwned: true },
    status: 'not_contacted',
    notes: 'At low-star car dealership, might jump ship for better pay.',
    dmsOpen: true
  },
  {
    id: 3410294,
    name: 'GhostProtocol',
    level: 22,
    lastAction: 'Online (now)',
    lastActionTimestamp: Date.now() - 30000,
    stats: { manual: 9100, intelligence: 7800, endurance: 11400, total: 28300 },
    employment: { type: 'unemployed', title: 'Unemployed' },
    status: 'not_contacted',
    notes: 'Newer player, perfect for Starter training camp.',
    dmsOpen: true
  },
  {
    id: 1749201,
    name: 'AeroDynamics',
    level: 63,
    lastAction: '5 hours ago',
    lastActionTimestamp: Date.now() - 18000000,
    stats: { manual: 54000, intelligence: 62000, endurance: 58000, total: 174000 },
    employment: { type: 'unemployed', title: 'Unemployed' },
    status: 'interviewing',
    lastContactedAt: '2026-09-22 14:10',
    notes: 'Negotiating salary. Wants 3 trains per day and 500k.',
    dmsOpen: true
  },
  {
    id: 2819401,
    name: 'SteelMaverick',
    level: 35,
    lastAction: '1 day ago',
    lastActionTimestamp: Date.now() - 86400000,
    stats: { manual: 21500, intelligence: 16800, endurance: 24300, total: 62600 },
    employment: { type: 'city', title: 'Army (Sergeant)' },
    status: 'not_contacted',
    notes: 'Army city job, solid endurance foundation.',
    dmsOpen: true
  }
];
