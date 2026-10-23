import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Scale, 
  AlertTriangle, 
  Clock, 
  Gavel, 
  ArrowUpRight, 
  Building2, 
  ShieldAlert, 
  Coins, 
  Calendar,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { KpiCard } from '@/components/common/KpiCard';
import { PriorityBadge, InstructionsBadge } from '@/components/common/Badges';
import { OfficialContactModal } from '@/components/officials/OfficialContactModal';
import { OfficialItem } from '@/types';
import { mockOfficials } from '@/data/mockOfficials';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedBrief, setSelectedBrief] = useState<any>(null);
  const [selectedOfficial, setSelectedOfficial] = useState<OfficialItem | null>(null);

  const openOfficialModal = (officialNameOrId: string) => {
    const found = mockOfficials.find(o => 
      o.id === officialNameOrId || 
      o.name.toLowerCase().includes(officialNameOrId.toLowerCase()) ||
      officialNameOrId.toLowerCase().includes(o.name.split(',')[0].toLowerCase())
    ) || mockOfficials[0];
    setSelectedOfficial(found);
  };

  useEffect(() => {
    mockApi.getDashboardSummary().then((res) => {
      setData(res);
      if (res.briefs && res.briefs.length > 0) {
        setSelectedBrief(res.briefs[0]);
      }
      setLoading(false);
    });
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-500 font-medium text-sm flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-tn-navy-700 border-t-transparent rounded-full animate-spin"></div>
          <span>Loading Executive Intelligence Briefing...</span>
        </div>
      </div>
    );
  }

  const { kpis, briefs, whatChanged, immediateAttention, courtBreakdown } = data;

  return (
    <div className="space-y-6">
      {/* Page Title & Situational Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            Statewide Litigation Posture & Executive Command
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time synthesis of proceedings across High Court, Supreme Court, District Courts and Tribunals.
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-2">
          <span className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-red-100 text-red-800 border border-red-200">
            <span className="w-2 h-2 rounded-full bg-red-600 mr-1.5 animate-pulse"></span>
            5 Urgent Actions Required Today
          </span>
          <button 
            onClick={() => navigate('/workload')}
            className="text-xs font-bold px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition-colors flex items-center space-x-1 shadow-2xs"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Critical Workload Matrix</span>
          </button>
          <button 
            onClick={() => navigate('/assistant')}
            className="text-xs font-semibold px-3 py-1 bg-tn-navy-900 text-white rounded hover:bg-tn-navy-800 transition-colors flex items-center space-x-1"
          >
            <span>Ask AI Assistant</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 1. TOP EXECUTIVE KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <KpiCard
          title="Active Government Cases"
          value={kpis.activeCases.toLocaleString()}
          subtitle="Statewide official proceedings"
          icon={Scale}
          onClick={() => navigate('/cases')}
        />
        <KpiCard
          title="Critical Matters"
          value={kpis.criticalMatters}
          subtitle="Requires Cabinet / Secy scrutiny"
          variant="critical"
          icon={AlertTriangle}
          onClick={() => navigate('/cases?priority=CRITICAL')}
        />
        <KpiCard
          title="Hearings Today"
          value={kpis.hearingsToday}
          subtitle="Listed in Daily Cause Lists"
          variant="highlight"
          icon={Clock}
          onClick={() => navigate('/cases?status=HEARING_SCHEDULED')}
        />
        <KpiCard
          title="Adverse / Stay Orders"
          value={kpis.adverseOrders}
          subtitle="Direct operational/policy risk"
          variant="critical"
          icon={Gavel}
          onClick={() => navigate('/cases?risk=CRITICAL')}
        />
        <KpiCard
          title="Instructions Pending"
          value={kpis.instructionsPending}
          subtitle="Awaiting Secretary / Collector replies"
          variant="warning"
          icon={AlertTriangle}
          onClick={() => navigate('/cases?status=PENDING')}
        />
        <KpiCard
          title="High Priority Matters"
          value={kpis.highPriority}
          subtitle="Major department proceedings"
          onClick={() => navigate('/cases?priority=HIGH')}
        />
        <KpiCard
          title="Compliance Deadlines"
          value={kpis.complianceDeadlines}
          subtitle="Expiring within 72 hours"
          variant="warning"
          icon={Calendar}
          onClick={() => navigate('/cases?status=COMPLIANCE_PENDING')}
        />
        <KpiCard
          title="Financial Exposure"
          value={`₹${kpis.financialExposureCr.toFixed(0)} Cr`}
          subtitle="Claimed awards / damage risks"
          variant="critical"
          icon={Coins}
          onClick={() => navigate('/risk')}
        />
      </div>

      {/* 2. TODAY'S EXECUTIVE BRIEF & WHAT CHANGED SPLIT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Column: AI-Synthesized Executive Brief (7 cols) */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col">
          <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-tn-gold-500"></span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950">
                Today’s Executive Intelligence Brief (CMO Summary)
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-500 font-medium">
              5 High-Impact Briefings
            </span>
          </div>

          <div className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4 flex-1">
            {/* Brief Selector List */}
            <div className="md:col-span-5 space-y-2.5 border-r border-slate-100 pr-3">
              {briefs.map((b: any) => {
                const isSelected = selectedBrief?.id === b.id;
                return (
                  <div
                    key={b.id}
                    onClick={() => setSelectedBrief(b)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-tn-navy-900 bg-tn-navy-50/80 shadow-sm ring-1 ring-tn-navy-900/20'
                        : 'border-slate-200/90 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-extrabold text-tn-navy-950 truncate max-w-[130px]">
                        {b.department.split('&')[0]}
                      </span>
                      <PriorityBadge level={b.priority} size="sm" />
                    </div>
                    <div className="text-xs font-bold text-slate-900 line-clamp-1">
                      {b.title}
                    </div>
                    <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between font-medium">
                      <span>Due: <strong className="text-slate-700">{b.dueDate}</strong></span>
                      <span className="text-red-700 font-bold">{b.hearingStatus}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Brief Details */}
            {selectedBrief && (
              <div className="md:col-span-7 flex flex-col justify-between space-y-3 pl-2">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-tn-navy-900">
                      {selectedBrief.department}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 bg-slate-100 text-slate-700 rounded">
                      {selectedBrief.caseId}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-1">
                    {selectedBrief.title}
                  </h3>

                  <div className="mt-2.5 space-y-2 text-xs">
                    <div className="p-2 rounded bg-red-50 border border-red-100">
                      <span className="font-bold text-red-900 block mb-0.5">Why it matters:</span>
                      <p className="text-red-950 leading-relaxed">{selectedBrief.matterWhyItMatters}</p>
                    </div>

                    <div className="p-2 rounded bg-slate-50 border border-slate-200">
                      <span className="font-bold text-slate-800 block mb-0.5">Latest Court Development:</span>
                      <p className="text-slate-700 leading-relaxed">{selectedBrief.latestDevelopment}</p>
                    </div>

                    <div className="p-2 rounded bg-amber-50 border border-amber-200">
                      <span className="font-bold text-amber-900 block mb-0.5">Required Action:</span>
                      <p className="text-amber-950 font-medium leading-relaxed">{selectedBrief.requiredAction}</p>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Officer in Charge: <strong className="text-slate-700">{selectedBrief.owner}</strong></span>
                    <span>Evidence: <strong className="text-slate-700">{selectedBrief.evidenceRef}</strong></span>
                  </div>
                </div>

                <div className="pt-2 flex items-center space-x-2">
                  <button
                    onClick={() => navigate(`/cases/${selectedBrief.caseId}`)}
                    className="flex-1 py-1.5 px-3 bg-tn-navy-900 text-white rounded text-xs font-semibold hover:bg-tn-navy-800 transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>View Complete Case File</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1" />
                  </button>
                  <button
                    onClick={() => navigate(`/assistant?q=${encodeURIComponent('Brief me on case ' + selectedBrief.caseId)}`)}
                    className="py-1.5 px-3 border border-slate-300 text-slate-700 rounded text-xs font-semibold hover:bg-slate-100 transition-colors"
                  >
                    Ask AI Deep-Dive
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: What Changed & Court Breakdown (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* What Changed Widget */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-tn-navy-950">
                What Changed (Past 24 Hours)
              </span>
              <span className="text-[10px] text-slate-400 font-mono">06:00 IST SYNC</span>
            </div>
            <div className="space-y-2">
              {whatChanged.map((m: any, idx: number) => (
                <div 
                  key={idx}
                  onClick={() => navigate('/cases')}
                  className="flex items-center justify-between p-2 rounded hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-200 transition-all text-xs"
                >
                  <div className="flex items-center space-x-2">
                    {m.trend === 'UP' ? (
                      <TrendingUp className="w-3.5 h-3.5 text-red-600" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-600" />
                    )}
                    <span className="font-medium text-slate-800">{m.label}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <span className="font-bold text-slate-900">{m.count}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Court Forum Distribution - Sovereign Executive Cockpit */}
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
              <div className="flex items-center space-x-2">
                <div className="p-1.5 rounded-lg bg-tn-navy-950 text-tn-gold-400">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-xs font-extrabold uppercase tracking-wider text-tn-navy-950">
                    Forum Distribution
                  </h3>
                  <p className="text-[10px] text-slate-500 font-medium">
                    Statewide Jurisdiction Spread
                  </p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-black text-tn-navy-950 font-mono block">
                  3,280
                </span>
                <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                  Total Active
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                {
                  name: 'Madras High Court (Principal)',
                  shortName: 'High Court (Chennai)',
                  count: 1420,
                  percent: 43.3,
                  bench: 'Principal Seat • Chennai',
                  color: 'from-blue-600 to-indigo-700',
                  bgBar: 'bg-blue-600',
                  badgeBg: 'bg-blue-50 text-blue-900 border-blue-200',
                  filterCourt: 'Madras High Court (Principal Bench, Chennai)',
                  courtLevel: 'HIGH_COURT'
                },
                {
                  name: 'Madras High Court (Madurai Bench)',
                  shortName: 'Madurai Bench',
                  count: 980,
                  percent: 29.9,
                  bench: '14 Southern Districts Jurisdiction',
                  color: 'from-indigo-600 to-purple-700',
                  bgBar: 'bg-indigo-600',
                  badgeBg: 'bg-indigo-50 text-indigo-900 border-indigo-200',
                  filterCourt: 'Madras High Court (Madurai Bench)',
                  courtLevel: 'HIGH_COURT'
                },
                {
                  name: 'Supreme Court of India',
                  shortName: 'Supreme Court (Apex)',
                  count: 185,
                  percent: 5.6,
                  bench: 'SLP & Constitutional Appeals • New Delhi',
                  color: 'from-rose-600 to-amber-600',
                  bgBar: 'bg-rose-600',
                  badgeBg: 'bg-rose-50 text-rose-900 border-rose-200',
                  filterCourt: 'Supreme Court of India',
                  courtLevel: 'SUPREME_COURT'
                },
                {
                  name: 'District & Sessions Courts',
                  shortName: 'District & Sessions',
                  count: 390,
                  percent: 11.9,
                  bench: '38 District Trial Jurisdictions',
                  color: 'from-amber-500 to-orange-600',
                  bgBar: 'bg-amber-600',
                  badgeBg: 'bg-amber-50 text-amber-900 border-amber-200',
                  filterCourt: 'District & Sessions Court',
                  courtLevel: 'DISTRICT_SESSIONS'
                },
                {
                  name: 'Tribunals (NGT/CAT/Appellate)',
                  shortName: 'Tribunals & Commissions',
                  count: 305,
                  percent: 9.3,
                  bench: 'NGT Southern Zone • CAT • Appellate',
                  color: 'from-emerald-600 to-teal-700',
                  bgBar: 'bg-emerald-600',
                  badgeBg: 'bg-emerald-50 text-emerald-900 border-emerald-200',
                  filterCourt: 'National Green Tribunal (Southern Zone)',
                  courtLevel: 'TRIBUNALS_COMMISSIONS'
                }
              ].map((c, idx) => (
                <div
                  key={idx}
                  onClick={() => navigate(`/cases?courtLevel=${c.courtLevel}`)}
                  className="p-2 rounded-xl hover:bg-slate-50 border border-slate-100 hover:border-slate-200 cursor-pointer transition-all duration-150 group"
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <div className="flex items-center space-x-1.5 min-w-0 pr-2">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${c.bgBar}`}></span>
                      <span className="font-bold text-slate-800 group-hover:text-tn-navy-950 truncate text-[11px]">
                        {c.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <span className="font-black text-slate-900 font-mono text-xs">
                        {c.count.toLocaleString()}
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ${c.badgeBg}`}>
                        {c.percent.toFixed(1)}%
                      </span>
                      <ChevronRight className="w-3 h-3 text-slate-400 group-hover:text-slate-700 group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden p-0.5 shadow-inner">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${c.color} transition-all duration-500`}
                      style={{ width: `${c.percent}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between mt-1 text-[10px] text-slate-400 font-mono">
                    <span className="truncate">{c.bench}</span>
                    <span className="text-slate-500 font-medium group-hover:text-tn-navy-900 group-hover:font-semibold">View Cases →</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <button
                onClick={() => navigate('/court-types')}
                className="text-tn-navy-900 font-bold hover:text-blue-800 flex items-center gap-1 text-[11px] transition-colors"
              >
                <span>Full Judicial Hierarchy & Benches</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => navigate('/workload')}
                className="text-slate-500 hover:text-slate-800 text-[11px] font-medium"
              >
                Workload Matrix →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. REQUIRES IMMEDIATE ATTENTION DENSE TABLE */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950">
              Immediate Executive Attention Queue
            </h2>
          </div>
          <span className="text-xs text-slate-500">
            Cases with pending state instructions or impending court orders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Case ID & Number</th>
                <th className="py-2.5 px-3">Court / Bench</th>
                <th className="py-2.5 px-3">Department</th>
                <th className="py-2.5 px-3">Core Legal Issue</th>
                <th className="py-2.5 px-3">Govt Advocate</th>
                <th className="py-2.5 px-3">Responsible Official</th>
                <th className="py-2.5 px-3">Due / Hearing</th>
                <th className="py-2.5 px-3">Instructions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {immediateAttention.map((c: any) => (
                <tr 
                  key={c.id}
                  onClick={() => navigate(`/cases/${c.id}`)}
                  className="hover:bg-slate-50 cursor-pointer transition-colors"
                >
                  <td className="py-2 px-3 whitespace-nowrap">
                    <PriorityBadge level={c.priority} size="sm" />
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    <span className="font-bold text-tn-navy-950 block">{c.id}</span>
                    <span className="text-[10px] text-slate-500 font-mono">{c.caseNumber}</span>
                  </td>
                  <td className="py-2 px-3 max-w-[150px] truncate text-slate-700" title={c.court}>
                    {c.court.includes('Madras') ? 'Madras High Court' : c.court}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap font-medium text-slate-800">
                    {c.department.split('&')[0]}
                  </td>
                  <td className="py-2 px-3 max-w-[240px] truncate text-slate-600" title={c.legalIssue}>
                    {c.legalIssue}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap text-slate-700">
                    {c.advocateName.split('(')[0]}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openOfficialModal(c.officialName);
                      }}
                      className="text-left font-semibold text-tn-navy-900 hover:text-blue-700 hover:underline flex items-center space-x-1"
                      title="View Official Contact Details & Administrative Hierarchy"
                    >
                      <span>{c.officialName.split(',')[0]}</span>
                      <span className="text-[10px] text-blue-600 font-mono">↗</span>
                    </button>
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap font-bold text-red-700">
                    {c.nextHearingDate || 'Immediate'}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    <InstructionsBadge status={c.instructionsStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Official Contact & Hierarchy Modal Popup */}
      <OfficialContactModal
        official={selectedOfficial}
        onClose={() => setSelectedOfficial(null)}
      />
    </div>
  );
};
