import React, { useState } from 'react';
import { FileText, Download, Eye, Calendar, CheckCircle2, Printer } from 'lucide-react';
import { mockReports } from '@/data/mockDashboard';
import { ReportTemplate } from '@/types';

export const ReportsPage: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportTemplate | null>(mockReports[0]);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  const handleSimulateDownload = (title: string) => {
    setDownloadSuccess(title);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 3000);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            Executive Briefings & Dossier Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Automated intelligence digests synthesized for Chief Minister, Chief Secretary, and Law Officers.
          </p>
        </div>
      </div>

      {downloadSuccess && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded text-xs font-semibold text-emerald-800 flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>Simulated export: "{downloadSuccess}" downloaded to executive workstation.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        {/* Left: Report List (5 cols) */}
        <div className="md:col-span-5 space-y-2.5">
          {mockReports.map((rep) => {
            const isSelected = selectedReport?.id === rep.id;
            return (
              <div
                key={rep.id}
                onClick={() => setSelectedReport(rep)}
                className={`p-3.5 rounded-lg border cursor-pointer transition-all ${
                  isSelected
                    ? 'border-tn-navy-800 bg-tn-navy-50/70 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] mb-1">
                  <span className="font-bold text-tn-navy-900 uppercase tracking-wider">{rep.category}</span>
                  <span className="font-mono text-slate-500">{rep.frequency}</span>
                </div>
                <h2 className="text-xs font-bold text-slate-900">{rep.title}</h2>
                <p className="text-[11px] text-slate-600 mt-1 line-clamp-2 leading-relaxed">
                  {rep.description}
                </p>
                <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-500">
                  <span>Generated: {rep.lastGenerated}</span>
                  <span>{rep.downloadSize}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Executive Report Preview (7 cols) */}
        {selectedReport && (
          <div className="md:col-span-7 bg-white rounded-lg border border-slate-200 shadow-xs p-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-tn-gold-600 block">
                    GOVERNMENT OF TAMIL NADU • CONFIDENTIAL BRIEF
                  </span>
                  <h3 className="text-base font-bold text-tn-navy-950 mt-0.5">
                    {selectedReport.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => window.print()}
                    className="p-1.5 rounded hover:bg-slate-100 text-slate-600"
                    title="Print Document"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleSimulateDownload(selectedReport.title)}
                    className="py-1 px-2.5 bg-tn-navy-900 text-white rounded text-xs font-semibold hover:bg-tn-navy-800 transition-colors flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

              {/* Synthesized Brief Content */}
              <div className="text-xs space-y-3 leading-relaxed text-slate-800 bg-slate-50 p-4 rounded border border-slate-200">
                <div className="flex justify-between border-b border-slate-200 pb-2 text-[11px] font-mono text-slate-500">
                  <span>CIRCULATION: CHIEF MINISTER'S OFFICE ONLY</span>
                  <span>DATE: TODAY</span>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-tn-navy-950 text-sm">1. Executive Summary & Situational Posture</h4>
                  <p>
                    As of today's cause lists across the Principal Bench and Madurai Bench of the Madras High Court, 
                    <strong> 5 matters</strong> demand immediate executive intervention. Pending instructions in land acquisition (Parandur access corridor) 
                    and commercial execution proceedings against Highways Department carry imminent financial and operational risk.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-tn-navy-950 text-sm">2. Key Actionable Directives</h4>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><strong>Revenue & Disaster Management:</strong> Collector Kanchipuram directed to transmit revised compensation guidelines to Advocate General by 1:00 PM today.</li>
                    <li><strong>Highways Department:</strong> Emergency motion before Commercial Appellate Division required to stay treasury attachment proceedings (₹240 Cr).</li>
                    <li><strong>Home Department:</strong> Special affidavit on preventive detention postal dispatch records due tomorrow morning before Criminal Division Bench.</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h4 className="font-bold text-tn-navy-950 text-sm">3. Financial Liability Snapshot</h4>
                  <p>
                    Current active contingent exposure across all 8 major departments stands at <strong>₹1,845.6 Crores</strong>. 
                    Immediate high-probability decrees are concentrated in Highways & Minor Ports (₹540 Cr) and Revenue (₹412.5 Cr).
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-mono">
              <span>DOCUMENT AUTH: DEMO-SEC-TN-2026-X9</span>
              <span>SYNTHETIC DEMONSTRATION INTELLIGENCE</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
