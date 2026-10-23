// Core Domain Models for Tamil Nadu Government Litigation Intelligence Platform

export type Priority = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type RiskLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type CaseStatus = 'PENDING' | 'HEARING_SCHEDULED' | 'ORDERS_RESERVED' | 'INTERIM_STAY' | 'COMPLIANCE_PENDING' | 'DISPOSED' | 'APPEAL_FILED';
export type CaseBroadCategory = 'CIVIL' | 'CRIMINAL' | 'CONSTITUTIONAL_WRIT' | 'REVENUE_TAX' | 'SERVICE_EMPLOYMENT' | 'ENVIRONMENTAL';
export type CourtLevelType = 'SUPREME_COURT' | 'HIGH_COURT' | 'DISTRICT_SESSIONS' | 'LOWER_COURTS' | 'TRIBUNALS_COMMISSIONS';
export type CourtForum = 
  | 'Supreme Court of India'
  | 'Madras High Court (Principal Bench, Chennai)'
  | 'Madras High Court (Madurai Bench)'
  | 'District & Sessions Court'
  | 'Sub Court'
  | 'National Green Tribunal (Southern Zone)'
  | 'Central Administrative Tribunal'
  | 'Commercial Court';

export interface TimelineEvent {
  id: string;
  date: string;
  event: string;
  description: string;
  source: string;
  status: 'COMPLETED' | 'PENDING' | 'UPCOMING';
  orderSummary?: string;
  isAdverse?: boolean;
}

export interface ActionItem {
  id: string;
  action: string;
  owner: string;
  department: string;
  dueDate: string;
  priority: Priority;
  status: 'PENDING' | 'IN_PROGRESS' | 'OVERDUE' | 'COMPLETED';
  source: string;
}

export interface CaseParty {
  name: string;
  role: 'PETITIONER' | 'RESPONDENT' | 'INTERVENOR';
  isGovernment: boolean;
  advocateName?: string;
}

export interface CaseItem {
  id: string; // e.g. DEMO-TN-REV-001
  caseNumber: string; // e.g. WP(MD)/14820/2026
  caseTitle: string;
  court: CourtForum;
  bench: string;
  caseType: 'Writ Petition (WP)' | 'Writ Appeal (WA)' | 'Contempt Petition (CP)' | 'Special Leave Petition (SLP)' | 'Civil Appeal (CA)' | 'Public Interest Litigation (PIL)';
  broadCategory: CaseBroadCategory;
  courtLevel: CourtLevelType;
  status: CaseStatus;
  priority: Priority;
  risk: RiskLevel;
  filingDate: string;
  nextHearingDate?: string; // Textual, e.g. "Today (2:15 PM)" or "Tomorrow (10:30 AM)"
  hearingDate?: string; // Standard ISO date YYYY-MM-DD for judicial calendar
  department: string;
  district: string;
  governmentRole: 'RESPONDENT' | 'PETITIONER' | 'APPELLANT';
  
  // Personnel
  advocateId: string;
  advocateName: string;
  advocateDesignation: string;
  instructionsStatus: 'PENDING' | 'SUBMITTED' | 'UNDER_REVIEW' | 'NOT_REQUESTED';
  preparationStatus?: 'UPDATED' | 'PENDING' | 'IN_PROGRESS';
  preparationNotes?: string[];
  
  officialId: string;
  officialName: string;
  officialDesignation: string;
  secondaryContact?: {
    name: string;
    designation: string;
    phone: string;
    email: string;
    role: string;
  };

  // Substance
  legalIssue: string;
  statuteReference: string;
  governmentOrder?: string;
  parties: CaseParty[];

  // Executive & AI Summaries
  aiSummary: {
    whatIsDispute: string;
    whyGovernmentInvolved: string;
    latestDevelopment: string;
    legalRisk: string;
    financialExposure: string;
    policyImpact: string;
    requiredAction: string;
    evidenceConfidence: number; // 0-100
  };

  // Risks & Exposure
  risks: {
    legal: RiskLevel;
    financial: RiskLevel;
    policy: RiskLevel;
    operational: RiskLevel;
    compliance: RiskLevel;
    publicService: RiskLevel;
    notes: string;
  };

  financialExposure: {
    claimedAmount: number; // in Crores
    awardedAmount?: number;
    estimatedExposure: number;
    aiEstimatedExposure: number;
    notes: string;
  };

  policyImpact: {
    scope: 'Local' | 'District' | 'Multi-District' | 'Statewide';
    summary: string;
    affectedDistricts?: string[];
    affectedSchemes?: string[];
  };

  timeline: TimelineEvent[];
  actionItems: ActionItem[];
  similarCaseIds: string[];
}

export interface DepartmentItem {
  id: string;
  code: string;
  name: string;
  secretaryName: string;
  activeCases: number;
  criticalCases: number;
  highPriorityCases: number;
  adverseOrders: number;
  hearingsThisWeek: number;
  instructionsPending: number;
  financialExposureCr: number;
  policyRiskLevel: RiskLevel;
  primaryLegalThemes: string[];
  description: string;
}

export interface DistrictItem {
  id: string;
  name: string;
  headquarters: string;
  collectorName: string;
  activeCases: number;
  criticalMatters: number;
  highPriority: number;
  upcomingHearings: number;
  adverseOrders: number;
  financialExposureCr: number;
  dominantIssues: string[];
}

export interface AdvocateItem {
  id: string;
  name: string;
  designation: 'Advocate General' | 'Additional Advocate General' | 'Special Government Pleader' | 'Government Pleader' | 'Additional Government Pleader' | 'Standing Counsel';
  court: CourtForum;
  activeMatters: number;
  upcomingHearings: number;
  instructionsPending: number;
  adverseOrders: number;
  departments: string[];
  standingExperienceYears: number;
  phone?: string;
  officeLocation: string;
}

export interface OfficialContactDetails {
  officialPhone: string;
  campOfficePhone?: string;
  directEmail: string;
  secTapalEmail: string;
  officialAddress: string;
  residentialAddress: string;
  paContactName?: string;
  paContactPhone?: string;
}

export interface OfficialItem {
  id: string;
  name: string;
  designation: string;
  department: string;
  district: string;
  activeMatters: number;
  criticalMatters: number;
  pendingActions: number;
  cadre: 'IAS' | 'IPS' | 'DRO' | 'Joint Secretary' | 'Director' | 'Department Official';
  postingDate: string;
  contactDetails: OfficialContactDetails;
  hierarchy: {
    reportsTo: string; // e.g. "Chief Secretary to Government"
    supervises: string[]; // e.g. ["Special DRO (Land Acquisition)", "Tahsildar Sriperumbudur"]
    nodalLawOfficer: string; // e.g. "Advocate General / Special GP"
  };
  priorPostings: Array<{
    role: string;
    period: string;
    district: string;
  }>;
}

export interface ExecutiveBriefItem {
  id: string;
  department: string;
  caseId: string;
  title: string;
  matterWhyItMatters: string;
  latestDevelopment: string;
  requiredAction: string;
  owner: string;
  dueDate: string;
  priority: Priority;
  hearingStatus: string;
  evidenceRef: string;
}

export interface WhatChangedMetric {
  label: string;
  count: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
  description: string;
  routeFilter?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  category: 'HEARING' | 'ADVERSE_ORDER' | 'COMPLIANCE' | 'INSTRUCTIONS_PENDING' | 'POLICY_RISK';
  severity: Priority;
  timestamp: string;
  caseId?: string;
  department?: string;
  read: boolean;
}

export interface ReportTemplate {
  id: string;
  title: string;
  category: 'CM Office' | 'Chief Secretary' | 'Law Department' | 'Departmental' | 'Court Analysis' | 'Risk & Compliance';
  description: string;
  frequency: 'Daily' | 'Weekly' | 'Fortnightly' | 'Monthly' | 'Ad-hoc';
  lastGenerated: string;
  downloadSize: string;
}
