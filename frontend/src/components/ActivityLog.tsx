import React from 'react';
import { ActivityLogItem } from '../data/mockData';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, FileText } from 'lucide-react';

interface ActivityLogProps {
  logs: ActivityLogItem[];
}

export const ActivityLog: React.FC<ActivityLogProps> = ({ logs }) => {
  const getIcon = (type: ActivityLogItem['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'error':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'info':
      default:
        return <Info className="w-3.5 h-3.5 text-cyan-400 shrink-0" />;
    }
  };

  return (
    <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-emerald-400" />
          <h3 className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide uppercase">
            ACTIVITY LOG
          </h3>
        </div>
        <span className="text-[11px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-mono">
          LIVE FEED
        </span>
      </div>

      {/* Logs List Container */}
      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-2.5 p-2 rounded-xl bg-slate-900/60 border border-slate-800/60 hover:border-slate-700/80 transition-colors text-xs"
          >
            <div className="mt-0.5">{getIcon(log.type)}</div>
            <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-slate-300 font-medium leading-relaxed">
                {log.message}
              </span>
              <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap">
                {log.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
