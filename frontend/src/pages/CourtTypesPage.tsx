import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gavel, Scale, Building2, MapPin, ArrowUpRight, ShieldCheck, ChevronRight } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { CaseItem } from '@/types';

export const CourtTypesPage: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getCases().then(res => {
      setCases(res);
      setLoading(false);
    });
  }, []);

  const courtLevels = [
    {
      key: 'SUPREME_COURT',
      name: 'Supreme Court of India (New Delhi)',
      hierarchy: 'Apex Constitutional Court',
      representation: 'Advocate General / Standing Counsel (Delhi)',
      statewideVolume: '185 active SLPs / Appeals',
      benchBreakdown: 'Listed in Court No. 1 - 15',
      governanceScope: 'Sovereign statutory validity, interstate river waters, and final appellate decree stay orders.',
      sampleFilter: 'Supreme Court of India'
    },
    {
      key: 'HIGH_COURT',
      name: 'Madras High Court (Principal Bench & Madurai Bench)',
      hierarchy: 'High Court of Judicature at Madras',
      representation: 'Advocate General, Additional AGs, Special Government Pleaders',
      statewideVolume: '2,400 active proceedings',
      benchBreakdown: 'Principal Bench (Chennai): 1,420 • Madurai Bench: 980',
      governanceScope: 'Writ petitions under Article 226, public interest litigations, writ appeals against single judges, and contempt summons.',
      sampleFilter: 'Madras High Court'
    },
    {
      key: 'DISTRICT_SESSIONS',
      name: 'District & Sessions Courts (38 Judicial Districts)',
      hierarchy: 'Principal District Courts / Sub Courts',
      representation: 'District Government Pleaders / Public Prosecutors',
      statewideVolume: '390 active trials & appeals',
      benchBreakdown: 'District Courts, Subordinate Judges, Special DVAC Judges',
      governanceScope: 'Government title suits, motor accidents claims (MCOP), DVAC anti-corruption trials, and civil execution petitions.',
      sampleFilter: 'District & Sessions Court'
    },
    {
      key: 'LOWER_COURTS',
      name: 'Lower & Subordinate Judiciary',
      hierarchy: 'District Munsif & Judicial Magistrate Courts',
      representation: 'Assistant Public Prosecutors / Local Government Pleaders',
      statewideVolume: '180 active local matters',
      benchBreakdown: 'Munsif Courts, Judicial Magistrates, Executive Magistrates',
      governanceScope: 'Injunctions on local municipal works, Section 145 CrPC boundary disputes, and petty revenue trespass matters.',
      sampleFilter: 'Sub Court'
    },
    {
      key: 'TRIBUNALS_COMMISSIONS',
      name: 'Specialised Tribunals & Quasi-Judicial Authorities',
      hierarchy: 'Specialised Judicial & Expert Benches',
      representation: 'Special Standing Counsels / Law Officers',
      statewideVolume: '305 active matters',
      benchBreakdown: 'National Green Tribunal (SZ), Central Admin Tribunal (CAT), Revenue Board',
      governanceScope: 'Environmental penalties, pollution closure notices, central-state civil service rules, and tax appellate tribunals.',
      sampleFilter: 'National Green Tribunal (Southern Zone)'
    }
  ];

  const [selectedCourtLevel, setSelectedCourtLevel] = useState('ALL');

  const filteredCourts = courtLevels.filter(c => 
    selectedCourtLevel === 'ALL' || c.key === selectedCourtLevel
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <Gavel className="w-5 h-5 text-tn-navy-900" />
            <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
              Court Jurisdiction & Judicial Hierarchy
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Institutional overview across Supreme Court, Madras High Court benches, District Courts, Lower Judiciary, and Tribunals.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200">
            Judicial Hierarchy Breakdown
          </span>
        </div>
      </div>

      {/* Court Level Tabs */}
      <div className="flex items-center space-x-1 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { key: 'ALL', label: 'All Jurisdictions' },
          { key: 'SUPREME_COURT', label: 'Supreme Court (Apex)' },
          { key: 'HIGH_COURT', label: 'High Court (Madras/Mdu)' },
          { key: 'DISTRICT_SESSIONS', label: 'District & Sessions' },
          { key: 'LOWER_COURTS', label: 'Lower Courts' },
          { key: 'TRIBUNALS_COMMISSIONS', label: 'Tribunals & Commissions' },
        ].map((tab) => {
          const isActive = selectedCourtLevel === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedCourtLevel(tab.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-tn-navy-950 text-tn-navy-950 bg-white shadow-xs'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Court Tiers Stack */}
      <div className="space-y-4">
        {filteredCourts.map((court, idx) => {
          const matchingCases = cases.filter(c => c.courtLevel === court.key);
          const criticalCount = matchingCases.filter(c => c.priority === 'CRITICAL').length;

          return (
            <div
              key={court.key}
              className="p-5 bg-white rounded-xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden"
            >
              {/* Left Accent Bar */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-tn-navy-900" />

              <div className="space-y-2 flex-1 pl-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-tn-navy-950 text-tn-gold-400 font-extrabold text-xs flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm font-extrabold text-tn-navy-950 tracking-tight">
                    {court.name}
                  </h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono border border-slate-200">
                    {court.hierarchy}
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed max-w-3xl font-normal">
                  {court.governanceScope}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Law Officer Representation</span>
                    <strong className="text-tn-navy-950">{court.representation}</strong>
                  </div>
                  <div className="p-1.5 rounded bg-slate-50 border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Jurisdictional Benches</span>
                    <strong className="text-tn-navy-950">{court.benchBreakdown}</strong>
                  </div>
                </div>
              </div>

              {/* Metrics & Drill-down */}
              <div className="flex items-center space-x-3 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-5">
                <div className="text-center px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Mapped Cases</span>
                  <span className="text-lg font-extrabold text-slate-900">{matchingCases.length}</span>
                </div>
                <div className="text-center px-3 py-1.5 rounded-lg bg-red-50 border border-red-100">
                  <span className="text-[10px] text-red-700 uppercase font-bold block">Critical Risk</span>
                  <span className="text-lg font-extrabold text-red-700">{criticalCount}</span>
                </div>

                <button
                  onClick={() => navigate(`/cases?courtLevel=${court.key}`)}
                  className="py-2 px-3.5 bg-tn-navy-900 hover:bg-tn-navy-800 text-white rounded-lg text-xs font-bold flex items-center space-x-1.5 transition-all shadow-xs hover:shadow"
                >
                  <span>Filter Forum</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
