import { CaseItem, DepartmentItem, DistrictItem, AdvocateItem, OfficialItem } from '../types';
import { mockCases } from '../data/mockCases';
import { mockDepartments } from '../data/mockDepartments';
import { mockDistricts } from '../data/mockDistricts';
import { mockAdvocates } from '../data/mockAdvocates';
import { mockOfficials } from '../data/mockOfficials';
import { mockExecutiveBriefs, mockWhatChangedMetrics, mockNotifications, mockReports } from '../data/mockDashboard';

// Mock API layer simulating async server communication for Phase 1
export const mockApi = {
  // Cases
  async getCases(filters?: {
    search?: string;
    department?: string;
    priority?: string;
    court?: string;
    courtLevel?: string;
    broadCategory?: string;
    status?: string;
    district?: string;
  }): Promise<CaseItem[]> {
    await new Promise(r => setTimeout(r, 60)); // realistic async delay
    let results = [...mockCases];

    if (filters?.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(c => 
        c.id.toLowerCase().includes(q) ||
        c.caseNumber.toLowerCase().includes(q) ||
        c.caseTitle.toLowerCase().includes(q) ||
        c.legalIssue.toLowerCase().includes(q) ||
        c.advocateName.toLowerCase().includes(q) ||
        c.officialName.toLowerCase().includes(q)
      );
    }

    if (filters?.department && filters.department !== 'ALL') {
      results = results.filter(c => c.department.toLowerCase().includes(filters.department!.toLowerCase()));
    }

    if (filters?.priority && filters.priority !== 'ALL') {
      results = results.filter(c => c.priority === filters.priority);
    }

    if (filters?.court && filters.court !== 'ALL') {
      results = results.filter(c => c.court === filters.court);
    }

    if (filters?.courtLevel && filters.courtLevel !== 'ALL') {
      results = results.filter(c => c.courtLevel === filters.courtLevel);
    }

    if (filters?.broadCategory && filters.broadCategory !== 'ALL') {
      results = results.filter(c => c.broadCategory === filters.broadCategory);
    }

    if (filters?.district && filters.district !== 'ALL') {
      results = results.filter(c => c.district.toLowerCase() === filters.district!.toLowerCase());
    }

    return results;
  },

  async getCaseById(id: string): Promise<CaseItem | undefined> {
    await new Promise(r => setTimeout(r, 40));
    return mockCases.find(c => c.id === id);
  },

  // Departments
  async getDepartments(): Promise<DepartmentItem[]> {
    await new Promise(r => setTimeout(r, 50));
    return mockDepartments;
  },

  async getDepartmentById(id: string): Promise<DepartmentItem | undefined> {
    await new Promise(r => setTimeout(r, 40));
    return mockDepartments.find(d => d.id === id || d.code.toLowerCase() === id.toLowerCase());
  },

  // Districts
  async getDistricts(): Promise<DistrictItem[]> {
    await new Promise(r => setTimeout(r, 50));
    return mockDistricts;
  },

  // Advocates
  async getAdvocates(): Promise<AdvocateItem[]> {
    await new Promise(r => setTimeout(r, 50));
    return mockAdvocates;
  },

  async getAdvocateById(id: string): Promise<AdvocateItem | undefined> {
    await new Promise(r => setTimeout(r, 40));
    return mockAdvocates.find(a => a.id === id);
  },

  // Officials
  async getOfficials(): Promise<OfficialItem[]> {
    await new Promise(r => setTimeout(r, 50));
    return mockOfficials;
  },

  async getOfficialById(id: string): Promise<OfficialItem | undefined> {
    await new Promise(r => setTimeout(r, 40));
    return mockOfficials.find(o => o.id === id);
  },

  // Dashboard Summary & Analytics
  async getDashboardSummary() {
    await new Promise(r => setTimeout(r, 50));
    return {
      kpis: {
        activeCases: 3280,
        criticalMatters: 42,
        highPriority: 310,
        hearingsToday: 14,
        adverseOrders: 38,
        complianceDeadlines: 9,
        instructionsPending: 74,
        financialExposureCr: 1845.6
      },
      briefs: mockExecutiveBriefs,
      whatChanged: mockWhatChangedMetrics,
      immediateAttention: mockCases.filter(c => c.priority === 'CRITICAL' || c.instructionsStatus === 'PENDING'),
      notifications: mockNotifications,
      reports: mockReports,
      courtBreakdown: [
        { name: 'Madras High Court (Principal)', count: 1420, percent: 43 },
        { name: 'Madras High Court (Madurai Bench)', count: 980, percent: 30 },
        { name: 'Supreme Court of India', count: 185, percent: 6 },
        { name: 'District & Sessions Courts', count: 390, percent: 12 },
        { name: 'Tribunals (NGT/CAT/Appellate)', count: 305, percent: 9 }
      ]
    };
  }
};
