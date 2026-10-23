import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  AlertTriangle, 
  Building2, 
  Scale, 
  UserCheck, 
  Filter, 
  Eye, 
  FileText,
  Search,
  CheckCircle2,
  CalendarDays,
  Briefcase,
  Layers,
  CalendarRange,
  RotateCcw,
  MapPin,
  Tag
} from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { CaseItem } from '@/types';
import { PriorityBadge, StatusBadge, InstructionsBadge } from '@/components/common/Badges';
import { CaseQuickModal } from '@/components/cases/CaseQuickModal';
import { mockDepartments } from '@/data/mockDepartments';
import { mockDistricts } from '@/data/mockDistricts';
import { mockAdvocates } from '@/data/mockAdvocates';

export type CalendarViewMode = 
  | 'FULL_MONTH'        // Full Month (Mon - Sun, all 7 days)
  | 'WORKING_MONTH'     // Working Days Month (Mon - Fri, court sitting days only)
  | 'WORKING_WEEK'      // Working Days Week (Mon - Fri for the active week)
  | 'CASES_ONLY_MONTH'; // Only days in the month that have active listed cases

export const CalendarPage: React.FC = () => {
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Default to October 2026 (matching our demo operational timeline)
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(9); // 0-indexed: 9 = October
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-23');
  const [selectedCase, setSelectedCase] = useState<CaseItem | null>(null);

  // View Mode: Full Month, Working Days Month, Working Days Week, Cases Only
  const [viewMode, setViewMode] = useState<CalendarViewMode>('FULL_MONTH');

  // For WORKING_WEEK navigation: index of the week in current month (0 to 4/5)
  const [weekOffset, setWeekOffset] = useState<number>(0);

  // Filters
  const [priorityFilter, setPriorityFilter] = useState('ALL');
  const [courtFilter, setCourtFilter] = useState('ALL');
  const [departmentFilter, setDepartmentFilter] = useState('ALL');
  const [districtFilter, setDistrictFilter] = useState('ALL');
  const [advocateFilter, setAdvocateFilter] = useState('ALL');
  const [designationFilter, setDesignationFilter] = useState('ALL');
  const [domainFilter, setDomainFilter] = useState('ALL'); // Broad matter category / domain
  const [search, setSearch] = useState('');

  useEffect(() => {
    mockApi.getCases().then((res) => {
      setCases(res);
      setLoading(false);
    });
  }, []);

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const handlePrevMonth = () => {
    if (viewMode === 'WORKING_WEEK') {
      setWeekOffset(w => w - 1);
      return;
    }
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(y => y - 1);
    } else {
      setCurrentMonth(m => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (viewMode === 'WORKING_WEEK') {
      setWeekOffset(w => w + 1);
      return;
    }
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(y => y + 1);
    } else {
      setCurrentMonth(m => m + 1);
    }
  };

  const handleResetFilters = () => {
    setPriorityFilter('ALL');
    setCourtFilter('ALL');
    setDepartmentFilter('ALL');
    setDistrictFilter('ALL');
    setAdvocateFilter('ALL');
    setDesignationFilter('ALL');
    setDomainFilter('ALL');
    setSearch('');
  };

  // Helper: Days in current month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Helper: Monday-based first day index (0 = Monday, 1 = Tuesday ... 6 = Sunday)
  const getMondayFirstDayOfMonth = (year: number, month: number) => {
    const jsDay = new Date(year, month, 1).getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
    return (jsDay + 6) % 7; // Map so Monday is 0, Sunday is 6
  };

  const totalDays = getDaysInMonth(currentYear, currentMonth);
  const firstDayMondayBased = getMondayFirstDayOfMonth(currentYear, currentMonth);

  // Filter matching function
  const caseMatchesFilters = (c: CaseItem) => {
    const matchPriority = priorityFilter === 'ALL' || c.priority === priorityFilter;
    const matchCourt = courtFilter === 'ALL' || c.courtLevel === courtFilter;
    const matchDept = departmentFilter === 'ALL' || c.department.toLowerCase().includes(departmentFilter.toLowerCase());
    const matchDist = districtFilter === 'ALL' || c.district.toLowerCase() === districtFilter.toLowerCase();
    const matchAdv = advocateFilter === 'ALL' || c.advocateName.toLowerCase().includes(advocateFilter.toLowerCase());
    const matchDesig = designationFilter === 'ALL' || c.advocateDesignation.toLowerCase().includes(designationFilter.toLowerCase());
    const matchDomain = domainFilter === 'ALL' || c.broadCategory === domainFilter;
    const matchSearch = !search || 
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.caseTitle.toLowerCase().includes(search.toLowerCase()) ||
      c.department.toLowerCase().includes(search.toLowerCase()) ||
      c.advocateName.toLowerCase().includes(search.toLowerCase()) ||
      c.district.toLowerCase().includes(search.toLowerCase());

    return matchPriority && matchCourt && matchDept && matchDist && matchAdv && matchDesig && matchDomain && matchSearch;
  };

  // Group filtered cases by ISO date (YYYY-MM-DD)
  const casesByDate = cases.reduce((acc, c) => {
    if (!caseMatchesFilters(c)) return acc;
    const d = c.hearingDate || '2026-10-23';
    if (!acc[d]) acc[d] = [];
    acc[d].push(c);
    return acc;
  }, {} as Record<string, CaseItem[]>);

  // Filter cases for the selected date
  const listedCases = casesByDate[selectedDate] || [];

  // Format header date label
  const formattedSelectedDate = new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  // Calculate days for the 4 view modes:
  // 1. FULL_MONTH: Mon - Sun (7 cols)
  // 2. WORKING_MONTH: Mon - Fri only (5 cols)
  // 3. WORKING_WEEK: 5 days (Mon - Fri) for active week
  // 4. CASES_ONLY_MONTH: list/grid of only dates in this month that have cases

  // Get active week days (Monday - Friday) around selectedDate
  const getWorkingWeekDays = () => {
    const curr = new Date(selectedDate + 'T00:00:00');
    // adjust for weekOffset if user clicked prev/next week
    if (weekOffset !== 0) {
      curr.setDate(curr.getDate() + (weekOffset * 7));
    }
    const day = curr.getDay(); // 0 is Sunday
    const monDiff = (day === 0 ? -6 : 1) - day; // diff to Monday
    const monday = new Date(curr);
    monday.setDate(curr.getDate() + monDiff);

    const weekDays = [];
    for (let i = 0; i < 5; i++) {
      const d = new Date(monday);
      d.setDate(monday.getDate() + i);
      const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      weekDays.push({
        dateStr: iso,
        dayNum: d.getDate(),
        dayName: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][i],
        fullDate: d
      });
    }
    return weekDays;
  };

  // Get all dates in current month with listed cases
  const monthCasesDays = Array.from({ length: totalDays }).map((_, i) => {
    const day = i + 1;
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const dayCases = casesByDate[dateStr] || [];
    const jsDay = new Date(currentYear, currentMonth, day).getDay();
    const isWeekend = jsDay === 0 || jsDay === 6;
    return {
      day,
      dateStr,
      dayCases,
      isWeekend,
      jsDay
    };
  }).filter(d => d.dayCases.length > 0);

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200 uppercase">
              Judicial Cause List Diary
            </span>
            <span className="text-[10px] text-slate-500 font-mono">COURT CALENDAR 2026 • START DAY: MONDAY</span>
          </div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight mt-0.5">
            Judicial Calendar & Cause List Docket
          </h1>
          <p className="text-xs text-slate-500">
            Interactive judicial schedule for Tamil Nadu State litigation starting on <strong>Monday</strong> with customizable executive views.
          </p>
        </div>

        {/* Quick Month Navigation */}
        <div className="mt-3 md:mt-0 flex items-center space-x-2 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs">
          <button
            onClick={handlePrevMonth}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
            title={viewMode === 'WORKING_WEEK' ? 'Previous Week' : 'Previous Month'}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-xs font-bold text-tn-navy-950 min-w-[140px] text-center">
            {viewMode === 'WORKING_WEEK' 
              ? `Week: ${getWorkingWeekDays()[0]?.dateStr.slice(5)} to ${getWorkingWeekDays()[4]?.dateStr.slice(5)}`
              : `${monthNames[currentMonth]} ${currentYear}`}
          </div>
          <button
            onClick={handleNextMonth}
            className="p-1 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
            title={viewMode === 'WORKING_WEEK' ? 'Next Week' : 'Next Month'}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setCurrentYear(2026);
              setCurrentMonth(9);
              setSelectedDate('2026-10-23');
              setWeekOffset(0);
            }}
            className="ml-2 text-[10px] font-bold text-blue-700 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded border border-blue-200 transition-colors"
          >
            Today (Oct 23)
          </button>
        </div>
      </div>

      {/* View Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-slate-200 pb-2 flex-wrap gap-2">
        <div className="flex items-center space-x-1.5 overflow-x-auto">
          {[
            { id: 'FULL_MONTH', label: 'Full Month (Mon - Sun)', icon: CalendarIcon, desc: 'Complete 7-day calendar' },
            { id: 'WORKING_MONTH', label: 'Working Days Month (Mon - Fri)', icon: Briefcase, desc: 'Court sitting days only' },
            { id: 'WORKING_WEEK', label: 'Working Days Week (Mon - Fri)', icon: CalendarRange, desc: 'Detailed 5-day active week' },
            { id: 'CASES_ONLY_MONTH', label: `Active Hearings (${monthCasesDays.length} Days)`, icon: Layers, desc: 'Only days with listed matters' },
          ].map((tab) => {
            const isActive = viewMode === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setViewMode(tab.id as CalendarViewMode);
                  setWeekOffset(0);
                }}
                className={`py-1.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 select-none ${
                  isActive
                    ? 'bg-tn-navy-950 text-white shadow-xs'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
                title={tab.desc}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-tn-gold-400' : 'text-slate-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-3 text-[11px] text-slate-500 font-medium">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600"></span>
            <span>Critical Hearing</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600"></span>
            <span>Listed Matter</span>
          </span>
        </div>
      </div>

      {/* Comprehensive Filter Toolbar: Department, District, Advocate, Designation, Domain */}
      <div className="p-3 bg-white rounded-xl border border-slate-200/90 shadow-2xs space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold text-tn-navy-950 uppercase tracking-wider">
            <Filter className="w-3.5 h-3.5 text-tn-gold-600" />
            <span>Filter Calendar Docket</span>
          </div>

          {(departmentFilter !== 'ALL' || districtFilter !== 'ALL' || advocateFilter !== 'ALL' || designationFilter !== 'ALL' || domainFilter !== 'ALL' || priorityFilter !== 'ALL' || courtFilter !== 'ALL' || search) && (
            <button
              onClick={handleResetFilters}
              className="text-[11px] text-red-700 hover:text-red-900 font-semibold flex items-center space-x-1 bg-red-50 hover:bg-red-100 px-2 py-0.5 rounded border border-red-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs">
          {/* 1. By Department */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Department
            </label>
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:bg-white focus:border-blue-600 transition-all truncate"
            >
              <option value="ALL">All Departments</option>
              {mockDepartments.map(d => (
                <option key={d.code} value={d.name}>{d.name.split('&')[0]}</option>
              ))}
            </select>
          </div>

          {/* 2. By District */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              District
            </label>
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:bg-white focus:border-blue-600 transition-all truncate"
            >
              <option value="ALL">All Districts (38)</option>
              {mockDistricts.map(dist => (
                <option key={dist.id} value={dist.name}>{dist.name}</option>
              ))}
            </select>
          </div>

          {/* 3. By Advocate */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Govt Advocate
            </label>
            <select
              value={advocateFilter}
              onChange={(e) => setAdvocateFilter(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:bg-white focus:border-blue-600 transition-all truncate"
            >
              <option value="ALL">All Law Officers</option>
              {mockAdvocates.map(adv => (
                <option key={adv.id} value={adv.name.split('(')[0].trim()}>{adv.name.split('(')[0].trim()}</option>
              ))}
            </select>
          </div>

          {/* 4. By Designation */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Law Designation
            </label>
            <select
              value={designationFilter}
              onChange={(e) => setDesignationFilter(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:bg-white focus:border-blue-600 transition-all truncate"
            >
              <option value="ALL">All Designations</option>
              <option value="Advocate General">Advocate General (AG)</option>
              <option value="Additional Advocate General">Addl. Advocate General (AAG)</option>
              <option value="Special Government Pleader">Special Govt Pleader (SGP)</option>
              <option value="Government Pleader">Government Pleader (GP)</option>
              <option value="Standing Counsel">Standing Counsel</option>
            </select>
          </div>

          {/* 5. By Domain / Broad Category */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Matter Domain
            </label>
            <select
              value={domainFilter}
              onChange={(e) => setDomainFilter(e.target.value)}
              className="w-full py-1.5 px-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:bg-white focus:border-blue-600 transition-all truncate"
            >
              <option value="ALL">All Matter Domains</option>
              <option value="CONSTITUTIONAL_WRIT">Writ / Constitutional</option>
              <option value="CIVIL">Civil & Commercial</option>
              <option value="CRIMINAL">Criminal & Police</option>
              <option value="SERVICE_EMPLOYMENT">Service & Recruitment</option>
              <option value="REVENUE_TAX">Revenue & Taxes</option>
              <option value="ENVIRONMENTAL">Environmental (NGT)</option>
            </select>
          </div>

          {/* 6. Text Search */}
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-0.5">
              Keyword Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Case ID, party, issue..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-1.5 pl-7 pr-2 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-800 font-medium outline-none focus:bg-white focus:border-blue-600 transition-all"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar on Left (7 cols), Selected Day Hearings on Right (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Calendar Views Card */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 space-y-3">
          
          {/* Header Description */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-tn-navy-950 flex items-center space-x-1.5">
              <CalendarIcon className="w-4 h-4 text-tn-gold-600" />
              <span>
                {viewMode === 'FULL_MONTH' && `${monthNames[currentMonth]} ${currentYear} — Full Month (Monday Start)`}
                {viewMode === 'WORKING_MONTH' && `${monthNames[currentMonth]} ${currentYear} — Court Working Days (Mon - Fri)`}
                {viewMode === 'WORKING_WEEK' && `Court Working Week Schedule (Monday to Friday)`}
                {viewMode === 'CASES_ONLY_MONTH' && `${monthNames[currentMonth]} ${currentYear} — Days with Active Scheduled Hearings`}
              </span>
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
              {viewMode === 'WORKING_WEEK' ? '5 WORKING DAYS' : viewMode === 'WORKING_MONTH' ? '22 COURT DAYS' : 'JUDICIAL DIARY'}
            </span>
          </div>

          {/* VIEW 1: FULL MONTH (7 COLS, STARTS ON MONDAY) */}
          {viewMode === 'FULL_MONTH' && (
            <>
              {/* Weekday Labels Starting Monday */}
              <div className="grid grid-cols-7 text-center font-bold text-[11px] text-slate-400 uppercase py-1 border-b border-slate-100">
                <div className="text-slate-600 font-extrabold">Mon</div>
                <div className="text-slate-600 font-extrabold">Tue</div>
                <div className="text-slate-600 font-extrabold">Wed</div>
                <div className="text-slate-600 font-extrabold">Thu</div>
                <div className="text-slate-600 font-extrabold">Fri</div>
                <div className="text-slate-400">Sat</div>
                <div className="text-slate-400">Sun</div>
              </div>

              {/* Calendar Grid Cells */}
              <div className="grid grid-cols-7 gap-1.5 pt-1">
                {/* Empty padding cells for previous month (Monday-based) */}
                {Array.from({ length: firstDayMondayBased }).map((_, i) => (
                  <div key={`empty-${i}`} className="h-20 rounded-lg bg-slate-50/50 border border-transparent opacity-30"></div>
                ))}

                {/* Days in Month */}
                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayCases = casesByDate[dateStr] || [];
                  const isSelected = selectedDate === dateStr;
                  const isToday = dateStr === '2026-10-23';
                  const hasCritical = dayCases.some(c => c.priority === 'CRITICAL');
                  const jsDay = new Date(currentYear, currentMonth, day).getDay();
                  const isWeekend = jsDay === 0 || jsDay === 6;

                  return (
                    <div
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`h-20 p-1.5 rounded-lg border text-left cursor-pointer transition-all flex flex-col justify-between select-none ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-600/30 shadow-xs'
                          : dayCases.length > 0
                            ? 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300'
                            : isWeekend
                              ? 'bg-slate-50/60 border-slate-100 text-slate-400'
                              : 'bg-white hover:bg-slate-50 border-slate-100 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-bold ${
                          isSelected 
                            ? 'text-blue-900 font-extrabold' 
                            : isToday 
                              ? 'text-blue-700 bg-blue-100 px-1.5 rounded-full font-extrabold' 
                              : isWeekend
                                ? 'text-slate-400'
                                : 'text-slate-800'
                        }`}>
                          {day}
                        </span>
                        {isToday && (
                          <span className="text-[9px] font-bold text-blue-700 uppercase tracking-tighter">
                            TODAY
                          </span>
                        )}
                      </div>

                      {/* Badges for day hearings */}
                      <div className="space-y-1">
                        {dayCases.length > 0 ? (
                          <div className={`text-[10px] font-extrabold px-1 py-0.5 rounded truncate flex items-center justify-between ${
                            hasCritical 
                              ? 'bg-red-100 text-red-800 border border-red-200' 
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            <span>{dayCases.length} {dayCases.length === 1 ? 'Matter' : 'Matters'}</span>
                            {hasCritical && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>}
                          </div>
                        ) : isWeekend ? (
                          <div className="text-[9px] text-slate-300 italic">Holiday</div>
                        ) : (
                          <div className="text-[9px] text-slate-300 italic">No listing</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* VIEW 2: WORKING DAYS MONTH (MON - FRI ONLY, 5 COLS) */}
          {viewMode === 'WORKING_MONTH' && (
            <>
              {/* Weekday Labels: Mon to Fri */}
              <div className="grid grid-cols-5 text-center font-bold text-[11px] text-slate-700 uppercase py-1 border-b border-slate-100 bg-slate-50/80 rounded-t-lg">
                <div className="py-1">Monday</div>
                <div className="py-1">Tuesday</div>
                <div className="py-1">Wednesday</div>
                <div className="py-1">Thursday</div>
                <div className="py-1">Friday</div>
              </div>

              {/* Working days grid (filtered to Mon-Fri) */}
              <div className="grid grid-cols-5 gap-2 pt-2">
                {Array.from({ length: totalDays }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const jsDay = new Date(currentYear, currentMonth, day).getDay();
                  // Skip Saturday (6) and Sunday (0)
                  if (jsDay === 0 || jsDay === 6) return null;

                  const dayCases = casesByDate[dateStr] || [];
                  const isSelected = selectedDate === dateStr;
                  const isToday = dateStr === '2026-10-23';
                  const hasCritical = dayCases.some(c => c.priority === 'CRITICAL');
                  const weekdayShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][jsDay];

                  return (
                    <div
                      key={dateStr}
                      onClick={() => setSelectedDate(dateStr)}
                      className={`h-22 p-2 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between select-none ${
                        isSelected
                          ? 'bg-blue-50 border-blue-600 ring-2 ring-blue-600/30 shadow-sm'
                          : dayCases.length > 0
                            ? 'bg-white hover:bg-slate-50 border-slate-200 shadow-2xs hover:border-slate-300'
                            : 'bg-white hover:bg-slate-50 border-slate-200/60 text-slate-500'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-baseline space-x-1">
                          <span className={`text-sm font-extrabold ${isSelected ? 'text-blue-900' : isToday ? 'text-blue-700 font-black' : 'text-slate-900'}`}>
                            {day}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold uppercase">{weekdayShort}</span>
                        </div>
                        {isToday && (
                          <span className="text-[9px] font-mono font-bold bg-blue-600 text-white px-1.5 py-0.2 rounded">
                            TODAY
                          </span>
                        )}
                      </div>

                      {/* Badges for day hearings */}
                      <div>
                        {dayCases.length > 0 ? (
                          <div className={`text-[10px] font-extrabold px-1.5 py-1 rounded truncate flex items-center justify-between shadow-2xs ${
                            hasCritical 
                              ? 'bg-red-100 text-red-800 border border-red-200' 
                              : 'bg-blue-100 text-blue-800 border border-blue-200'
                          }`}>
                            <span>{dayCases.length} {dayCases.length === 1 ? 'Matter' : 'Matters'}</span>
                            {hasCritical && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>}
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400 italic">No Cause List</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* VIEW 3: WORKING DAYS WEEK (MON - FRI, EXPANDED HORIZONTAL COLUMNS) */}
          {viewMode === 'WORKING_WEEK' && (
            <div className="space-y-3">
              <div className="grid grid-cols-5 gap-2.5">
                {getWorkingWeekDays().map((wDay) => {
                  const dayCases = casesByDate[wDay.dateStr] || [];
                  const isSelected = selectedDate === wDay.dateStr;
                  const isToday = wDay.dateStr === '2026-10-23';
                  const hasCritical = dayCases.some(c => c.priority === 'CRITICAL');

                  return (
                    <div
                      key={wDay.dateStr}
                      onClick={() => setSelectedDate(wDay.dateStr)}
                      className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex flex-col justify-between min-h-[300px] select-none ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-600 ring-2 ring-blue-600/30 shadow-md'
                          : 'bg-white hover:bg-slate-50 border-slate-200/90 hover:border-slate-300'
                      }`}
                    >
                      {/* Day Header */}
                      <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-[11px] font-bold text-slate-500 uppercase block">
                            {wDay.dayName}
                          </span>
                          <span className={`text-base font-extrabold ${isToday ? 'text-blue-700' : 'text-slate-900'}`}>
                            {wDay.dayNum} {monthNames[wDay.fullDate.getMonth()].slice(0, 3)}
                          </span>
                        </div>
                        {isToday && (
                          <span className="text-[9px] font-mono font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded">
                            TODAY
                          </span>
                        )}
                      </div>

                      {/* Day Cases List in Week Column */}
                      <div className="flex-1 py-2 space-y-1.5 overflow-y-auto max-h-[220px]">
                        {dayCases.length === 0 ? (
                          <div className="h-full flex items-center justify-center text-center p-2 text-[10px] text-slate-400 italic">
                            No proceedings listed
                          </div>
                        ) : (
                          dayCases.map(c => (
                            <div
                              key={c.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDate(wDay.dateStr);
                                setSelectedCase(c);
                              }}
                              className="p-1.5 rounded-lg bg-white border border-slate-200/80 hover:border-blue-400 hover:shadow-xs transition-all text-[11px] space-y-1 cursor-pointer"
                              title="Click to preview case"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono font-bold text-[10px] text-tn-navy-950">{c.id.split('-')[2]}-{c.id.split('-')[3]}</span>
                                <PriorityBadge level={c.priority} size="sm" />
                              </div>
                              <div className="text-[10px] font-semibold text-slate-800 line-clamp-2">
                                {c.caseTitle}
                              </div>
                              <div className="text-[9px] text-slate-500 truncate">
                                {c.department.split('&')[0]}
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {/* Footer Count */}
                      <div className="pt-2 border-t border-slate-100 text-[10px] font-bold flex items-center justify-between">
                        <span className="text-slate-500">Scheduled:</span>
                        <span className={`px-1.5 py-0.5 rounded ${hasCritical ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-800'}`}>
                          {dayCases.length}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 4: ONLY DAYS WITH CASES IN A MONTH */}
          {viewMode === 'CASES_ONLY_MONTH' && (
            <div className="space-y-3">
              <div className="p-2.5 rounded-lg bg-blue-50/70 border border-blue-200/70 flex items-center justify-between text-xs">
                <span className="text-blue-900 font-medium">
                  Showing <strong>{monthCasesDays.length} active litigation sitting dates</strong> with cause list postings in {monthNames[currentMonth]} {currentYear}.
                </span>
                <span className="font-mono text-[10px] font-bold text-blue-800 bg-white px-2 py-0.5 rounded border border-blue-200">
                  COURT SITTINGS FILTERED
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {monthCasesDays.map((dItem) => {
                  const isSelected = selectedDate === dItem.dateStr;
                  const isToday = dItem.dateStr === '2026-10-23';
                  const hasCritical = dItem.dayCases.some(c => c.priority === 'CRITICAL');
                  const weekdayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dItem.jsDay];

                  return (
                    <div
                      key={dItem.dateStr}
                      onClick={() => setSelectedDate(dItem.dateStr)}
                      className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all space-y-2 select-none ${
                        isSelected
                          ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-600/30 shadow-sm'
                          : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className={`text-base font-extrabold ${isSelected ? 'text-blue-900' : 'text-slate-900'}`}>
                            {dItem.day} {monthNames[currentMonth]} {currentYear}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            ({weekdayName})
                          </span>
                        </div>
                        {isToday && (
                          <span className="text-[10px] font-mono font-bold bg-blue-600 text-white px-2 py-0.5 rounded">
                            TODAY
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                        <span className="text-slate-600 font-medium">
                          Active Cause List:
                        </span>
                        <div className={`px-2 py-0.5 rounded-full text-xs font-bold flex items-center space-x-1.5 ${
                          hasCritical 
                            ? 'bg-red-100 text-red-800 border border-red-200' 
                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                        }`}>
                          <span>{dItem.dayCases.length} {dItem.dayCases.length === 1 ? 'Matter' : 'Matters'}</span>
                          {hasCritical && <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>}
                        </div>
                      </div>

                      {/* Preview case titles */}
                      <div className="space-y-1 pt-1">
                        {dItem.dayCases.slice(0, 2).map(c => (
                          <div key={c.id} className="text-[11px] text-slate-700 truncate flex items-center space-x-1">
                            <span className="text-[10px] font-mono text-slate-400">•</span>
                            <span className="font-semibold text-tn-navy-950 truncate">{c.caseTitle}</span>
                          </div>
                        ))}
                        {dItem.dayCases.length > 2 && (
                          <div className="text-[10px] text-blue-700 font-bold">
                            +{dItem.dayCases.length - 2} more proceedings...
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Calendar Footnote */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Click any day card above to view the cause list roster on the right.</span>
            <span className="font-mono text-slate-400">Sync: Madras HC Causelist</span>
          </div>
        </div>

        {/* Right Column: Hearings Scheduled on Selected Date */}
        <div className="lg:col-span-5 space-y-3 flex flex-col">
          <div className="bg-white rounded-xl border border-slate-200/90 shadow-sm p-4 space-y-3 flex-1 flex flex-col">
            
            {/* Selected Date Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Cause List For
                </span>
                <h2 className="text-sm font-extrabold text-tn-navy-950 flex items-center space-x-1.5">
                  <CalendarDays className="w-4 h-4 text-blue-600" />
                  <span>{formattedSelectedDate}</span>
                </h2>
              </div>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                {listedCases.length} {listedCases.length === 1 ? 'Case Listed' : 'Cases Listed'}
              </span>
            </div>

            {/* Quick Filter Bar */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <select
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="w-full py-1 px-2 text-[11px] bg-slate-50 border border-slate-200 rounded font-medium text-slate-700 outline-none"
                >
                  <option value="ALL">All Priorities</option>
                  <option value="CRITICAL">Critical Only</option>
                  <option value="HIGH">High Only</option>
                </select>
              </div>
              <div>
                <select
                  value={courtFilter}
                  onChange={(e) => setCourtFilter(e.target.value)}
                  className="w-full py-1 px-2 text-[11px] bg-slate-50 border border-slate-200 rounded font-medium text-slate-700 outline-none"
                >
                  <option value="ALL">All Forums</option>
                  <option value="HIGH_COURT">High Court</option>
                  <option value="SUPREME_COURT">Supreme Court</option>
                  <option value="TRIBUNALS_COMMISSIONS">Tribunals</option>
                </select>
              </div>
            </div>

            {/* Listed Cases Cards */}
            <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[520px] pr-1">
              {loading ? (
                <div className="p-8 text-center text-xs text-slate-400">Loading listed proceedings...</div>
              ) : listedCases.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 space-y-2 my-auto">
                  <Clock className="w-8 h-8 text-slate-300 mx-auto" />
                  <div className="text-xs font-bold text-slate-700">No Court Proceedings Scheduled</div>
                  <p className="text-[11px] text-slate-500">
                    No state litigations currently posted on {formattedSelectedDate}. Select another date on the calendar.
                  </p>
                </div>
              ) : (
                listedCases.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCase(c)}
                    className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-400 hover:shadow-md cursor-pointer transition-all space-y-2 group"
                    title="Click to open case preview details popup"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-mono font-bold text-tn-navy-950 text-xs group-hover:text-blue-700 transition-colors">
                          {c.id}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">({c.caseNumber})</span>
                      </div>
                      <PriorityBadge level={c.priority} size="sm" />
                    </div>

                    <h3 className="text-xs font-bold text-slate-900 group-hover:text-blue-900 line-clamp-1 leading-snug">
                      {c.caseTitle}
                    </h3>

                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed bg-slate-50 p-1.5 rounded border border-slate-100">
                      {c.legalIssue}
                    </p>

                    <div className="flex items-center justify-between text-[11px] pt-1 border-t border-slate-100 text-slate-500">
                      <span className="truncate max-w-[160px] font-medium text-slate-700">
                        {c.department.split('&')[0]}
                      </span>
                      <span className="font-bold text-red-700 flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{c.nextHearingDate || 'Scheduled'}</span>
                      </span>
                    </div>

                    <div className="pt-1 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400">
                        Law Officer: <strong className="text-slate-700">{c.advocateName.split('(')[0]}</strong>
                      </span>
                      <span className="text-[11px] font-bold text-blue-700 flex items-center space-x-0.5 group-hover:translate-x-0.5 transition-transform">
                        <span>Details</span>
                        <Eye className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>
        </div>

      </div>

      {/* Case Quick Detail Modal Popup on click */}
      <CaseQuickModal
        caseItem={selectedCase}
        onClose={() => setSelectedCase(null)}
      />
    </div>
  );
};
