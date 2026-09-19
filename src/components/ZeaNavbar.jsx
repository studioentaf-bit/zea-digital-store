import React, { useState } from 'react';
import { useZea } from '../context/ZeaContext';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  Sparkles, 
  Key,
  Layers
} from 'lucide-react';

export const ZeaNavbar = () => {
  const { currentPage, navigateTo, openCheckout, appLicensePlans } = useZea();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Recommended plan for direct CTA
  const popularPlan = appLicensePlans.find(p => p.popular) || appLicensePlans[1];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F5]/90 backdrop-blur-md border-b border-rose-100/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <button 
            onClick={() => navigateTo('home')} 
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-[#7A1F1F] text-white flex items-center justify-center font-black text-xl shadow-md shadow-[#7A1F1F]/20 group-hover:scale-105 transition-transform">
              Z
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-[#7A1F1F] transition-colors">
                  ZEA
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-[#7A1F1F] font-semibold tracking-wide">
                  OFFICIAL
                </span>
              </div>
              <p className="text-[11px] text-neutral-500 font-medium tracking-wider uppercase">
                App Manager & Digital Store
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-white/70 p-1.5 rounded-full border border-rose-100/80 shadow-xs">
            <button
              onClick={() => navigateTo('home')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                currentPage === 'home'
                  ? 'bg-[#7A1F1F] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-rose-50/70'
              }`}
            >
              <Layers className="w-4 h-4" />
              Zea App Manager
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                currentPage === 'shop'
                  ? 'bg-[#7A1F1F] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-rose-50/70'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Shop Produk Digital
            </button>

            <button
              onClick={() => navigateTo('check-order')}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${
                currentPage === 'check-order'
                  ? 'bg-[#7A1F1F] text-white shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-rose-50/70'
              }`}
            >
              <Search className="w-4 h-4" />
              Cek Lisensi / Pesanan
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => navigateTo('admin')}
              title="Panel Admin"
              className={`p-2.5 rounded-xl border transition-all text-xs font-semibold flex items-center gap-1.5 ${
                currentPage === 'admin'
                  ? 'bg-[#7A1F1F] text-white border-[#7A1F1F]'
                  : 'bg-white text-neutral-600 border-rose-100 hover:text-[#7A1F1F] hover:border-rose-200'
              }`}
            >
              <Key className="w-4 h-4" />
              <span>Admin</span>
            </button>

            <button
              onClick={() => {
                if (currentPage === 'home') {
                  const el = document.getElementById('pricing-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                  else openCheckout(popularPlan);
                } else {
                  openCheckout(popularPlan);
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#7A1F1F] to-[#9B2B2B] text-white text-sm font-bold shadow-md shadow-[#7A1F1F]/20 hover:shadow-lg hover:from-[#661818] hover:to-[#7A1F1F] transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Beli Lisensi App
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2.5 rounded-xl bg-white border border-rose-100 text-neutral-700 hover:bg-rose-50"
            >
              {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="md:hidden border-b border-rose-100 bg-[#FAF6F5] px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <button
            onClick={() => { navigateTo('home'); setIsMobileOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-3 ${
              currentPage === 'home' ? 'bg-[#7A1F1F] text-white' : 'bg-white text-neutral-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            Zea App Manager
          </button>
          <button
            onClick={() => { navigateTo('shop'); setIsMobileOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-3 ${
              currentPage === 'shop' ? 'bg-[#7A1F1F] text-white' : 'bg-white text-neutral-700'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            Shop Produk Digital
          </button>
          <button
            onClick={() => { navigateTo('check-order'); setIsMobileOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-3 ${
              currentPage === 'check-order' ? 'bg-[#7A1F1F] text-white' : 'bg-white text-neutral-700'
            }`}
          >
            <Search className="w-4 h-4" />
            Cek Lisensi / Pesanan
          </button>
          <button
            onClick={() => { navigateTo('admin'); setIsMobileOpen(false); }}
            className={`w-full text-left px-4 py-3 rounded-xl font-medium text-sm flex items-center gap-3 ${
              currentPage === 'admin' ? 'bg-[#7A1F1F] text-white' : 'bg-white text-neutral-700'
            }`}
          >
            <Key className="w-4 h-4" />
            Panel Admin
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                openCheckout(popularPlan);
                setIsMobileOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-[#7A1F1F] text-white font-bold text-center text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Beli Lisensi Sekarang (Mulai Rp 49rb)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
