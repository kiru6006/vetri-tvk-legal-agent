import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase, 
  Scale, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  Clock3, 
  Calendar, 
  Bell, 
  UserCheck, 
  PhoneCall, 
  Mail, 
  ExternalLink, 
  User, 
  Building2, 
  ChevronRight, 
  ShieldAlert, 
  Sparkles,
  Info,
  Filter,
  Search,
  CheckCircle,
  HelpCircle,
  FileText
} from 'lucide-react';
import { mockApi } from '@/services/mockApi';
import { AdvocateItem, CaseItem, OfficialItem } from '@/types';
import { OfficialContactModal } from '@/components/officials/OfficialContactModal';
import { CaseQuickModal } from '@/components/cases/CaseQuickModal';

export const AdvocatesPage: React.FC = () => {
  const navigate = useNavigate();
  const [advocates, setAdvocates] = useState<AdvocateItem[]>([]);
  const [cases, setCases] = useState<CaseItem[]>([]);
  const [officials, setOfficials] = useState<OfficialItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters & selection
  const [selectedAdvocateId, setSelectedAdvocateId] = useState<string>('adv-01'); // Default to Advocate General
  const [selectedDesignation, setSelectedDesignation] = useState('ALL');
  const [preparationFilter, setPreparationFilter] = useState<'ALL' | 'UPDATED' | 'PENDING'>('ALL');
  const [search, setSearch] = useState('');

  // Modals
  const [selectedOfficialForModal, setSelectedOfficialForModal] = useState<OfficialItem | null>(null);
  const [selectedCaseForModal, setSelectedCaseForModal] = useState<CaseItem | null>(null);

  useEffect(() => {
    Promise.all([
      mockApi.getAdvocates(),
      mockApi.getCases(),
      mockApi.getOfficials()
    ]).then(([advData, caseData, offData]) => {
      setAdvocates(advData);
      setCases(caseData);
      setOfficials(offData);
      setLoading(false);
    });
  }, []);

  // Filtered advocates list
  const filteredAdvocates = useMemo(() => {
    return advocates.filter(a => {
      const matchesSearch = 
        a.name.toLowerCase().includes(search.toLowerCase()) ||
        a.designation.toLowerCase().includes(search.toLowerCase()) ||
        a.departments.some(d => d.toLowerCase().includes(search.toLowerCase()));

      const matchesDesignation = 
        selectedDesignation === 'ALL' ||
        (selectedDesignation === 'AG' && a.designation === 'Advocate General') ||
        (selectedDesignation === 'AAG' && a.designation === 'Additional Advocate General') ||
        (selectedDesignation === 'SGP' && a.designation === 'Special Government Pleader') ||
        (selectedDesignation === 'GP' && (a.designation === 'Government Pleader' || a.designation === 'Additional Government Pleader')) ||
        (selectedDesignation === 'SC' && a.designation === 'Standing Counsel');

      return matchesSearch && matchesDesignation;
    });
  }, [advocates, search, selectedDesignation]);

  // Currently active advocate
  const currentAdvocate = useMemo(() => {
    return advocates.find(a => a.id === selectedAdvocateId) || advocates[0] || null;
  }, [advocates, selectedAdvocateId]);

  // Cases under selected advocate
  const advocateCases = useMemo(() => {
    if (!currentAdvocate) return [];
    return cases.filter(c => {
      const isUnderAdvocate = 
        c.advocateId === currentAdvocate.id || 
        c.advocateName.toLowerCase().includes(currentAdvocate.name.split(' ')[1]?.toLowerCase() || '');
      
      const matchesPrep = 
        preparationFilter === 'ALL' ||
        (preparationFilter === 'UPDATED' && (c.preparationStatus === 'UPDATED')) ||
        (preparationFilter === 'PENDING' && (c.preparationStatus === 'PENDING' || c.preparationStatus === 'IN_PROGRESS' || !c.preparationStatus));

      return isUnderAdvocate && matchesPrep;
    });
  }, [cases, currentAdvocate, preparationFilter]);

  // Helper to calculate days to hearing & urgency tier
  const getHearingUrgency = (c: CaseItem) => {
    const today = new Date('2026-10-23T00:00:00'); // Consistent baseline
    let daysDiff = 999;
    
    if (c.hearingDate) {
      const hDate = new Date(c.hearingDate + 'T00:00:00');
      daysDiff = Math.round((hDate.getTime() - today.getTime()) / (1000 * 3600 * 24));
    } else if (c.nextHearingDate?.toLowerCase().includes('today')) {
      daysDiff = 0;
    } else if (c.nextHearingDate?.toLowerCase().includes('tomorrow')) {
      daysDiff = 1;
    } else if (c.nextHearingDate?.toLowerCase().includes('in 3 days')) {
      daysDiff = 3;
    }

    if (daysDiff <= 0) {
      return {
        label: 'LISTED TODAY (0 Days)',
        days: daysDiff,
        tier: 'TODAY',
        badgeClass: 'bg-rose-600 text-white font-black animate-pulse ring-2 ring-rose-400 shadow-sm',
        cardBorder: 'border-l-4 border-l-rose-600'
      };
    } else if (daysDiff === 1) {
      return {
        label: 'LISTED TOMORROW (1 Day)',
        days: daysDiff,
        tier: 'TOMORROW',
        badgeClass: 'bg-amber-600 text-white font-bold ring-1 ring-amber-400',
        cardBorder: 'border-l-4 border-l-amber-500'
      };
    } else if (daysDiff <= 4) {
      return {
        label: `HEARING IN ${daysDiff} DAYS`,
        days: daysDiff,
        tier: 'IMMINENT',
        badgeClass: 'bg-amber-100 text-amber-900 border border-amber-300 font-bold',
        cardBorder: 'border-l-4 border-l-amber-400'
      };
    } else if (daysDiff <= 7) {
      return {
        label: `IN ${daysDiff} DAYS`,
        days: daysDiff,
        tier: 'THIS_WEEK',
        badgeClass: 'bg-blue-50 text-blue-800 border border-blue-200 font-medium',
        cardBorder: 'border-l-4 border-l-blue-400'
      };
    } else {
      return {
        label: `IN ${daysDiff} DAYS`,
        days: daysDiff,
        tier: 'FUTURE',
        badgeClass: 'bg-slate-100 text-slate-700 border border-slate-200 font-medium',
        cardBorder: 'border-l-4 border-l-slate-300'
      };
    }
  };

  // Find official by id
  const getOfficialItem = (id?: string, name?: string): OfficialItem | null => {
    if (id) {
      const match = officials.find(o => o.id === id);
      if (match) return match;
    }
    if (name) {
      const match = officials.find(o => o.name.toLowerCase().includes(name.toLowerCase()));
      if (match) return match;
    }
    return officials[0] || null;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-tn-navy-900" />
      </div>
    );
  }

  // Advocate statistics
  const updatedCount = advocateCases.filter(c => c.preparationStatus === 'UPDATED').length;
  const pendingCount = advocateCases.filter(c => c.preparationStatus !== 'UPDATED').length;
  const todayHearingCount = advocateCases.filter(c => getHearingUrgency(c).tier === 'TODAY').length;
  const tomorrowHearingCount = advocateCases.filter(c => getHearingUrgency(c).tier === 'TOMORROW').length;

  return (
    <div className="space-y-5 animate-in fade-in duration-150">
      {/* Page Title & Navigation Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-200 gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded bg-tn-navy-900 text-tn-gold-400 border border-tn-gold-500/30">
              Government Law Officers Preparation Cockpit
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase rounded bg-emerald-100 text-emerald-800 border border-emerald-300">
              Green: Updated
            </span>
            <span className="px-2 py-0.5 text-[10px] font-mono font-semibold uppercase rounded bg-amber-100 text-amber-800 border border-amber-300">
              Yellow: Pending Action
            </span>
          </div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight mt-1 flex items-center gap-2">
            <Scale className="w-5 h-5 text-tn-navy-800" />
            Advocate Briefs, Court Prep & Government Coordination
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor law officer active matters, impending court hearing dates, urgent preparation requisitions, and direct primary & secondary department contacts.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Law Officers or Briefs..."
              className="pl-8 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:border-tn-navy-700 outline-none w-64 shadow-xs"
            />
          </div>
        </div>
      </div>

      {/* Designation Tabs */}
      <div className="flex items-center space-x-1 border-b border-slate-200 overflow-x-auto pb-1 text-xs">
        {[
          { key: 'ALL', label: 'All Law Officers' },
          { key: 'AG', label: 'Advocate General (AG)' },
          { key: 'AAG', label: 'Additional Advocate General (AAG)' },
          { key: 'SGP', label: 'Special Govt Pleader (SGP)' },
          { key: 'GP', label: 'Govt Pleader / Addl GP' },
          { key: 'SC', label: 'Standing Counsels' },
        ].map((tab) => {
          const isActive = selectedDesignation === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setSelectedDesignation(tab.key)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-t-lg whitespace-nowrap transition-all border-b-2 ${
                isActive
                  ? 'border-tn-navy-950 text-tn-navy-950 bg-white shadow-xs font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Advocate Selector Strip (Horizontal Cards) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
        {filteredAdvocates.map((adv) => {
          const isSelected = selectedAdvocateId === adv.id;
          return (
            <button
              key={adv.id}
              onClick={() => setSelectedAdvocateId(adv.id)}
              className={`p-2.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-tn-navy-950 to-slate-900 text-white border-tn-gold-500 ring-2 ring-tn-gold-400/40 shadow-md'
                  : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200/90 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-[9px] font-mono font-bold uppercase px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-tn-gold-500/20 text-tn-gold-300 border border-tn-gold-500/40' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {adv.designation.split(' ')[0]}
                  </span>
                  <span className={`text-[10px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-400'}`}>
                    {adv.standingExperienceYears}y
                  </span>
                </div>
                <h4 className="text-xs font-bold mt-1.5 line-clamp-1">
                  {adv.name.replace(' (Senior Advocate - Synthetic)', '').replace(' (Synthetic)', '')}
                </h4>
                <p className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {adv.court.split('(')[0]}
                </p>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-slate-100/20 text-[10px] font-mono">
                <span className={isSelected ? 'text-tn-gold-300 font-bold' : 'text-slate-600'}>
                  {adv.activeMatters} Briefs
                </span>
                <span className={`font-semibold ${adv.instructionsPending > 0 ? (isSelected ? 'text-amber-300' : 'text-amber-700 font-bold') : (isSelected ? 'text-slate-400' : 'text-slate-400')}`}>
                  {adv.instructionsPending} Pend
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Advocate Executive Cockpit Header & Reminders */}
      {currentAdvocate && (
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
          {/* Advocate Banner */}
          <div className="bg-gradient-to-r from-tn-navy-950 via-slate-900 to-tn-navy-900 text-white p-5">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-tn-gold-500/20 text-tn-gold-300 border border-tn-gold-500/40">
                    {currentAdvocate.designation}
                  </span>
                  <span className="text-[10px] font-mono text-slate-300">
                    {currentAdvocate.standingExperienceYears} Years Bar Standing
                  </span>
                  <span className="text-[10px] font-mono text-slate-300 border-l border-slate-700 pl-2">
                    {currentAdvocate.officeLocation}
                  </span>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  {currentAdvocate.name}
                </h2>
                <div className="text-xs text-slate-300 flex items-center gap-2">
                  <span>{currentAdvocate.court}</span>
                  <span>•</span>
                  <span>Assigned Departments: <strong className="text-tn-gold-300">{currentAdvocate.departments.join(', ')}</strong></span>
                </div>
              </div>

              {/* Quick Metrics */}
              <div className="flex items-center gap-2">
                <div className="px-3.5 py-2 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center min-w-[76px]">
                  <span className="text-[10px] uppercase font-bold text-slate-300 block">Briefs</span>
                  <span className="text-lg font-black text-white">{advocateCases.length}</span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-rose-500/20 border border-rose-400/30 text-center min-w-[76px]">
                  <span className="text-[10px] uppercase font-bold text-rose-300 block">Today/Tmrw</span>
                  <span className="text-lg font-black text-rose-200">{todayHearingCount + tomorrowHearingCount}</span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-center min-w-[76px]">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Updated</span>
                  <span className="text-lg font-black text-emerald-300">{updatedCount}</span>
                </div>
                <div className="px-3.5 py-2 rounded-xl bg-amber-500/20 border border-amber-400/30 text-center min-w-[76px]">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">Pending</span>
                  <span className="text-lg font-black text-amber-300">{pendingCount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Urgent Notifications & Reminders Banner for Advocate Office */}
          <div className="bg-amber-50/70 border-b border-amber-200/80 px-5 py-3">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-start md:items-center space-x-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500 text-white shrink-0 mt-0.5 md:mt-0 shadow-xs">
                  <Bell className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold text-amber-950 uppercase tracking-wide">
                      Advocate Office Urgent Action Reminders
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-amber-200 text-amber-900">
                      2 Immediate Requisitions
                    </span>
                  </div>
                  <p className="text-xs text-amber-900 mt-0.5">
                    <strong>High Court First Bench:</strong> Kanchipuram Collector Land Acquisition benchmark calculations must be received prior to 1:00 PM mention. <strong>Home Dept:</strong> Sworn affidavit dispatch receipt requires signature verification.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                <span className="text-[11px] text-amber-800 font-medium">Filter Cases:</span>
                <div className="inline-flex rounded-lg border border-amber-300 bg-white p-0.5 text-xs shadow-2xs">
                  <button
                    onClick={() => setPreparationFilter('ALL')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                      preparationFilter === 'ALL'
                        ? 'bg-tn-navy-950 text-white shadow-2xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    All ({advocateCases.length})
                  </button>
                  <button
                    onClick={() => setPreparationFilter('UPDATED')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                      preparationFilter === 'UPDATED'
                        ? 'bg-emerald-600 text-white shadow-2xs'
                        : 'text-emerald-700 hover:text-emerald-900'
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Updated ({updatedCount})
                  </button>
                  <button
                    onClick={() => setPreparationFilter('PENDING')}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all flex items-center gap-1 ${
                      preparationFilter === 'PENDING'
                        ? 'bg-amber-600 text-white shadow-2xs'
                        : 'text-amber-800 hover:text-amber-950'
                    }`}
                  >
                    <AlertTriangle className="w-3 h-3" />
                    Pending ({pendingCount})
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Cases Section Under Selected Advocate */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Assigned Cases & Hearing Preparation Dossiers
            </h3>
            <span className="px-2 py-0.5 text-xs font-mono font-bold bg-slate-100 text-slate-700 rounded-full border border-slate-200">
              {advocateCases.length} Matters Listed
            </span>
          </div>
          <span className="text-xs text-slate-500 italic">
            Click on any case card for detailed AI dispute brief or contact official directly
          </span>
        </div>

        {advocateCases.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 text-slate-500">
            <FileText className="w-10 h-10 mx-auto text-slate-300 mb-2" />
            <p className="font-semibold text-slate-700">No cases match the selected filter criteria</p>
            <p className="text-xs text-slate-400 mt-1">Try switching to 'All' or choose another law officer from the tabs above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {advocateCases.map((c) => {
              const urgency = getHearingUrgency(c);
              const isUpdated = c.preparationStatus === 'UPDATED';
              const official = getOfficialItem(c.officialId, c.officialName);

              return (
                <div
                  key={c.id}
                  className={`bg-white rounded-2xl border transition-all duration-200 shadow-xs hover:shadow-md ${urgency.cardBorder} ${
                    isUpdated 
                      ? 'border-slate-200/90 ring-1 ring-emerald-500/20' 
                      : 'border-amber-200 ring-1 ring-amber-400/30'
                  }`}
                >
                  <div className="p-5">
                    {/* Top Row: Case Identifiers, Hearing Days Badge, Preparation Tag */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div className="flex flex-wrap items-center gap-2">
                        {/* Case Number */}
                        <span 
                          onClick={() => setSelectedCaseForModal(c)}
                          className="font-mono text-sm font-extrabold text-tn-navy-950 hover:text-blue-700 cursor-pointer underline decoration-dotted"
                        >
                          {c.caseNumber}
                        </span>

                        {/* Court / Forum */}
                        <span className="text-xs text-slate-600 font-medium">
                          {c.court}
                        </span>

                        {/* Department */}
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {c.department}
                        </span>

                        {/* District */}
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-200">
                          {c.district}
                        </span>
                      </div>

                      {/* Right Tags: Hearing Countdown & Preparation Status (Green / Yellow) */}
                      <div className="flex items-center gap-2">
                        {/* Days to Hearing Highlight */}
                        <span className={`px-2.5 py-1 rounded-full text-[10px] tracking-wide font-mono flex items-center gap-1 ${urgency.badgeClass}`}>
                          <Clock3 className="w-3 h-3" />
                          {urgency.label}
                        </span>

                        {/* Preparation Status: Green for Updated, Yellow for Pending */}
                        {isUpdated ? (
                          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold font-mono bg-emerald-500 text-white shadow-xs flex items-center gap-1.5 border border-emerald-600">
                            <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                            UPDATED (READY)
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-[11px] font-extrabold font-mono bg-amber-400 text-amber-950 shadow-xs flex items-center gap-1.5 border border-amber-500 animate-pulse">
                            <AlertTriangle className="w-3.5 h-3.5 text-amber-950" />
                            PENDING PREPARATION
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Middle Section: Title, Legal Issue & Quick Stats */}
                    <div className="mt-3 grid grid-cols-1 lg:grid-cols-12 gap-4">
                      {/* Left: Case Title & Legal Issue */}
                      <div className="lg:col-span-7 space-y-2">
                        <h4 
                          onClick={() => setSelectedCaseForModal(c)}
                          className="text-sm font-extrabold text-slate-900 hover:text-blue-800 cursor-pointer tracking-tight"
                        >
                          {c.caseTitle}
                        </h4>

                        <div className="text-xs text-slate-700 font-medium bg-slate-50 p-2.5 rounded-xl border border-slate-200/80">
                          <strong className="text-slate-900 font-bold block mb-0.5">Core Legal Issue & Statute:</strong>
                          <span>{c.legalIssue}</span>
                          <div className="mt-1 text-[11px] text-slate-500 font-mono">
                            Ref: {c.statuteReference}
                          </div>
                        </div>

                        {/* Preparation Highlights Checklist */}
                        <div className={`p-3 rounded-xl border ${
                          isUpdated ? 'bg-emerald-50/60 border-emerald-200' : 'bg-amber-50/70 border-amber-200'
                        }`}>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 text-slate-900">
                              <Sparkles className={`w-3.5 h-3.5 ${isUpdated ? 'text-emerald-700' : 'text-amber-700'}`} />
                              What Advocate Must Prepare & Collect From Officials:
                            </span>
                            <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                              isUpdated ? 'bg-emerald-200/80 text-emerald-900' : 'bg-amber-200/80 text-amber-950'
                            }`}>
                              {isUpdated ? 'Checklist Completed' : 'Action Required'}
                            </span>
                          </div>

                          <ul className="space-y-1.5 text-xs text-slate-800">
                            {(c.preparationNotes && c.preparationNotes.length > 0) ? (
                              c.preparationNotes.map((note, idx) => (
                                <li key={idx} className="flex items-start space-x-2">
                                  {isUpdated ? (
                                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                                  ) : (
                                    <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                                  )}
                                  <span className={isUpdated ? 'text-slate-700 font-medium' : 'text-amber-950 font-bold'}>
                                    {note}
                                  </span>
                                </li>
                              ))
                            ) : (
                              <li className="flex items-center space-x-2 text-slate-600">
                                <span>1. Collect instructions and draft counter-affidavit from nodal department officer.</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Right: Primary and Secondary Contact Details Card */}
                      <div className="lg:col-span-5 bg-slate-50/90 rounded-xl p-3.5 border border-slate-200/80 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                              <UserCheck className="w-3.5 h-3.5 text-tn-navy-800" />
                              Government Officials Contact Team
                            </span>
                            <span className="text-[10px] font-mono text-slate-400">
                              Direct Coordination
                            </span>
                          </div>

                          {/* Primary Contact (Secretary / District Collector) */}
                          <div className="mt-2.5 p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-900 uppercase">
                                Primary Official (Decision Maker)
                              </span>
                              {official && (
                                <button
                                  onClick={() => setSelectedOfficialForModal(official)}
                                  className="text-[10px] text-tn-navy-900 font-bold hover:underline flex items-center gap-0.5"
                                >
                                  Dossier <ChevronRight className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                            <h5 className="text-xs font-extrabold text-slate-900 mt-1">
                              {c.officialName}
                            </h5>
                            <p className="text-[11px] text-slate-600 font-medium">
                              {c.officialDesignation}
                            </p>

                            {/* Contact buttons */}
                            <div className="flex flex-wrap items-center gap-2 mt-2 pt-1.5 border-t border-slate-100 text-[11px]">
                              {official?.contactDetails.officialPhone ? (
                                <a 
                                  href={`tel:${official.contactDetails.officialPhone.split(' ')[0]}`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-medium transition-colors"
                                >
                                  <PhoneCall className="w-3 h-3 text-emerald-700" />
                                  {official.contactDetails.officialPhone.split('(')[0].trim()}
                                </a>
                              ) : (
                                <span className="text-slate-500 font-mono text-[10px]">044-25671442 (Secy)</span>
                              )}
                              {official?.contactDetails.directEmail && (
                                <a 
                                  href={`mailto:${official.contactDetails.directEmail.split(' ')[0]}`}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-mono font-medium transition-colors"
                                >
                                  <Mail className="w-3 h-3 text-blue-700" />
                                  Email Desk
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Secondary Contact (Field Execution / Custodian Officer) */}
                          <div className="mt-2.5 p-2 rounded-lg bg-white border border-slate-200 shadow-2xs">
                            <div className="flex items-center justify-between">
                              <span className="text-[9px] font-bold font-mono px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 uppercase">
                                Secondary Contact (Field & Evidence)
                              </span>
                              <span className="text-[9px] text-slate-400 font-mono">
                                Operational Team
                              </span>
                            </div>

                            {c.secondaryContact ? (
                              <div className="mt-1 space-y-0.5">
                                <h5 className="text-xs font-bold text-slate-900">
                                  {c.secondaryContact.name}
                                </h5>
                                <p className="text-[11px] text-slate-600">
                                  {c.secondaryContact.designation}
                                </p>
                                <div className="text-[10px] text-purple-900 font-medium bg-purple-50 px-1.5 py-0.5 rounded border border-purple-100 mt-1">
                                  Role: {c.secondaryContact.role}
                                </div>
                                <div className="flex items-center gap-2 mt-2 pt-1 border-t border-slate-100 text-[11px]">
                                  <a 
                                    href={`tel:${c.secondaryContact.phone}`}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-mono font-semibold transition-colors border border-emerald-200"
                                  >
                                    <PhoneCall className="w-3 h-3 text-emerald-600" />
                                    {c.secondaryContact.phone}
                                  </a>
                                  <a 
                                    href={`mailto:${c.secondaryContact.email}`}
                                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 hover:bg-blue-100 text-blue-900 font-mono font-medium transition-colors border border-blue-200"
                                  >
                                    <Mail className="w-3 h-3 text-blue-600" />
                                    Direct Email
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <div className="mt-1 text-[11px] text-slate-500">
                                Designated District Revenue Officer / Field Executive Engineer on record.
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Bottom Actions inside Card */}
                        <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between">
                          <button
                            onClick={() => setSelectedCaseForModal(c)}
                            className="text-xs font-bold text-tn-navy-950 hover:text-blue-800 flex items-center gap-1 transition-colors"
                          >
                            <Info className="w-3.5 h-3.5" />
                            Open AI Case Summary
                          </button>

                          <button
                            onClick={() => navigate(`/cases/${c.id}`)}
                            className="px-2.5 py-1 rounded bg-tn-navy-950 hover:bg-slate-800 text-white text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs"
                          >
                            Full Case Dossier
                            <ExternalLink className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Official Hierarchy & Contact Dossier Modal */}
      <OfficialContactModal
        official={selectedOfficialForModal}
        onClose={() => setSelectedOfficialForModal(null)}
      />

      {/* Case Quick Detail Modal */}
      <CaseQuickModal
        caseItem={selectedCaseForModal}
        onClose={() => setSelectedCaseForModal(null)}
      />
    </div>
  );
};
