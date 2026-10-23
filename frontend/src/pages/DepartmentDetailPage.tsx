import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, AlertTriangle, Scale, Clock, Users, ArrowUpRight } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { DepartmentItem, CaseItem } from '@/types';
import { PriorityBadge, InstructionsBadge } from '@/components/common/Badges';

export const DepartmentDetailPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const [dept, setDept] = useState<DepartmentItem | null>(null);
  const [deptCases, setDeptCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (code) {
      mockApi.getDepartmentById(code).then(res => {
        if (res) {
          setDept(res);
          mockApi.getCases({ department: res.name.split('&')[0].trim() }).then(cases => {
            setDeptCases(cases);
            setLoading(false);
          });
        } else {
          setLoading(false);
        }
      });
    }
  }, [code]);

  if (loading) {
    return <div className="p-8 text-center text-xs text-slate-500">Loading department dossier...</div>;
  }

  if (!dept) {
    return (
      <div className="p-8 text-center space-y-3">
        <h2 className="text-base font-bold text-slate-800">Department Not Found</h2>
        <button onClick={() => navigate('/departments')} className="px-3 py-1.5 bg-tn-navy-900 text-white rounded text-xs">
          Return to Departments
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Return Header */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-200">
        <button
          onClick={() => navigate('/departments')}
          className="flex items-center space-x-1 text-xs font-medium text-slate-600 hover:text-tn-navy-900"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Departments</span>
        </button>
        <span className="font-mono text-xs font-bold text-slate-500">
          CODE: {dept.code}
        </span>
      </div>

      {/* Main Department Banner */}
      <div className="p-4 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold text-tn-navy-950">{dept.name}</h1>
              <PriorityBadge level={dept.policyRiskLevel} />
            </div>
            <p className="text-xs text-slate-600 mt-1 max-w-2xl">{dept.description}</p>
            <div className="mt-2 text-xs text-slate-500">
              Department Secretary: <strong className="text-slate-900">{dept.secretaryName}</strong>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-right">
            <div className="p-2.5 bg-red-50 border border-red-200 rounded text-center">
              <span className="text-[10px] uppercase font-bold text-red-700 block">Pending Instructions</span>
              <span className="text-xl font-bold text-red-800">{dept.instructionsPending}</span>
            </div>
            <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-center">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Financial Liability</span>
              <span className="text-xl font-bold text-slate-900">₹{dept.financialExposureCr} Cr</span>
            </div>
          </div>
        </div>

        {/* Primary Legal Themes Tags */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-semibold text-slate-500">Active Legal Themes:</span>
          {dept.primaryLegalThemes.map((theme, i) => (
            <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              {theme}
            </span>
          ))}
        </div>
      </div>

      {/* Department Cases Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-4 py-3 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-tn-navy-950">
            Current Proceedings for {dept.name}
          </h2>
          <span className="text-xs text-slate-500">{deptCases.length} matters mapped</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Case ID</th>
                <th className="py-2.5 px-3">Title & Issue</th>
                <th className="py-2.5 px-3">Advocate</th>
                <th className="py-2.5 px-3">Responsible Official</th>
                <th className="py-2.5 px-3">Instructions</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {deptCases.map(c => (
                <tr key={c.id} onClick={() => navigate(`/cases/${c.id}`)} className="hover:bg-slate-50 cursor-pointer">
                  <td className="py-2 px-3 whitespace-nowrap">
                    <PriorityBadge level={c.priority} size="sm" />
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap font-mono font-bold text-tn-navy-950">
                    {c.id}
                  </td>
                  <td className="py-2 px-3 max-w-[260px]">
                    <span className="font-semibold text-slate-900 block truncate">{c.caseTitle}</span>
                    <span className="text-[10px] text-slate-500 truncate block">{c.legalIssue}</span>
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap text-slate-700">
                    {c.advocateName.split('(')[0]}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap text-slate-700">
                    {c.officialName.split(',')[0]}
                  </td>
                  <td className="py-2 px-3 whitespace-nowrap">
                    <InstructionsBadge status={c.instructionsStatus} />
                  </td>
                  <td className="py-2 px-3 text-right whitespace-nowrap">
                    <button className="text-xs font-semibold text-tn-navy-900 hover:underline">
                      View File
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
