import React from 'react';
import { useStore } from '../context/StoreContext';
import { digitalProducts } from '../data/products';
import { ProductCard } from './ProductCard';
import { ArrowRight, HeartHandshake } from 'lucide-react';

export const FeaturedProducts = () => {
  const { navigateTo } = useStore();

  const featured = digitalProducts.slice(0, 5);

  return (
    <section className="py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 tracking-tight">
              Produk Unggulan
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Pilihan terbaik untuk mendukung produktivitas dan kreativitas Anda.
            </p>
          </div>

          <button
            onClick={() => navigateTo('catalog')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-zea-700 hover:text-zea-800 transition-colors self-start sm:self-auto group"
          >
            <span>Lihat semua</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Motivational Banner Widget matching screenshot aesthetic */}
        <div className="mt-14 rounded-3xl bg-gradient-to-r from-rose-100/70 via-rose-50 to-[#FFF7F7] border border-rose-200/70 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-rose-200/50 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center gap-4 text-left z-10">
            <div className="w-12 h-12 rounded-2xl bg-white text-zea-700 flex items-center justify-center shadow-sm shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-bold text-zea-800 uppercase tracking-wider">Filosofi Zea</p>
              <h3 className="text-lg sm:text-xl font-extrabold text-neutral-800 tracking-tight">
                Bersama Zea, lebih banyak hal baik yang bisa kamu lakukan.
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 z-10">
            <button
              onClick={() => navigateTo('catalog')}
              className="px-5 py-2.5 rounded-xl bg-zea-700 hover:bg-zea-800 text-white text-xs font-semibold shadow-sm transition-all"
            >
              Mulai Eksplorasi
            </button>
            <button
              onClick={() => navigateTo('ai-prompt')}
              className="px-4 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-neutral-700 text-xs font-semibold border border-rose-200 shadow-xs transition-all"
            >
              Coba AI Tool
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
