import React, { useState } from 'react';
import { ChartDataPoint } from '../data/mockData';

interface BinFillChartProps {
  data: ChartDataPoint[];
}

export const BinFillChart: React.FC<BinFillChartProps> = ({ data }) => {
  const [hoveredPoint, setHoveredPoint] = useState<ChartDataPoint | null>(data[data.length - 1]);

  // Width: 460, Height: 240
  // Margins: left: 40, right: 20, top: 20, bottom: 40
  // Plot area: X from 40 to 440 (width 400), Y from 20 (100%) to 200 (0%) (height 180)
  const xStart = 50;
  const xEnd = 450;
  const yTop = 20; // 100%
  const yBottom = 200; // 0%
  const plotWidth = xEnd - xStart;
  const plotHeight = yBottom - yTop;

  const getX = (index: number) => {
    if (data.length <= 1) return xStart;
    return xStart + (index / (data.length - 1)) * plotWidth;
  };

  const getY = (val: number) => {
    return yBottom - (val / 100) * plotHeight;
  };

  // Build SVG path strings
  const buildLinePath = (key: 'binA' | 'binB' | 'binC' | 'binD') => {
    return data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[key])}`)
      .join(' ');
  };

  const buildAreaPath = (key: 'binA' | 'binB' | 'binC' | 'binD') => {
    const linePath = data
      .map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d[key])}`)
      .join(' ');
    return `${linePath} L ${getX(data.length - 1)} ${yBottom} L ${getX(0)} ${yBottom} Z`;
  };

  return (
    <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide uppercase">
          BIN FILL LEVEL
        </h3>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-xs font-mono font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300">Bin A</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            <span className="text-slate-300">Bin B</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
            <span className="text-slate-300">Bin C</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-400"></span>
            <span className="text-slate-300">Bin D</span>
          </div>
        </div>
      </div>

      {/* SVG Chart Graphic */}
      <div className="relative w-full h-[290px] pt-1">
        <svg
          className="w-full h-full overflow-visible"
          viewBox="0 0 480 240"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="binAGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="binDGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={xStart} y1={yTop} x2={xEnd} y2={yTop} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={xStart} y1={yTop + plotHeight * 0.25} x2={xEnd} y2={yTop + plotHeight * 0.25} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={xStart} y1={yTop + plotHeight * 0.5} x2={xEnd} y2={yTop + plotHeight * 0.5} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={xStart} y1={yTop + plotHeight * 0.75} x2={xEnd} y2={yTop + plotHeight * 0.75} stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
          <line x1={xStart} y1={yBottom} x2={xEnd} y2={yBottom} stroke="#334155" strokeWidth="1.5" />

          {/* Y-Axis Labels */}
          <text x="38" y={yTop + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="monospace">100%</text>
          <text x="38" y={yTop + plotHeight * 0.25 + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="monospace">75%</text>
          <text x="38" y={yTop + plotHeight * 0.5 + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="monospace">50%</text>
          <text x="38" y={yTop + plotHeight * 0.75 + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="monospace">25%</text>
          <text x="38" y={yBottom + 4} fill="#64748b" fontSize="11" textAnchor="end" fontFamily="monospace">0%</text>

          {/* Area Gradients */}
          <path d={buildAreaPath('binD')} fill="url(#binDGrad)" />
          <path d={buildAreaPath('binA')} fill="url(#binAGrad)" />

          {/* Lines */}
          {/* Bin D (Rose) */}
          <path d={buildLinePath('binD')} fill="none" stroke="#f43f5e" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bin C (Amber) */}
          <path d={buildLinePath('binC')} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bin B (Cyan) */}
          <path d={buildLinePath('binB')} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bin A (Emerald) */}
          <path d={buildLinePath('binA')} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" />

          {/* Data Points on Curves */}
          {data.map((d, i) => (
            <g key={i} className="cursor-pointer" onMouseEnter={() => setHoveredPoint(d)}>
              {/* Vertical Guide on hover */}
              {hoveredPoint?.time === d.time && (
                <line x1={getX(i)} y1={yTop} x2={getX(i)} y2={yBottom} stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />
              )}
              {/* Dots */}
              <circle cx={getX(i)} cy={getY(d.binA)} r="4" fill="#0f172a" stroke="#10b981" strokeWidth="2.5" />
              <circle cx={getX(i)} cy={getY(d.binD)} r="4" fill="#0f172a" stroke="#f43f5e" strokeWidth="2.5" />
            </g>
          ))}

          {/* X-Axis Time Labels */}
          {data.map((d, i) => (
            <text
              key={i}
              x={getX(i)}
              y={yBottom + 20}
              fill="#94a3b8"
              fontSize="11"
              textAnchor="middle"
              fontFamily="monospace"
            >
              {d.time}
            </text>
          ))}
        </svg>

        {/* Live Hover Tooltip Panel */}
        {hoveredPoint && (
          <div className="absolute top-2 right-4 bg-[#141e2b]/95 border border-slate-700/80 rounded-xl p-2.5 shadow-xl text-xs font-mono space-y-1 z-20 pointer-events-none">
            <div className="text-slate-400 border-b border-slate-700/60 pb-1 text-[11px]">
              Time: <span className="text-white font-bold">{hoveredPoint.time}</span>
            </div>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 text-[11px] pt-0.5">
              <span className="text-emerald-400">Bin A: {hoveredPoint.binA}%</span>
              <span className="text-cyan-400">Bin B: {hoveredPoint.binB}%</span>
              <span className="text-amber-400">Bin C: {hoveredPoint.binC}%</span>
              <span className="text-rose-400 font-bold">Bin D: {hoveredPoint.binD}%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
