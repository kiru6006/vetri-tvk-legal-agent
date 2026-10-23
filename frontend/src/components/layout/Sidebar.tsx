import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Scale, 
  Building2, 
  MapPin, 
  Briefcase, 
  Users, 
  ShieldAlert, 
  FileText, 
  Bot, 
  Bell, 
  Settings, 
  ChevronLeft,
  ChevronRight,
  Gavel,
  Clock,
  AlertTriangle,
  Calendar
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const navSections = [
    {
      title: 'OVERVIEW',
      items: [
        { label: 'Executive Dashboard', path: '/', icon: LayoutDashboard },
        { label: 'Workload & Critical Exposure', path: '/workload', icon: AlertTriangle },
        { label: 'Judicial Calendar & Cause Lists', path: '/calendar', icon: Calendar }
      ]
    },
    {
      title: 'LITIGATION POSTURE',
      items: [
        { label: 'All Cases', path: '/cases', icon: Scale },
        { label: 'Matter Classification (Civil/Crim)', path: '/case-types', icon: Scale },
        { label: 'Critical Matters', path: '/cases?priority=CRITICAL', icon: AlertTriangle },
        { label: 'Upcoming Hearings', path: '/cases?status=HEARING_SCHEDULED', icon: Clock },
        { label: 'Adverse Orders', path: '/cases?risk=CRITICAL', icon: Gavel }
      ]
    },
    {
      title: 'STATE INTELLIGENCE',
      items: [
        { label: 'Court Jurisdictions & Forums', path: '/court-types', icon: Gavel },
        { label: 'Departments', path: '/departments', icon: Building2 },
        { label: 'Districts (38)', path: '/districts', icon: MapPin },
        { label: 'Law Officers / Advocates', path: '/advocates', icon: Briefcase },
        { label: 'Government Officials', path: '/officials', icon: Users },
        { label: 'Risk Intelligence', path: '/risk', icon: ShieldAlert }
      ]
    },
    {
      title: 'EXECUTIVE TOOLS',
      items: [
        { label: 'Briefing Reports', path: '/reports', icon: FileText },
        { label: 'AI Executive Assistant', path: '/assistant', icon: Bot },
        { label: 'Attention Center', path: '/notifications', icon: Bell }
      ]
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Configuration & Audit', path: '/settings', icon: Settings }
      ]
    }
  ];

  return (
    <aside 
      className={`fixed top-0 bottom-0 left-0 z-30 flex flex-col bg-tn-navy-950 text-slate-300 border-r border-tn-navy-800 transition-all duration-200 select-none ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-3 border-b border-tn-navy-800 bg-tn-navy-900">
        {!collapsed && (
          <div className="flex items-center space-x-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded bg-tn-gold-500/20 border border-tn-gold-500/40 flex items-center justify-center text-tn-gold-400 font-serif font-black text-sm shrink-0">
              TN
            </div>
            <div className="leading-tight overflow-hidden">
              <span className="block text-[11px] font-bold tracking-wider text-tn-gold-400 uppercase">
                GOVERNMENT OF TN
              </span>
              <span className="block text-xs font-semibold text-slate-100 truncate">
                Litigation Intelligence
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-8 h-8 rounded bg-tn-gold-500/20 border border-tn-gold-500/40 flex items-center justify-center text-tn-gold-400 font-serif font-black text-sm">
              TN
            </div>
          </div>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navSections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {!collapsed && (
              <div className="px-2.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                {section.title}
              </div>
            )}
            {section.items.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.label}
                  to={item.path}
                  end={item.path === '/'}
                  title={collapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center rounded-md px-2.5 py-2 text-xs font-medium transition-colors ${
                      isActive
                        ? 'bg-tn-navy-700 text-white font-semibold shadow-xs border-l-2 border-tn-gold-500'
                        : 'text-slate-300 hover:bg-tn-navy-900 hover:text-slate-100'
                    } ${collapsed ? 'justify-center' : 'space-x-2.5'}`
                  }
                >
                  <Icon className="w-4 h-4 shrink-0 text-slate-300" />
                  {!collapsed && <span className="truncate">{item.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </div>

      {/* Collapse Toggle Footer */}
      <div className="p-2 border-t border-tn-navy-800 bg-tn-navy-900/60 flex items-center justify-between">
        {!collapsed && (
          <div className="px-2 text-[10px] text-slate-400 font-mono">
            CMO Executive Portal v2.4
          </div>
        )}
        <button
          onClick={onToggle}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="p-1.5 rounded hover:bg-tn-navy-800 text-slate-400 hover:text-slate-200 transition-colors mx-auto"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>
    </aside>
  );
};
