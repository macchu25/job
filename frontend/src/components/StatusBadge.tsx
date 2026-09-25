import React from 'react';
import { BinStatusType } from '../data/mockData';

interface StatusBadgeProps {
  status: BinStatusType | 'CONNECTED' | 'DISCONNECTED' | 'SIMULATION' | 'PLC';
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-2.5 py-1 text-xs';

  switch (status) {
    case 'NORMAL':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-md bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          NORMAL
        </span>
      );
    case 'WARNING':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-md bg-amber-950/80 text-amber-300 border border-amber-800/80 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span>
          WARNING
        </span>
      );
    case 'FULL':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-semibold rounded-md bg-rose-950/80 text-rose-400 border border-rose-800/80 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping"></span>
          FULL
        </span>
      );
    case 'CONNECTED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 ${sizeClasses}`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Backend Connected
        </span>
      );
    case 'DISCONNECTED':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-lg bg-slate-900 text-slate-400 border border-slate-700/80 ${sizeClasses}`}
        >
          <span className="w-2 h-2 rounded-full bg-slate-500"></span>
          PLC Disconnected
        </span>
      );
    case 'SIMULATION':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold tracking-wider rounded-lg bg-cyan-950/70 text-cyan-400 border border-cyan-800/70 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          SIMULATION
        </span>
      );
    case 'PLC':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-bold tracking-wider rounded-lg bg-indigo-950/70 text-indigo-400 border border-indigo-800/70 ${sizeClasses}`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
          PLC HARDWARE
        </span>
      );
    default:
      return null;
  }
};
