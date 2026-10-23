import React from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  Home, 
  Users, 
  GitFork, 
  Briefcase, 
  ShieldCheck, 
  Calendar,
  AlertTriangle
} from 'lucide-react';
import { OfficialItem } from '@/types';

interface OfficialContactModalProps {
  official: OfficialItem | null;
  onClose: () => void;
}

export const OfficialContactModal: React.FC<OfficialContactModalProps> = ({
  official,
  onClose
}) => {
  if (!official) return null;

  return (
    <div className="fixed inset-0 z-50 bg-tn-navy-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200/90 max-w-2xl w-full overflow-hidden flex flex-col my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-tn-navy-950 via-tn-navy-900 to-slate-900 px-6 py-4 text-white flex items-start justify-between border-b border-tn-gold-500/40">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-tn-gold-500/20 text-tn-gold-300 border border-tn-gold-500/40 uppercase">
                {official.cadre} Cadre • Official Dossier
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                POSTED: {official.postingDate}
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-white tracking-tight">
              {official.name}
            </h2>
            <div className="text-xs text-slate-300 font-medium">
              {official.designation} — <span className="text-tn-gold-300">{official.department}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs max-h-[75vh] overflow-y-auto bg-slate-50/50">
          
          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-2.5 rounded-xl bg-white border border-slate-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Litigations</span>
              <span className="text-base font-extrabold text-slate-900">{official.activeMatters}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-red-50/80 border border-red-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-red-700 block">Critical Matters</span>
              <span className="text-base font-extrabold text-red-700">{official.criticalMatters}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Pending Instructions</span>
              <span className="text-base font-extrabold text-amber-900">{official.pendingActions}</span>
            </div>
          </div>

          {/* 1. Official Direct Contact Info */}
          <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-tn-navy-950 font-bold uppercase tracking-wider text-xs pb-2 border-b border-slate-100">
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>Direct Telecommunication Lines</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Official Direct Line</span>
                <span className="font-mono font-bold text-tn-navy-950 text-sm flex items-center">
                  <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                  {official.contactDetails.officialPhone}
                </span>
              </div>

              {official.contactDetails.campOfficePhone && (
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Camp Office Phone</span>
                  <span className="font-mono font-bold text-slate-800 text-sm flex items-center">
                    <Phone className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                    {official.contactDetails.campOfficePhone}
                  </span>
                </div>
              )}

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Official Direct Email</span>
                <span className="font-mono font-semibold text-blue-800 text-xs flex items-center truncate">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-500 shrink-0" />
                  {official.contactDetails.directEmail}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200/60">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">Tapal / Dispatch Desk</span>
                <span className="font-mono font-semibold text-slate-700 text-xs flex items-center truncate">
                  <Mail className="w-3.5 h-3.5 mr-1.5 text-slate-500 shrink-0" />
                  {official.contactDetails.secTapalEmail}
                </span>
              </div>
            </div>

            {official.contactDetails.paContactName && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
                <span>Personal Assistant (PA): <strong className="text-slate-900">{official.contactDetails.paContactName}</strong></span>
                <span className="font-mono font-bold text-slate-800">{official.contactDetails.paContactPhone}</span>
              </div>
            )}
          </div>

          {/* 2. Official & Residential Addresses */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Official Secretariat / Collectorate Address */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center space-x-2 text-tn-navy-950 font-bold uppercase tracking-wider text-[11px] pb-2 border-b border-slate-100">
                <Building2 className="w-4 h-4 text-blue-600" />
                <span>Official Secretariat / Office Address</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {official.contactDetails.officialAddress}
              </p>
            </div>

            {/* Official Residence Address */}
            <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-2">
              <div className="flex items-center space-x-2 text-tn-navy-950 font-bold uppercase tracking-wider text-[11px] pb-2 border-b border-slate-100">
                <Home className="w-4 h-4 text-amber-600" />
                <span>Official Residential Bungalow</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {official.contactDetails.residentialAddress}
              </p>
            </div>
          </div>

          {/* 3. Administrative Hierarchy & Chain of Command */}
          <div className="p-4 bg-white rounded-xl border border-slate-200/90 shadow-xs space-y-3">
            <div className="flex items-center space-x-2 text-tn-navy-950 font-bold uppercase tracking-wider text-xs pb-2 border-b border-slate-100">
              <GitFork className="w-4 h-4 text-purple-600" />
              <span>Administrative Hierarchy & Legal Chain of Command</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-100 text-purple-950">
                <span className="text-[10px] uppercase font-bold text-purple-800 block mb-0.5">Accountable / Reports Directly To:</span>
                <strong className="text-sm font-extrabold">{official.hierarchy.reportsTo}</strong>
              </div>

              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800">
                <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Directly Supervises for Litigation Compliance:</span>
                <ul className="list-disc pl-4 space-y-0.5 text-xs font-medium">
                  {official.hierarchy.supervises.map((sub, i) => (
                    <li key={i}>{sub}</li>
                  ))}
                </ul>
              </div>

              <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-100 text-blue-950 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-blue-800 block">Nodal Law Officer Assignment:</span>
                  <span className="font-bold text-xs">{official.hierarchy.nodalLawOfficer}</span>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 bg-blue-100 text-blue-800 rounded">High Court Brief</span>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-white border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span className="font-mono text-[10px]">
            CLEARANCE: TIER-1 EXECUTIVE • GOVERNMENT OF TAMIL NADU
          </span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-tn-navy-900 hover:bg-tn-navy-800 text-white rounded-lg font-semibold transition-colors shadow-xs"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
