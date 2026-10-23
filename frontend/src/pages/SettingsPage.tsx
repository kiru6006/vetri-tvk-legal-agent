import React from 'react';
import { Settings, Shield, Server, Database, CheckCircle2, Lock } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            System Administration & Environment Specifications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Architecture governance parameters, synthetic security controls, and clearance audit trail.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {/* Environment Status Card */}
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-tn-navy-950 pb-2 border-b border-slate-100">
            <Server className="w-4 h-4 text-emerald-600" />
            <span>Active Deployment Environment</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Build Phase</span>
              <span className="font-bold text-slate-900">Phase 1: Frontend UI/UX</span>
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Data Mode</span>
              <span className="font-bold text-amber-800">Synthetic Mock Layer</span>
            </div>
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Backend Interface</span>
              <span className="font-bold text-slate-900">Decoupled Service Mock</span>
            </div>
            <div className="p-2.5 rounded bg-emerald-50 border border-emerald-200">
              <span className="text-[10px] text-emerald-700 uppercase font-bold block">System Status</span>
              <span className="font-bold text-emerald-900 flex items-center">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                Operational
              </span>
            </div>
          </div>
        </div>

        {/* Security & Access Controls */}
        <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-tn-navy-950 pb-2 border-b border-slate-100">
            <Lock className="w-4 h-4 text-tn-gold-600" />
            <span>Role-Based Governance (RBAC Configuration)</span>
          </div>

          <div className="text-xs space-y-2 text-slate-700">
            <div className="flex items-center justify-between p-2 rounded bg-slate-50">
              <div>
                <strong>Chief Minister’s Office (CMO)</strong>
                <p className="text-[11px] text-slate-500">Full visibility across statewide departments, executive briefs, and advocate workloads.</p>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">Active Persona</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50">
              <div>
                <strong>Chief Secretary & Vigilance</strong>
                <p className="text-[11px] text-slate-500">Access to compliance audits, officer default tracking, and contempt registers.</p>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Available</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-slate-50">
              <div>
                <strong>Advocate General & Law Officers</strong>
                <p className="text-[11px] text-slate-500">Cause list synchronization, pending instructions submission, and case notes.</p>
              </div>
              <span className="text-[10px] font-mono text-slate-400">Available</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
