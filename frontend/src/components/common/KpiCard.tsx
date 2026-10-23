import React from 'react';
import { LucideIcon } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: 'default' | 'critical' | 'warning' | 'success' | 'highlight';
  onClick?: () => void;
  badge?: string;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  variant = 'default',
  onClick,
  badge
}) => {
  let containerStyles = 'bg-white border-slate-200/80 hover:border-slate-300';
  let valueColor = 'text-tn-navy-950';
  let iconBox = 'bg-slate-100/80 text-slate-600 border-slate-200';
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-200';
  let accentBar = 'bg-slate-300';

  if (variant === 'critical') {
    containerStyles = 'bg-gradient-to-br from-white via-red-50/20 to-red-50/40 border-red-200/80 hover:border-red-300';
    valueColor = 'text-red-700';
    iconBox = 'bg-red-100/60 text-red-700 border-red-200';
    badgeStyle = 'bg-red-100 text-red-800 border-red-200';
    accentBar = 'bg-red-600';
  } else if (variant === 'warning') {
    containerStyles = 'bg-gradient-to-br from-white via-amber-50/20 to-amber-50/40 border-amber-200/80 hover:border-amber-300';
    valueColor = 'text-amber-900';
    iconBox = 'bg-amber-100/60 text-amber-800 border-amber-200';
    badgeStyle = 'bg-amber-100 text-amber-800 border-amber-200';
    accentBar = 'bg-amber-500';
  } else if (variant === 'success') {
    containerStyles = 'bg-gradient-to-br from-white via-emerald-50/20 to-emerald-50/40 border-emerald-200/80 hover:border-emerald-300';
    valueColor = 'text-emerald-800';
    iconBox = 'bg-emerald-100/60 text-emerald-800 border-emerald-200';
    badgeStyle = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    accentBar = 'bg-emerald-500';
  } else if (variant === 'highlight') {
    containerStyles = 'bg-gradient-to-br from-white via-blue-50/20 to-blue-50/40 border-blue-200/80 hover:border-blue-300';
    valueColor = 'text-blue-950';
    iconBox = 'bg-blue-100/60 text-blue-800 border-blue-200';
    badgeStyle = 'bg-blue-100 text-blue-800 border-blue-200';
    accentBar = 'bg-blue-600';
  }

  return (
    <div
      onClick={onClick}
      className={`group relative p-4 rounded-xl border shadow-sm transition-all duration-200 overflow-hidden ${containerStyles} ${
        onClick ? 'cursor-pointer hover:shadow-md hover:-translate-y-0.5' : ''
      }`}
    >
      {/* Top Accent Strip */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${accentBar} opacity-90`} />

      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase truncate">
          {title}
        </span>
        {Icon && (
          <div className={`p-1.5 rounded-lg border flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${iconBox}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline justify-between">
        <div className={`text-2xl lg:text-[26px] font-extrabold tracking-tight font-sans ${valueColor}`}>
          {value}
        </div>
        {badge && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase font-mono tracking-wide ${badgeStyle}`}>
            {badge}
          </span>
        )}
      </div>

      {subtitle && (
        <div className="mt-1.5 text-xs text-slate-600 line-clamp-1 font-medium">
          {subtitle}
        </div>
      )}
    </div>
  );
};
