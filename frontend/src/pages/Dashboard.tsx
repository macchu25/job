import React, { useState } from 'react';
import { KPICard } from '../components/KPICard';
import { ProcessOverview } from '../components/ProcessOverview';
import { BinFillChart } from '../components/BinFillChart';
import { BinStatusTable } from '../components/BinStatusTable';
import { ActivityLog } from '../components/ActivityLog';
import { BinData, MockDataType } from '../data/mockData';
import { X, Box, Info } from 'lucide-react';

interface DashboardPageProps {
  data: MockDataType;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ data }) => {
  const [selectedBin, setSelectedBin] = useState<BinData | null>(null);
  const [isProcessModalOpen, setIsProcessModalOpen] = useState(false);

  // Extract bins
  const binA = data.bins.find((b) => b.id === 'bin-a') || data.bins[0];
  const binB = data.bins.find((b) => b.id === 'bin-b') || data.bins[1];
  const binC = data.bins.find((b) => b.id === 'bin-c') || data.bins[2];
  const binD = data.bins.find((b) => b.id === 'bin-d') || data.bins[3];

  return (
    <div className="space-y-6 max-w-[1600px] w-full mx-auto pb-16 md:pb-6">
      {/* ------------------------------------------------------------- */}
      {/* TOP 4 KPI CARDS */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* CARD 1: TOTAL PRODUCTS */}
        <KPICard
          title="TOTAL PRODUCTS"
          mainValue={data.totalToday}
          subtitle="Today"
        />

        {/* CARD 2: BIN A */}
        <KPICard
          title="BIN A"
          mainValue={`${binA.current} / ${binA.capacity}`}
          secondaryValue={`${binA.fillPercent}%`}
          subtitle="Products"
          fillPercent={binA.fillPercent}
          status={binA.status}
        />

        {/* CARD 3: BIN B */}
        <KPICard
          title="BIN B"
          mainValue={`${binB.current} / ${binB.capacity}`}
          secondaryValue={`${binB.fillPercent}%`}
          subtitle="Products"
          fillPercent={binB.fillPercent}
          status={binB.status}
        />

        {/* CARD 4: BIN C / BIN D (WARNING OR FULL) */}
        <KPICard
          title="BIN C"
          mainValue={`${binC.current} / ${binC.capacity}`}
          secondaryValue={`${binC.fillPercent}%`}
          subtitle="WARNING"
          fillPercent={binC.fillPercent}
          status={binC.status}
        />
      </section>

      {/* ------------------------------------------------------------- */}
      {/* MIDDLE SECTION: PROCESS OVERVIEW (58%) & BIN FILL CHART (42%) */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Process Overview (~58% width on desktop) */}
        <div className="lg:col-span-7">
          <ProcessOverview
            bins={data.bins}
            onViewProcess={() => setIsProcessModalOpen(true)}
          />
        </div>

        {/* Right: Bin Fill Level Chart (~42% width on desktop) */}
        <div className="lg:col-span-5">
          <BinFillChart data={data.chartData} />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM SECTION: BIN STATUS TABLE (65%) & ACTIVITY LOG (35%) */}
      {/* ------------------------------------------------------------- */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
          <BinStatusTable
            bins={data.bins}
            onViewBin={(bin) => setSelectedBin(bin)}
          />
        </div>

        <div className="lg:col-span-4">
          <ActivityLog logs={data.logs} />
        </div>
      </section>

      {/* ------------------------------------------------------------- */}
      {/* MODAL: VIEW BIN DETAILS (UI MOCK) */}
      {/* ------------------------------------------------------------- */}
      {selectedBin && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131922] border border-slate-700 rounded-2xl max-w-md w-full p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedBin(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">{selectedBin.name} Overview</h3>
                <p className="text-xs text-slate-400">Target Product: {selectedBin.productType}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block mb-1">Current Count</span>
                <span className="text-xl font-bold font-mono text-white">{selectedBin.current}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block mb-1">Max Capacity</span>
                <span className="text-xl font-bold font-mono text-slate-300">{selectedBin.capacity}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block mb-1">Remaining</span>
                <span className="text-xl font-bold font-mono text-emerald-400">{selectedBin.remaining}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400 block mb-1">Status</span>
                <span className="text-sm font-bold font-mono text-slate-200">{selectedBin.status}</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedBin(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MODAL: VIEW PROCESS DETAILS (UI MOCK) */}
      {/* ------------------------------------------------------------- */}
      {isProcessModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#131922] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsProcessModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-800 flex items-center justify-center text-cyan-400">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Process Flow Telemetry</h3>
                <p className="text-xs text-slate-400">Automated High-Speed Package Sorting Sequence</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <p className="font-semibold text-emerald-400 mb-1">Sequence Phase:</p>
                <p className="text-slate-400">1. Feeder releases package ➔ 2. Belt transports package at 1.2 m/s ➔ 3. Optical sensor scans QR/Barcode ➔ 4. Pneumatic classifier diverts into Bin A, B, C, or D.</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                <p className="font-semibold text-cyan-400 mb-1">Diverter Response Time:</p>
                <p className="text-slate-400">Average actuation latency is &lt; 45ms. Auto-recovery enabled.</p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsProcessModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
