import React, { useState } from 'react';
import { Eye, Layers, Zap, Box, ArrowRight, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { BinData } from '../data/mockData';

interface ProcessOverviewProps {
  bins: BinData[];
  onViewProcess?: () => void;
}

export const ProcessOverview: React.FC<ProcessOverviewProps> = ({ bins, onViewProcess }) => {
  const [selectedNode, setSelectedNode] = useState<string | null>('BIN A');

  // Find bins
  const binA = bins.find((b) => b.name === 'BIN A');
  const binB = bins.find((b) => b.name === 'BIN B');
  const binC = bins.find((b) => b.name === 'BIN C');
  const binD = bins.find((b) => b.name === 'BIN D');

  return (
    <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 z-10">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <h3 className="text-xs sm:text-sm font-bold text-slate-200 tracking-wide uppercase">
            LIVE SORTING PROCESS
          </h3>
          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono">
            FEEDER ACTIVE
          </span>
        </div>

        <button
          onClick={onViewProcess}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 active:bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 transition-colors cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-400" />
          <span>VIEW PROCESS</span>
        </button>
      </div>

      {/* Schematic Flow Diagram Canvas */}
      <div className="relative w-full h-[320px] rounded-xl border border-slate-800/80 bg-[#0a0e14] p-4 flex flex-col justify-between overflow-hidden">
        {/* Subtle Industrial Grid Background */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* SVG Flow Connections */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="activePathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#34d399" />
            </linearGradient>
            <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#334155" />
            </marker>
            <marker id="arrowActive" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Main Conveyor Spine Line */}
          {/* Input -> Conveyor */}
          <line x1="85" y1="160" x2="160" y2="160" stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />
          
          {/* Conveyor -> Sensor */}
          <line x1="240" y1="160" x2="310" y2="160" stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />

          {/* Sensor -> Classifier */}
          <line x1="390" y1="160" x2="470" y2="160" stroke="#10b981" strokeWidth="3" strokeDasharray="4 2" />

          {/* Classifier Branches into 4 Bins */}
          {/* Route to Bin A (Highlighted Active Route) */}
          <path
            d="M 550 160 C 585 160, 595 55, 640 55"
            fill="none"
            stroke="url(#activePathGrad)"
            strokeWidth="3.5"
            strokeDasharray="6 3"
          />

          {/* Route to Bin B */}
          <path
            d="M 550 160 C 585 160, 595 125, 640 125"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
          />

          {/* Route to Bin C */}
          <path
            d="M 550 160 C 585 160, 595 195, 640 195"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
          />

          {/* Route to Bin D */}
          <path
            d="M 550 160 C 585 160, 595 265, 640 265"
            fill="none"
            stroke="#1e293b"
            strokeWidth="2"
          />
        </svg>

        {/* Nodes Layer Layout (Responsive Flex & Positioning) */}
        <div className="relative w-full h-full flex items-center justify-between z-10 px-1 sm:px-3">
          {/* NODE 1: INPUT */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 p-2.5 rounded-xl bg-slate-900 border border-slate-700/80 shadow-md flex flex-col items-center text-center">
              <div className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400 mb-1">
                <Box className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">INPUT</span>
              <span className="text-[9px] text-emerald-400 font-mono mt-0.5">FEED: OK</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1 font-mono">Infeed</span>
          </div>

          {/* Direction Arrow */}
          <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 hidden sm:block" />

          {/* NODE 2: CONVEYOR */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 p-2.5 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-md flex flex-col items-center text-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/80 flex items-center justify-center text-emerald-400 mb-1">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">CONVEYOR</span>
              <span className="text-[9px] text-emerald-400 font-mono mt-0.5">1.2 m/s</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1 font-mono">Main Belt</span>
          </div>

          {/* Direction Arrow */}
          <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 hidden sm:block" />

          {/* NODE 3: SENSOR */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-20 p-2.5 rounded-xl bg-slate-900 border border-emerald-500/50 shadow-md flex flex-col items-center text-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-950/80 flex items-center justify-center text-emerald-400 mb-1">
                <Zap className="w-4 h-4 animate-pulse" />
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">SENSOR</span>
              <span className="text-[9px] text-cyan-300 font-mono mt-0.5">DETECTED</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1 font-mono">Optical / RFID</span>
          </div>

          {/* Direction Arrow */}
          <ArrowRight className="w-4 h-4 text-emerald-500 shrink-0 hidden sm:block" />

          {/* NODE 4: CLASSIFIER / DIVERTER */}
          <div className="flex flex-col items-center">
            <div className="w-16 sm:w-22 p-2.5 rounded-xl bg-slate-900 border-2 border-emerald-500 shadow-lg shadow-emerald-950 flex flex-col items-center text-center">
              <div className="w-7 h-7 rounded-lg bg-emerald-900/60 flex items-center justify-center text-emerald-400 mb-1">
                <Box className="w-4 h-4" />
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider">CLASSIFIER</span>
              <span className="text-[9px] text-emerald-400 font-mono mt-0.5 font-bold">ROUTE ➔ A</span>
            </div>
            <span className="text-[9px] text-slate-500 mt-1 font-mono">Pneumatic Gate</span>
          </div>

          {/* NODE 5: 4 OUTPUT BINS */}
          <div className="flex flex-col gap-2 shrink-0">
            {/* Bin A (Active Target) */}
            <div
              onClick={() => setSelectedNode('BIN A')}
              className="w-24 sm:w-28 px-2.5 py-1.5 rounded-lg bg-emerald-950/90 border-2 border-emerald-400 shadow-md flex items-center justify-between cursor-pointer"
            >
              <div>
                <div className="text-[11px] font-bold text-emerald-300 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  BIN A
                </div>
                <div className="text-[9px] text-slate-400 font-mono">{binA?.productType || 'Type A'}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-white">
                  {binA ? `${binA.current}/${binA.capacity}` : '35/50'}
                </div>
                <div className="text-[9px] text-emerald-400 font-mono font-semibold">
                  {binA?.fillPercent || 70}%
                </div>
              </div>
            </div>

            {/* Bin B */}
            <div
              onClick={() => setSelectedNode('BIN B')}
              className="w-24 sm:w-28 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 shadow-sm flex items-center justify-between cursor-pointer hover:border-slate-500"
            >
              <div>
                <div className="text-[11px] font-semibold text-slate-300">BIN B</div>
                <div className="text-[9px] text-slate-500 font-mono">{binB?.productType || 'Type B'}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-slate-300">
                  {binB ? `${binB.current}/${binB.capacity}` : '12/50'}
                </div>
                <div className="text-[9px] text-slate-400 font-mono font-medium">
                  {binB?.fillPercent || 24}%
                </div>
              </div>
            </div>

            {/* Bin C */}
            <div
              onClick={() => setSelectedNode('BIN C')}
              className="w-24 sm:w-28 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-amber-800/80 shadow-sm flex items-center justify-between cursor-pointer hover:border-amber-600"
            >
              <div>
                <div className="text-[11px] font-semibold text-amber-300 flex items-center gap-1">
                  <AlertTriangle className="w-2.5 h-2.5 text-amber-400" />
                  BIN C
                </div>
                <div className="text-[9px] text-slate-500 font-mono">{binC?.productType || 'Type C'}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-amber-300">
                  {binC ? `${binC.current}/${binC.capacity}` : '48/50'}
                </div>
                <div className="text-[9px] text-amber-400 font-mono font-bold">
                  {binC?.fillPercent || 96}%
                </div>
              </div>
            </div>

            {/* Bin D */}
            <div
              onClick={() => setSelectedNode('BIN D')}
              className="w-24 sm:w-28 px-2.5 py-1.5 rounded-lg bg-slate-900/90 border border-rose-800/80 shadow-sm flex items-center justify-between cursor-pointer hover:border-rose-600"
            >
              <div>
                <div className="text-[11px] font-semibold text-rose-400 flex items-center gap-1">
                  <AlertCircle className="w-2.5 h-2.5 text-rose-400" />
                  BIN D
                </div>
                <div className="text-[9px] text-slate-500 font-mono">{binD?.productType || 'Type D'}</div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono text-rose-300">
                  {binD ? `${binD.current}/${binD.capacity}` : '50/50'}
                </div>
                <div className="text-[9px] text-rose-400 font-mono font-bold">
                  {binD?.fillPercent || 100}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Line Status Indicator Bar */}
        <div className="mt-2 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="text-emerald-400 font-semibold">ACTIVE ROUTE:</span>
            <span>INPUT ➔ SENSOR ➔ CLASSIFIER ➔ BIN A</span>
          </div>
          <div className="hidden sm:inline text-slate-500">
            Diverter State: <span className="text-slate-300">GATE_1_ENGAGED</span>
          </div>
        </div>
      </div>
    </div>
  );
};
