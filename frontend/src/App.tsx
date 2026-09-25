import React, { useState, useEffect } from 'react';
import { Sidebar, NavTab } from './components/Sidebar';
import { Topbar } from './components/Topbar';
import { DashboardPage } from './pages/Dashboard';
import { mockSortingData, MockDataType } from './data/mockData';

export default function App() {
  const [data, setData] = useState<MockDataType>(mockSortingData);
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);

  // Health check to actual backend (port 3001)
  useEffect(() => {
    const checkBackend = async () => {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      try {
        const res = await fetch(`${apiUrl}/api/health`);
        if (res.ok) {
          const json = await res.json();
          if (json.status === 'ok') {
            setData((prev) => ({
              ...prev,
              system: { ...prev.system, backendConnected: true },
            }));
            return;
          }
        }
        setData((prev) => ({
          ...prev,
          system: { ...prev.system, backendConnected: false },
        }));
      } catch {
        setData((prev) => ({
          ...prev,
          system: { ...prev.system, backendConnected: false },
        }));
      }
    };

    checkBackend();
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleMode = () => {
    setData((prev) => ({
      ...prev,
      system: {
        ...prev.system,
        mode: prev.system.mode === 'SIMULATION' ? 'PLC' : 'SIMULATION',
      },
    }));
  };

  return (
    <div className="min-h-screen bg-[#090d12] text-slate-100 flex font-sans selection:bg-emerald-500 selection:text-slate-950 overflow-x-hidden">
      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        isMobileDrawerOpen={isMobileDrawerOpen}
        onCloseMobileDrawer={() => setIsMobileDrawerOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0b0f16]">
        {/* Top Navigation Bar */}
        <Topbar
          system={data.system}
          onToggleMobileDrawer={() => setIsMobileDrawerOpen(true)}
          onToggleMode={handleToggleMode}
        />

        {/* Dynamic Page Views */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {activeTab === 'dashboard' && <DashboardPage data={data} />}

          {activeTab !== 'dashboard' && (
            <div className="bg-[#131922] border border-slate-800 rounded-2xl p-10 text-center max-w-xl mx-auto my-12 shadow-xl space-y-3">
              <h2 className="text-xl font-bold text-white capitalize">{activeTab} Module</h2>
              <p className="text-sm text-slate-400">
                Giao diện quản lý chi tiết {activeTab} sẽ được mở rộng trong các giai đoạn tiếp theo.
              </p>
              <button
                onClick={() => setActiveTab('dashboard')}
                className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-bold text-xs transition-colors cursor-pointer"
              >
                Trở về Dashboard
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
