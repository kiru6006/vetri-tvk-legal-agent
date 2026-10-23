import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, AlertTriangle, Coins, Scale, Building2, Gavel, ArrowUpRight } from 'lucide-react';
import { PriorityBadge } from '@/components/common/Badges';

export const RiskIntelligencePage: React.FC = () => {
  const navigate = useNavigate();

  const riskCategories = [
    {
      title: 'Legal & Judicial Precedent Risk',
      severity: 'CRITICAL',
      activeCases: 42,
      description: 'Appeals and writ petitions challenging statutory notifications or leading to statewide invalidations of executive rules.',
      topCases: ['DEMO-TN-REV-0001 (Parandur)', 'DEMO-TN-EDU-0003 (Aided Teachers)']
    },
    {
      title: 'Financial Exposure & Decrees',
      severity: 'CRITICAL',
      activeCases: 68,
      description: 'Arbitration enforcement, contractor delay claims, land acquisition differentials, and pending execution petitions.',
      topCases: ['DEMO-TN-HIGHWAYS-0005 (₹240 Cr)', 'DEMO-TN-REV-0001 (₹145 Cr)']
    },
    {
      title: 'Statewide Policy & Regulatory Impact',
      severity: 'HIGH',
      activeCases: 31,
      description: 'Public Interest Litigations challenging reservation matrices, liquor retail licensing, and educational syllabi.',
      topCases: ['DEMO-TN-HOME-0002 (Goondas SOP)', 'DEMO-TN-EDU-0003 (Staffing Ratios)']
    },
    {
      title: 'Operational & Project Stoppage Risk',
      severity: 'HIGH',
      activeCases: 29,
      description: 'Interim stays halting highway corridor construction, SIPCOT allocations, and sewage treatment plant executions.',
      topCases: ['DEMO-TN-MAWS-0004 (NGT STPs)', 'DEMO-TN-REV-0001 (Airport Road)']
    },
    {
      title: 'Contempt of Court & Statutory Compliance',
      severity: 'HIGH',
      activeCases: 24,
      description: 'Peremptory timeframes imposed by courts where Secretary/Collector personal appearance is threatened.',
      topCases: ['DEMO-TN-HOME-0002', 'DEMO-TN-HIGHWAYS-0005']
    },
    {
      title: 'Public Service Delivery Disturbance',
      severity: 'MEDIUM',
      activeCases: 19,
      description: 'Litigation affecting hospital drug tenders, transport bus fare ceilings, and fair price ration shop allotments.',
      topCases: ['DEMO-TN-HEALTH-0009', 'DEMO-TN-EDU-0003']
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            Risk & Contingent Liability Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Holistic situational assessment across legal, financial, policy, compliance, and operational vulnerability vectors.
          </p>
        </div>
        <div className="mt-2 md:mt-0">
          <span className="text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded">
            Total Statewide Contingent Exposure: ₹1,845.6 Cr
          </span>
        </div>
      </div>

      {/* 6-Vector Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {riskCategories.map((cat, idx) => (
          <div
            key={idx}
            className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900">{cat.title}</span>
                <PriorityBadge level={cat.severity} size="sm" />
              </div>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                {cat.description}
              </p>
              
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Active High-Risk Matters:</span>
                  <span className="font-bold text-slate-900">{cat.activeCases}</span>
                </div>
                <div className="text-[11px]">
                  <span className="text-slate-500 block mb-1">Critical Underlying Cases:</span>
                  <div className="space-y-1">
                    {cat.topCases.map((c, i) => (
                      <div 
                        key={i} 
                        onClick={() => navigate('/cases/' + c.split(' ')[0])}
                        className="font-mono text-[10px] text-tn-navy-900 hover:underline cursor-pointer bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200"
                      >
                        {c}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-tn-navy-900">
              <button 
                onClick={() => navigate('/cases?risk=CRITICAL')}
                className="hover:underline flex items-center space-x-1"
              >
                <span>Filter Underlying Matters</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
