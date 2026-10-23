import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Scale, ShieldAlert, FileText, ArrowUpRight, Coins, AlertTriangle, Layers } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { CaseItem } from '@/types';
import { PriorityBadge } from '@/components/common/Badges';

export const CaseTypesPage: React.FC = () => {
  const navigate = useNavigate();
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getCases().then(res => {
      setCases(res);
      setLoading(false);
    });
  }, []);

  const categories = [
    {
      key: 'CONSTITUTIONAL_WRIT',
      title: 'Constitutional & Writ Jurisdiction',
      badge: 'Article 226 / 32',
      color: 'border-l-indigo-600',
      description: 'Challenging Government notifications, policy decisions, vires of enactments, and Fundamental Rights violations.',
      stateImpact: 'High potential for statewide policy and administrative injunctions.',
      benchmarkCases: 1420
    },
    {
      key: 'CIVIL',
      title: 'Civil & Commercial Proceedings',
      badge: 'Contracts / Recovery',
      color: 'border-l-blue-600',
      description: 'Arbitral award execution, contractor claims, infrastructure PPP agreements, and state property title declarations.',
      stateImpact: 'Direct treasury financial risk and potential bank account garnishee orders.',
      benchmarkCases: 680
    },
    {
      key: 'CRIMINAL',
      title: 'Criminal & Police Administration',
      badge: 'Detention / DVAC / CrPC',
      color: 'border-l-red-600',
      description: 'Preventive detention under Act 14/1982 (Goondas), DVAC corruption prosecutions, and law & order habeas corpus petitions.',
      stateImpact: 'High sensitivity regarding public order, personal liberty timelines, and officer liability.',
      benchmarkCases: 490
    },
    {
      key: 'REVENUE_TAX',
      title: 'Revenue, Excise & Commercial Taxes',
      badge: 'TNGST / Inam / Land',
      color: 'border-l-amber-600',
      description: 'Input tax credit disputes, transitional GST assessments, land revenue boundary fixes, and seigniorage mineral levies.',
      stateImpact: 'Critical recurring budget revenue streams and exchequer collections.',
      benchmarkCases: 385
    },
    {
      key: 'SERVICE_EMPLOYMENT',
      title: 'Service Matters & Recruitment',
      badge: 'TRB / TNPSC / Pay',
      color: 'border-l-emerald-600',
      description: 'Teachers recruitment, aided school grant-in-aid sanctions, seniorities, promotion quotas, and pension regularisations.',
      stateImpact: 'Statewide recurring salary liability and departmental administrative staffing freezes.',
      benchmarkCases: 512
    },
    {
      key: 'ENVIRONMENTAL',
      title: 'Environmental & Regulatory Forums',
      badge: 'NGT / Pollution Control',
      color: 'border-l-teal-600',
      description: 'River restoration compliances, STP commissioning notices, eco-sensitive zone clearances, and industrial effluents.',
      stateImpact: 'Peremptory environmental escrow deposits and industrial estate operation bans.',
      benchmarkCases: 164
    }
  ];

  const [selectedCategoryKey, setSelectedCategoryKey] = useState('ALL');

  const filteredCategories = categories.filter(c =>
    selectedCategoryKey === 'ALL' || c.key === selectedCategoryKey
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-tn-navy-900" />
            <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
              Litigation Classification by Substantive Law
            </h1>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Macro segmentation across Civil, Criminal, Constitutional Writs, Service Disputes, Revenue/Taxes, and Environmental matters.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded border border-slate-200">
            6 Core Categories Mapped
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center space-x-1 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { key: 'ALL', label: 'All Matter Types' },
          { key: 'CONSTITUTIONAL_WRIT', label: 'Constitutional & Writs' },
          { key: 'CIVIL', label: 'Civil & Commercial' },
          { key: 'CRIMINAL', label: 'Criminal & Police' },
          { key: 'REVENUE_TAX', label: 'Revenue & Taxes' },
          { key: 'SERVICE_EMPLOYMENT', label: 'Service & Employment' },
          { key: 'ENVIRONMENTAL', label: 'Environmental & NGT' },
        ].map((tab) => {
          const isActive = selectedCategoryKey === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedCategoryKey(tab.key)}
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

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((cat) => {
          const matchingCases = cases.filter(c => c.broadCategory === cat.key);
          const criticalCount = matchingCases.filter(c => c.priority === 'CRITICAL').length;

          return (
            <div
              key={cat.key}
              className={`p-5 bg-white rounded-xl border border-slate-200/90 border-l-[5px] ${cat.color} shadow-sm flex flex-col justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-200`}
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">{cat.title}</h3>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono shrink-0 border border-slate-200">
                    {cat.badge}
                  </span>
                </div>
                
                <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-normal">
                  {cat.description}
                </p>

                <div className="mt-3.5 p-2.5 bg-slate-50/90 rounded-lg border border-slate-200/60 text-xs text-slate-700">
                  <strong className="text-tn-navy-950 font-bold block mb-0.5">State Governance Consequence:</strong>
                  <span className="leading-relaxed">{cat.stateImpact}</span>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 pt-3.5 border-t border-slate-100 text-center">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-500 uppercase font-bold block">Cases Active</span>
                    <span className="text-base font-extrabold text-slate-900">{matchingCases.length}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-red-50/80 border border-red-100">
                    <span className="text-[10px] text-red-700 uppercase font-bold block">Critical Risk</span>
                    <span className="text-base font-extrabold text-red-700">{criticalCount}</span>
                  </div>
                </div>

                {matchingCases.length > 0 && (
                  <div className="mt-3.5 pt-2 border-t border-slate-100 text-xs">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block mb-1">Key Matters:</span>
                    <div className="space-y-1.5">
                      {matchingCases.slice(0, 2).map(c => (
                        <div
                          key={c.id}
                          onClick={() => navigate(`/cases/${c.id}`)}
                          className="font-mono text-[11px] text-tn-navy-900 hover:text-blue-700 font-semibold cursor-pointer truncate flex items-center space-x-1.5"
                          title={c.caseTitle}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-tn-gold-500 shrink-0"></span>
                          <span className="truncate">{c.id} - {c.caseTitle}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-tn-navy-900">
                <button
                  onClick={() => navigate(`/cases?category=${cat.key}`)}
                  className="hover:underline flex items-center space-x-1 text-tn-navy-900 hover:text-blue-900"
                >
                  <span>Explore All {cat.title.split(' ')[0]} Matters</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
