import { CaseItem } from '../types';

export const mockCases: CaseItem[] = [
  {
    id: 'DEMO-TN-REV-0001',
    caseNumber: 'WP/28914/2026',
    caseTitle: 'Sriperumbudur Landowners Welfare Association vs. State of Tamil Nadu & 3 Others',
    court: 'Madras High Court (Principal Bench, Chennai)',
    courtLevel: 'HIGH_COURT',
    bench: 'Hon’ble First Bench (Chief Justice & Justice Synthetic)',
    caseType: 'Writ Petition (WP)',
    broadCategory: 'CONSTITUTIONAL_WRIT',
    status: 'HEARING_SCHEDULED',
    priority: 'CRITICAL',
    risk: 'CRITICAL',
    filingDate: '2026-01-14',
    nextHearingDate: 'Today (2:15 PM)',
    hearingDate: '2026-10-23',
    department: 'Revenue & Disaster Management',
    district: 'Kanchipuram',
    governmentRole: 'RESPONDENT',
    advocateId: 'adv-01',
    advocateName: 'Thiru. R. Shunmugasundaram (Senior Advocate - Synthetic)',
    advocateDesignation: 'Advocate General',
    instructionsStatus: 'PENDING',
    preparationStatus: 'PENDING',
    preparationNotes: [
      'Collect revised valuation benchmark data from DRO Land Acquisition',
      'Verify social impact survey boundaries with PWD Chief Engineer',
      'Prepare urgent oral mention brief for Hon’ble First Bench today 2:15 PM'
    ],
    officialId: 'off-05',
    officialName: 'Tmt. Kalaiselvi Mohan, IAS (Synthetic)',
    officialDesignation: 'District Collector, Kanchipuram',
    secondaryContact: {
      name: 'Thiru. P. Saravanan, DRO (Land Acquisition)',
      designation: 'Special District Revenue Officer',
      phone: '+91 94450 12044',
      email: 'dro.landacq.kanchi@tn.gov.in',
      role: 'Field Valuation & Revenue Records Officer'
    },
    legalIssue: 'Challenge to Land Acquisition notification under TN Highways Act for Parandur Multi-Modal Logistics Corridor without prior social impact assessment.',
    statuteReference: 'Right to Fair Compensation & Transparency in Land Acquisition (RFCTLARR) Act 2013 read with TN Highways Act 2001',
    governmentOrder: 'G.O. (Ms) No. 412, Revenue Dept, dated 18.08.2025',
    parties: [
      { name: 'Sriperumbudur Landowners Welfare Association', role: 'PETITIONER', isGovernment: false, advocateName: 'Thiru. K.M. Vijayan, Senior Counsel (Synthetic)' },
      { name: 'State of Tamil Nadu, rep. by Chief Secretary', role: 'RESPONDENT', isGovernment: true },
      { name: 'Principal Secretary, Revenue & Disaster Management', role: 'RESPONDENT', isGovernment: true },
      { name: 'District Collector, Kanchipuram', role: 'RESPONDENT', isGovernment: true }
    ],
    aiSummary: {
      whatIsDispute: '142 agriculturists and landholders challenge land demarcation and market value fixation for 680 acres earmarked for the Parandur infrastructure link road.',
      whyGovernmentInvolved: 'State of Tamil Nadu issued the land acquisition notification and appointed the Special DRO as Competent Authority.',
      latestDevelopment: 'Hon’ble High Court orally remarked that dispossessing landowners before deciding rehabilitation objections violates Section 15 of RFCTLARR Act.',
      legalRisk: 'Risk of interim stay halting earthwork tenders worth ₹1,200 Cr if counter-affidavit is not filed today.',
      financialExposure: 'Claimed compensation differential is ₹145 Cr above the administrative award sanctioned.',
      policyImpact: 'Directly impacts timeline of Parandur mega-infrastructure project and establishes precedent for 3 adjacent highway corridors.',
      requiredAction: 'District Collector Kanchipuram must transmit revised compensation benchmark calculations to Advocate General before 1:00 PM today.',
      evidenceConfidence: 94
    },
    risks: {
      legal: 'CRITICAL',
      financial: 'HIGH',
      policy: 'CRITICAL',
      operational: 'HIGH',
      compliance: 'MEDIUM',
      publicService: 'HIGH',
      notes: 'Potential contempt and stay on major state infrastructure asset.'
    },
    financialExposure: {
      claimedAmount: 180.0,
      awardedAmount: 35.0,
      estimatedExposure: 145.0,
      aiEstimatedExposure: 138.5,
      notes: 'Based on guideline value revision challenges across 4 revenue villages.'
    },
    policyImpact: {
      scope: 'Statewide',
      summary: 'Adverse verdict could compel State to redo social impact assessments for 7 other Greenfield logistics hubs.',
      affectedDistricts: ['Kanchipuram', 'Tiruvallur', 'Ranipet'],
      affectedSchemes: ['Parandur Airport Access Expressway', 'SIPCOT Phase IV']
    },
    timeline: [
      { id: 't-1', date: '2026-01-14', event: 'Writ Petition Filed', description: 'Petition filed challenging G.O. (Ms) No. 412.', source: 'High Court Filing Registry', status: 'COMPLETED' },
      { id: 't-2', date: '2026-01-22', event: 'Notice Issued', description: 'Notice to State Respondents returnable in 3 weeks.', source: 'Madras High Court Order Book', status: 'COMPLETED' },
      { id: 't-3', date: '2026-02-05', event: 'Instructions Requested', description: 'Advocate General office sent requisition to Kanchipuram Collector.', source: 'AG Office Brief Log', status: 'COMPLETED' },
      { id: 't-4', date: '2026-10-23', event: 'Special Mention Hearing', description: 'Petitioner pressing for interim status quo order today.', source: 'Daily Cause List (Item 18)', status: 'UPCOMING' }
    ],
    actionItems: [
      { id: 'a-1', action: 'Submit draft counter-affidavit and Collector instructions to AG', owner: 'District Collector, Kanchipuram', department: 'Revenue', dueDate: 'Today, 1:00 PM', priority: 'CRITICAL', status: 'PENDING', source: 'AG Requisition Memo' },
      { id: 'a-2', action: 'Clarify alignment deviation near wetlands with PWD engineers', owner: 'Special DRO (Land Acquisition)', department: 'Revenue', dueDate: 'Tomorrow', priority: 'HIGH', status: 'IN_PROGRESS', source: 'Inter-departmental Note' }
    ],
    similarCaseIds: ['DEMO-TN-REV-0004', 'DEMO-TN-HIGHWAYS-0007']
  },
  {
    id: 'DEMO-TN-HOME-0002',
    caseNumber: 'HCP/1042/2026',
    caseTitle: 'Thiru. Selvam vs. State of Tamil Nadu, rep. by Addl Chief Secretary (Home)',
    court: 'Madras High Court (Principal Bench, Chennai)',
    courtLevel: 'HIGH_COURT',
    bench: 'Hon’ble Division Bench (Criminal Jurisdiction)',
    caseType: 'Writ Petition (WP)',
    broadCategory: 'CRIMINAL',
    status: 'INTERIM_STAY',
    priority: 'CRITICAL',
    risk: 'HIGH',
    filingDate: '2026-01-28',
    nextHearingDate: 'Tomorrow (10:30 AM)',
    hearingDate: '2026-10-24',
    department: 'Home, Prohibition & Excise (Police)',
    district: 'Chennai',
    governmentRole: 'RESPONDENT',
    advocateId: 'adv-01',
    advocateName: 'Thiru. R. Shunmugasundaram (Senior Advocate - Synthetic)',
    advocateDesignation: 'Advocate General',
    instructionsStatus: 'SUBMITTED',
    preparationStatus: 'UPDATED',
    preparationNotes: [
      'Postal tapal receipts cross-verified with GPO Mount Road Chennai',
      'Sworn affidavit of Under Secretary (Home) executed and filed',
      'Counter-affidavit bundle served on detenu counsel'
    ],
    officialId: 'off-02',
    officialName: 'Tmt. S. Malathi, IAS (Synthetic)',
    officialDesignation: 'Additional Chief Secretary (Home)',
    secondaryContact: {
      name: 'Thiru. N. Loganathan',
      designation: 'Under Secretary to Government (Home - Detention Wing)',
      phone: '+91 94444 71209',
      email: 'us.detention.home@tn.gov.in',
      role: 'Secretariat Dispatch Registry Custodian'
    },
    legalIssue: 'Challenge to detention order under Act 14/1982 (Goondas Act) citing 21-day unexplained delay in disposal of representation.',
    statuteReference: 'Tamil Nadu Act 14 of 1982 read with Article 22(5) of Constitution of India',
    governmentOrder: 'Detention Order No. 42/BC/2026 dated 05.01.2026',
    parties: [
      { name: 'Thiru. Selvam (Detenu)', role: 'PETITIONER', isGovernment: false },
      { name: 'State of Tamil Nadu rep. by ACS Home', role: 'RESPONDENT', isGovernment: true },
      { name: 'Commissioner of Police, Greater Chennai', role: 'RESPONDENT', isGovernment: true }
    ],
    aiSummary: {
      whatIsDispute: 'Habeas Corpus Petition seeking quashing of preventive detention order due to administrative delay in processing detenus statutory representation.',
      whyGovernmentInvolved: 'Home Department approved detention without documenting date-to-date reasons for the 21-day interval between receipt and rejection.',
      latestDevelopment: 'Division Bench issued notice with oral warning of cost imposition on the Home Department Secretary.',
      legalRisk: 'High risk of detention order being quashed; would set adverse precedent for 14 similar detention orders passed during the same special drive.',
      financialExposure: 'Nominal court cost risk, but acute public order and executive reputation fallout.',
      policyImpact: 'Directly impacts Home Department SOP on statutory timeline tracking for preventive detention files.',
      requiredAction: 'File sworn affidavit of Under Secretary detailing post office dispatch dates.',
      evidenceConfidence: 91
    },
    risks: {
      legal: 'HIGH',
      financial: 'LOW',
      policy: 'HIGH',
      operational: 'CRITICAL',
      compliance: 'CRITICAL',
      publicService: 'HIGH',
      notes: 'Direct scrutiny of Secretariat file movement by Division Bench.'
    },
    financialExposure: {
      claimedAmount: 0.5,
      estimatedExposure: 0.5,
      aiEstimatedExposure: 0.2,
      notes: 'Litigation costs and prospective compensatory damages.'
    },
    policyImpact: {
      scope: 'Statewide',
      summary: 'May mandate digitisation and hard cut-offs for all district collector detention desks.',
      affectedDistricts: ['Chennai', 'Madurai', 'Tirunelveli']
    },
    timeline: [
      { id: 't-1', date: '2026-01-05', event: 'Detention Order Passed', description: 'Passed by Commissioner of Police.', source: 'CP Chennai Order', status: 'COMPLETED' },
      { id: 't-2', date: '2026-01-28', event: 'HCP Filed', description: 'Filed citing delay in considering representation.', source: 'HC Registry', status: 'COMPLETED' },
      { id: 't-3', date: '2026-02-08', event: 'Adverse Observation', description: 'Division bench directs personal appearance if affidavit not filed.', source: 'Court Proceedings Note', status: 'COMPLETED', isAdverse: true }
    ],
    actionItems: [
      { id: 'a-1', action: 'Furnish Secretariat tapal registry extract to Public Prosecutor', owner: 'Under Secretary (Home - Detention)', department: 'Home', dueDate: 'Today, 5:00 PM', priority: 'CRITICAL', status: 'IN_PROGRESS', source: 'Home Secretary Memo' }
    ],
    similarCaseIds: ['DEMO-TN-HOME-0005']
  },
  {
    id: 'DEMO-TN-EDU-0003',
    caseNumber: 'WA(MD)/891/2026',
    caseTitle: 'State of Tamil Nadu & Another vs. Federation of Aided School Teachers',
    court: 'Madras High Court (Madurai Bench)',
    courtLevel: 'HIGH_COURT',
    bench: 'Hon’ble Division Bench (Writ Appeals)',
    caseType: 'Writ Appeal (WA)',
    broadCategory: 'SERVICE_EMPLOYMENT',
    status: 'ORDERS_RESERVED',
    priority: 'HIGH',
    risk: 'CRITICAL',
    filingDate: '2025-11-10',
    nextHearingDate: 'Next Tuesday (Pronouncement)',
    hearingDate: '2026-10-27',
    department: 'School Education Department',
    district: 'Madurai',
    governmentRole: 'APPELLANT',
    advocateId: 'adv-03',
    advocateName: 'Thiru. Veera Kathiravan (Senior Advocate - Synthetic)',
    advocateDesignation: 'Additional Advocate General',
    instructionsStatus: 'SUBMITTED',
    preparationStatus: 'UPDATED',
    preparationNotes: [
      'Contingency Special Leave Petition (SLP) draft vetted with New Delhi standing counsel',
      'Finance Department fiscal liability memorandum cross-checked',
      'Pupil-teacher ratio compliance records for 2017-2021 compiled for bench'
    ],
    officialId: 'off-03',
    officialName: 'Thiru. P. Senthil Kumar, IAS (Synthetic)',
    officialDesignation: 'Principal Secretary, School Education',
    secondaryContact: {
      name: 'Dr. V. Jayakumar',
      designation: 'Joint Director of School Education (Aided Schools)',
      phone: '+91 94443 19804',
      email: 'jd.aided.edu@tn.gov.in',
      role: 'Staff Grant Approval & Cadre Verification In-Charge'
    },
    legalIssue: 'Regularisation and grant-in-aid eligibility for 4,200 secondary grade teachers appointed in sanctioned surplus posts between 2017 and 2021.',
    statuteReference: 'Tamil Nadu Recognised Private Schools (Regulation) Act 1973 & G.O. (Ms) No. 165',
    governmentOrder: 'G.O. (Ms) No. 165, School Education Dept, dated 17.09.2019',
    parties: [
      { name: 'State of Tamil Nadu rep. by School Education Secretary', role: 'PETITIONER', isGovernment: true },
      { name: 'Federation of Aided School Teachers', role: 'RESPONDENT', isGovernment: false }
    ],
    aiSummary: {
      whatIsDispute: 'State appeals against Single Judge order directing retroactive grant-in-aid disbursement to minority and aided institutions.',
      whyGovernmentInvolved: 'State contends appointments were made in excess of pupil-teacher ratio norms.',
      latestDevelopment: 'Division Bench concluded arguments; reserved orders for final judgment.',
      legalRisk: 'Dismissal of appeal triggers immediate ₹215 Cr arrears liability.',
      financialExposure: '₹215.8 Crores recurring financial burden per annum if regularised.',
      policyImpact: 'Directly restricts state budget allocation for new smart classroom upgrades across 38 districts.',
      requiredAction: 'Finance & Law Departments must prepare contingency Special Leave Petition (SLP) draft before Supreme Court.',
      evidenceConfidence: 96
    },
    risks: {
      legal: 'HIGH',
      financial: 'CRITICAL',
      policy: 'CRITICAL',
      operational: 'MEDIUM',
      compliance: 'HIGH',
      publicService: 'MEDIUM',
      notes: 'Statewide budgetary implications on school education grant allocation.'
    },
    financialExposure: {
      claimedAmount: 240.0,
      awardedAmount: 215.8,
      estimatedExposure: 215.8,
      aiEstimatedExposure: 215.8,
      notes: 'Calculated at 4,200 teachers * 6th Pay Commission salary differential.'
    },
    policyImpact: {
      scope: 'Statewide',
      summary: 'Precedent affects government aided school staffing ratios across all 38 districts of Tamil Nadu.',
      affectedDistricts: ['Madurai', 'Tirunelveli', 'Thanjavur', 'Coimbatore', 'Tiruchirappalli']
    },
    timeline: [
      { id: 't-1', date: '2025-08-14', event: 'Single Judge Adverse Order', description: 'Single Bench directed State to approve appointments within 8 weeks.', source: 'Single Bench Order WP 14210/2024', status: 'COMPLETED', isAdverse: true },
      { id: 't-2', date: '2025-11-10', event: 'Writ Appeal Filed', description: 'State filed WA with stay petition.', source: 'Madurai Bench Registry', status: 'COMPLETED' },
      { id: 't-3', date: '2026-02-01', event: 'Arguments Concluded', description: 'Orders reserved by Division Bench.', source: 'Daily Board Register', status: 'COMPLETED' }
    ],
    actionItems: [
      { id: 'a-1', action: 'Prepare SLP briefing note for New Delhi Standing Counsel', owner: 'Principal Secretary, School Education', department: 'School Education', dueDate: '2026-02-28', priority: 'HIGH', status: 'PENDING', source: 'Law Dept Consultation Note' }
    ],
    similarCaseIds: ['DEMO-TN-EDU-0006']
  },
  {
    id: 'DEMO-TN-MAWS-0004',
    caseNumber: 'WP/34211/2025',
    caseTitle: 'Coimbatore Industrial Effluent Action Group vs. TWAD Board & GCC',
    court: 'National Green Tribunal (Southern Zone)',
    courtLevel: 'TRIBUNALS_COMMISSIONS',
    bench: 'Hon’ble Judicial Member & Expert Member',
    caseType: 'Public Interest Litigation (PIL)',
    broadCategory: 'ENVIRONMENTAL',
    status: 'COMPLIANCE_PENDING',
    priority: 'HIGH',
    risk: 'HIGH',
    filingDate: '2025-10-05',
    nextHearingDate: 'In 3 days',
    hearingDate: '2026-10-26',
    department: 'Municipal Administration & Water Supply',
    district: 'Coimbatore',
    governmentRole: 'RESPONDENT',
    advocateId: 'adv-02',
    advocateName: 'Thiru. J. Ravindran (Senior Advocate - Synthetic)',
    advocateDesignation: 'Additional Advocate General',
    instructionsStatus: 'UNDER_REVIEW',
    preparationStatus: 'IN_PROGRESS',
    preparationNotes: [
      'Inspect geo-tagged photographs of 3 Common Effluent Treatment Plants (CETPs)',
      'Review TWAD Board timeline commitments for Noyyal river desilting',
      'Finalize compliance report with Coimbatore Corporation Legal Officer'
    ],
    officialId: 'off-01',
    officialName: 'Thiru. K. Rajamani, IAS (Synthetic)',
    officialDesignation: 'Principal Secretary',
    secondaryContact: {
      name: 'Thiru. M. Sivaguru Prabakaran, IAS',
      designation: 'Commissioner, Coimbatore City Municipal Corporation',
      phone: '+91 94437 33410',
      email: 'commr.coimbatore@tn.gov.in',
      role: 'Civic Sewage Infrastructure Execution Head'
    },
    legalIssue: 'Alleged discharge of untreated sewage into Noyyal River basin and non-commissioning of 3 STPs.',
    statuteReference: 'Water (Prevention and Control of Pollution) Act 1974 & NGT Act 2010',
    parties: [
      { name: 'Coimbatore Industrial Effluent Action Group', role: 'PETITIONER', isGovernment: false },
      { name: 'Tamil Nadu Water Supply & Drainage (TWAD) Board', role: 'RESPONDENT', isGovernment: true },
      { name: 'Coimbatore City Municipal Corporation', role: 'RESPONDENT', isGovernment: true }
    ],
    aiSummary: {
      whatIsDispute: 'NGT directed compliance audit on 3 Common Effluent Treatment Plants (CETPs) and ₹50 Cr environmental compensation escrow.',
      whyGovernmentInvolved: 'Municipal Corporation operates civic trunk sewer lines connecting the treatment lagoons.',
      latestDevelopment: 'NGT issued conditional stay on industrial unit closures subject to TWAD filing status report.',
      legalRisk: 'Contempt notice and daily default fine of ₹5 Lakhs if status report is delayed.',
      financialExposure: '₹50.0 Crores environmental guarantee bond requested.',
      policyImpact: 'Direct impact on textile processing clusters in Western Tamil Nadu.',
      requiredAction: 'TWAD Managing Director must sign and submit status report with GPS geo-tagged photographs.',
      evidenceConfidence: 89
    },
    risks: {
      legal: 'HIGH',
      financial: 'HIGH',
      policy: 'MEDIUM',
      operational: 'CRITICAL',
      compliance: 'CRITICAL',
      publicService: 'HIGH',
      notes: 'Statutory deadline imposed by Southern Zone NGT.'
    },
    financialExposure: {
      claimedAmount: 50.0,
      awardedAmount: 15.0,
      estimatedExposure: 35.0,
      aiEstimatedExposure: 30.0,
      notes: 'Environmental compensation deposit and STP remediation works.'
    },
    policyImpact: {
      scope: 'Multi-District',
      summary: 'Impacts Coimbatore, Tiruppur, and Erode industrial zones.',
      affectedDistricts: ['Coimbatore', 'Tiruppur', 'Erode']
    },
    timeline: [
      { id: 't-1', date: '2025-10-05', event: 'Application Registered', description: 'Filed before Southern Bench NGT.', source: 'NGT Online Registry', status: 'COMPLETED' },
      { id: 't-2', date: '2025-12-18', event: 'Interim Direction', description: 'Directed joint inspection by CPCB and TNPCB.', source: 'NGT Order', status: 'COMPLETED', isAdverse: true }
    ],
    actionItems: [
      { id: 'a-1', action: 'Upload joint inspection compliance report', owner: 'Commissioner, Coimbatore Corporation', department: 'MAWS', dueDate: 'Tomorrow, 4:00 PM', priority: 'HIGH', status: 'PENDING', source: 'NGT Order Sheet' }
    ],
    similarCaseIds: ['DEMO-TN-ENV-0008']
  },
  {
    id: 'DEMO-TN-HIGHWAYS-0005',
    caseNumber: 'Arb.O.P./419/2025',
    caseTitle: 'South India Infrastructure Concessionaires Ltd vs. Highways Dept, Govt of TN',
    court: 'Madras High Court (Principal Bench, Chennai)',
    courtLevel: 'HIGH_COURT',
    bench: 'Hon’ble Commercial Division (Single Judge)',
    caseType: 'Civil Appeal (CA)',
    broadCategory: 'CIVIL',
    status: 'HEARING_SCHEDULED',
    priority: 'CRITICAL',
    risk: 'CRITICAL',
    filingDate: '2025-07-22',
    nextHearingDate: 'Tomorrow (2:15 PM)',
    hearingDate: '2026-10-24',
    department: 'Highways & Minor Ports',
    district: 'Chennai',
    governmentRole: 'RESPONDENT',
    advocateId: 'adv-04',
    advocateName: 'Thiru. Edwin Prabakar (Synthetic)',
    advocateDesignation: 'Special Government Pleader',
    instructionsStatus: 'PENDING',
    preparationStatus: 'PENDING',
    preparationNotes: [
      'Draft emergency stay motion under Commercial Courts Act Section 13',
      'Obtain bank guarantee sanction note from Finance (Expenditure)',
      'Direct Chief Engineer Highways to furnish contract measurement books'
    ],
    officialId: 'off-01',
    officialName: 'Thiru. K. Rajamani, IAS (Synthetic)',
    officialDesignation: 'Principal Secretary',
    secondaryContact: {
      name: 'Er. R. Murugesan',
      designation: 'Chief Engineer, Highways (C&M)',
      phone: '+91 94440 22180',
      email: 'ce.cnm.highways@tn.gov.in',
      role: 'Project Agreement & Arbitration Cell In-Charge'
    },
    legalIssue: 'Execution petition seeking attachment of Highways Department treasury account to recover ₹240 Cr arbitral award for Ring Road Phase II delay.',
    statuteReference: 'Arbitration and Conciliation Act 1996 (Section 34 & 36)',
    parties: [
      { name: 'South India Infrastructure Concessionaires Ltd', role: 'PETITIONER', isGovernment: false },
      { name: 'State of Tamil Nadu rep. by Principal Secretary (Highways)', role: 'RESPONDENT', isGovernment: true },
      { name: 'Chief Engineer, Highways (Construction & Maintenance)', role: 'RESPONDENT', isGovernment: true }
    ],
    aiSummary: {
      whatIsDispute: 'Contractor seeks attachment of State Treasury accounts for non-deposit of 75% awarded amount under Section 36.',
      whyGovernmentInvolved: 'State failed to file Section 34 challenge within the 90-day statutory limitation window.',
      latestDevelopment: 'Commercial Court granted 48-hour final indulgence before passing garnishee orders.',
      legalRisk: 'Extremely critical risk of bank account freeze or adverse garnishee attachment.',
      financialExposure: '₹240.0 Crores immediate treasury deposit mandated.',
      policyImpact: 'Severely impacts credit rating and contractor confidence across ongoing state infrastructure bids.',
      requiredAction: 'Urgent stay petition and deposit sanction must be approved by Finance Department today.',
      evidenceConfidence: 98
    },
    risks: {
      legal: 'CRITICAL',
      financial: 'CRITICAL',
      policy: 'HIGH',
      operational: 'CRITICAL',
      compliance: 'CRITICAL',
      publicService: 'MEDIUM',
      notes: 'Risk of Treasury account attachment within 48 hours.'
    },
    financialExposure: {
      claimedAmount: 240.0,
      awardedAmount: 240.0,
      estimatedExposure: 240.0,
      aiEstimatedExposure: 240.0,
      notes: 'Arbitral award with 9% interest from date of default.'
    },
    policyImpact: {
      scope: 'Statewide',
      summary: 'Shapes standard dispute resolution clauses in all future State PPP concession agreements.',
      affectedDistricts: ['Chennai', 'Kanchipuram']
    },
    timeline: [
      { id: 't-1', date: '2025-03-12', event: 'Arbitral Award Passed', description: 'Tribunal awarded ₹240 Cr against Highways Dept.', source: 'Arbitral Award Copy', status: 'COMPLETED', isAdverse: true },
      { id: 't-2', date: '2025-07-22', event: 'Execution Petition Filed', description: 'Claimant filed Arb.O.P. 419/2025.', source: 'Commercial Court Diary', status: 'COMPLETED' },
      { id: 't-3', date: '2026-02-18', event: 'Garnishee Warning', description: 'Court issued peremptory warning to deposit funds.', source: 'Hearing Daily Order', status: 'COMPLETED', isAdverse: true }
    ],
    actionItems: [
      { id: 'a-1', action: 'Move emergency motion before Commercial Appellate Division', owner: 'Special GP (Highways)', department: 'Highways', dueDate: 'Today, 2:00 PM', priority: 'CRITICAL', status: 'PENDING', source: 'Law Dept Directive' },
      { id: 'a-2', action: 'Obtain special sanction order from Finance (Expenditure)', owner: 'Principal Secretary (Highways)', department: 'Highways', dueDate: 'Today, 4:00 PM', priority: 'CRITICAL', status: 'IN_PROGRESS', source: 'Chief Secretary Note' }
    ],
    similarCaseIds: ['DEMO-TN-HIGHWAYS-0007']
  },
  {
    id: 'DEMO-TN-TAX-0006',
    caseNumber: 'WP/19082/2025',
    caseTitle: 'Tamil Nadu Manufacturers Alliance vs. Joint Commissioner (Commercial Taxes)',
    court: 'Madras High Court (Principal Bench, Chennai)',
    courtLevel: 'HIGH_COURT',
    bench: 'Hon’ble Tax Bench (Division Bench)',
    caseType: 'Writ Petition (WP)',
    broadCategory: 'REVENUE_TAX',
    status: 'HEARING_SCHEDULED',
    priority: 'HIGH',
    risk: 'HIGH',
    filingDate: '2025-08-19',
    nextHearingDate: 'Next Thursday',
    hearingDate: '2026-10-29',
    department: 'Commercial Taxes / Finance',
    district: 'Chennai',
    governmentRole: 'RESPONDENT',
    advocateId: 'adv-02',
    advocateName: 'Thiru. J. Ravindran (Senior Advocate - Synthetic)',
    advocateDesignation: 'Additional Advocate General',
    instructionsStatus: 'SUBMITTED',
    preparationStatus: 'UPDATED',
    preparationNotes: [
      'Comparative tax reconciliation chart prepared for 48 industrial petitioners',
      'GST Council legal cell precedent rulings collated and bookmarked',
      'Joint counter-affidavit executed by Joint Commissioner (Commercial Taxes)'
    ],
    officialId: 'off-01',
    officialName: 'Thiru. K. Rajamani, IAS (Synthetic)',
    officialDesignation: 'Principal Secretary',
    secondaryContact: {
      name: 'Tmt. K. Geetha',
      designation: 'Joint Commissioner of Commercial Taxes (Legal & Audit)',
      phone: '+91 94445 61120',
      email: 'jc.legal.ct@tn.gov.in',
      role: 'Tax Assessment & Audit Dossier Head'
    },
    legalIssue: 'Challenge to constitutional validity of transitional input tax credit denial circular under TNGST Act.',
    statuteReference: 'Tamil Nadu Goods and Services Tax (TNGST) Act 2017 & Section 140',
    parties: [
      { name: 'Tamil Nadu Manufacturers Alliance', role: 'PETITIONER', isGovernment: false },
      { name: 'State of Tamil Nadu rep. by Secretary (CT&RE)', role: 'RESPONDENT', isGovernment: true },
      { name: 'Joint Commissioner of Commercial Taxes', role: 'RESPONDENT', isGovernment: true }
    ],
    aiSummary: {
      whatIsDispute: 'Writ petition challenging department demand notices disallowing legacy transitional VAT credit offsets.',
      whyGovernmentInvolved: 'State Commercial Taxes department issued deficiency circular restricting input tax credit reconciliation.',
      latestDevelopment: 'Tax division bench posted matter for final arguments along with companion batch of 48 petitions.',
      legalRisk: 'Adverse ruling creates immediate fiscal shortfall of ₹82 Cr in monthly tax receipts.',
      financialExposure: '₹82.5 Crores disputed tax credit recovery across industrial assessee base.',
      policyImpact: 'Directly impacts State fiscal deficit projections and commercial tax audit SOP.',
      requiredAction: 'Commercial Taxes Law Officer to coordinate joint rejoinder with GST Council legal cell.',
      evidenceConfidence: 93
    },
    risks: {
      legal: 'HIGH',
      financial: 'HIGH',
      policy: 'HIGH',
      operational: 'MEDIUM',
      compliance: 'MEDIUM',
      publicService: 'LOW',
      notes: 'State tax revenue stream challenge.'
    },
    financialExposure: {
      claimedAmount: 82.5,
      awardedAmount: 0,
      estimatedExposure: 82.5,
      aiEstimatedExposure: 75.0,
      notes: 'Cumulative disputed input tax credit in Western and Northern manufacturing zones.'
    },
    policyImpact: {
      scope: 'Statewide',
      summary: 'State revenue policy interpretation for transitional credit audit.',
      affectedDistricts: ['Chennai', 'Coimbatore', 'Tiruvallur']
    },
    timeline: [
      { id: 't-1', date: '2025-08-19', event: 'Petition Filed', description: 'Filed before High Court Tax Bench.', source: 'High Court Filing Diary', status: 'COMPLETED' },
      { id: 't-2', date: '2025-11-04', event: 'Counter Filed', description: 'State filed detailed counter affidavit.', source: 'High Court Case Status', status: 'COMPLETED' }
    ],
    actionItems: [
      { id: 'a-1', action: 'Submit batch list compilation to Special Tax Bench', owner: 'Joint Commissioner (Legal)', department: 'Commercial Taxes', dueDate: 'In 4 days', priority: 'MEDIUM', status: 'IN_PROGRESS', source: 'AAG Law Requisition' }
    ],
    similarCaseIds: ['DEMO-TN-REV-0001']
  },
  {
    id: 'DEMO-TN-CRIM-0007',
    caseNumber: 'Crl.O.P./8834/2026',
    caseTitle: 'State rep. by Deputy Superintendent of Police, DVAC vs. A. Sundaram & 2 Others',
    court: 'District & Sessions Court',
    courtLevel: 'DISTRICT_SESSIONS',
    bench: 'Hon’ble Special Judge for Prevention of Corruption Act Cases',
    caseType: 'Civil Appeal (CA)',
    broadCategory: 'CRIMINAL',
    status: 'HEARING_SCHEDULED',
    priority: 'MEDIUM',
    risk: 'MEDIUM',
    filingDate: '2024-03-11',
    nextHearingDate: 'Next Wednesday',
    hearingDate: '2026-10-28',
    department: 'Home, Prohibition & Excise (Police)',
    district: 'Madurai',
    governmentRole: 'PETITIONER',
    advocateId: 'adv-06',
    advocateName: 'Thiru. A. Selvendran (Synthetic)',
    advocateDesignation: 'Special Government Pleader',
    instructionsStatus: 'SUBMITTED',
    preparationStatus: 'UPDATED',
    preparationNotes: [
      'Original G.O. Ms sanction order secured from Vigilance Commissioner custody',
      'Material objects and tender measurement registers verified with Court Sheristadar',
      'Draft charge framing questionnaire handed to Special Public Prosecutor'
    ],
    officialId: 'off-06',
    officialName: 'Thiru. M.S. Sangeetha, IAS (Synthetic)',
    officialDesignation: 'District Collector, Madurai',
    secondaryContact: {
      name: 'Thiru. K. Paneerselvam, DSP',
      designation: 'Deputy Superintendent of Police, DVAC Madurai Detachment',
      phone: '+91 94432 88120',
      email: 'dsp.dvac.madurai@tn.gov.in',
      role: 'Investigating Officer & Evidence Custodian'
    },
    legalIssue: 'Prosecution sanction challenge under Section 19 of Prevention of Corruption Act for public works contract irregularities.',
    statuteReference: 'Prevention of Corruption Act 1988 (as amended 2018)',
    parties: [
      { name: 'State of Tamil Nadu rep. by DSP DVAC Madurai', role: 'PETITIONER', isGovernment: true },
      { name: 'A. Sundaram (Former Superintending Engineer)', role: 'RESPONDENT', isGovernment: false }
    ],
    aiSummary: {
      whatIsDispute: 'Accused challenges competency of sanctioning authority approving chargesheet.',
      whyGovernmentInvolved: 'State DVAC investigating agency is prosecuting anti-corruption proceedings.',
      latestDevelopment: 'Special Court posted case for framing of charges after dismissing discharge petition.',
      legalRisk: 'Delay in sanction documentation could cause discharge of prime accused.',
      financialExposure: '₹4.2 Crores public exchequer recovery involved in tender diversion.',
      policyImpact: 'Strengthens vigilance protocol in municipal and public works engineering sanction.',
      requiredAction: 'Vigilance Directorate must produce original Secretariat sanction file.',
      evidenceConfidence: 92
    },
    risks: {
      legal: 'MEDIUM',
      financial: 'LOW',
      policy: 'MEDIUM',
      operational: 'MEDIUM',
      compliance: 'HIGH',
      publicService: 'HIGH',
      notes: 'DVAC prosecution integrity in southern districts.'
    },
    financialExposure: {
      claimedAmount: 4.2,
      estimatedExposure: 4.2,
      aiEstimatedExposure: 4.2,
      notes: 'Misappropriated contract advances under recovery.'
    },
    policyImpact: {
      scope: 'District',
      summary: 'Trial scrutiny on local administrative sanctioning procedure.',
      affectedDistricts: ['Madurai', 'Dindigul']
    },
    timeline: [
      { id: 't-1', date: '2024-03-11', event: 'Chargesheet Filed', description: 'Filed before Special Judge DVAC.', source: 'Court Record', status: 'COMPLETED' },
      { id: 't-2', date: '2025-09-15', event: 'Discharge Petition Dismissed', description: 'Special Judge rejected discharge plea.', source: 'Special Court Order', status: 'COMPLETED' }
    ],
    actionItems: [
      { id: 'a-1', action: 'Produce certified G.O. sanction copy in court', owner: 'DSP, DVAC Madurai', department: 'Home', dueDate: 'Next Monday', priority: 'MEDIUM', status: 'PENDING', source: 'Special PP Memo' }
    ],
    similarCaseIds: ['DEMO-TN-HOME-0002']
  },
  {
    id: 'DEMO-TN-SC-0008',
    caseNumber: 'SLP(C) No. 4192/2026',
    caseTitle: 'State of Tamil Nadu & Others vs. Southern Granite Exporters Forum',
    court: 'Supreme Court of India',
    courtLevel: 'SUPREME_COURT',
    bench: 'Hon’ble Court No. 3 (Three-Judge Bench)',
    caseType: 'Special Leave Petition (SLP)',
    broadCategory: 'CIVIL',
    status: 'HEARING_SCHEDULED',
    priority: 'CRITICAL',
    risk: 'CRITICAL',
    filingDate: '2025-12-02',
    nextHearingDate: 'Next Friday',
    hearingDate: '2026-10-30',
    department: 'Revenue & Disaster Management',
    district: 'Madurai',
    governmentRole: 'APPELLANT',
    advocateId: 'adv-01',
    advocateName: 'Thiru. R. Shunmugasundaram (Senior Advocate - Synthetic)',
    advocateDesignation: 'Advocate General',
    instructionsStatus: 'SUBMITTED',
    preparationStatus: 'PENDING',
    preparationNotes: [
      'Collate drone photogrammetry quarry lease boundary maps from Madurai Collector',
      'Obtain penalty recalculation certified balance sheet from Director of Geology & Mining',
      'Prepare comprehensive briefing note for New Delhi Senior Advocate'
    ],
    officialId: 'off-01',
    officialName: 'Thiru. K. Rajamani, IAS (Synthetic)',
    officialDesignation: 'Principal Secretary',
    secondaryContact: {
      name: 'Thiru. S. Balasubramanian',
      designation: 'Director of Geology & Mining, Guindy',
      phone: '+91 94441 33092',
      email: 'dir.geology@tn.gov.in',
      role: 'State Mineral Royalty Assessment & Enforcement Chief'
    },
    legalIssue: 'Levy of enhanced seigniorage fee and dead rent on quarrying leases beyond permitted lease acreage.',
    statuteReference: 'Mines and Minerals (Development and Regulation) Act 1957 & TN Minor Mineral Concession Rules 1959',
    parties: [
      { name: 'State of Tamil Nadu rep. by Principal Secretary (Industries/Mines)', role: 'PETITIONER', isGovernment: true },
      { name: 'Southern Granite Exporters Forum', role: 'RESPONDENT', isGovernment: false }
    ],
    aiSummary: {
      whatIsDispute: 'State challenges High Court Division Bench judgment restricting penalty recovery to 2x royalty instead of 15x statutory multiplier.',
      whyGovernmentInvolved: 'State exchequer royalty demand of ₹310 Cr stayed.',
      latestDevelopment: 'Supreme Court issued notice on SLP and granted interim stay on High Court order.',
      legalRisk: 'Extremely critical: Affects mining revenue across Madurai, Salem, and Krishnagiri granite belts.',
      financialExposure: '₹310.0 Crores pending penalty recovery.',
      policyImpact: 'Directly dictates the regulatory enforcement power of the State Department of Geology and Mining.',
      requiredAction: 'File rejoinder affidavit on survey boundaries before Supreme Court registrar.',
      evidenceConfidence: 97
    },
    risks: {
      legal: 'CRITICAL',
      financial: 'CRITICAL',
      policy: 'CRITICAL',
      operational: 'HIGH',
      compliance: 'HIGH',
      publicService: 'MEDIUM',
      notes: 'Supreme Court bench review of State mineral regulatory authority.'
    },
    financialExposure: {
      claimedAmount: 310.0,
      awardedAmount: 0,
      estimatedExposure: 310.0,
      aiEstimatedExposure: 295.0,
      notes: 'Statewide penal royalties demanded under Rule 36-A.'
    },
    policyImpact: {
      scope: 'Statewide',
      summary: 'Constitutional interpretation of State powers under MMDR Act.',
      affectedDistricts: ['Madurai', 'Salem', 'Krishnagiri', 'Dharmapuri']
    },
    timeline: [
      { id: 't-1', date: '2025-12-02', event: 'SLP Lodged', description: 'Filed through New Delhi Standing Counsel.', source: 'Supreme Court Registry', status: 'COMPLETED' },
      { id: 't-2', date: '2026-01-18', event: 'Notice & Interim Stay', description: 'Three-Judge Bench stayed High Court verdict.', source: 'Supreme Court Order Record', status: 'COMPLETED' }
    ],
    actionItems: [
      { id: 'a-1', action: 'Brief Senior Advocate on survey maps', owner: 'Director of Geology & Mining', department: 'Revenue', dueDate: 'In 5 days', priority: 'CRITICAL', status: 'IN_PROGRESS', source: 'Law Dept SLP Cell' }
    ],
    similarCaseIds: ['DEMO-TN-REV-0001']
  }
];
