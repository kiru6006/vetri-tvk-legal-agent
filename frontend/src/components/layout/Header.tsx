import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, Shield, ChevronDown, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ sidebarCollapsed }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/cases?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header 
      className={`fixed top-0 right-0 z-20 h-16 bg-white border-b border-slate-200 transition-all duration-200 flex flex-col justify-between ${
        sidebarCollapsed ? 'left-16' : 'left-64'
      }`}
    >
      {/* Top Demo Banner */}
      <div className="h-5 bg-amber-500 text-slate-950 px-4 text-[10px] font-bold tracking-widest uppercase flex items-center justify-between border-b border-amber-600/30">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-950 animate-ping"></span>
          <span>DEMO ENVIRONMENT • SYNTHETIC DATA • NOT FOR OFFICIAL DECISION-MAKING</span>
        </div>
        <div className="hidden sm:flex items-center space-x-3 text-[9px] font-semibold text-slate-900">
          <span>SOURCE STATUS: <span className="text-emerald-950 font-bold">HEALTHY</span></span>
          <span>FRESHNESS: TODAY, 22:15 IST</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="h-11 px-4 flex items-center justify-between">
        {/* Left: Office Title */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:block">
            <span className="text-xs font-bold text-tn-navy-900 tracking-wide">
              CHIEF MINISTER’S OFFICE
            </span>
            <span className="text-slate-400 mx-2 font-light">|</span>
            <span className="text-xs font-medium text-slate-600">
              Statewide Legal Intelligence Desk
            </span>
          </div>
        </div>

        {/* Center: Global Quick Search */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Case ID, Party, Department, Legal Issue or Advocate..."
              className="w-full pl-8 pr-3 py-1 bg-slate-100 hover:bg-slate-50 focus:bg-white text-xs text-slate-800 rounded border border-slate-200 focus:outline-none focus:border-tn-navy-600 transition-colors"
            />
          </div>
        </form>

        {/* Right: Actions & User Persona */}
        <div className="flex items-center space-x-3">
          {/* Notifications Button */}
          <button 
            onClick={() => navigate('/notifications')}
            className="relative p-1.5 text-slate-600 hover:text-tn-navy-900 hover:bg-slate-100 rounded transition-colors"
            title="Attention Center / Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-600 border border-white"></span>
          </button>

          {/* Environment & Role Indicator */}
          <div className="hidden lg:flex items-center space-x-2 pl-2 border-l border-slate-200">
            <div className="w-7 h-7 rounded-full bg-tn-navy-900 text-white flex items-center justify-center font-bold text-xs font-serif">
              CM
            </div>
            <div className="text-left text-xs leading-tight">
              <div className="font-semibold text-tn-navy-950 flex items-center">
                Chief Minister’s Office
                <CheckCircle2 className="w-3 h-3 text-tn-gold-600 ml-1 inline" />
              </div>
              <div className="text-[10px] text-slate-500 font-mono">
                Executive Clearance (Tier 1)
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
