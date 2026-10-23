import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  X, 
  Scale, 
  Building2, 
  Calendar, 
  Clock, 
  UserCheck, 
  ExternalLink, 
  AlertTriangle,
  FileText,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';
import { CaseItem } from '@/types';
import { PriorityBadge, StatusBadge, InstructionsBadge } from '@/components/common/Badges';

interface CaseQuickModalProps {
  caseItem: CaseItem | null;
  onClose: () => void;
}

export const CaseQuickModal: React.FC<CaseQuickModalProps> = ({
  caseItem,
  onClose
}) => {
  const navigate = useNavigate();

  if (!caseItem) return null;

  return (
    <div className="fixed inset-0 z-50 bg-tn-navy-950/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 max-w-2xl w-full overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-tn-navy-950 via-tn-navy-900 to-slate-900 px-6 py-4 text-white flex items-start justify-between border-b border-tn-gold-500/40">
          <div className="space-y-1.5 pr-4">
            <div className="flex items-center space-x-2 flex-wrap gap-y-1">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-tn-gold-500/20 text-tn-gold-300 border border-tn-gold-500/40">
                {caseItem.id}
              </span>
              <span className="text-[10px] font-mono text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                {caseItem.caseNumber}
              </span>
              <PriorityBadge level={caseItem.priority} size="sm" />
              <StatusBadge status={caseItem.status} size="sm" />
            </div>
            <h2 className="text-base font-extrabold text-white tracking-tight leading-snug">
              {caseItem.caseTitle}
            </h2>
            <div className="text-xs text-slate-300 flex items-center space-x-1.5">
              <Scale className="w-3.5 h-3.5 text-tn-gold-400 shrink-0" />
              <span className="truncate">{caseItem.court} • {caseItem.bench}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 text-xs max-h-[72vh] overflow-y-auto bg-slate-50/50">
          {/* Key Facts Summary Banner */}
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-100 pb-2">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>Listed Date: <strong className="text-slate-800">{caseItem.hearingDate || 'Scheduled'}</strong></span>
              </span>
              <span className="flex items-center space-x-1 font-bold text-red-700">
                <Clock className="w-3.5 h-3.5" />
                <span>{caseItem.nextHearingDate}</span>
              </span>
            </div>

            <div className="text-slate-700">
              <span className="font-bold text-slate-900 block text-[11px] uppercase tracking-wider mb-1">
                Substantive Legal Issue:
              </span>
              <p className="leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200/60 font-medium">
                {caseItem.legalIssue}
              </p>
            </div>

            {caseItem.statuteReference && (
              <div className="text-[11px] text-slate-600">
                <strong>Statute / Act:</strong> {caseItem.statuteReference}
              </div>
            )}
            {caseItem.governmentOrder && (
              <div className="text-[11px] text-slate-600">
                <strong>Challenged G.O.:</strong> <span className="font-mono text-tn-navy-950 font-bold">{caseItem.governmentOrder}</span>
              </div>
            )}
          </div>

          {/* Department, Law Officer & Official Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Assigned Law Officer */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-tn-navy-950 font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-slate-100">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Assigned Law Officer</span>
              </div>
              <div className="font-bold text-slate-900 pt-1">{caseItem.advocateName}</div>
              <div className="text-slate-500 text-[11px]">{caseItem.advocateDesignation}</div>
              <div className="mt-1 flex items-center justify-between text-[11px] pt-1 border-t border-slate-100">
                <span className="text-slate-500">Instructions:</span>
                <InstructionsBadge status={caseItem.instructionsStatus} />
              </div>
            </div>

            {/* Accountable Official */}
            <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-xs space-y-1">
              <div className="flex items-center space-x-1.5 text-tn-navy-950 font-bold uppercase tracking-wider text-[10px] pb-1 border-b border-slate-100">
                <Building2 className="w-3.5 h-3.5 text-blue-600" />
                <span>Responsible Executive Officer</span>
              </div>
              <div className="font-bold text-slate-900 pt-1">{caseItem.officialName}</div>
              <div className="text-slate-500 text-[11px]">{caseItem.officialDesignation}</div>
              <div className="text-[11px] text-slate-600 truncate">
                Dept: <strong className="text-slate-800">{caseItem.department}</strong> ({caseItem.district})
              </div>
            </div>
          </div>

          {/* AI Executive Assessment Snippet */}
          {caseItem.aiSummary && (
            <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1.5 text-blue-900 font-bold text-xs">
                  <ShieldAlert className="w-4 h-4 text-blue-700" />
                  <span>AI Sovereign Risk Brief</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200">
                  Confidence: {caseItem.aiSummary.evidenceConfidence}%
                </span>
              </div>
              <div className="text-slate-700 text-xs space-y-1 leading-relaxed">
                <div>
                  <strong className="text-slate-900">Latest Court Pulse:</strong> {caseItem.aiSummary.latestDevelopment}
                </div>
                <div className="p-2 rounded bg-amber-50 border border-amber-200/80 text-amber-950 text-[11px] font-medium">
                  <strong>Required State Action:</strong> {caseItem.aiSummary.requiredAction}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 bg-white hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold border border-slate-300 transition-colors"
          >
            Dismiss
          </button>

          <button
            type="button"
            onClick={() => {
              onClose();
              navigate(`/cases/${caseItem.id}`);
            }}
            className="py-1.5 px-4 bg-tn-navy-950 hover:bg-tn-navy-900 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5"
          >
            <span>Open Complete Case File & Brief</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
