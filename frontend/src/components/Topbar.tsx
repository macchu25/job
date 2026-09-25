import React, { useState, useEffect } from 'react';
import { Menu, Clock, Cpu, Server, Activity, Sliders } from 'lucide-react';
import { StatusBadge } from './StatusBadge';
import { SystemStatus } from '../data/mockData';

interface TopbarProps {
  system: SystemStatus;
  onToggleMobileDrawer: () => void;
  onToggleMode?: () => void;
}

export const Topbar: React.FC<TopbarProps> = ({
  system,
  onToggleMobileDrawer,
  onToggleMode,
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-16 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between bg-[#0e131b]/95 backdrop-blur-md sticky top-0 z-20">
      {/* Left: Mobile Menu & Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobileDrawer}
          className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          title="Open Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-baseline gap-2.5">
          <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white flex items-center gap-2">
            Dashboard
          </h1>
          <span className="hidden xl:inline text-xs text-slate-500 font-medium">
            Overview & Telemetry
          </span>
        </div>
      </div>

      {/* Right: Statuses, Line Name, Mode, Current Time */}
      <div className="flex items-center gap-2 sm:gap-3 text-xs">
        {/* Backend Status */}
        <div className="hidden lg:flex items-center">
          <StatusBadge status={system.backendConnected ? 'CONNECTED' : 'DISCONNECTED'} />
        </div>

        {/* PLC Status */}
        <div className="hidden xl:flex items-center">
          <StatusBadge status={system.plcConnected ? 'CONNECTED' : 'DISCONNECTED'} />
        </div>

        {/* Mode Selector */}
        <button
          onClick={onToggleMode}
          title="Toggle Simulation / PLC Mode (Mock UI)"
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-cyan-800/80 bg-cyan-950/40 text-cyan-400 font-bold hover:bg-cyan-900/40 transition-colors cursor-pointer"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{system.mode}</span>
        </button>

        {/* Line Name */}
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-lg border border-slate-800 bg-[#131922] text-slate-300 font-medium">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          <span className="truncate max-w-[140px] md:max-w-none">{system.lineName}</span>
        </div>

        {/* Live Clock */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-slate-800 bg-[#131922] font-mono text-slate-200">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold">{currentTime || '00:00:00'}</span>
        </div>
      </div>
    </header>
  );
};
