import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Search, ArrowUpRight, AlertTriangle, ShieldCheck } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { DepartmentItem } from '@/types';
import { PriorityBadge } from '@/components/common/Badges';

export const DepartmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState<DepartmentItem[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    mockApi.getDepartments().then(res => {
      setDepartments(res);
      setLoading(false);
    });
  }, []);

  const filtered = departments.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.code.toLowerCase().includes(search.toLowerCase()) ||
    d.secretaryName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            Department Litigation Intelligence
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor administrative compliance, legal exposure, and pending instructions across Government departments.
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Department or Secretary..."
            className="px-3 py-1.5 text-xs bg-white border border-slate-200 rounded focus:border-tn-navy-700 outline-none w-64"
          />
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(dept => (
          <div
            key={dept.id}
            onClick={() => navigate(`/departments/${dept.code.toLowerCase()}`)}
            className="p-5 bg-white rounded-xl border border-slate-200/90 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-slate-100 text-tn-navy-950 border border-slate-200">
                  {dept.code}
                </span>
                <PriorityBadge level={dept.policyRiskLevel} size="sm" />
              </div>

              <h3 className="text-sm font-extrabold text-slate-900 mt-2.5 line-clamp-1 tracking-tight">
                {dept.name}
              </h3>
              <div className="text-xs text-slate-600 mt-1 font-medium truncate">
                Secy: <strong className="text-slate-800">{dept.secretaryName}</strong>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3.5 border-t border-slate-100 text-center">
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-500 uppercase font-bold block">Active</span>
                  <span className="text-base font-extrabold text-slate-900">{dept.activeCases}</span>
                </div>
                <div className="p-2 rounded-lg bg-red-50/80 border border-red-100">
                  <span className="text-[10px] text-red-700 uppercase font-bold block">Critical</span>
                  <span className="text-base font-extrabold text-red-700">{dept.criticalCases}</span>
                </div>
                <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-100">
                  <span className="text-[10px] text-amber-800 uppercase font-bold block">Pending</span>
                  <span className="text-base font-extrabold text-amber-900">{dept.instructionsPending}</span>
                </div>
              </div>

              <div className="mt-3.5 p-2 bg-slate-50/80 rounded-lg border border-slate-100 text-xs space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Financial Exposure:</span>
                  <span className="font-extrabold text-slate-900">₹{dept.financialExposureCr} Cr</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500 font-medium">Hearings Listed:</span>
                  <span className="font-bold text-blue-900">{dept.hearingsThisWeek}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-tn-navy-900 hover:text-blue-800">
              <span>View Department Dossier</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
