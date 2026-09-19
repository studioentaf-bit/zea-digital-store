import React, { useState } from 'react';
import { useZea } from '../context/ZeaContext';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

export const ShopPage = () => {
  const { digitalProducts, openCheckout, navigateTo } = useZea();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'Semua Produk' },
    { id: 'Notion Template', label: 'Notion Template' },
    { id: 'AI Prompts', label: 'AI Prompts' },
    { id: 'Template & SOP', label: 'Template & SOP' },
    { id: 'Spreadsheet', label: 'Spreadsheet' },
  ];

  const filteredProducts = digitalProducts.filter(prod => {
    const matchCategory = selectedCategory === 'all' || prod.category === selectedCategory;
    const matchSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-[#7A1F1F] via-[#9B2B2B] to-[#7A1F1F] text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-white/5 rounded-full blur-2xl -mr-20 -mt-20 pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-rose-100">
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>KATALOG PRODUK DIGITAL TERBAIK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Shop Produk Digital Siap Pakai
          </h1>
          <p className="text-rose-100/90 text-sm sm:text-base leading-relaxed">
            Template Notion, ribuan formula AI Prompts, hingga spreadsheet bisnis. Tanpa perlu registrasi akun—cukup checkout dan link produk langsung dapat diakses detik itu juga.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#7A1F1F] text-white shadow-sm'
                  : 'bg-white text-neutral-600 border border-rose-100 hover:border-rose-300'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari produk digital..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-rose-100 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#7A1F1F]/20 focus:border-[#7A1F1F]"
          />
        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-rose-100 p-8 space-y-3">
          <ShoppingBag className="w-12 h-12 text-rose-300 mx-auto" />
          <h3 className="text-base font-bold text-neutral-800">Tidak ada produk yang cocok</h3>
          <p className="text-xs text-neutral-500">Coba ubah kata kunci pencarian atau ganti filter kategori.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="rounded-3xl bg-white border border-rose-100 overflow-hidden shadow-lg shadow-rose-950/5 hover:shadow-xl hover:-translate-y-1 transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Thumbnail */}
                <div className="relative h-48 overflow-hidden bg-rose-100/50">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#7A1F1F] shadow-xs">
                      {prod.category}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-4">
                  {/* Rating & Sales */}
                  <div className="flex items-center gap-3 text-xs text-neutral-500">
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{prod.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{prod.salesCount}+ terjual</span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 group-hover:text-[#7A1F1F] transition-colors leading-snug">
                      {prod.name}
                    </h3>
                    <p className="text-xs text-neutral-500 mt-2 line-clamp-2 leading-relaxed">
                      {prod.description}
                    </p>
                  </div>

                  {/* Features / Benefits preview */}
                  <div className="space-y-1.5 pt-2 border-t border-rose-50">
                    {prod.features && prod.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>
              </div>

              {/* Card Footer: Price & Buy Action */}
              <div className="p-6 pt-0 space-y-3">
                <div className="pt-4 border-t border-rose-50 flex items-baseline justify-between">
                  <div>
                    <div className="text-[11px] text-neutral-400 uppercase font-semibold">Harga</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-neutral-900">
                        Rp {prod.price.toLocaleString('id-ID')}
                      </span>
                      {prod.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          Rp {prod.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                    Link Langsung
                  </div>
                </div>

                <button
                  onClick={() => openCheckout(prod)}
                  className="w-full py-3 rounded-2xl bg-[#7A1F1F] text-white text-xs font-bold shadow-md shadow-[#7A1F1F]/20 hover:bg-[#661818] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Beli Sekarang (Tanpa Login)</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* App Manager Banner at Bottom */}
      <div className="rounded-3xl p-8 bg-white border border-rose-100 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#7A1F1F] text-white flex items-center justify-center font-black text-2xl shadow-md">
            Z
          </div>
          <div>
            <h4 className="text-base font-bold text-neutral-900">Belum Punya Zea App Manager?</h4>
            <p className="text-xs text-neutral-500">Kelola multi akun AI Flow, Dola, dan ChatGPT dengan isolasi profil bebas bentrok.</p>
          </div>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className="px-5 py-2.5 rounded-xl bg-rose-50 text-[#7A1F1F] border border-rose-200 text-xs font-bold hover:bg-[#7A1F1F] hover:text-white transition-all whitespace-nowrap cursor-pointer"
        >
          Lihat Zea App Manager →
        </button>
      </div>

    </div>
  );
};
