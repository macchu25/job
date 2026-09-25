import React from 'react';
import {
  LayoutDashboard,
  Workflow,
  Boxes,
  BarChart3,
  FileText,
  Settings,
  X
} from 'lucide-react';

export type NavTab = 'dashboard' | 'process' | 'bins' | 'statistics' | 'logs' | 'settings';

interface SidebarProps {
  activeTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  isMobileDrawerOpen: boolean;
  onCloseMobileDrawer: () => void;
}

interface MenuItem {
  id: NavTab;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'process', label: 'Process', icon: Workflow },
  { id: 'bins', label: 'Bins', icon: Boxes },
  { id: 'statistics', label: 'Statistics', icon: BarChart3 },
  { id: 'logs', label: 'Logs', icon: FileText },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isMobileDrawerOpen,
  onCloseMobileDrawer,
}) => {
  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* DESKTOP SIDEBAR (Icon + Tooltip on Hover) */}
      {/* ------------------------------------------------------------- */}
      <aside className="hidden md:flex w-16 lg:w-20 bg-[#0e131b] border-r border-slate-800/80 flex-col items-center py-5 justify-between shrink-0 z-20">
        <div className="flex flex-col items-center gap-7 w-full">
          {/* Logo */}
          <div
            title="Industrial Sorting HMI"
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/10 cursor-pointer hover:scale-105 transition-transform"
          >
            <Boxes className="w-5 h-5 text-slate-950 font-bold" />
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-2.5 w-full px-2.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <div key={item.id} className="relative group flex items-center justify-center">
                  <button
                    onClick={() => onSelectTab(item.id)}
                    className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-950'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>

                  {/* Tooltip on hover */}
                  <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-slate-200 text-xs font-medium rounded-md whitespace-nowrap border border-slate-700/80 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50">
                    {item.label}
                  </div>
                </div>
              );
            })}
          </nav>
        </div>

        {/* Bottom Settings */}
        <div className="flex flex-col gap-2.5 w-full px-2.5">
          <div className="relative group flex items-center justify-center">
            <button
              onClick={() => onSelectTab('settings')}
              className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
              }`}
            >
              <Settings className="w-5 h-5" />
            </button>
            <div className="absolute left-full ml-3 px-2.5 py-1 bg-slate-900 text-slate-200 text-xs font-medium rounded-md whitespace-nowrap border border-slate-700/80 shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-150 z-50">
              Settings
            </div>
          </div>
        </div>
      </aside>

      {/* ------------------------------------------------------------- */}
      {/* MOBILE DRAWER OVERLAY */}
      {/* ------------------------------------------------------------- */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-slate-950/80 backdrop-blur-sm flex">
          <div className="w-64 bg-[#0e131b] border-r border-slate-800 h-full flex flex-col justify-between p-5 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                    <Boxes className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-white">SORTING HMI</h2>
                    <p className="text-[10px] text-slate-400">Package Control</p>
                  </div>
                </div>
                <button
                  onClick={onCloseMobileDrawer}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-5 flex flex-col gap-1.5">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        onCloseMobileDrawer();
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                          : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  onSelectTab('settings');
                  onCloseMobileDrawer();
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={onCloseMobileDrawer} />
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* ------------------------------------------------------------- */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 h-14 bg-[#0e131b] border-t border-slate-800 flex items-center justify-around z-30 px-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-lg text-[10px] font-medium transition-colors ${
                isActive ? 'text-emerald-400' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-4 h-4 mb-0.5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
