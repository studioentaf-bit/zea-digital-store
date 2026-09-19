import React from 'react';
import { ZeaProvider, useZea } from './context/ZeaContext';
import { ZeaNavbar } from './components/ZeaNavbar';
import { AppLanding } from './components/AppLanding';
import { ShopPage } from './components/ShopPage';
import { OrderLookupPage } from './components/OrderLookupPage';
import { ZeaAdminPanel } from './components/ZeaAdminPanel';
import { InstantCheckoutModal } from './components/InstantCheckoutModal';
import { ZeaFooter } from './components/ZeaFooter';

function Toast() {
  const { toast } = useZea();
  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fadeIn">
      <div
        className={`px-5 py-3 rounded-2xl shadow-xl backdrop-blur-md flex items-center gap-3 border text-xs sm:text-sm font-semibold transition-all ${
          toast.type === 'info'
            ? 'bg-neutral-900 text-white border-neutral-700'
            : 'bg-[#7A1F1F] text-white border-rose-300/40 shadow-rose-950/20'
        }`}
      >
        <span className="w-2 h-2 rounded-full bg-amber-400"></span>
        {toast.message}
      </div>
    </div>
  );
}

function MainContent() {
  const { currentPage } = useZea();

  return (
    <main className="flex-1">
      {currentPage === 'home' && <AppLanding />}
      {currentPage === 'shop' && <ShopPage />}
      {currentPage === 'check-order' && <OrderLookupPage />}
      {currentPage === 'admin' && <ZeaAdminPanel />}
    </main>
  );
}

export default function App() {
  return (
    <ZeaProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF6F5] text-neutral-800 selection:bg-[#7A1F1F] selection:text-white">
        <ZeaNavbar />
        <MainContent />
        <ZeaFooter />
        <InstantCheckoutModal />
        <Toast />
      </div>
    </ZeaProvider>
  );
}


