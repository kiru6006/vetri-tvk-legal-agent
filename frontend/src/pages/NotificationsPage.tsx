import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, AlertTriangle, Clock, Gavel, CheckCircle2, ChevronRight, ShieldAlert } from 'lucide-react';
import { mockNotifications } from '@/data/mockDashboard';
import { NotificationItem } from '@/types';
import { PriorityBadge } from '@/components/common/Badges';

export const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState<NotificationItem[]>(mockNotifications);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'HEARING':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'ADVERSE_ORDER':
        return <Gavel className="w-4 h-4 text-red-600" />;
      case 'INSTRUCTIONS_PENDING':
        return <AlertTriangle className="w-4 h-4 text-amber-600" />;
      default:
        return <ShieldAlert className="w-4 h-4 text-purple-600" />;
    }
  };

  return (
    <div className="space-y-4 max-w-4xl mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-tn-navy-950 tracking-tight">
            Attention Center & Executive Alerts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time urgency dispatch regarding impending hearings, adverse orders, and compliance cut-offs.
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="text-xs font-semibold text-tn-navy-900 hover:underline"
        >
          Mark all as acknowledged
        </button>
      </div>

      <div className="bg-white rounded-lg border border-slate-200 shadow-xs divide-y divide-slate-100 overflow-hidden">
        {notifs.map((n) => (
          <div
            key={n.id}
            onClick={() => n.caseId && navigate(`/cases/${n.caseId}`)}
            className={`p-4 flex items-start justify-between cursor-pointer hover:bg-slate-50 transition-colors ${
              !n.read ? 'bg-amber-50/20' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded bg-slate-100 border border-slate-200 shrink-0 mt-0.5">
                {getCategoryIcon(n.category)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-900">{n.title}</span>
                  <PriorityBadge level={n.severity} size="sm" />
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-red-600"></span>
                  )}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">{n.description}</p>
                <div className="flex items-center space-x-3 text-[10px] text-slate-400 font-mono pt-1">
                  <span>{n.timestamp}</span>
                  {n.department && <span>Dept: {n.department}</span>}
                  {n.caseId && <span className="text-tn-navy-900 font-bold">Case: {n.caseId}</span>}
                </div>
              </div>
            </div>

            <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
};
