import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Search, 
  ShoppingCart, 
  Sparkles, 
  ChevronDown, 
  ShieldCheck, 
  BookOpen, 
  Menu, 
  X,
  LayoutDashboard,
  User
} from 'lucide-react';
import { categoriesList } from '../data/products';

export const Navbar = () => {
  const { 
    currentPage, 
    navigateTo, 
    cart, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery 
  } = useStore();

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('catalog');
    }
  };

  const handleSelectCategory = (catId) => {
    setSelectedCategory(catId);
    setIsCategoryOpen(false);
    navigateTo('catalog');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FAF6F5]/90 backdrop-blur-md border-b border-rose-100/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-zea-700 text-white flex items-center justify-center shadow-md shadow-zea-700/20 group-hover:scale-105 transition-transform">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s-3-2-6-2a9 9 0 0 0-9 9c0 2.21.8 4.24 2.14 5.81L5.7 18.2C5.25 17.24 5 16.15 5 15c0-4.42 3.58-8 8-8 2.05 0 3.91.77 5.33 2.04L17 8z"/>
                </svg>
              </div>
              <div>
                <span className="text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-zea-700 transition-colors">
                  Zea
                </span>
                <span className="hidden sm:inline-block ml-1.5 text-[10px] uppercase tracking-widest font-semibold px-1.5 py-0.5 rounded bg-rose-100 text-zea-800">
                  Digital
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-600">
              <button 
                onClick={() => navigateTo('home')}
                className={`transition-colors hover:text-zea-700 py-1 ${currentPage === 'home' ? 'text-zea-700 font-semibold border-b-2 border-zea-700' : ''}`}
              >
                Beranda
              </button>

              {/* Jelajahi Dropdown */}
              <div className="relative">
                <button 
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  onBlur={() => setTimeout(() => setIsCategoryOpen(false), 200)}
                  className={`flex items-center gap-1 transition-colors hover:text-zea-700 py-1 ${currentPage === 'catalog' ? 'text-zea-700 font-semibold' : ''}`}
                >
                  Jelajahi
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isCategoryOpen ? 'rotate-180 text-zea-700' : ''}`} />
                </button>

                {isCategoryOpen && (
                  <div className="absolute left-0 mt-2 w-56 rounded-2xl bg-white shadow-xl border border-rose-100 py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-3 py-1.5 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Kategori Produk
                    </div>
                    {categoriesList.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.id)}
                        className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-rose-50/80 hover:text-zea-800 flex items-center justify-between transition-colors"
                      >
                        <span>{cat.name}</span>
                        {cat.id === 'AI Tools' && (
                          <span className="text-[10px] bg-rose-100 text-zea-700 font-bold px-1.5 py-0.5 rounded-full">HOT</span>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <button 
                onClick={() => navigateTo('ai-prompt')}
                className={`flex items-center gap-1.5 transition-colors hover:text-zea-700 py-1 ${currentPage === 'ai-prompt' ? 'text-zea-700 font-semibold border-b-2 border-zea-700' : ''}`}
              >
                <Sparkles className="w-3.5 h-3.5 text-zea-600" />
                AI Prompt Generator
              </button>

              <button 
                onClick={() => navigateTo('library')}
                className={`transition-colors hover:text-zea-700 py-1 ${currentPage === 'library' ? 'text-zea-700 font-semibold border-b-2 border-zea-700' : ''}`}
              >
                Perpustakaan Saya
              </button>

              <button 
                onClick={() => navigateTo('catalog')}
                className="transition-colors hover:text-zea-700 py-1"
              >
                Tentang
              </button>
            </nav>
          </div>

          {/* Search bar & Right action buttons */}
          <div className="flex items-center gap-3 flex-1 max-w-md justify-end">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative hidden sm:block w-full max-w-[280px] lg:max-w-xs">
              <input
                type="text"
                placeholder="Cari produk, template, atau tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/90 border border-rose-200/80 rounded-full pl-9 pr-4 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-zea-500/30 focus:border-zea-600 shadow-sm transition-all"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5 pointer-events-none" />
            </form>

            {/* Admin Switcher Button */}
            <button
              onClick={() => navigateTo('admin')}
              title="Buka Panel Zea Admin"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                currentPage === 'admin'
                  ? 'bg-zea-700 text-white border-zea-700 shadow-sm'
                  : 'bg-white text-neutral-700 border-rose-200 hover:border-zea-600 hover:text-zea-700 shadow-sm'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Admin</span>
            </button>

            {/* Shopping Cart Button */}
            <button 
              onClick={() => navigateTo('cart')}
              className="relative p-2.5 rounded-full bg-white border border-rose-100 text-neutral-700 hover:text-zea-700 hover:border-rose-300 transition-all shadow-sm focus:outline-none"
              aria-label="Keranjang Belanja"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-zea-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Avatar */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                onBlur={() => setTimeout(() => setIsUserMenuOpen(false), 200)}
                className="w-9 h-9 rounded-full overflow-hidden border-2 border-rose-200 hover:border-zea-600 transition-all shadow-sm focus:outline-none flex items-center justify-center bg-rose-50"
              >
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                  alt="Avatar" 
                  className="w-full h-full object-cover"
                />
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white shadow-xl border border-rose-100 py-2 z-50 text-sm">
                  <div className="px-4 py-2 border-b border-rose-50">
                    <p className="font-semibold text-neutral-800 text-xs">Andi Saputra</p>
                    <p className="text-[11px] text-neutral-500 truncate">andi.saputra@gmail.com</p>
                  </div>
                  <button 
                    onClick={() => navigateTo('library')}
                    className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-rose-50 hover:text-zea-800 flex items-center gap-2 text-xs"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Perpustakaan Digital
                  </button>
                  <button 
                    onClick={() => navigateTo('admin')}
                    className="w-full text-left px-4 py-2 text-neutral-700 hover:bg-rose-50 hover:text-zea-800 flex items-center gap-2 text-xs"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Zea Admin Panel
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-600 hover:text-neutral-900 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-rose-100 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <form onSubmit={handleSearchSubmit} className="relative mb-3">
            <input
              type="text"
              placeholder="Cari produk, template, atau tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-rose-50/50 border border-rose-200 rounded-full pl-9 pr-4 py-2 text-xs"
            />
            <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          </form>
          <button 
            onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
            className="block w-full text-left font-medium py-2 px-3 rounded-lg hover:bg-rose-50 text-neutral-800 text-sm"
          >
            Beranda
          </button>
          <button 
            onClick={() => { navigateTo('catalog'); setIsMobileMenuOpen(false); }}
            className="block w-full text-left font-medium py-2 px-3 rounded-lg hover:bg-rose-50 text-neutral-800 text-sm"
          >
            Semua Produk
          </button>
          <button 
            onClick={() => { navigateTo('ai-prompt'); setIsMobileMenuOpen(false); }}
            className="block w-full text-left font-medium py-2 px-3 rounded-lg hover:bg-rose-50 text-neutral-800 text-sm"
          >
            AI Prompt Generator
          </button>
          <button 
            onClick={() => { navigateTo('library'); setIsMobileMenuOpen(false); }}
            className="block w-full text-left font-medium py-2 px-3 rounded-lg hover:bg-rose-50 text-neutral-800 text-sm"
          >
            Perpustakaan Saya
          </button>
          <button 
            onClick={() => { navigateTo('admin'); setIsMobileMenuOpen(false); }}
            className="block w-full text-left font-medium py-2 px-3 rounded-lg bg-zea-50 text-zea-800 text-sm font-semibold"
          >
            Masuk Zea Admin Panel
          </button>
        </div>
      )}
    </header>
  );
};
