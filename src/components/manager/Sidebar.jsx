import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  featuredPlatforms, 
  customPlatformDef 
} from '../../data/platforms';
import { PlatformLogo } from './PlatformLogo';
import { 
  Plus, 
  Layers, 
  Star, 
  ChevronDown, 
  ChevronRight, 
  ChevronLeft,
  Settings, 
  Globe, 
  ShieldCheck,
  Flame
} from 'lucide-react';

export const Sidebar = () => {
  const { 
    accounts, 
    filterProvider, 
    setFilterProvider, 
    openAccountTab, 
    activeTabId, 
    setActiveTabId, 
    openAddModal, 
    setIsSettingsModalOpen,
    isSidebarOpen,
    toggleSidebar
  } = useManager();

  // Accordion state for dropdowns
  const [openSections, setOpenSections] = useState({
    featured: true,
    custom: true
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const favoriteCount = accounts.filter(a => a.favorite).length;

  if (!isSidebarOpen) return null;

  return (
    <aside className="w-68 bg-[#7A1F1F] text-rose-100 flex flex-col justify-between shrink-0 border-r border-[#631818] select-none h-screen transition-all duration-200">
      
      {/* Top Header & Navigation */}
      <div className="flex flex-col flex-1 min-h-0 overflow-y-auto">
        
        {/* Brand Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-[#8C2727] shrink-0">
          <div 
            onClick={() => setActiveTabId('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group flex-1 min-w-0"
          >
            <div className="w-8 h-8 rounded-xl bg-white text-[#7A1F1F] flex items-center justify-center shadow-md group-hover:scale-105 transition-transform shrink-0 border border-rose-100">
              <span className="font-black text-lg text-[#7A1F1F] leading-none select-none">
                Z
              </span>
            </div>
            <div className="min-w-0">
              <span className="font-extrabold text-sm text-white tracking-tight block leading-tight truncate">
                Zea App Manager
              </span>
              <span className="text-[10px] text-rose-300 font-medium block truncate">
                Multi-Account AI Suite
              </span>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-1.5 rounded-lg text-rose-300 hover:text-white hover:bg-[#8C2727] transition-colors shrink-0 ml-1 cursor-pointer"
            title="Sembunyikan Sidebar"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

        {/* Action: Add Account Primary Button */}
        <div className="p-3.5 shrink-0">
          <button
            onClick={() => openAddModal()}
            className="w-full py-2.5 px-3.5 rounded-xl bg-[#9B2B2B] hover:bg-[#B83B3B] text-white font-bold text-xs shadow-md shadow-black/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] border border-[#B83B3B]/60"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Akun Baru</span>
          </button>
        </div>

        {/* Overview Navigation */}
        <div className="px-3 pb-2 space-y-1 shrink-0">
          <button
            onClick={() => {
              setFilterProvider('all');
              setActiveTabId('dashboard');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filterProvider === 'all' && activeTabId === 'dashboard'
                ? 'bg-[#A32E2E] text-white'
                : 'text-rose-200/80 hover:bg-[#8C2727] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-rose-300" />
              <span>Semua Akun</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20 text-rose-200 font-bold">
              {accounts.length}
            </span>
          </button>

          <button
            onClick={() => {
              setFilterProvider('favorites');
              setActiveTabId('dashboard');
            }}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-colors ${
              filterProvider === 'favorites' && activeTabId === 'dashboard'
                ? 'bg-[#A32E2E] text-white'
                : 'text-rose-200/80 hover:bg-[#8C2727] hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Star className="w-4 h-4 text-amber-300 fill-amber-300/30" />
              <span>Akun Favorit</span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/20 text-rose-200 font-bold">
              {favoriteCount}
            </span>
          </button>
        </div>

        {/* 1. KATEGORI: PLATFORM UNGGULAN (DROPDOWN ACCORDION) */}
        <div className="pt-2">
          <button
            onClick={() => toggleSection('featured')}
            className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-[#8C2727]/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Flame className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] font-extrabold text-white tracking-wider uppercase">
                Platform Unggulan
              </span>
            </div>
            {openSections.featured ? (
              <ChevronDown className="w-4 h-4 text-rose-300" />
            ) : (
              <ChevronRight className="w-4 h-4 text-rose-300" />
            )}
          </button>

          {openSections.featured && (
            <div className="px-3 py-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
              {featuredPlatforms.map((plat) => {
                const platAccounts = accounts.filter(a => a.provider === plat.id);
                const isSelected = filterProvider === plat.id && activeTabId === 'dashboard';

                return (
                  <div key={plat.id} className="space-y-0.5">
                    {/* Platform Button */}
                    <div className="flex items-center justify-between group">
                      <button
                        onClick={() => {
                          setFilterProvider(plat.id);
                          setActiveTabId('dashboard');
                        }}
                        className={`flex-1 flex items-center justify-between px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                          isSelected
                            ? 'bg-[#A32E2E] text-white font-bold'
                            : 'text-rose-100 hover:bg-[#8C2727]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <PlatformLogo provider={plat.id} size="sm" />
                          <span>{plat.name}</span>
                        </div>
                        <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/20 text-rose-200">
                          {platAccounts.length}
                        </span>
                      </button>

                      {/* Quick Add for this platform */}
                      <button
                        onClick={() => openAddModal({ provider: plat.id })}
                        className="p-1 rounded-lg text-rose-300/60 hover:text-white hover:bg-[#8C2727] opacity-0 group-hover:opacity-100 transition-opacity ml-1"
                        title={`Tambah Akun ${plat.name}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Sub-Accounts List under this Platform */}
                    {platAccounts.length > 0 && (
                      <div className="pl-6 pr-1 space-y-0.5">
                        {platAccounts.map((acc) => {
                          const isAccActive = activeTabId === acc.id;
                          return (
                            <button
                              key={acc.id}
                              onClick={() => openAccountTab(acc)}
                              className={`w-full flex items-center justify-between px-2 py-1 rounded-lg text-[11px] transition-colors ${
                                isAccActive
                                  ? 'bg-white text-neutral-900 font-bold shadow-xs'
                                  : 'text-rose-200/80 hover:bg-[#8C2727] hover:text-white'
                              }`}
                            >
                              <span className="truncate">{acc.name}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. KATEGORI: TAMBAH PLATFORM SENDIRI (DROPDOWN ACCORDION) */}
        <div className="pt-3">
          <button
            onClick={() => toggleSection('custom')}
            className="w-full px-4 py-2 flex items-center justify-between text-left hover:bg-[#8C2727]/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Globe className="w-3.5 h-3.5 text-rose-300" />
              <span className="text-[11px] font-extrabold text-white tracking-wider uppercase">
                Tambah Platform Sendiri
              </span>
            </div>
            {openSections.custom ? (
              <ChevronDown className="w-4 h-4 text-rose-300" />
            ) : (
              <ChevronRight className="w-4 h-4 text-rose-300" />
            )}
          </button>

          {openSections.custom && (
            <div className="px-3 py-1 space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
              {/* Button to add custom platform */}
              <button
                onClick={() => openAddModal({ provider: 'custom' })}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-rose-100 bg-[#8C2727]/60 hover:bg-[#9B2B2B] transition-colors border border-dashed border-rose-300/40"
              >
                <Plus className="w-3.5 h-3.5 text-rose-300" />
                <span>+ Tambah Platform Sendiri</span>
              </button>

              {/* List of custom accounts */}
              {accounts.filter(a => a.provider === 'custom').map((acc) => {
                const isAccActive = activeTabId === acc.id;
                return (
                  <button
                    key={acc.id}
                    onClick={() => openAccountTab(acc)}
                    className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                      isAccActive
                        ? 'bg-white text-neutral-900 font-bold shadow-xs'
                        : 'text-rose-100 hover:bg-[#8C2727]'
                    }`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Globe className="w-3.5 h-3.5 text-rose-300 shrink-0" />
                      <span className="truncate">{acc.name}</span>
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Bottom Footer Section */}
      <div className="p-3.5 border-t border-[#8C2727] space-y-1 shrink-0">
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs text-rose-200/80 hover:bg-[#8C2727] hover:text-white transition-colors"
        >
          <Settings className="w-4 h-4" />
          <span>Pengaturan & Backup</span>
        </button>

        <div className="px-3 pt-2 text-[10px] text-rose-300/60 flex items-center justify-between">
          <span>v1.2.3 Portable</span>
          <span className="flex items-center gap-1 text-emerald-300">
            <ShieldCheck className="w-3 h-3" />
            Isolated
          </span>
        </div>
      </div>

    </aside>
  );
};
