import React from 'react';
import { BinStatusType } from '../data/mockData';

interface KPICardProps {
  title: string;
  mainValue: string | number;
  secondaryValue?: string;
  subtitle: string;
  fillPercent?: number;
  status?: BinStatusType;
}

export const KPICard: React.FC<KPICardProps> = ({
  title,
  mainValue,
  secondaryValue,
  subtitle,
  fillPercent,
  status = 'NORMAL',
}) => {
  // Determine color scheme based on status
  let valueColor = 'text-emerald-400';
  let progressColor = 'bg-emerald-500';
  let borderColor = 'border-slate-800/90 hover:border-emerald-500/30';
  let badgeColor = 'text-slate-400';

  if (status === 'WARNING') {
    valueColor = 'text-amber-400';
    progressColor = 'bg-amber-400';
    borderColor = 'border-amber-900/40 hover:border-amber-500/40';
    badgeColor = 'text-amber-400 font-semibold';
  } else if (status === 'FULL') {
    valueColor = 'text-rose-400';
    progressColor = 'bg-rose-500';
    borderColor = 'border-rose-900/40 hover:border-rose-500/40';
    badgeColor = 'text-rose-400 font-bold';
  }

  return (
    <div
      className={`bg-[#131922] border ${borderColor} rounded-2xl p-5 flex flex-col justify-between shadow-lg transition-all h-[148px]`}
    >
      {/* Header Label */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        {secondaryValue && (
          <span className="text-xs font-mono font-medium text-slate-300">
            {secondaryValue}
          </span>
        )}
      </div>

      {/* Main Big Number & Percentage */}
      <div className="flex items-baseline justify-between my-auto">
        <div className={`text-3xl sm:text-4xl font-extrabold tracking-tight ${valueColor}`}>
          {mainValue}
        </div>
        {fillPercent !== undefined && (
          <div className="text-sm sm:text-base font-mono font-bold text-slate-300">
            {fillPercent}%
          </div>
        )}
      </div>

      {/* Footer: Subtitle & Optional Progress Bar */}
      <div className="space-y-1.5">
        {fillPercent !== undefined && (
          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
              style={{ width: `${Math.min(fillPercent, 100)}%` }}
            />
          </div>
        )}
        <div className="flex justify-between items-center text-[11px] text-slate-400">
          <span>{subtitle}</span>
          {status !== 'NORMAL' && (
            <span className={badgeColor}>{status}</span>
          )}
        </div>
      </div>
    </div>
  );
};
