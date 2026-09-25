import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Grid,
  Users,
  Calendar,
  MessageSquare,
  Folder,
  Settings,
  LogOut,
  Menu,
  Maximize2,
  RotateCw,
  Pause,
  Play,
  ChevronDown,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Zap,
  Activity,
  Layers,
  ArrowDown,
  Server
} from 'lucide-react';

interface HealthResponse {
  status: string;
}

interface TableRowData {
  id: string;
  date: string;
  conveyorAvgSpeed: number;
  conveyorMaxSpeed: number;
  cartonAvgSpeed: number;
  cartonMaxSpeed: number;
  shiftAchievement: number;
}

const mockTableData: TableRowData[] = [
  {
    id: '1',
    date: '2024-05-05 10:00',
    conveyorAvgSpeed: 282,
    conveyorMaxSpeed: 325,
    cartonAvgSpeed: 54,
    cartonMaxSpeed: 79,
    shiftAchievement: 102,
  },
  {
    id: '2',
    date: '2024-05-05 09:00',
    conveyorAvgSpeed: 181,
    conveyorMaxSpeed: 329,
    cartonAvgSpeed: 32,
    cartonMaxSpeed: 100,
    shiftAchievement: 99,
  },
  {
    id: '3',
    date: '2024-05-05 08:00',
    conveyorAvgSpeed: 80,
    conveyorMaxSpeed: 222,
    cartonAvgSpeed: 33,
    cartonMaxSpeed: 193,
    shiftAchievement: 95,
  },
  {
    id: '4',
    date: '2024-05-05 07:00',
    conveyorAvgSpeed: 295,
    conveyorMaxSpeed: 340,
    cartonAvgSpeed: 58,
    cartonMaxSpeed: 82,
    shiftAchievement: 104,
  },
  {
    id: '5',
    date: '2024-05-05 06:00',
    conveyorAvgSpeed: 210,
    conveyorMaxSpeed: 310,
    cartonAvgSpeed: 45,
    cartonMaxSpeed: 90,
    shiftAchievement: 97,
  }
];

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'grid' | 'users' | 'calendar' | 'messages' | 'folder'>('dashboard');
  
  // Controls state
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedLine, setSelectedLine] = useState('Carton Production Line');
  const [selectedTimeRange, setSelectedTimeRange] = useState('May 1 2024 10:00 - Now');
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  // Backend Health State
  const [backendStatus, setBackendStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [healthData, setHealthData] = useState<HealthResponse | null>(null);
  const [lastChecked, setLastChecked] = useState<string>('');
  const [showHealthModal, setShowHealthModal] = useState(false);

  const checkBackendHealth = async () => {
    setBackendStatus('loading');
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
    
    try {
      const response = await fetch(`${apiUrl}/api/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: HealthResponse = await response.json();
      if (data.status === 'ok') {
        setHealthData(data);
        setBackendStatus('connected');
      } else {
        setBackendStatus('error');
      }
    } catch (err) {
      console.error('Failed to connect to backend:', err);
      setBackendStatus('error');
    } finally {
      setLastChecked(new Date().toLocaleTimeString());
    }
  };

  useEffect(() => {
    checkBackendHealth();
    const interval = setInterval(() => {
      if (!isPaused) {
        checkBackendHealth();
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#090d12] text-slate-100 flex font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* ------------------------------------------------------------- */}
      {/* LEFT SIDEBAR NAVIGATION */}
      {/* ------------------------------------------------------------- */}
      <aside className="w-16 sm:w-20 bg-[#0e131b] border-r border-slate-800/80 flex flex-col items-center py-5 justify-between shrink-0 z-20">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Brand Logo Icon */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/20 cursor-pointer hover:scale-105 transition-transform">
            <svg className="w-6 h-6 text-slate-950 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Main Navigation Icons */}
          <nav className="flex flex-col gap-3 w-full px-3">
            <button
              onClick={() => setActiveTab('dashboard')}
              title="Dashboard"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('grid')}
              title="Production Grid"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                activeTab === 'grid'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('users')}
              title="Operators"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Users className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('calendar')}
              title="Schedule"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                activeTab === 'calendar'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Calendar className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              title="Logs & Alerts"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                activeTab === 'messages'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('folder')}
              title="Reports & Files"
              className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                activeTab === 'folder'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-md shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Folder className="w-5 h-5" />
            </button>
          </nav>
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-col gap-3 w-full px-3">
          <button
            onClick={() => setShowHealthModal(true)}
            title="System Diagnostics & Settings"
            className="w-full aspect-square rounded-xl flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-slate-800/50 transition-all cursor-pointer"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            title="Exit / Logout"
            className="w-full aspect-square rounded-xl flex items-center justify-center text-slate-500 hover:text-rose-400 hover:bg-slate-800/50 transition-all cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MAIN CONTAINER */}
      {/* ------------------------------------------------------------- */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0b0f16]">
        {/* TOP HEADER BAR */}
        <header className="h-16 border-b border-slate-800/80 px-4 sm:px-6 flex items-center justify-between bg-[#0e131b]/90 backdrop-blur-md sticky top-0 z-30">
          {/* Title & Hamburger Menu */}
          <div className="flex items-center gap-3">
            <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
              Dashboard
            </h1>
          </div>

          {/* Controls Right */}
          <div className="flex items-center gap-3 text-xs sm:text-sm">
            {/* Live Backend Health Status Pill */}
            <button
              onClick={() => setShowHealthModal(true)}
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border bg-slate-900/90 border-slate-700/80 text-slate-300 hover:border-emerald-500/50 transition-all cursor-pointer"
            >
              {backendStatus === 'connected' ? (
                <>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-emerald-400 font-semibold text-xs">Backend Connected</span>
                </>
              ) : backendStatus === 'loading' ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" />
                  <span className="text-amber-300 text-xs">Connecting...</span>
                </>
              ) : (
                <>
                  <XCircle className="w-3.5 h-3.5 text-rose-400" />
                  <span className="text-rose-400 text-xs">Disconnected</span>
                </>
              )}
            </button>

            {/* Date Range Dropdown */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141a24] border border-slate-800 rounded-lg text-slate-300 font-medium cursor-pointer hover:border-slate-700">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="hidden lg:inline">{selectedTimeRange}</span>
                <span className="lg:hidden">May 1 - Now</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </div>
            </div>

            {/* Line Selector Dropdown */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141a24] border border-slate-800 rounded-lg text-slate-300 font-medium cursor-pointer hover:border-slate-700">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">{selectedLine}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 ml-1" />
              </div>
            </div>

            {/* Action Buttons: Fullscreen, Refresh, Pause */}
            <div className="flex items-center gap-1 bg-[#141a24] p-1 border border-slate-800 rounded-lg">
              <button
                onClick={toggleFullscreen}
                title="Toggle Fullscreen"
                className="p-1.5 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <button
                onClick={checkBackendHealth}
                title="Refresh Data"
                className="p-1.5 text-slate-400 hover:text-emerald-400 rounded hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <RotateCw className={`w-4 h-4 ${backendStatus === 'loading' ? 'animate-spin text-emerald-400' : ''}`} />
              </button>
              <button
                onClick={() => setIsPaused(!isPaused)}
                title={isPaused ? "Resume Live Stream" : "Pause Live Stream"}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  isPaused ? 'text-amber-400 hover:bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </header>

        {/* DASHBOARD BODY */}
        <main className="flex-1 p-4 sm:p-6 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* ------------------------------------------------------------- */}
          {/* TOP 4 KPI CARDS BAR */}
          {/* ------------------------------------------------------------- */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Card 1: Utilization */}
            <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-emerald-500/30 transition-all group">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight mb-2 group-hover:scale-105 transition-transform duration-200">
                75.1%
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Utilization
              </div>
            </div>

            {/* Card 2: Performance */}
            <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-emerald-500/30 transition-all group">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight mb-2 group-hover:scale-105 transition-transform duration-200">
                98.5%
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Performance
              </div>
            </div>

            {/* Card 3: Availability */}
            <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-emerald-500/30 transition-all group">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight mb-2 group-hover:scale-105 transition-transform duration-200">
                78.6%
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                Availability
              </div>
            </div>

            {/* Card 4: OEE */}
            <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-lg hover:border-emerald-500/30 transition-all group">
              <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 tracking-tight mb-2 group-hover:scale-105 transition-transform duration-200">
                84.3%
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 uppercase tracking-wider">
                OEE
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* MIDDLE ROW: MACHINE ENERGY CONSUMPTION & MACHINE UPTIME CHART */}
          {/* ------------------------------------------------------------- */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Box: Machine Energy Consumption (kWh) / Plant Diagram */}
            <div className="lg:col-span-6 bg-[#131922] border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 z-10">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
                  Machine Energy Consumption (kWh)
                </h3>
                <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-mono">
                  LIVE FLOOR MAP
                </span>
              </div>

              {/* Plant Image Container with Floating Energy Node Hotspots */}
              <div className="relative w-full h-72 sm:h-80 rounded-xl overflow-hidden border border-slate-800/80 bg-slate-950 flex items-center justify-center">
                <img
                  src="/isometric_sorting_plant.jpg"
                  alt="Machine Energy Plant Layout"
                  className="w-full h-full object-cover object-center opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                />
                
                {/* Dark Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d12] via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Hotspot 1: Conveyor */}
                <div
                  onMouseEnter={() => setActiveHotspot('conveyor')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  className="absolute top-[52%] left-[18%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative p-1 bg-slate-900/90 border border-emerald-500/60 rounded-full shadow-lg">
                      <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="mt-1 bg-slate-900/95 border border-slate-700/80 rounded-lg px-2 py-1 text-center backdrop-blur-md shadow-2xl">
                      <div className="text-[12px] font-bold text-white font-mono leading-none">15.76</div>
                      <div className="text-[9px] text-slate-400 leading-tight">kWh/t<br/><span className="text-emerald-400 font-medium">Conveyor</span></div>
                    </div>
                  </div>
                </div>

                {/* Hotspot 2: Carton Sorter */}
                <div
                  onMouseEnter={() => setActiveHotspot('carton')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  className="absolute top-[28%] left-[45%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative p-1 bg-slate-900/90 border border-emerald-500/60 rounded-full shadow-lg">
                      <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="mt-1 bg-slate-900/95 border border-slate-700/80 rounded-lg px-2 py-1 text-center backdrop-blur-md shadow-2xl">
                      <div className="text-[12px] font-bold text-white font-mono leading-none">78.59</div>
                      <div className="text-[9px] text-slate-400 leading-tight">kWh/t<br/><span className="text-emerald-400 font-medium">Carton</span></div>
                    </div>
                  </div>
                </div>

                {/* Hotspot 3: Mixer / Sorting Arm */}
                <div
                  onMouseEnter={() => setActiveHotspot('mixer')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  className="absolute top-[65%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative p-1 bg-slate-900/90 border border-emerald-500/60 rounded-full shadow-lg">
                      <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="mt-1 bg-slate-900/95 border border-slate-700/80 rounded-lg px-2 py-1 text-center backdrop-blur-md shadow-2xl">
                      <div className="text-[12px] font-bold text-white font-mono leading-none">91.64</div>
                      <div className="text-[9px] text-slate-400 leading-tight">kWh/t<br/><span className="text-emerald-400 font-medium">Mixer</span></div>
                    </div>
                  </div>
                </div>

                {/* Hotspot 4: Soap / Dest Sorter */}
                <div
                  onMouseEnter={() => setActiveHotspot('soap')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  className="absolute top-[42%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative p-1 bg-slate-900/90 border border-emerald-500/60 rounded-full shadow-lg">
                      <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="mt-1 bg-slate-900/95 border border-slate-700/80 rounded-lg px-2 py-1 text-center backdrop-blur-md shadow-2xl">
                      <div className="text-[12px] font-bold text-white font-mono leading-none">16.10</div>
                      <div className="text-[9px] text-slate-400 leading-tight">kWh/t<br/><span className="text-emerald-400 font-medium">Soap</span></div>
                    </div>
                  </div>
                </div>

                {/* Hotspot 5: Machine Main Base */}
                <div
                  onMouseEnter={() => setActiveHotspot('machine')}
                  onMouseLeave={() => setActiveHotspot(null)}
                  className="absolute top-[78%] left-[28%] transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-110 z-10"
                >
                  <div className="flex flex-col items-center">
                    <div className="relative p-1 bg-slate-900/90 border border-emerald-500/60 rounded-full shadow-lg">
                      <Zap className="w-4 h-4 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="mt-1 bg-slate-900/95 border border-slate-700/80 rounded-lg px-2 py-1 text-center backdrop-blur-md shadow-2xl">
                      <div className="text-[12px] font-bold text-white font-mono leading-none">14.97</div>
                      <div className="text-[9px] text-slate-400 leading-tight">kWh/t<br/><span className="text-emerald-400 font-medium">Machine</span></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Box: Machine Uptime Trend Chart */}
            <div className="lg:col-span-6 bg-[#131922] border border-slate-800/90 rounded-2xl p-5 flex flex-col justify-between shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xs sm:text-sm font-semibold text-slate-300 tracking-wide">
                  Machine uptime
                </h3>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-slate-400">Target Line</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="text-slate-400">Actual Line</span>
                  </div>
                </div>
              </div>

              {/* Chart Container */}
              <div className="relative w-full h-72 sm:h-80 flex flex-col justify-between pt-2">
                {/* SVG Graph rendering smooth curves matching reference */}
                <svg className="w-full h-full overflow-visible" viewBox="0 0 500 240" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="amberGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Horizontal Grid lines */}
                  <line x1="30" y1="30" x2="480" y2="30" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="80" x2="480" y2="80" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="130" x2="480" y2="130" stroke="#1e293b" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="30" y1="180" x2="480" y2="180" stroke="#1e293b" strokeWidth="1" />

                  {/* Y Axis Labels */}
                  <text x="15" y="34" fill="#64748b" fontSize="11" textAnchor="end">100</text>
                  <text x="15" y="84" fill="#64748b" fontSize="11" textAnchor="end">75</text>
                  <text x="15" y="134" fill="#64748b" fontSize="11" textAnchor="end">50</text>
                  <text x="15" y="184" fill="#64748b" fontSize="11" textAnchor="end">25</text>
                  <text x="15" y="215" fill="#64748b" fontSize="11" textAnchor="end">0</text>

                  {/* Green Curve Area & Path */}
                  <path
                    d="M 40 120 C 70 140 100 135 130 110 C 160 85 190 100 220 125 C 250 150 280 160 310 100 C 340 30 360 30 380 90 C 400 115 430 100 470 130 L 470 180 L 40 180 Z"
                    fill="url(#greenGrad)"
                  />
                  <path
                    d="M 40 120 C 70 140 100 135 130 110 C 160 85 190 100 220 125 C 250 150 280 160 310 100 C 340 30 360 30 380 90 C 400 115 430 100 470 130"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {/* Amber Curve Area & Path */}
                  <path
                    d="M 40 150 C 70 155 100 145 130 155 C 160 165 190 160 220 140 C 250 120 280 105 310 115 C 340 125 360 150 380 165 C 400 175 430 165 470 150 L 470 180 L 40 180 Z"
                    fill="url(#amberGrad)"
                  />
                  <path
                    d="M 40 150 C 70 155 100 145 130 155 C 160 165 190 160 220 140 C 250 120 280 105 310 115 C 340 125 360 150 380 165 C 400 175 430 165 470 150"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Highlight Peak Dot on Green Curve (May 9) */}
                  <circle cx="352" cy="34" r="6" fill="#ffffff" stroke="#22c55e" strokeWidth="4" />

                  {/* X Axis Date Labels */}
                  <g fill="#94a3b8" fontSize="11" textAnchor="middle">
                    <text x="40" y="210">May 5</text>
                    <text x="88" y="210">May 6</text>
                    <text x="135" y="210">May 7</text>
                    <text x="182" y="210">May 8</text>
                    <text x="230" y="210">May 9</text>
                    <text x="278" y="210">May 10</text>
                    <text x="325" y="210">May 11</text>
                    <text x="372" y="210">May 12</text>
                    <text x="420" y="210">May 13</text>
                    <text x="470" y="210">May 14</text>
                  </g>
                </svg>

                {/* Floating Peak Tooltip Callout matching reference (`99% May 9`) */}
                <div className="absolute top-[8%] left-[64%] transform -translate-x-1/2 bg-[#1b2738] border border-blue-500/50 rounded-lg px-3 py-1.5 shadow-2xl flex flex-col items-center">
                  <span className="text-sm font-bold text-white leading-tight">99%</span>
                  <span className="text-[10px] text-blue-300 font-medium">May 9</span>
                  <div className="w-2 h-2 bg-[#1b2738] border-r border-b border-blue-500/50 transform rotate-45 -mb-2 mt-0.5"></div>
                </div>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* BOTTOM DATA TABLE SECTION */}
          {/* ------------------------------------------------------------- */}
          <div className="bg-[#131922] border border-slate-800/90 rounded-2xl p-5 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-800 text-emerald-400 font-semibold tracking-wide">
                    <th className="py-3 px-4 flex items-center gap-1 cursor-pointer hover:text-emerald-300">
                      Date <ArrowDown className="w-3.5 h-3.5" />
                    </th>
                    <th className="py-3 px-4 text-center">Conveyor Avg Speed</th>
                    <th className="py-3 px-4 text-center">Conveyor Max Speed</th>
                    <th className="py-3 px-4 text-center flex items-center justify-center gap-1 cursor-pointer hover:text-emerald-300">
                      Carton Avg Speed <ArrowDown className="w-3.5 h-3.5" />
                    </th>
                    <th className="py-3 px-4 text-center">
                      <span className="inline-flex items-center gap-1 cursor-pointer hover:text-emerald-300">
                        Carton Max Speed <ArrowDown className="w-3.5 h-3.5" />
                      </span>
                    </th>
                    <th className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 cursor-pointer hover:text-emerald-300">
                        Shift achievement <ArrowDown className="w-3.5 h-3.5" />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-medium">
                  {mockTableData.map((row) => (
                    <tr
                      key={row.id}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    >
                      <td className="py-3.5 px-4 font-mono text-cyan-400 group-hover:underline">
                        {row.date}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-300 font-mono">
                        {row.conveyorAvgSpeed}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-300 font-mono">
                        {row.conveyorMaxSpeed}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-300 font-mono">
                        {row.cartonAvgSpeed}
                      </td>
                      <td className="py-3.5 px-4 text-center text-slate-300 font-mono">
                        {row.cartonMaxSpeed}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-200">
                        {row.shiftAchievement}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* SYSTEM DIAGNOSTICS & BACKEND HEALTH MODAL */}
      {/* ------------------------------------------------------------- */}
      {showHealthModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#131922] border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowHealthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <XCircle className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-400">
                <Server className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Chẩn Đoán Kết Nối System API</h3>
                <p className="text-xs text-slate-400">Hệ thống phân loại hàng Express Backend Connection</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">Trạng Thái Backend:</span>
                <span className={`font-semibold flex items-center gap-1.5 ${backendStatus === 'connected' ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {backendStatus === 'connected' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" /> Backend Connected
                    </>
                  ) : (
                    <>
                      <XCircle className="w-4 h-4" /> Disconnected
                    </>
                  )}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-2 text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">API Endpoint:</span>
                  <span>/api/health</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Backend Host:</span>
                  <span>http://localhost:3001</span>
                </div>
                {healthData && (
                  <div className="flex justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-slate-500">Response Payload:</span>
                    <span className="text-emerald-400 font-bold">{JSON.stringify(healthData)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-[11px] text-slate-500">Last checked: {lastChecked || 'N/A'}</span>
              <button
                onClick={checkBackendHealth}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-xs font-semibold text-slate-950 flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${backendStatus === 'loading' ? 'animate-spin' : ''}`} />
                Kiểm tra lại
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
