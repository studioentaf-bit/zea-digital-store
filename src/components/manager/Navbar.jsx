import React from 'react';
import { useManager } from '../../context/ManagerContext';
import { supportedPlatforms } from '../../data/platforms';
import { 
  X, 
  Plus, 
  Search, 
  LayoutDashboard, 
  Settings,
  RotateCw,
  Trash2,
  PanelLeft
} from 'lucide-react';

export const Navbar = () => {
  const { 
    openTabs, 
    activeTabId, 
    activeAccount,
    setActiveTabId, 
    closeTab, 
    openAddModal, 
    searchQuery, 
    setSearchQuery,
    setIsSettingsModalOpen,
    isSidebarOpen,
    toggleSidebar,
    showToast
  } = useManager();

  return (
    <header className="h-14 bg-white border-b border-rose-100 flex items-center justify-between px-3 gap-3 select-none">
      
      {/* Sidebar Toggle & Tab Bar */}
      <div className="flex items-center gap-2 overflow-hidden flex-1">
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-xl transition-all shrink-0 cursor-pointer flex items-center justify-center ${
            !isSidebarOpen 
              ? 'bg-[#7A1F1F] text-white hover:bg-[#9B2B2B] shadow-sm' 
              : 'text-neutral-500 hover:text-zea-800 hover:bg-rose-50'
          }`}
          title={isSidebarOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        {/* Tab Bar (Left & Center) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 flex-1 scrollbar-none">
        
        {openTabs.map((tab) => {
          const isActive = activeTabId === tab.id;
          const isDashboard = tab.id === 'dashboard';
          const plat = supportedPlatforms.find(p => p.id === tab.provider);

          return (
            <div
              key={tab.id}
              onClick={() => setActiveTabId(tab.id)}
              className={`group relative flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all shrink-0 border ${
                isActive
                  ? 'bg-rose-50 text-zea-800 border-rose-200 shadow-xs'
                  : 'bg-white text-neutral-600 border-transparent hover:bg-neutral-50 hover:text-neutral-900'
              }`}
            >
              {isDashboard ? (
                <LayoutDashboard className="w-3.5 h-3.5 text-zea-700 shrink-0" />
              ) : (
                <span 
                  className="w-2 h-2 rounded-full shrink-0" 
                  style={{ backgroundColor: plat ? plat.color : '#9B2B2B' }} 
                />
              )}

              <span className="max-w-[130px] truncate">{tab.name}</span>

              {!isDashboard && (
                <button
                  onClick={(e) => closeTab(tab.id, e)}
                  className="p-0.5 rounded-full hover:bg-rose-200/60 text-neutral-400 hover:text-neutral-700 transition-colors"
                  title="Tutup Tab"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          );
        })}

        {/* Plus Tab Button */}
        <button
          onClick={() => openAddModal()}
          className="p-1.5 rounded-xl text-neutral-500 hover:text-zea-700 hover:bg-rose-50 transition-colors shrink-0"
          title="Tambah Akun Baru"
        >
          <Plus className="w-4 h-4" />
        </button>

      </div>
      </div>

      {/* Right Tools: Search & Controls */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Active Tab Quick Actions: Refresh & Bersihkan Sesi */}
        {activeAccount && activeTabId !== 'dashboard' && (
          <div className="flex items-center gap-1.5 pr-2 border-r border-rose-200">
            <button
              onClick={() => {
                if (window.chrome?.webview) {
                  window.chrome.webview.postMessage({
                    type: 'RELOAD',
                    tabId: activeAccount.id
                  });
                }
                showToast('Memuat ulang halaman...', 'info');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-zea-800 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95 border border-rose-200/60"
              title="Muat Ulang Halaman (Refresh)"
            >
              <RotateCw className="w-3.5 h-3.5 text-zea-700" />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm(`Hapus cookies & cache sesi untuk akun '${activeAccount.name}'? Anda harus login kembali.`)) {
                  if (window.chrome?.webview) {
                    window.chrome.webview.postMessage({
                      type: 'CLEAR_SESSION',
                      tabId: activeAccount.id
                    });
                  }
                  showToast(`Sesi akun '${activeAccount.name}' berhasil dibersihkan!`, 'success');
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all shadow-2xs cursor-pointer active:scale-95 border border-red-200/60"
              title="Bersihkan Sesi & Cookies Akun Ini"
            >
              <Trash2 className="w-3.5 h-3.5 text-red-600" />
              <span>Bersihkan Sesi</span>
            </button>
          </div>
        )}

        {/* Search input */}
        <div className="relative w-40 lg:w-56">
          <input
            type="text"
            placeholder="Cari akun & platform..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-rose-50/50 border border-rose-200/80 rounded-full pl-8 pr-3 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-zea-600"
          />
          <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-2.5 top-2" />
        </div>

        {/* Settings button */}
        <button
          onClick={() => setIsSettingsModalOpen(true)}
          className="p-2 text-neutral-500 hover:text-zea-700 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
          title="Pengaturan"
        >
          <Settings className="w-4 h-4" />
        </button>

      </div>

    </header>
  );
};
