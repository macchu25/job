import React from 'react';
import { Eye, ArrowDown } from 'lucide-react';
import { BinData } from '../data/mockData';
import { StatusBadge } from './StatusBadge';

interface BinStatusTableProps {
  bins: BinData[];
  onViewBin: (bin: BinData) => void;
}

export const BinStatusTable: React.FC<BinStatusTableProps> = ({ bins, onViewBin }) => {
  return (
    <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-5 shadow-xl flex flex-col justify-between">
      {/* Table Header Section */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide uppercase">
          BIN STATUS & TELEMETRY
        </h3>
        <span className="text-xs text-slate-400 font-mono">
          Total Bins: <span className="text-emerald-400 font-bold">{bins.length}</span>
        </span>
      </div>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-slate-800 text-emerald-400 font-semibold tracking-wider uppercase text-[11px]">
              <th className="py-3 px-3">BIN</th>
              <th className="py-3 px-3">PRODUCT TYPE</th>
              <th className="py-3 px-3 text-center">CURRENT</th>
              <th className="py-3 px-3 text-center">CAPACITY</th>
              <th className="py-3 px-3 text-center">REMAINING</th>
              <th className="py-3 px-3 text-center">FILL %</th>
              <th className="py-3 px-3 text-center">STATUS</th>
              <th className="py-3 px-3 text-right">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 font-medium">
            {bins.map((bin) => (
              <tr
                key={bin.id}
                className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
              >
                {/* Bin Name */}
                <td className="py-3.5 px-3 font-mono font-bold text-cyan-400 group-hover:text-cyan-300">
                  {bin.name}
                </td>

                {/* Product Type */}
                <td className="py-3.5 px-3 text-slate-300">
                  <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700/80 text-xs font-mono">
                    {bin.productType}
                  </span>
                </td>

                {/* Current */}
                <td className="py-3.5 px-3 text-center font-mono text-white font-bold text-sm">
                  {bin.current}
                </td>

                {/* Capacity */}
                <td className="py-3.5 px-3 text-center font-mono text-slate-400">
                  {bin.capacity}
                </td>

                {/* Remaining */}
                <td className="py-3.5 px-3 text-center font-mono text-slate-300">
                  {bin.remaining}
                </td>

                {/* Fill % */}
                <td className="py-3.5 px-3 text-center">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-14 bg-slate-800 rounded-full h-1.5 overflow-hidden hidden sm:block">
                      <div
                        className={`h-full rounded-full ${
                          bin.status === 'FULL'
                            ? 'bg-rose-500'
                            : bin.status === 'WARNING'
                            ? 'bg-amber-400'
                            : 'bg-emerald-400'
                        }`}
                        style={{ width: `${bin.fillPercent}%` }}
                      />
                    </div>
                    <span
                      className={`font-mono font-bold text-xs ${
                        bin.status === 'FULL'
                          ? 'text-rose-400'
                          : bin.status === 'WARNING'
                          ? 'text-amber-400'
                          : 'text-emerald-400'
                      }`}
                    >
                      {bin.fillPercent}%
                    </span>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-3.5 px-3 text-center">
                  <StatusBadge status={bin.status} size="sm" />
                </td>

                {/* Action View Button */}
                <td className="py-3.5 px-3 text-right">
                  <button
                    onClick={() => onViewBin(bin)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 text-xs font-medium text-slate-200 transition-colors cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-emerald-400" />
                    <span>View</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
