import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Scale, 
  Clock, 
  AlertTriangle, 
  Gavel, 
  FileCheck, 
  Coins, 
  TrendingUp, 
  Building2, 
  Users, 
  MapPin, 
  Filter, 
  ArrowUpRight, 
  ShieldAlert, 
  HelpCircle,
  ExternalLink,
  ChevronRight,
  Eye,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { CaseItem, DepartmentItem, AdvocateItem } from '@/types';
import { PriorityBadge, StatusBadge, InstructionsBadge } from '@/components/common/Badges';
import { CaseQuickModal } from '@/components/cases/CaseQuickModal';
import { mockDepartments } from '@/data/mockDepartments';
import { mockAdvocates } from '@/data/mockAdvocates';
import { mockDistricts } from '@/data/mockDistricts';

export type WorkloadMetricKey = 
  | 'ALL'
  | 'ACTIVE_MATTERS'
  | 'HEARINGS_7_DAYS'
  | 'INSTRUCTIONS_PENDING'
  | 'ORDERS_AWAITED'
  | 'ADVERSE_ORDERS'
  | 'CRITICAL_MATTERS'
  | 'HIGH_RISK_MATTERS'
  | 'FINANCIAL_EXPOSURE'
  | 'POLICY_IMPACT';

export const WorkloadCriticalPage: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState<WorkloadMetricKey>('ALL');
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  // Breakdown dimension: By Department, By District, By Advocate
  const [dimension, setDimension] = useState<'DEPARTMENT' | 'ADVOCATE' | 'DISTRICT'>('DEPARTMENT');
  const [search, setSearch] = useState('');

  useEffect(() => {
    mockApi.getCases().then((res) => {
      setCases(res);
      setLoading(false);
    });
  }, []);

  // Filter cases based on active metric tab
  const getFilteredCases = () => {
    let filtered = [...cases];

    switch (activeMetric) {
      case 'ACTIVE_MATTERS':
        filtered = filtered.filter(c => c.status !== 'DISPOSED');
        break;
      case 'HEARINGS_7_DAYS':
        filtered = filtered.filter(c => c.status === 'HEARING_SCHEDULED' || c.nextHearingDate);
        break;
      case 'INSTRUCTIONS_PENDING':
        filtered = filtered.filter(c => c.instructionsStatus === 'PENDING');
        break;
      case 'ORDERS_AWAITED':
        filtered = filtered.filter(c => c.status === 'ORDERS_RESERVED' || c.status === 'COMPLIANCE_PENDING');
        break;
      case 'ADVERSE_ORDERS':
        filtered = filtered.filter(c => c.status === 'INTERIM_STAY' || c.risk === 'CRITICAL' || c.timeline.some(t => t.isAdverse));
        break;
      case 'CRITICAL_MATTERS':
        filtered = filtered.filter(c => c.priority === 'CRITICAL');
        break;
      case 'HIGH_RISK_MATTERS':
        filtered = filtered.filter(c => c.risk === 'CRITICAL' || c.risk === 'HIGH');
        break;
      case 'FINANCIAL_EXPOSURE':
        filtered = filtered.filter(c => (c.financialExposure?.estimatedExposure || 0) > 10);
        break;
      case 'POLICY_IMPACT':
        filtered = filtered.filter(c => c.policyImpact?.scope === 'Statewide' || c.risks?.policy === 'CRITICAL');
        break;
      case 'ALL':
      default:
        break;
    }

    if (search) {
      const q = search.toLowerCase();
      filtered = filtered.filter(c => 
        c.id.toLowerCase().includes(q) ||
        c.caseTitle.toLowerCase().includes(q) ||
        c.department.toLowerCase().includes(q) ||
        c.advocateName.toLowerCase().includes(q) ||
        c.legalIssue.toLowerCase().includes(q)
      );
    }

    return filtered;
  };

  const filteredCases = getFilteredCases();

  // 9 Required Executive Workload Metrics Cards
  const workloadMetrics = [
    {
      key: 'ACTIVE_MATTERS' as WorkloadMetricKey,
      title: 'Active Matters',
      count: '3,280',
      description: 'Active state litigations across all judicial forums',
      color: 'blue',
      badge: 'Statewide Docket',
      icon: Scale,
      sampleCase: 'DEMO-TN-REV-0001'
    },
    {
      key: 'HEARINGS_7_DAYS' as WorkloadMetricKey,
      title: 'Hearings Next 7 Days',
      count: '64',
      description: 'Listed matters scheduled on daily cause lists this week',
      color: 'indigo',
      badge: 'Immediate Listing',
      icon: Clock,
      sampleCase: 'DEMO-TN-REV-0001'
    },
    {
      key: 'INSTRUCTIONS_PENDING' as WorkloadMetricKey,
      title: 'Instructions Pending',
      count: '74',
      description: 'Law Officer requisitions awaiting Secretariat / Collector replies',
      color: 'amber',
      badge: 'Executive Bottleneck',
      icon: AlertTriangle,
      sampleCase: 'DEMO-TN-HOME-0002'
    },
    {
      key: 'ORDERS_AWAITED' as WorkloadMetricKey,
      title: 'Orders Awaited',
      count: '28',
      description: 'Arguments concluded; judgments reserved for pronouncement',
      color: 'purple',
      badge: 'Impending Verdicts',
      icon: FileCheck,
      sampleCase: 'DEMO-TN-EDU-0003'
    },
    {
      key: 'ADVERSE_ORDERS' as WorkloadMetricKey,
      title: 'Adverse Orders',
      count: '38',
      description: 'Interim stays, contempt threats, and garnishee warnings',
      color: 'red',
      badge: 'Legal Exposure',
      icon: Gavel,
      sampleCase: 'DEMO-TN-HIGHWAYS-0005'
    },
    {
      key: 'CRITICAL_MATTERS' as WorkloadMetricKey,
      title: 'Critical Matters',
      count: '42',
      description: 'Tier-1 matters requiring Chief Minister / Chief Secretary review',
      color: 'rose',
      badge: 'Cabinet Level',
      icon: ShieldAlert,
      sampleCase: 'DEMO-TN-REV-0001'
    },
    {
      key: 'HIGH_RISK_MATTERS' as WorkloadMetricKey,
      title: 'High-Risk Matters',
      count: '115',
      description: 'Proceedings carrying severe operational, public order, or fiscal risks',
      color: 'orange',
      badge: 'Sovereign Vulnerability',
      icon: AlertTriangle,
      sampleCase: 'DEMO-TN-MAWS-0004'
    },
    {
      key: 'FINANCIAL_EXPOSURE' as WorkloadMetricKey,
      title: 'Financial Exposure',
      count: '₹1,845 Cr',
      description: 'Cumulative contingent liability from awards & claimed compensation',
      color: 'emerald',
      badge: 'State Exchequer',
      icon: Coins,
      sampleCase: 'DEMO-TN-HIGHWAYS-0005'
    },
    {
      key: 'POLICY_IMPACT' as WorkloadMetricKey,
      title: 'Policy Impact',
      count: '56 Matters',
      description: 'Cases with statewide statutory or regulatory invalidation risk',
      color: 'sky',
      badge: 'State Policy',
      icon: TrendingUp,
      sampleCase: 'DEMO-TN-EDU-0003'
    }
  ];

  return (
    <div className="space-y-5 animate-in fade-in duration-200">
      
      {/* Sovereign Header Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-tn-navy-950 via-slate-900 to-tn-navy-900 text-white p-6 shadow-xl border border-tn-gold-500/30">
        <div className="absolute right-0 top-0 bottom-0 w-96 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-tn-gold-500/20 via-transparent to-transparent pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="space-y-1.5 max-w-3xl">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 border border-red-500/40 uppercase tracking-widest flex items-center space-x-1">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>
                <span>Critical Executive Dashboard</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                SOVEREIGN LITIGATION POSTURE • WORKLOAD DIRECTIVE
              </span>
            </div>

            <h1 className="text-2xl font-black text-white tracking-tight">
              Statewide Workload & Critical Exposure Matrix
            </h1>

            <p className="text-xs text-slate-300 leading-relaxed">
              Consolidated command brief for the <strong>Chief Minister’s Office (CMO)</strong> and <strong>Law Officers</strong>. 
              Tracks operational workload, impending court deadlines, pending administrative instructions, and high-stakes financial/policy exposures.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => navigate('/assistant?q=' + encodeURIComponent('Brief me on statewide critical workload and instructions pending'))}
              className="py-2 px-3.5 bg-tn-gold-500 hover:bg-tn-gold-400 text-tn-navy-950 rounded-xl text-xs font-bold transition-all shadow-md flex items-center space-x-1.5"
            >
              <span>Vetri AI Workload Brief</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => navigate('/cases')}
              className="py-2 px-3.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/20 transition-all flex items-center space-x-1"
            >
              <span>All Cases</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 9 Workload Command Cards Grid (3x3 on desktop) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Briefcase className="w-4 h-4 text-tn-gold-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950">
              Executive Workload Clusters (Click to Filter View Below)
            </h2>
          </div>
          {activeMetric !== 'ALL' && (
            <button
              onClick={() => setActiveMetric('ALL')}
              className="text-xs text-blue-700 hover:text-blue-900 font-bold flex items-center space-x-1"
            >
              <span>Show All Proceedings</span>
              <span className="text-[10px] font-mono">({cases.length})</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {workloadMetrics.map((m) => {
            const isSelected = activeMetric === m.key;
            const Icon = m.icon;

            return (
              <div
                key={m.key}
                onClick={() => setActiveMetric(isSelected ? 'ALL' : m.key)}
                className={`p-4 rounded-xl border transition-all cursor-pointer select-none space-y-2 relative overflow-hidden group ${
                  isSelected
                    ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-600/30 shadow-md'
                    : 'bg-white hover:bg-slate-50/80 border-slate-200/90 shadow-2xs hover:border-slate-300'
                }`}
              >
                {/* Accent top stripe */}
                <div className={`absolute top-0 left-0 right-0 h-1 ${
                  m.key === 'ADVERSE_ORDERS' || m.key === 'CRITICAL_MATTERS'
                    ? 'bg-red-600'
                    : m.key === 'INSTRUCTIONS_PENDING' || m.key === 'HIGH_RISK_MATTERS'
                      ? 'bg-amber-500'
                      : m.key === 'FINANCIAL_EXPOSURE'
                        ? 'bg-emerald-600'
                        : 'bg-tn-navy-900'
                }`}></div>

                <div className="flex items-start justify-between pt-1">
                  <div className="flex items-center space-x-2">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-slate-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 tracking-tight">
                        {m.title}
                      </h3>
                      <span className="text-[10px] font-mono font-semibold text-slate-400 uppercase">
                        {m.badge}
                      </span>
                    </div>
                  </div>

                  <span className={`text-xl font-black font-mono tracking-tight ${
                    m.key === 'ADVERSE_ORDERS' || m.key === 'CRITICAL_MATTERS'
                      ? 'text-red-700'
                      : m.key === 'INSTRUCTIONS_PENDING'
                        ? 'text-amber-800'
                        : m.key === 'FINANCIAL_EXPOSURE'
                          ? 'text-emerald-700'
                          : 'text-tn-navy-950'
                  }`}>
                    {m.count}
                  </span>
                </div>

                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">
                  {m.description}
                </p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">
                    {isSelected ? '✓ Filter Active' : 'Click to filter docket'}
                  </span>
                  <span className="text-blue-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center space-x-0.5">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Drill-Down Section: Breakdown on Left, Filtered Proceedings on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
        
        {/* Left Column: Workload Distribution by Dimension (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-tn-navy-950 flex items-center space-x-1.5">
                <Layers className="w-4 h-4 text-tn-gold-600" />
                <span>Workload Concentration</span>
              </span>

              {/* Dimension Switcher Buttons */}
              <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[10px] font-bold">
                <button
                  onClick={() => setDimension('DEPARTMENT')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    dimension === 'DEPARTMENT' ? 'bg-white text-tn-navy-950 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  By Dept
                </button>
                <button
                  onClick={() => setDimension('DISTRICT')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    dimension === 'DISTRICT' ? 'bg-white text-tn-navy-950 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  By Dist
                </button>
                <button
                  onClick={() => setDimension('ADVOCATE')}
                  className={`px-2 py-1 rounded-md transition-all ${
                    dimension === 'ADVOCATE' ? 'bg-white text-tn-navy-950 shadow-2xs font-extrabold' : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  By Advocate
                </button>
              </div>
            </div>

            {/* Dimension Breakdown List */}
            <div className="space-y-2.5 text-xs pt-1">
              {dimension === 'DEPARTMENT' && (
                mockDepartments.slice(0, 6).map((d) => (
                  <div 
                    key={d.id}
                    onClick={() => navigate(`/departments/${d.code}`)}
                    className="p-2.5 rounded-lg border border-slate-200/70 hover:border-blue-400 hover:bg-slate-50/60 cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{d.name}</span>
                      <span className="font-mono font-bold text-tn-navy-950">{d.activeCases} matters</span>
                    </div>

                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-tn-navy-800 h-full rounded-full" 
                        style={{ width: `${Math.min(100, (d.activeCases / 450) * 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>Secy: <strong className="text-slate-700">{d.secretaryName.split(',')[0]}</strong></span>
                      <span className="text-amber-800 font-bold">{d.instructionsPending} Instructions Pending</span>
                    </div>
                  </div>
                ))
              )}

              {dimension === 'DISTRICT' && (
                mockDistricts.slice(0, 6).map((dist) => (
                  <div 
                    key={dist.id}
                    onClick={() => navigate('/districts')}
                    className="p-2.5 rounded-lg border border-slate-200/70 hover:border-blue-400 hover:bg-slate-50/60 cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{dist.name} District</span>
                      <span className="font-mono font-bold text-tn-navy-950">{dist.activeCases} matters</span>
                    </div>

                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-700 h-full rounded-full" 
                        style={{ width: `${Math.min(100, (dist.activeCases / 450) * 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span>Collector: <strong className="text-slate-700">{dist.collectorName.split(',')[0]}</strong></span>
                      <span className="text-red-700 font-bold">{dist.criticalMatters} Critical</span>
                    </div>
                  </div>
                ))
              )}

              {dimension === 'ADVOCATE' && (
                mockAdvocates.slice(0, 6).map((adv) => (
                  <div 
                    key={adv.id}
                    onClick={() => navigate('/advocates')}
                    className="p-2.5 rounded-lg border border-slate-200/70 hover:border-blue-400 hover:bg-slate-50/60 cursor-pointer transition-all space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{adv.name.split('(')[0]}</span>
                      <span className="font-mono font-bold text-tn-navy-950">{adv.activeMatters} briefs</span>
                    </div>

                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-700 h-full rounded-full" 
                        style={{ width: `${Math.min(100, (adv.activeMatters / 70) * 100)}%` }}
                      ></div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-0.5">
                      <span className="text-slate-600">{adv.designation}</span>
                      <span className="text-amber-800 font-bold">{adv.instructionsPending} Pending Requisitions</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 text-center">
              <button
                onClick={() => navigate(dimension === 'DEPARTMENT' ? '/departments' : dimension === 'DISTRICT' ? '/districts' : '/advocates')}
                className="text-xs font-bold text-blue-700 hover:text-blue-900 inline-flex items-center space-x-1"
              >
                <span>View Full {dimension === 'DEPARTMENT' ? 'Departments Directory' : dimension === 'DISTRICT' ? '38 Districts Matrix' : 'Law Officers Directory'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Guidance Box */}
          <div className="p-3.5 bg-amber-50/70 rounded-xl border border-amber-200 text-xs space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold text-amber-900">
              <AlertTriangle className="w-4 h-4 text-amber-700" />
              <span>Cabinet Review Protocol (Rule 35)</span>
            </div>
            <p className="text-amber-950 text-[11px] leading-relaxed">
              Matters marked <strong>CRITICAL</strong> or having a financial exposure exceeding <strong>₹100 Cr</strong> require mandatory pre-hearing instructions endorsed by the Additional Chief Secretary / Chief Secretary prior to court submission.
            </p>
          </div>

        </div>

        {/* Right Column: Filtered Workload Proceedings Table (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 space-y-3">
            
            {/* Header & Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Active Filter Focus
                </span>
                <h3 className="text-sm font-extrabold text-tn-navy-950 flex items-center space-x-1.5">
                  <span>
                    {activeMetric === 'ALL' && 'All High-Priority Proceedings'}
                    {activeMetric === 'ACTIVE_MATTERS' && 'Active Matters Roster'}
                    {activeMetric === 'HEARINGS_7_DAYS' && 'Hearings Scheduled Next 7 Days'}
                    {activeMetric === 'INSTRUCTIONS_PENDING' && 'Pending State Instructions Docket'}
                    {activeMetric === 'ORDERS_AWAITED' && 'Orders Reserved / Compliance Awaited'}
                    {activeMetric === 'ADVERSE_ORDERS' && 'Adverse Stays & Warning Proceedings'}
                    {activeMetric === 'CRITICAL_MATTERS' && 'Critical State Litigations'}
                    {activeMetric === 'HIGH_RISK_MATTERS' && 'High-Risk Vulnerability Proceedings'}
                    {activeMetric === 'FINANCIAL_EXPOSURE' && 'High Financial Exposure Matters (> ₹10 Cr)'}
                    {activeMetric === 'POLICY_IMPACT' && 'Statewide Policy Impact Proceedings'}
                  </span>
                  <span className="text-xs font-mono font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {filteredCases.length} {filteredCases.length === 1 ? 'Case' : 'Cases'}
                  </span>
                </h3>
              </div>

              {/* Search input */}
              <div className="relative min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search docket..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full py-1.5 pl-7 pr-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:bg-white focus:border-blue-600 transition-all"
                />
                <Filter className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
              </div>
            </div>

            {/* List of Case Cards */}
            <div className="space-y-2.5 overflow-y-auto max-h-[580px] pr-1">
              {loading ? (
                <div className="p-8 text-center text-xs text-slate-400">Loading workload intelligence...</div>
              ) : filteredCases.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto" />
                  <div className="text-xs font-bold text-slate-700">No Pending Matters In This Filter</div>
                  <p className="text-[11px] text-slate-500">
                    No active proceedings currently match this workload filter criteria.
                  </p>
                </div>
              ) : (
                filteredCases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className="p-3.5 bg-white rounded-xl border border-slate-200/90 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
                    title="Click to preview case file popup"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-tn-navy-950 text-xs group-hover:text-blue-700 transition-colors">
                          {c.id}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">({c.caseNumber})</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <PriorityBadge level={c.priority} size="sm" />
                        <StatusBadge status={c.status} size="sm" />
                      </div>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-900 leading-snug">
                      {c.caseTitle}
                    </h4>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                      {c.legalIssue}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-100 text-slate-600">
                      <div>
                        Dept: <strong className="text-slate-800">{c.department.split('&')[0]}</strong>
                      </div>
                      <div className="text-right">
                        Court: <strong className="text-slate-800">{c.court.includes('Madras') ? 'Madras High Court' : c.court}</strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <div className="flex items-center space-x-1">
                        <span className="text-slate-400">Instructions:</span>
                        <InstructionsBadge status={c.instructionsStatus} />
                      </div>

                      <div className="flex items-center space-x-2">
                        {c.financialExposure && c.financialExposure.estimatedExposure > 0 && (
                          <span className="font-mono font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 text-[10px]">
                            ₹{c.financialExposure.estimatedExposure} Cr
                          </span>
                        )}
                        <span className="font-bold text-blue-700 flex items-center space-x-0.5 group-hover:translate-x-0.5 transition-transform text-xs">
                          <span>Details</span>
                          <Eye className="w-3.5 h-3.5 ml-0.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>

      {/* Case Quick Detail Modal Popup on click */}
      <CaseQuickModal
        caseItem={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </div>
  );
};
