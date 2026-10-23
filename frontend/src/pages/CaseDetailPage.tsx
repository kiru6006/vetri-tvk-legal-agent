import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Scale, 
  Calendar, 
  Clock, 
  UserCheck, 
  Building2, 
  AlertTriangle, 
  FileCheck, 
  Coins, 
  ExternalLink,
  Bot,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { CaseItem } from '@/types';
import { PriorityBadge, StatusBadge, InstructionsBadge } from '@/components/common/Badges';
import { OfficialContactModal } from '@/components/officials/OfficialContactModal';
import { OfficialItem } from '@/types';
import { mockOfficials } from '@/data/mockOfficials';

export const CaseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseItem, setCaseItem] = useState<CaseItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'OVERVIEW' | 'AI_BRIEF' | 'TIMELINE' | 'RISK_FINANCE' | 'ACTIONS'>('OVERVIEW');
  const [selectedOfficial, setSelectedOfficial] = useState<OfficialItem | null>(null);

  const openOfficialModal = (officialIdOrName: string) => {
    const found = mockOfficials.find(o => 
      o.id === officialIdOrName || 
      o.name.toLowerCase().includes(officialIdOrName.toLowerCase()) ||
      officialIdOrName.toLowerCase().includes(o.name.split(',')[0].toLowerCase())
    ) || mockOfficials[0];
    setSelectedOfficial(found);
  };

  useEffect(() => {
    if (id) {
      mockApi.getCaseById(id).then(res => {
        if (res) {
          setCaseItem(res);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="p-8 text-center text-xs text-slate-500">
        Loading synthetic case intelligence file...
      </div>
    );
  }

  if (!caseItem) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2 className="text-base font-bold text-slate-800">Case Record Not Found</h2>
        <p className="text-xs text-slate-500">The synthetic case ID {id} was not located in the demonstration registry.</p>
        <button
          onClick={() => navigate('/cases')}
          className="px-3 py-1.5 bg-tn-navy-900 text-white rounded text-xs font-semibold"
        >
          Return to All Cases
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Top Breadcrumb & Return Nav */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <button
          onClick={() => navigate('/cases')}
          className="flex items-center space-x-1 text-xs font-medium text-slate-600 hover:text-tn-navy-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Case Explorer</span>
        </button>
        <div className="flex items-center space-x-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
            RECORD ID: {caseItem.id}
          </span>
          <PriorityBadge level={caseItem.priority} />
        </div>
      </div>

      {/* Case Header Card */}
      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-mono font-bold text-tn-navy-950 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                {caseItem.caseNumber}
              </span>
              <span className="text-xs text-slate-500 font-medium">
                {caseItem.caseType}
              </span>
              <StatusBadge status={caseItem.status} size="sm" />
            </div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              {caseItem.caseTitle}
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              Forum: <strong className="text-slate-900">{caseItem.court}</strong> • Bench: <span className="text-slate-800">{caseItem.bench}</span>
            </p>
          </div>

          <div className="flex md:flex-col items-end justify-between shrink-0 space-y-1">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Scheduled Hearing</span>
              <span className="text-sm font-bold text-red-700 flex items-center justify-end">
                <Clock className="w-3.5 h-3.5 mr-1" />
                {caseItem.nextHearingDate || 'Not Listed'}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">State Instructions</span>
              <InstructionsBadge status={caseItem.instructionsStatus} />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 border-t border-slate-100 pt-3">
          {[
            { key: 'OVERVIEW', label: 'Case Overview & Parties' },
            { key: 'AI_BRIEF', label: 'AI Executive Brief & Findings' },
            { key: 'TIMELINE', label: 'Proceedings Timeline' },
            { key: 'RISK_FINANCE', label: 'Risk & Financial Exposure' },
            { key: 'ACTIONS', label: `Action Items (${caseItem.actionItems.length})` }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-1.5 text-xs font-semibold rounded transition-colors ${
                activeTab === tab.key
                  ? 'bg-tn-navy-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab 1: OVERVIEW */}
      {activeTab === 'OVERVIEW' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Legal Issue & Governance Context (2 cols) */}
          <div className="md:col-span-2 space-y-4">
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950 pb-2 border-b border-slate-100">
                Substantive Legal Dispute
              </h2>
              <div className="text-xs leading-relaxed text-slate-800 space-y-2">
                <p><strong>Subject Matter:</strong> {caseItem.legalIssue}</p>
                <p><strong>Statutory Reference:</strong> <span className="font-mono text-slate-700 bg-slate-50 px-1 py-0.5 rounded border border-slate-200">{caseItem.statuteReference}</span></p>
                {caseItem.governmentOrder && (
                  <p><strong>Challenged Government Order:</strong> <span className="font-mono text-tn-navy-900 bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">{caseItem.governmentOrder}</span></p>
                )}
              </div>
            </div>

            {/* Litigating Parties */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950 pb-2 border-b border-slate-100">
                Litigating Parties & Representation
              </h2>
              <div className="divide-y divide-slate-100">
                {caseItem.parties.map((p, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-slate-900">{p.name}</span>
                      {p.advocateName && (
                        <span className="block text-[11px] text-slate-500">Rep by: {p.advocateName}</span>
                      )}
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      p.isGovernment ? 'bg-blue-50 text-blue-800 border border-blue-200' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {p.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Department, Law Officer & Official (1 col) */}
          <div className="space-y-4">
            {/* Government Advocate Card */}
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center space-x-2 text-tn-navy-950 font-bold text-xs uppercase tracking-wider">
                <UserCheck className="w-4 h-4 text-tn-gold-600" />
                <span>Assigned Law Officer</span>
              </div>
              <div className="pt-1 text-xs">
                <div className="font-bold text-slate-900">{caseItem.advocateName}</div>
                <div className="text-slate-500">{caseItem.advocateDesignation}</div>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span>Instructions Status:</span>
                  <InstructionsBadge status={caseItem.instructionsStatus} />
                </div>
              </div>
            </div>

            {/* Responsible Official Card */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-sm space-y-2.5">
              <div className="flex items-center justify-between text-tn-navy-950 font-bold text-xs uppercase tracking-wider pb-1.5 border-b border-slate-100">
                <div className="flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-tn-navy-700" />
                  <span>Responsible Executive Officer</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">
                  IAS Cadre
                </span>
              </div>
              
              <div className="pt-0.5 text-xs space-y-1">
                <button
                  onClick={() => openOfficialModal(caseItem.officialId || caseItem.officialName)}
                  className="font-extrabold text-sm text-tn-navy-950 hover:text-blue-700 hover:underline text-left block transition-colors"
                  title="Click to view official contact details, addresses, and hierarchy"
                >
                  {caseItem.officialName} ↗
                </button>
                <div className="text-slate-600 font-medium">{caseItem.officialDesignation}</div>
                <div className="text-[11px] text-slate-500">
                  Department: <strong className="text-slate-800">{caseItem.department}</strong>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => openOfficialModal(caseItem.officialId || caseItem.officialName)}
                    className="w-full py-1.5 px-2.5 bg-slate-50 hover:bg-slate-100 text-tn-navy-900 border border-slate-200 rounded-lg text-xs font-bold transition-all flex items-center justify-center space-x-1.5 shadow-2xs"
                  >
                    <span>View Official Contact & Hierarchy</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: AI EXECUTIVE BRIEF */}
      {activeTab === 'AI_BRIEF' && (
        <div className="space-y-4">
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between text-xs text-blue-900">
            <div className="flex items-center space-x-2">
              <Bot className="w-4 h-4 text-blue-700" />
              <span><strong>AI-GENERATED DEMONSTRATION INTELLIGENCE:</strong> Synthesized from petition, government orders, and cause lists.</span>
            </div>
            <span className="font-bold font-mono">Confidence: {caseItem.aiSummary.evidenceConfidence}%</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                1. What is the Core Dispute?
              </span>
              <p className="text-xs text-slate-800 leading-relaxed">
                {caseItem.aiSummary.whatIsDispute}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                2. Why is Government of TN Involved?
              </span>
              <p className="text-xs text-slate-800 leading-relaxed">
                {caseItem.aiSummary.whyGovernmentInvolved}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                3. Latest Judicial Developments
              </span>
              <p className="text-xs text-slate-800 leading-relaxed">
                {caseItem.aiSummary.latestDevelopment}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                4. Legal & Precedent Risks
              </span>
              <p className="text-xs text-slate-800 leading-relaxed text-red-950 font-medium">
                {caseItem.aiSummary.legalRisk}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                5. Financial & Budgetary Exposure
              </span>
              <p className="text-xs text-slate-800 leading-relaxed">
                {caseItem.aiSummary.financialExposure}
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg border border-amber-200 bg-amber-50/50 shadow-xs space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900 block">
                6. Executive Mandate / Recommended Action
              </span>
              <p className="text-xs text-amber-950 leading-relaxed font-semibold">
                {caseItem.aiSummary.requiredAction}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: TIMELINE */}
      {activeTab === 'TIMELINE' && (
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs">
          <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950 pb-3 border-b border-slate-100 mb-4">
            Procedural History & Court Filings
          </h2>
          <div className="space-y-4 pl-4 border-l-2 border-slate-200 ml-2">
            {caseItem.timeline.map((event) => (
              <div key={event.id} className="relative group">
                <span className={`absolute -left-[21px] top-1 w-3 h-3 rounded-full border-2 bg-white ${
                  event.isAdverse ? 'border-red-600 bg-red-100' : 'border-tn-navy-800'
                }`}></span>
                <div className="text-xs">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-slate-900">{event.event}</span>
                    <span className="text-[10px] font-mono text-slate-400">{event.date}</span>
                    {event.isAdverse && (
                      <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-red-100 text-red-800 rounded">
                        Adverse Observation
                      </span>
                    )}
                  </div>
                  <p className="text-slate-600 mt-0.5">{event.description}</p>
                  <span className="text-[10px] text-slate-400 font-mono block mt-0.5">
                    Source: {event.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: RISK & FINANCE */}
      {activeTab === 'RISK_FINANCE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Risk Dimensions */}
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950 pb-2 border-b border-slate-100">
              6-Dimensional Risk Assessment
            </h2>
            <div className="space-y-2 text-xs">
              {[
                { label: 'Legal / Precedent Risk', level: caseItem.risks.legal },
                { label: 'Financial Exposure Risk', level: caseItem.risks.financial },
                { label: 'Statewide Policy Risk', level: caseItem.risks.policy },
                { label: 'Operational / Project Delay', level: caseItem.risks.operational },
                { label: 'Statutory Compliance / Contempt', level: caseItem.risks.compliance },
                { label: 'Public Service Delivery Impact', level: caseItem.risks.publicService }
              ].map((r, i) => (
                <div key={i} className="flex items-center justify-between py-1 border-b border-slate-50">
                  <span className="text-slate-700 font-medium">{r.label}</span>
                  <PriorityBadge level={r.level} size="sm" />
                </div>
              ))}
            </div>
            <div className="mt-2 p-2 bg-slate-50 rounded text-xs text-slate-600">
              <strong>Risk Analyst Notes:</strong> {caseItem.risks.notes}
            </div>
          </div>

          {/* Financial Liability Matrix */}
          <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950 pb-2 border-b border-slate-100">
              Financial Liability Exposure
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Claimed Damages</span>
                <span className="text-lg font-bold text-slate-900">₹{caseItem.financialExposure.claimedAmount} Cr</span>
              </div>
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Awarded / Decreed</span>
                <span className="text-lg font-bold text-slate-900">
                  {caseItem.financialExposure.awardedAmount ? `₹${caseItem.financialExposure.awardedAmount} Cr` : 'Pending'}
                </span>
              </div>
              <div className="p-2.5 rounded bg-red-50 border border-red-200">
                <span className="text-[10px] uppercase font-bold text-red-900 block">State Law Estimate</span>
                <span className="text-lg font-bold text-red-700">₹{caseItem.financialExposure.estimatedExposure} Cr</span>
              </div>
              <div className="p-2.5 rounded bg-blue-50 border border-blue-200">
                <span className="text-[10px] uppercase font-bold text-blue-900 block">AI Actuarial Exposure</span>
                <span className="text-lg font-bold text-blue-800">₹{caseItem.financialExposure.aiEstimatedExposure} Cr</span>
              </div>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              {caseItem.financialExposure.notes}
            </p>
          </div>
        </div>
      )}

      {/* Tab 5: ACTIONS */}
      {activeTab === 'ACTIONS' && (
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950 pb-2 border-b border-slate-100">
            Accountable Directives & Pending Actions
          </h2>
          <div className="divide-y divide-slate-100">
            {caseItem.actionItems.map((act) => (
              <div key={act.id} className="py-2.5 flex items-center justify-between text-xs">
                <div className="space-y-0.5">
                  <div className="font-semibold text-slate-900">{act.action}</div>
                  <div className="text-[11px] text-slate-500">
                    Owner: <strong className="text-slate-800">{act.owner}</strong> ({act.department}) • Source: {act.source}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-red-700">Due: {act.dueDate}</span>
                  <PriorityBadge level={act.priority} size="sm" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Contact & Hierarchy Modal Popup */}
      <OfficialContactModal
        official={selectedOfficial}
        onClose={() => setSelectedOfficial(null)}
      />
    </div>
  );
};
