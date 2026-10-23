import { ExecutiveBriefItem, WhatChangedMetric, NotificationItem, ReportTemplate } from '../types';

export const mockExecutiveBriefs: ExecutiveBriefItem[] = [
  {
    id: 'brief-01',
    department: 'Revenue & Disaster Management',
    caseId: 'DEMO-TN-REV-0001',
    title: 'Parandur Logistics Corridor - Land Acquisition Challenge',
    matterWhyItMatters: 'Interim stay sought today by 142 landowners threatens ₹1,200 Cr highway tender packages.',
    latestDevelopment: 'Hon’ble First Bench granted time until 2:15 PM today for Advocate General to produce revised award parameters.',
    requiredAction: 'District Collector Kanchipuram must transmit instructions with G.O. justification to AG Office before 1:00 PM.',
    owner: 'District Collector, Kanchipuram / AG',
    dueDate: 'Today (2:15 PM)',
    priority: 'CRITICAL',
    hearingStatus: 'Hearing Today (Item 18)',
    evidenceRef: 'Madras HC Daily Cause List WP/28914/2026'
  },
  {
    id: 'brief-02',
    department: 'Highways & Minor Ports',
    caseId: 'DEMO-TN-HIGHWAYS-0005',
    title: 'Chennai Ring Road Concessionaire Garnishee Warning',
    matterWhyItMatters: 'Risk of Commercial Court attaching State Treasury accounts for ₹240 Cr arbitral award enforcement.',
    latestDevelopment: '48-hour final indulgence granted to file deposit undertaking or obtain appellate stay.',
    requiredAction: 'File emergency LPA/Writ Appeal before Commercial Appellate Bench and tender bank guarantee.',
    owner: 'Principal Secretary (Highways) & Law Secretary',
    dueDate: 'Tomorrow (2:15 PM)',
    priority: 'CRITICAL',
    hearingStatus: 'Hearing Tomorrow (Item 3)',
    evidenceRef: 'Commercial Court Arb.O.P./419/2025 Order'
  },
  {
    id: 'brief-03',
    department: 'Home (Police)',
    caseId: 'DEMO-TN-HOME-0002',
    title: 'Preventive Detention (Goondas Act) Procedural Delay Review',
    matterWhyItMatters: 'Division bench threatened personal appearance of Secretary over 21-day representation lag.',
    latestDevelopment: 'Notice returnable tomorrow morning; quashing would jeopardize 14 companion detentions.',
    requiredAction: 'Furnish sworn affidavit explaining post-dispatch tracking numbers to Public Prosecutor.',
    owner: 'Additional Chief Secretary (Home)',
    dueDate: 'Tomorrow (10:30 AM)',
    priority: 'HIGH',
    hearingStatus: 'Hearing Tomorrow (Item 8)',
    evidenceRef: 'HCP/1042/2026 Case Diary Record'
  },
  {
    id: 'brief-04',
    department: 'School Education',
    caseId: 'DEMO-TN-EDU-0003',
    title: 'Aided School Teachers Regularisation Liability (4,200 Posts)',
    matterWhyItMatters: 'Pronouncement of reserved judgment expected; financial exposure exceeds ₹215 Cr annually.',
    latestDevelopment: 'Division Bench listed matter for final judgment pronouncement next Tuesday.',
    requiredAction: 'Brief Supreme Court Standing Counsel in New Delhi with SLP grounds.',
    owner: 'Principal Secretary (School Education)',
    dueDate: 'Next Tuesday',
    priority: 'HIGH',
    hearingStatus: 'Orders Reserved for Pronouncement',
    evidenceRef: 'Madurai Bench WA(MD)/891/2026 Order Sheet'
  },
  {
    id: 'brief-05',
    department: 'Municipal Administration (MAWS)',
    caseId: 'DEMO-TN-MAWS-0004',
    title: 'NGT Southern Bench - Industrial Effluent Discharge & STPs',
    matterWhyItMatters: 'Default fine of ₹5 Lakh/day and closure notice on municipal pump stations threatened.',
    latestDevelopment: 'Joint inspection committee filed preliminary report pointing out bypass overflows.',
    requiredAction: 'Coimbatore Corporation Commissioner must file time-bound remediation affidavit.',
    owner: 'Commissioner, Coimbatore Corporation',
    dueDate: 'In 3 Days',
    priority: 'HIGH',
    hearingStatus: 'Statutory Compliance List',
    evidenceRef: 'NGT Application No. 34211/2025 Registry'
  }
];

export const mockWhatChangedMetrics: WhatChangedMetric[] = [
  { label: 'New Cases Filed', count: 18, trend: 'UP', description: 'Fresh writ petitions & appeals logged across forums', routeFilter: 'new' },
  { label: 'Adverse Orders / Warnings', count: 4, trend: 'UP', description: 'Stay orders, garnishee warnings & contempt notices', routeFilter: 'adverse' },
  { label: 'Urgent Hearings Scheduled', count: 9, trend: 'UP', description: 'Special mentions and fixed-time matters today/tomorrow', routeFilter: 'hearings' },
  { label: 'Compliance Deadlines', count: 3, trend: 'STABLE', description: 'Court-mandated time limits expiring in 72 hours', routeFilter: 'compliance' },
  { label: 'Policy Clusters Detected', count: 2, trend: 'UP', description: 'Coordinated litigation spanning 3+ districts', routeFilter: 'policy' },
  { label: 'Matters Disposed / Closed', count: 7, trend: 'DOWN', description: 'Cases resolved in favor of the State this week', routeFilter: 'disposed' }
];

export const mockNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Hearing Today (2:15 PM): Parandur Land Acquisition',
    description: 'Special Mention before Hon’ble First Bench. Kanchipuram Collector instructions awaited.',
    category: 'HEARING',
    severity: 'CRITICAL',
    timestamp: '25 mins ago',
    caseId: 'DEMO-TN-REV-0001',
    department: 'Revenue & Disaster Management',
    read: false
  },
  {
    id: 'notif-2',
    title: 'Adverse Notice: Commercial Court Garnishee Warning',
    description: 'Highways Dept accounts face attachment risk for ₹240 Cr award unless stay obtained.',
    category: 'ADVERSE_ORDER',
    severity: 'CRITICAL',
    timestamp: '1 hour ago',
    caseId: 'DEMO-TN-HIGHWAYS-0005',
    department: 'Highways & Minor Ports',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Statutory Deadline: NGT Compliance Report (72h)',
    description: 'TWAD Board and Coimbatore Corporation required to deposit environmental escrow.',
    category: 'COMPLIANCE',
    severity: 'HIGH',
    timestamp: '3 hours ago',
    caseId: 'DEMO-TN-MAWS-0004',
    department: 'MAWS',
    read: false
  },
  {
    id: 'notif-4',
    title: 'Instructions Pending from Home Department',
    description: 'ACS Home requested to supply tapal dispatch tracking to Public Prosecutor.',
    category: 'INSTRUCTIONS_PENDING',
    severity: 'HIGH',
    timestamp: '4 hours ago',
    caseId: 'DEMO-TN-HOME-0002',
    department: 'Home',
    read: true
  },
  {
    id: 'notif-5',
    title: 'Statewide Policy Cluster: Aided School Teacher Ratio',
    description: 'Madurai Bench reserved orders affecting 4,200 teachers and ₹215 Cr annual budget.',
    category: 'POLICY_RISK',
    severity: 'CRITICAL',
    timestamp: '6 hours ago',
    caseId: 'DEMO-TN-EDU-0003',
    department: 'School Education',
    read: true
  }
];

export const mockReports: ReportTemplate[] = [
  {
    id: 'rep-cm-daily',
    title: "Chief Minister's Daily Litigation Brief",
    category: 'CM Office',
    description: 'One-page synthesized situational briefing on urgent hearings, adverse orders, and instructions pending today.',
    frequency: 'Daily',
    lastGenerated: 'Today, 06:00 AM',
    downloadSize: '1.4 MB PDF'
  },
  {
    id: 'rep-cm-weekly',
    title: "Chief Minister's Weekly Policy Impact Matrix",
    category: 'CM Office',
    description: 'Analysis of statewide legal risks, emerging writ petition clusters, and department-wise financial exposure.',
    frequency: 'Weekly',
    lastGenerated: 'Yesterday, 08:30 PM',
    downloadSize: '3.8 MB PDF'
  },
  {
    id: 'rep-cs-accountability',
    title: 'Chief Secretary Compliance & Accountability Report',
    category: 'Chief Secretary',
    description: 'Audit of department Secretaries and District Collectors with delayed instructions and pending contempt replies.',
    frequency: 'Fortnightly',
    lastGenerated: '2 days ago',
    downloadSize: '2.9 MB PDF'
  },
  {
    id: 'rep-advocate-workload',
    title: 'Government Advocate Allocation & Matter Density',
    category: 'Law Department',
    description: 'Caseload distribution across Advocate General, Additional AGs, Special GPs, and Standing Counsels.',
    frequency: 'Monthly',
    lastGenerated: '1 week ago',
    downloadSize: '4.2 MB PDF'
  },
  {
    id: 'rep-financial-exposure',
    title: 'Statewide Financial Litigation Exposure Summary',
    category: 'Risk & Compliance',
    description: 'Actuarial breakdown of claimed damages, arbitral awards, land compensation differentials, and contingent liabilities.',
    frequency: 'Monthly',
    lastGenerated: '3 days ago',
    downloadSize: '5.1 MB PDF'
  },
  {
    id: 'rep-adverse-orders',
    title: 'Statewide Adverse Orders & Contempt Notices Digest',
    category: 'Court Analysis',
    description: 'Comprehensive compilation of all interim stays, strictures, and contempt notices issued across all 38 districts.',
    frequency: 'Weekly',
    lastGenerated: 'Yesterday',
    downloadSize: '2.1 MB PDF'
  }
];
