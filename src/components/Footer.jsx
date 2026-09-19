import React from 'react';
import { useStore } from '../context/StoreContext';
import { ShieldCheck, Zap, Mail, Phone, MessageSquare } from 'lucide-react';

export const Footer = () => {
  const { navigateTo, setSelectedCategory } = useStore();

  return (
    <footer className="bg-white border-t border-rose-100/90 pt-16 pb-12 text-left text-neutral-600 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-rose-100">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-zea-700 text-white flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s-3-2-6-2a9 9 0 0 0-9 9c0 2.21.8 4.24 2.14 5.81L5.7 18.2C5.25 17.24 5 16.15 5 15c0-4.42 3.58-8 8-8 2.05 0 3.91.77 5.33 2.04L17 8z"/>
                </svg>
              </div>
              <span className="text-2xl font-bold text-neutral-900 tracking-tight">Zea</span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-rose-100 text-zea-800">
                Digital Store
              </span>
            </div>

            <p className="text-xs text-neutral-500 leading-relaxed max-w-sm">
              Penyedia produk dan tools digital terpercaya untuk mempermudah produktivitas, bisnis kreatif, dan gaya hidup modern Anda.
            </p>

            <div className="flex items-center gap-3 pt-2 text-xs text-neutral-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Legal & Bergaransi</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-zea-600" />
                <span>Instant Delivery</span>
              </div>
            </div>
          </div>

          {/* Col 2: Kategori */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Kategori</h4>
            <ul className="space-y-2 text-xs">
              {['AI Tools', 'Template', 'Produktivitas', 'Premium Apps', 'Tools Digital'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      navigateTo('catalog');
                    }}
                    className="hover:text-zea-700 transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Navigasi Cepat */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Navigasi</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-zea-700">Beranda</button>
              </li>
              <li>
                <button onClick={() => navigateTo('catalog')} className="hover:text-zea-700">Semua Produk</button>
              </li>
              <li>
                <button onClick={() => navigateTo('ai-prompt')} className="hover:text-zea-700">AI Prompt Generator</button>
              </li>
              <li>
                <button onClick={() => navigateTo('library')} className="hover:text-zea-700">Perpustakaan Saya</button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-zea-700 font-semibold text-zea-800">Zea Admin Panel</button>
              </li>
            </ul>
          </div>

          {/* Col 4: Bantuan & Kontak */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">Bantuan</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400" />
                <span>support@zea.store</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                <span>WhatsApp Customer Care</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright & payment icons */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <p>© 2026 ZEA Digital Store. Seluruh hak cipta dilindungi.</p>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-100 text-[10px] font-bold text-neutral-600">QRIS</span>
            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-100 text-[10px] font-bold text-neutral-600">BCA VA</span>
            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-100 text-[10px] font-bold text-neutral-600">Mandiri</span>
            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-100 text-[10px] font-bold text-neutral-600">GoPay</span>
            <span className="px-2 py-0.5 rounded bg-rose-50 border border-rose-100 text-[10px] font-bold text-neutral-600">OVO</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
