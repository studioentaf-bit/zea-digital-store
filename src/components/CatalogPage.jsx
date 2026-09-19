import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { digitalProducts, categoriesList } from '../data/products';
import { ProductCard } from './ProductCard';
import { 
  LayoutGrid, 
  FileText, 
  Sparkles, 
  CheckSquare, 
  ShieldCheck, 
  Wrench,
  ChevronLeft,
  ChevronRight,
  Search,
  X
} from 'lucide-react';

export const CatalogPage = () => {
  const { selectedCategory, setSelectedCategory, searchQuery, setSearchQuery } = useStore();

  const [sortBy, setSortBy] = useState('popular');
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 6;

  const getCategoryIcon = (iconName) => {
    switch (iconName) {
      case 'LayoutGrid': return <LayoutGrid className="w-4 h-4" />;
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'CheckSquare': return <CheckSquare className="w-4 h-4" />;
      case 'ShieldCheck': return <ShieldCheck className="w-4 h-4" />;
      case 'Wrench': return <Wrench className="w-4 h-4" />;
      default: return <LayoutGrid className="w-4 h-4" />;
    }
  };

  const filteredProducts = useMemo(() => {
    return digitalProducts.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.shortDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.salesCount - a.salesCount;
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const displayedProducts = filteredProducts.slice(
    (activePage - 1) * itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Sidebar Filters (Desktop) */}
        <aside className="lg:col-span-3 space-y-6">
          
          <div className="bg-white rounded-3xl p-5 border border-rose-100/90 shadow-soft sticky top-24">
            <h3 className="text-sm font-bold text-neutral-900 mb-4 pb-2 border-b border-rose-50 flex items-center gap-2">
              <span>Jelajahi</span>
            </h3>

            {/* Category list */}
            <div className="space-y-1.5">
              {categoriesList.map(cat => {
                const isSelected = (selectedCategory === cat.id) || (cat.id === 'all' && selectedCategory === 'all');
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      setActivePage(1);
                    }}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-rose-50 text-zea-800 border border-rose-200/90 shadow-xs'
                        : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={isSelected ? 'text-zea-700' : 'text-neutral-400'}>
                        {getCategoryIcon(cat.icon)}
                      </span>
                      <span>{cat.name}</span>
                    </div>

                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${isSelected ? 'bg-white text-zea-800 font-bold' : 'bg-neutral-100 text-neutral-500'}`}>
                      {cat.id === 'all' 
                        ? digitalProducts.length 
                        : digitalProducts.filter(p => p.category === cat.id).length
                      }
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Quick Benefits Box */}
            <div className="mt-8 pt-5 border-t border-rose-50 text-neutral-600 space-y-2.5 text-[11px]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Instant Download 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-zea-600" />
                <span>Lisensi Resmi & Aman</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>Dukungan Pelanggan Cepat</span>
              </div>
            </div>

          </div>

        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          
          {/* Header & Sort Bar */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100/90 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                {selectedCategory === 'all' ? 'Semua Produk' : selectedCategory}
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                Temukan semua produk digital yang tersedia di Zea ({filteredProducts.length} produk).
              </p>
            </div>

            <div className="flex items-center gap-3">
              {searchQuery && (
                <div className="flex items-center gap-1.5 bg-rose-50 text-zea-800 text-xs px-3 py-1.5 rounded-full border border-rose-200">
                  <span>Pencarian: "{searchQuery}"</span>
                  <button onClick={() => setSearchQuery('')} className="hover:text-zea-900">
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2 text-xs text-neutral-500 shrink-0">
                <label htmlFor="sort-select" className="font-medium hidden sm:inline">Urutkan:</label>
                <select
                  id="sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-rose-50/50 border border-rose-200 rounded-xl px-3 py-2 text-xs font-semibold text-neutral-700 focus:outline-none focus:ring-1 focus:ring-zea-500"
                >
                  <option value="popular">Terpopuler</option>
                  <option value="price-asc">Harga Terendah</option>
                  <option value="price-desc">Harga Tertinggi</option>
                  <option value="rating">Rating Tertinggi</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {displayedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-rose-100/90 shadow-soft">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-zea-600 mx-auto flex items-center justify-center mb-3">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-neutral-800">Tidak ada produk ditemukan</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-sm mx-auto">
                Coba ubah kata kunci pencarian atau pilih kategori produk yang lain.
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 bg-zea-700 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Tampilkan Semua Produk
              </button>
            </div>
          )}

          {/* Pagination (matches screenshot numbers 1, 2, 3, 4, 5) */}
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              onClick={() => setActivePage(prev => Math.max(1, prev - 1))}
              disabled={activePage === 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-rose-200 bg-white text-neutral-600 hover:bg-rose-50 disabled:opacity-40 disabled:hover:bg-white transition-all"
              aria-label="Halaman Sebelumnya"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {[1, 2, 3, 4, 5].map(pageNum => (
              <button
                key={pageNum}
                onClick={() => setActivePage(pageNum)}
                className={`w-9 h-9 rounded-full text-xs font-bold transition-all ${
                  activePage === pageNum
                    ? 'bg-zea-700 text-white shadow-sm'
                    : 'bg-white text-neutral-600 border border-rose-200 hover:bg-rose-50'
                }`}
              >
                {pageNum}
              </button>
            ))}

            <button
              onClick={() => setActivePage(prev => Math.min(5, prev + 1))}
              disabled={activePage === 5}
              className="w-9 h-9 rounded-xl flex items-center justify-center border border-rose-200 bg-white text-neutral-600 hover:bg-rose-50 disabled:opacity-40 disabled:hover:bg-white transition-all"
              aria-label="Halaman Berikutnya"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </main>

      </div>

    </div>
  );
};
