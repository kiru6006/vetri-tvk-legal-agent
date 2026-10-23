import { OfficialItem } from '../types';

export const mockOfficials: OfficialItem[] = [
  {
    id: 'off-01',
    name: 'Thiru. K. Rajamani, IAS (Synthetic)',
    designation: 'Principal Secretary to Government',
    department: 'Revenue & Disaster Management',
    district: 'Statewide (Secretariat, Chennai)',
    activeMatters: 384,
    criticalMatters: 14,
    pendingActions: 18,
    cadre: 'IAS',
    postingDate: '2023-06-15',
    contactDetails: {
      officialPhone: '044-25671442 (Direct Secretariat)',
      campOfficePhone: '044-28364120',
      directEmail: 'secy.revenue.gov@tn.gov.in (Synthetic)',
      secTapalEmail: 'tapal.revdept@tn.gov.in',
      officialAddress: 'Office of the Principal Secretary, Revenue & Disaster Management Dept, 4th Floor, Main Building, Secretariat, Fort St. George, Chennai - 600009',
      residentialAddress: 'No. 14, Greenways Road, P.S. Kumarasamy Raja Salai, R.A. Puram, Chennai - 600028',
      paContactName: 'Thiru. M. Soundararajan (PA to Secretary)',
      paContactPhone: '+91 94440 88219'
    },
    hierarchy: {
      reportsTo: 'Chief Secretary to Government & Hon’ble Minister for Revenue',
      supervises: [
        'Commissioner of Land Administration (CLA)',
        'Commissioner of Land Reforms (CLR)',
        'Director of Disaster Management',
        'All 38 District Collectors (Revenue Matters)'
      ],
      nodalLawOfficer: 'Advocate General / Special Government Pleader (Revenue)'
    },
    priorPostings: [
      { role: 'District Collector', period: '2020 - 2023', district: 'Coimbatore' },
      { role: 'Commissioner of Land Administration', period: '2018 - 2020', district: 'Chennai' }
    ]
  },
  {
    id: 'off-02',
    name: 'Tmt. S. Malathi, IAS (Synthetic)',
    designation: 'Additional Chief Secretary to Government',
    department: 'Home, Prohibition & Excise (Police)',
    district: 'Statewide (Secretariat, Chennai)',
    activeMatters: 429,
    criticalMatters: 18,
    pendingActions: 22,
    cadre: 'IAS',
    postingDate: '2022-11-01',
    contactDetails: {
      officialPhone: '044-25671128 (Direct Secretariat)',
      campOfficePhone: '044-28412290',
      directEmail: 'acs.home.gov@tn.gov.in (Synthetic)',
      secTapalEmail: 'tapal.homedept@tn.gov.in',
      officialAddress: 'Home Department, 2nd Floor, Secretariat Annexe, Fort St. George, Chennai - 600009',
      residentialAddress: 'B-4, PWD Officers Enclave, Taylor’s Road, Kilpauk, Chennai - 600010',
      paContactName: 'Tmt. R. Vasanthi (Sr. Private Secretary)',
      paContactPhone: '+91 94441 55302'
    },
    hierarchy: {
      reportsTo: 'Hon’ble Chief Minister & Chief Secretary to Government',
      supervises: [
        'Director General of Police / HoPF, Tamil Nadu',
        'Commissioner of Police, Greater Chennai',
        'Director General of Prisons & Correctional Services',
        'Commissioner of Prohibition & Excise'
      ],
      nodalLawOfficer: 'Advocate General / Public Prosecutor, High Court Madras'
    },
    priorPostings: [
      { role: 'Principal Secretary (Transport)', period: '2019 - 2022', district: 'Chennai' },
      { role: 'District Collector', period: '2016 - 2019', district: 'Madurai' }
    ]
  },
  {
    id: 'off-03',
    name: 'Thiru. P. Senthil Kumar, IAS (Synthetic)',
    designation: 'Principal Secretary to Government',
    department: 'School Education Department',
    district: 'Statewide (Secretariat, Chennai)',
    activeMatters: 512,
    criticalMatters: 12,
    pendingActions: 31,
    cadre: 'IAS',
    postingDate: '2023-02-10',
    contactDetails: {
      officialPhone: '044-25672834 (Secretariat)',
      campOfficePhone: '044-24991204',
      directEmail: 'secy.edu.gov@tn.gov.in (Synthetic)',
      secTapalEmail: 'dse.tapal@tn.gov.in',
      officialAddress: 'Department of School Education, 5th Floor, Main Secretariat, Fort St. George, Chennai - 600009',
      residentialAddress: 'Old No. 8, Bishop Garden, Greenways Road, Chennai - 600028',
      paContactName: 'Thiru. K. Annamalai (Protocol Officer)',
      paContactPhone: '+91 94443 12908'
    },
    hierarchy: {
      reportsTo: 'Hon’ble Minister for School Education & Chief Secretary',
      supervises: [
        'Director of School Education',
        'Director of Elementary Education',
        'Chairman, Teachers Recruitment Board (TRB)',
        'Member Secretary, Samagra Shiksha'
      ],
      nodalLawOfficer: 'Special Government Pleader (Education), High Court Madras'
    },
    priorPostings: [
      { role: 'Chairman, Teachers Recruitment Board', period: '2021 - 2023', district: 'Chennai' },
      { role: 'District Collector', period: '2018 - 2021', district: 'Salem' }
    ]
  },
  {
    id: 'off-04',
    name: 'Tmt. Rashmi Siddharth, IAS (Synthetic)',
    designation: 'District Collector & District Magistrate',
    department: 'Revenue & Disaster Management',
    district: 'Chennai',
    activeMatters: 112,
    criticalMatters: 7,
    pendingActions: 8,
    cadre: 'IAS',
    postingDate: '2024-01-15',
    contactDetails: {
      officialPhone: '044-25268323 (Collectorate)',
      campOfficePhone: '044-25221919',
      directEmail: 'collr-chn@nic.in (Synthetic)',
      secTapalEmail: 'collectorate.chennai@tn.gov.in',
      officialAddress: 'Office of the District Collector, Chennai District, 62, Rajaji Salai, George Town, Chennai - 600001',
      residentialAddress: 'District Collector Camp House, No. 2, Tower Block Road, Shenoy Nagar, Chennai - 600030',
      paContactName: 'Thiru. G. Jayaraman (Personal Assistant to Collector)',
      paContactPhone: '+91 94450 00101'
    },
    hierarchy: {
      reportsTo: 'Principal Secretary (Revenue) & Commissioner of Land Administration',
      supervises: [
        'District Revenue Officer (DRO), Chennai',
        'Revenue Divisional Officers (North, Central, South)',
        'All 16 Taluk Tahsildars of Chennai District'
      ],
      nodalLawOfficer: 'District Government Pleader / City Government Pleader'
    },
    priorPostings: [
      { role: 'Deputy Commissioner (Works), GCC', period: '2021 - 2023', district: 'Chennai' }
    ]
  },
  {
    id: 'off-05',
    name: 'Tmt. Kalaiselvi Mohan, IAS (Synthetic)',
    designation: 'District Collector & District Magistrate',
    department: 'Revenue & Disaster Management',
    district: 'Kanchipuram',
    activeMatters: 94,
    criticalMatters: 6,
    pendingActions: 9,
    cadre: 'IAS',
    postingDate: '2023-08-01',
    contactDetails: {
      officialPhone: '044-27237433 (Collectorate Kanchipuram)',
      campOfficePhone: '044-27222400',
      directEmail: 'collr-kanchi@nic.in (Synthetic)',
      secTapalEmail: 'collector.kanchipuram@tn.gov.in',
      officialAddress: 'Collectorate Complex, Vandavasi Road, Kanchipuram - 631501',
      residentialAddress: 'Collector Camp Office Bungalow, Gandhi Road, Kanchipuram - 631501',
      paContactName: 'Thiru. S. Balasubramanian (PA General to Collector)',
      paContactPhone: '+91 94450 00202'
    },
    hierarchy: {
      reportsTo: 'Principal Secretary (Revenue) & Chief Secretary to Government',
      supervises: [
        'District Revenue Officer (DRO), Kanchipuram',
        'Special DRO (Land Acquisition - Parandur Airport Corridor)',
        'Revenue Divisional Officers (Kanchipuram & Sriperumbudur)',
        'Tahsildar Sriperumbudur, Walajabad & Kundrathur'
      ],
      nodalLawOfficer: 'Advocate General / District Government Pleader, Kanchipuram'
    },
    priorPostings: [
      { role: 'Special Collector (Land Acquisition)', period: '2020 - 2023', district: 'Kanchipuram' }
    ]
  },
  {
    id: 'off-06',
    name: 'Thiru. M.S. Sangeetha, IAS (Synthetic)',
    designation: 'District Collector & District Magistrate',
    department: 'Revenue & Disaster Management',
    district: 'Madurai',
    activeMatters: 145,
    criticalMatters: 8,
    pendingActions: 10,
    cadre: 'IAS',
    postingDate: '2023-05-20',
    contactDetails: {
      officialPhone: '0452-2531110 (Collectorate Madurai)',
      campOfficePhone: '0452-2532220',
      directEmail: 'collr-mdu@nic.in (Synthetic)',
      secTapalEmail: 'collector.madurai@tn.gov.in',
      officialAddress: 'Office of the District Collector, Collectorate, Madurai - 625020',
      residentialAddress: 'Collector Bungalow, Race Course Road, Madurai - 625002',
      paContactName: 'Thiru. K. Rajendran (PA to Collector)',
      paContactPhone: '+91 94450 00303'
    },
    hierarchy: {
      reportsTo: 'Principal Secretary (Revenue) & Additional Chief Secretary (Home)',
      supervises: [
        'District Revenue Officer (DRO), Madurai',
        'Special Collector (Mines & Minerals Royalty Auditing)',
        'RDO Madurai & RDO Melur',
        'All 11 Taluk Tahsildars of Madurai District'
      ],
      nodalLawOfficer: 'Additional Advocate General (Madurai Bench) / Special GP'
    },
    priorPostings: [
      { role: 'Commissioner, Madurai Corporation', period: '2021 - 2023', district: 'Madurai' }
    ]
  }
];
