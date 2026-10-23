import React from 'react';
import { Priority, RiskLevel } from '@/types';

interface BadgeProps {
  level: Priority | RiskLevel | string;
  className?: string;
  size?: 'sm' | 'md';
}

export const PriorityBadge: React.FC<BadgeProps> = ({ level, className = '', size = 'md' }) => {
  const isSm = size === 'sm';
  const sizeClasses = isSm ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  switch (level?.toUpperCase()) {
    case 'CRITICAL':
      return (
        <span className={`inline-flex items-center font-bold tracking-wider rounded border border-red-200 bg-red-50 text-red-700 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 mr-1.5 animate-pulse"></span>
          CRITICAL
        </span>
      );
    case 'HIGH':
      return (
        <span className={`inline-flex items-center font-semibold rounded border border-amber-200 bg-amber-50 text-amber-800 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5"></span>
          HIGH
        </span>
      );
    case 'MEDIUM':
      return (
        <span className={`inline-flex items-center font-medium rounded border border-slate-200 bg-slate-50 text-slate-700 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1.5"></span>
          MEDIUM
        </span>
      );
    case 'LOW':
      return (
        <span className={`inline-flex items-center font-medium rounded border border-emerald-200 bg-emerald-50 text-emerald-700 ${sizeClasses} ${className}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5"></span>
          LOW
        </span>
      );
    default:
      return (
        <span className={`inline-flex items-center rounded border border-slate-200 bg-slate-100 text-slate-600 ${sizeClasses} ${className}`}>
          {level}
        </span>
      );
  }
};

export const StatusBadge: React.FC<{ status: string; size?: 'sm' | 'md' }> = ({ status, size = 'md' }) => {
  const isSm = size === 'sm';
  const sizeClasses = isSm ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs';

  let colorStyle = 'border-slate-200 bg-slate-100 text-slate-700';
  let formatted = status.replace(/_/g, ' ');

  if (status === 'HEARING_SCHEDULED') {
    colorStyle = 'border-blue-200 bg-blue-50 text-blue-800 font-medium';
    formatted = 'Hearing Scheduled';
  } else if (status === 'INTERIM_STAY') {
    colorStyle = 'border-rose-200 bg-rose-50 text-rose-800 font-bold';
    formatted = 'Interim Stay Active';
  } else if (status === 'COMPLIANCE_PENDING') {
    colorStyle = 'border-amber-200 bg-amber-50 text-amber-900 font-semibold';
    formatted = 'Compliance Pending';
  } else if (status === 'ORDERS_RESERVED') {
    colorStyle = 'border-purple-200 bg-purple-50 text-purple-800 font-medium';
    formatted = 'Orders Reserved';
  } else if (status === 'DISPOSED') {
    colorStyle = 'border-emerald-200 bg-emerald-50 text-emerald-800 font-medium';
    formatted = 'Disposed';
  }

  return (
    <span className={`inline-flex items-center rounded border ${colorStyle} ${sizeClasses}`}>
      {formatted}
    </span>
  );
};

export const InstructionsBadge: React.FC<{ status: string }> = ({ status }) => {
  switch (status) {
    case 'PENDING':
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-bold rounded bg-red-100 text-red-800 border border-red-300">
          Pending
        </span>
      );
    case 'SUBMITTED':
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
          Submitted
        </span>
      );
    case 'UNDER_REVIEW':
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs font-medium rounded bg-amber-50 text-amber-800 border border-amber-200">
          Under Review
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center px-2 py-0.5 text-xs rounded bg-slate-100 text-slate-600">
          N/A
        </span>
      );
  }
};
