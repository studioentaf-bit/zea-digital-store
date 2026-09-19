import React from 'react';
import { useZea } from '../context/ZeaContext';
import { ShieldCheck, Layers, ShoppingBag, Search, Key } from 'lucide-react';

export const ZeaFooter = () => {
  const { navigateTo } = useZea();

  return (
    <footer className="bg-white border-t border-rose-100/80 text-neutral-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#7A1F1F] text-white flex items-center justify-center font-black text-base shadow-sm">
                Z
              </div>
              <span className="font-extrabold text-base tracking-tight text-neutral-900">
                ZEA DIGITAL STORE
              </span>
            </div>
            <p className="text-xs text-neutral-500 max-w-sm leading-relaxed">
              Pusat resmi lisensi <strong>Zea App Manager</strong> (Multi-Account Workspace Portable) dan katalog produk digital premium siap pakai. Belanja instan tanpa perlu registrasi akun.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-700 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Sistem Pembayaran Instan & Otomatis Terbit</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">Navigasi Cepat</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-[#7A1F1F] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Layers className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Zea App Manager</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#7A1F1F] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <ShoppingBag className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Shop Produk Digital</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('check-order')} className="hover:text-[#7A1F1F] transition-colors flex items-center gap-1.5 cursor-pointer">
                  <Search className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Cek Lisensi / Pesanan</span>
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-[#7A1F1F] transition-colors flex items-center gap-1.5 font-medium text-neutral-700 cursor-pointer">
                  <Key className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Panel Admin</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-2.5">
            <h4 className="font-bold text-neutral-900 text-xs uppercase tracking-wider">Bantuan & Kontak</h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Ada pertanyaan teknis atau konfirmasi transaksi? Hubungi admin resmi kami:
            </p>
            <div className="p-3 rounded-2xl bg-rose-50/60 border border-rose-100/70 space-y-1">
              <div className="text-[11px] font-bold text-neutral-800">WhatsApp Support</div>
              <div className="text-xs font-mono font-bold text-[#7A1F1F]">0812-9847-1203</div>
              <div className="text-[10px] text-neutral-400">Senin - Minggu • 08:00 - 23:00 WIB</div>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 mt-8 border-t border-rose-50 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div>
            © 2026 ZEA Digital Store. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Garansi Akses Lisensi 100%</span>
            <span>•</span>
            <span>Privacy & Local Data Protected</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
