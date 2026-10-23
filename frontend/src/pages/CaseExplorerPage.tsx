import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Search, Filter, RotateCcw, ChevronLeft, ChevronRight, Eye, AlertCircle } from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { CaseItem } from '@/types';
import { PriorityBadge, StatusBadge, InstructionsBadge } from '@/components/common/Badges';

export const CaseExplorerPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [department, setDepartment] = useState(searchParams.get('department') || 'ALL');
  const [priority, setPriority] = useState(searchParams.get('priority') || 'ALL');
  const [court, setCourt] = useState(searchParams.get('court') || 'ALL');
  const [broadCategory, setBroadCategory] = useState(searchParams.get('category') || 'ALL');
  const [courtLevel, setCourtLevel] = useState(searchParams.get('courtLevel') || 'ALL');

  useEffect(() => {
    // Sync with query params
    const qSearch = searchParams.get('search') || '';
    const qDept = searchParams.get('department') || 'ALL';
    const qPrio = searchParams.get('priority') || 'ALL';
    const qCourt = searchParams.get('court') || 'ALL';
    const qCat = searchParams.get('category') || 'ALL';
    const qLevel = searchParams.get('courtLevel') || 'ALL';

    setSearch(qSearch);
    setDepartment(qDept);
    setPriority(qPrio);
    setCourt(qCourt);
    setBroadCategory(qCat);
    setCourtLevel(qLevel);

    mockApi.getCases({
      search: qSearch || undefined,
      department: qDept !== 'ALL' ? qDept : undefined,
      priority: qPrio !== 'ALL' ? qPrio : undefined,
      court: qCourt !== 'ALL' ? qCourt : undefined,
      broadCategory: qCat !== 'ALL' ? qCat : undefined,
      courtLevel: qLevel !== 'ALL' ? qLevel : undefined
    }).then(res => {
      setCases(res);
      setLoading(false);
    });
  }, [searchParams]);

  const handleApplyFilter = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const params: any = {};
    if (search) params.search = search;
    if (department !== 'ALL') params.department = department;
    if (priority !== 'ALL') params.priority = priority;
    if (court !== 'ALL') params.court = court;
    if (broadCategory !== 'ALL') params.category = broadCategory;
    if (courtLevel !== 'ALL') params.courtLevel = courtLevel;
    setSearchParams(params);
  };

  const handleReset = () => {
    setSearch('');
    setDepartment('ALL');
    setPriority('ALL');
    setCourt('ALL');
    setBroadCategory('ALL');
    setCourtLevel('ALL');
    setSearchParams({});
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            Litigation Explorer & Matter Directory
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Search, filter, and audit statewide proceedings involving the Government of Tamil Nadu.
          </p>
        </div>
        <div className="mt-2 md:mt-0 flex items-center space-x-3">
          <button
            onClick={() => navigate('/calendar')}
            className="py-1 px-3 bg-white hover:bg-slate-50 text-blue-700 hover:text-blue-900 border border-blue-200 rounded-lg text-xs font-bold transition-all shadow-2xs flex items-center space-x-1.5"
          >
            <span>📅 Open Judicial Calendar View</span>
          </button>
          <span className="text-xs text-slate-500 font-mono">
            {cases.length} official proceedings
          </span>
        </div>
      </div>

      {/* Category Tabs: WRIT, PIL, CIVIL, CRIMINAL, SERVICE, REVENUE */}
      <div className="flex items-center space-x-1 border-b border-slate-200 overflow-x-auto pb-1">
        {[
          { key: 'ALL', label: 'All Proceedings' },
          { key: 'CONSTITUTIONAL_WRIT', label: 'Writ Petitions (WP/WA)' },
          { key: 'PIL', label: 'Public Interest Litigations (PIL)' },
          { key: 'CIVIL', label: 'Civil & Commercial' },
          { key: 'CRIMINAL', label: 'Criminal & Police' },
          { key: 'SERVICE_EMPLOYMENT', label: 'Service & Recruitment' },
          { key: 'REVENUE_TAX', label: 'Revenue & Taxes' },
          { key: 'ENVIRONMENTAL', label: 'Environmental (NGT)' },
        ].map((tab) => {
          const isActive = broadCategory === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => {
                setBroadCategory(tab.key);
                const params: any = {};
                if (search) params.search = search;
                if (department !== 'ALL') params.department = department;
                if (priority !== 'ALL') params.priority = priority;
                if (court !== 'ALL') params.court = court;
                if (tab.key !== 'ALL') params.category = tab.key;
                if (courtLevel !== 'ALL') params.courtLevel = courtLevel;
                setSearchParams(params);
              }}
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

      {/* Filter / Search Bar */}
      <form onSubmit={handleApplyFilter} className="p-3 bg-white rounded-lg border border-slate-200 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-2.5">
          {/* Free Text Search */}
          <div className="md:col-span-2">
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Search Query
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Case ID, Act, Advocate, Party..."
                className="w-full pl-8 pr-2 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:border-tn-navy-700 outline-none"
              />
            </div>
          </div>

          {/* Substantive Type / Category */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Matter Classification
            </label>
            <select
              value={broadCategory}
              onChange={(e) => setBroadCategory(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:border-tn-navy-700 outline-none"
            >
              <option value="ALL">All Matters (Civil/Crim)</option>
              <option value="CONSTITUTIONAL_WRIT">Constitutional & Writs</option>
              <option value="CIVIL">Civil & Commercial</option>
              <option value="CRIMINAL">Criminal & DVAC</option>
              <option value="REVENUE_TAX">Revenue & Taxes</option>
              <option value="SERVICE_EMPLOYMENT">Service & Recruitment</option>
              <option value="ENVIRONMENTAL">Environmental & NGT</option>
            </select>
          </div>

          {/* Court Forum Tier */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Court Jurisdiction
            </label>
            <select
              value={courtLevel}
              onChange={(e) => setCourtLevel(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:border-tn-navy-700 outline-none"
            >
              <option value="ALL">All Court Levels</option>
              <option value="SUPREME_COURT">Supreme Court</option>
              <option value="HIGH_COURT">High Court (Madras/Mdu)</option>
              <option value="DISTRICT_SESSIONS">District & Sessions</option>
              <option value="LOWER_COURTS">Lower Judiciary</option>
              <option value="TRIBUNALS_COMMISSIONS">Tribunals / NGT / CAT</option>
            </select>
          </div>

          {/* Priority Filter */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded focus:bg-white focus:border-tn-navy-700 outline-none"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex items-end space-x-2">
            <button
              type="submit"
              className="flex-1 py-1.5 px-2.5 bg-tn-navy-900 text-white rounded text-xs font-semibold hover:bg-tn-navy-800 transition-colors flex items-center justify-center space-x-1"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filter</span>
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold transition-colors flex items-center"
              title="Reset Filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </form>

      {/* Case Directory Table */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-xs text-slate-500">
            Querying synthetic litigation database...
          </div>
        ) : cases.length === 0 ? (
          <div className="p-8 text-center space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
            <div className="text-sm font-semibold text-slate-800">No proceedings found</div>
            <div className="text-xs text-slate-500">Try loosening your search filters or resetting keywords.</div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-600 font-bold uppercase text-[10px] border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Priority</th>
                  <th className="py-2.5 px-3">Case ID</th>
                  <th className="py-2.5 px-3">Court / Forum</th>
                  <th className="py-2.5 px-3">Department</th>
                  <th className="py-2.5 px-3">Case Title & Legal Issue</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Govt Advocate</th>
                  <th className="py-2.5 px-3">Instructions</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {cases.map((c) => (
                  <tr
                    key={c.id}
                    onClick={() => navigate(`/cases/${c.id}`)}
                    className="hover:bg-slate-50 cursor-pointer transition-colors"
                  >
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <PriorityBadge level={c.priority} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span className="font-bold text-tn-navy-950 font-mono block">{c.id}</span>
                      <span className="text-[10px] text-slate-500 font-mono">{c.caseNumber}</span>
                    </td>
                    <td className="py-2.5 px-3 max-w-[150px] truncate text-slate-700" title={c.court}>
                      {c.court}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap font-medium text-slate-800">
                      {c.department.split('&')[0]}
                    </td>
                    <td className="py-2.5 px-3 max-w-[280px]">
                      <span className="font-semibold text-slate-900 block truncate" title={c.caseTitle}>
                        {c.caseTitle}
                      </span>
                      <span className="text-[11px] text-slate-500 truncate block" title={c.legalIssue}>
                        {c.legalIssue}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <StatusBadge status={c.status} size="sm" />
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-700">
                      {c.advocateName.split('(')[0]}
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <InstructionsBadge status={c.instructionsStatus} />
                    </td>
                    <td className="py-2.5 px-3 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/cases/${c.id}`);
                        }}
                        className="p-1 rounded hover:bg-slate-200 text-slate-600 hover:text-tn-navy-950"
                        title="View Detailed Case File"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
