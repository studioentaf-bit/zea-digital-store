import React, { useEffect } from 'react';
import { useManager } from '../../context/ManagerContext';
import { Sidebar } from './Sidebar';
import { Navbar } from './Navbar';
import { AccountGrid } from './AccountGrid';
import { BrowserView } from './BrowserView';
import { AddAccountModal } from './AddAccountModal';
import { SettingsModal } from './SettingsModal';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export const AppManagerApp = () => {
  const { 
    activeTabId, 
    activeAccount, 
    toast, 
    isAddModalOpen, 
    isSettingsModalOpen 
  } = useManager();

  // Sync modal open state to C# desktop host so native browser panel does not cover modals
  useEffect(() => {
    if (window.chrome?.webview) {
      window.chrome.webview.postMessage({
        type: 'MODAL_STATE',
        isOpen: !!(isAddModalOpen || isSettingsModalOpen)
      });
    }
  }, [isAddModalOpen, isSettingsModalOpen]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#FAF6F5] text-neutral-800 font-sans selection:bg-rose-200 selection:text-zea-900">
      
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-neutral-900 text-white shadow-2xl border border-neutral-800 text-xs font-semibold">
            {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
            {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />}
            {toast.type === 'info' && <Info className="w-4 h-4 text-rose-300 shrink-0" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main App Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        
        {/* Top Tab Bar & Global Tools */}
        <Navbar />

        {/* Content View: Dashboard Grid or Active Account Browser Session */}
        <main className="flex-1 overflow-hidden flex flex-col">
          {activeTabId === 'dashboard' || !activeAccount ? (
            <AccountGrid />
          ) : (
            <BrowserView account={activeAccount} />
          )}
        </main>

      </div>

      {/* Modals */}
      <AddAccountModal />
      <SettingsModal />

    </div>
  );
};
