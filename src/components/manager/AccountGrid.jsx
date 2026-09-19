import React, { useMemo } from 'react';
import { useManager } from '../../context/ManagerContext';
import { allSupportedPlatforms, featuredPlatforms, customPlatformDef } from '../../data/platforms';
import { PlatformLogo } from './PlatformLogo';
import { 
  Plus, 
  Star, 
  Copy, 
  Edit2, 
  Trash2, 
  Flame, 
  Globe, 
  Search,
  CheckCircle2,
  ExternalLink,
  Layers
} from 'lucide-react';

export const AccountGrid = () => {
  const { 
    accounts, 
    filterProvider, 
    searchQuery, 
    openAccountTab, 
    openAddModal, 
    deleteAccount, 
    duplicateAccount, 
    toggleFavorite 
  } = useManager();

  const filteredAccounts = useMemo(() => {
    return accounts.filter(acc => {
      if (filterProvider === 'favorites') {
        if (!acc.favorite) return false;
      } else if (filterProvider !== 'all') {
        if (acc.provider !== filterProvider) return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = acc.name.toLowerCase().includes(q);
        const matchEmail = acc.email?.toLowerCase().includes(q);
        const matchNotes = acc.notes?.toLowerCase().includes(q);
        const matchProvider = acc.provider.toLowerCase().includes(q);
        return matchName || matchEmail || matchNotes || matchProvider;
      }

      return true;
    });
  }, [accounts, filterProvider, searchQuery]);

  const stats = useMemo(() => {
    const total = accounts.length;
    const favorites = accounts.filter(a => a.favorite).length;
    const providers = new Set(accounts.map(a => a.provider)).size;
    return { total, favorites, providers };
  }, [accounts]);

  return (
    <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-left bg-[#FAF6F5]">
      
      {/* Top Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#FFF9F9] via-[#FDF2F2] to-[#FCEBEB] border border-rose-100/90 shadow-soft p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative overflow-hidden">
        
        <div className="space-y-2 max-w-xl z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-rose-200 text-xs font-bold text-zea-800 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sesi Browser Terisolasi Langsung di Dalam Aplikasi</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Zea App Manager
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            Kelola banyak akun <strong>Flow</strong>, <strong>Dola</strong>, <strong>ChatGPT</strong>, dan platform kustom lainnya langsung di dalam satu aplikasi dengan login cookies terpisah.
          </p>

          {/* Quick Platform Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[11px] font-bold text-neutral-500 mr-1">Platform Unggulan:</span>
            {featuredPlatforms.map(p => (
              <span key={p.id} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-rose-200 text-xs font-semibold text-neutral-800 shadow-xs">
                <PlatformLogo provider={p.id} size="xs" />
                <span>{p.name}</span>
              </span>
            ))}
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-100/80 border border-rose-200 text-xs font-semibold text-zea-900">
              <Globe className="w-3 h-3 text-zea-700" />
              <span>Tambah Platform Sendiri</span>
            </span>
          </div>
        </div>

        {/* 3 Metric Mini Cards */}
        <div className="flex items-center gap-3 shrink-0 z-10">
          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-rose-100 shadow-xs text-center min-w-[90px]">
            <p className="text-2xl font-black text-neutral-900">{stats.total}</p>
            <p className="text-[10px] font-semibold text-neutral-400">Total Akun</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-rose-100 shadow-xs text-center min-w-[90px]">
            <p className="text-2xl font-black text-amber-500">{stats.favorites}</p>
            <p className="text-[10px] font-semibold text-neutral-400">Favorit</p>
          </div>

          <div className="bg-white/90 backdrop-blur-xs rounded-2xl p-4 border border-rose-100 shadow-xs text-center min-w-[90px]">
            <p className="text-2xl font-black text-zea-700">{stats.providers}</p>
            <p className="text-[10px] font-semibold text-neutral-400">Platform</p>
          </div>
        </div>

      </div>

      {/* Grid Header & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
        <div>
          <h2 className="text-lg font-bold text-neutral-900">
            Daftar Profil Akun ({filteredAccounts.length})
          </h2>
          <p className="text-xs text-neutral-400">
            Klik akun untuk langsung membuka tab browser di dalam aplikasi Zea
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => openAddModal({ provider: 'custom' })}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white hover:bg-rose-50 text-neutral-700 border border-rose-200 text-xs font-semibold transition-all shadow-xs"
          >
            <Globe className="w-3.5 h-3.5 text-zea-700" />
            <span>+ Tambah Platform Sendiri</span>
          </button>

          <button
            onClick={() => openAddModal()}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zea-700 hover:bg-zea-800 text-white font-bold text-xs shadow-md shadow-zea-700/20 transition-all active:scale-[0.98]"
          >
            <Plus className="w-4 h-4" />
            <span>+ Tambah Akun</span>
          </button>
        </div>
      </div>

      {/* Accounts Grid */}
      {filteredAccounts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAccounts.map((acc) => {
            const plat = allSupportedPlatforms.find(p => p.id === acc.provider) || customPlatformDef;

            return (
              <div
                key={acc.id}
                onClick={() => openAccountTab(acc)}
                className="group bg-white rounded-3xl p-5 border border-rose-100/90 shadow-soft hover:shadow-card hover:border-rose-300/80 transition-all flex flex-col justify-between cursor-pointer relative"
              >
                <div>
                  {/* Card Header: Platform Tag & Star */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-1.5">
                      <PlatformLogo provider={plat.id} size="xs" />
                      <span className="text-[11px] font-bold text-neutral-800">
                        {plat.name}
                      </span>
                    </div>

                    <button
                      onClick={(e) => toggleFavorite(acc.id, e)}
                      className="p-1 rounded-full hover:bg-rose-50 text-neutral-300 hover:text-amber-400 transition-colors"
                      title={acc.favorite ? 'Hapus dari favorit' : 'Jadikan favorit'}
                    >
                      <Star className={`w-4 h-4 ${acc.favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
                    </button>
                  </div>

                  {/* Profile Avatar & Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <PlatformLogo provider={plat.id} size="xl" />

                    <div className="min-w-0">
                      <h3 className="font-extrabold text-sm text-neutral-900 group-hover:text-zea-700 transition-colors truncate">
                        {acc.name}
                      </h3>
                      <p className="text-[11px] text-neutral-400 truncate">
                        {acc.email || 'Sesi Mandiri'}
                      </p>
                    </div>
                  </div>

                  {/* Notes / Description */}
                  {acc.notes && (
                    <p className="text-xs text-neutral-500 line-clamp-2 bg-rose-50/40 p-2 rounded-xl mb-3 leading-relaxed">
                      {acc.notes}
                    </p>
                  )}
                </div>

                {/* Card Footer: Status & Actions */}
                <div className="pt-3 border-t border-rose-50 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>In-App Session</span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openAddModal(acc);
                      }}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                      title="Edit Akun"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        duplicateAccount(acc.id);
                      }}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
                      title="Duplikasi Akun"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteAccount(acc.id);
                      }}
                      className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      title="Hapus Akun"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-3xl p-12 text-center border border-rose-100/90 shadow-soft">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-zea-700 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-neutral-800">Tidak ada akun ditemukan</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto">
            Tidak ada profil yang cocok dengan filter atau kata kunci pencarian.
          </p>
          <button
            onClick={() => openAddModal()}
            className="mt-4 px-4 py-2 bg-zea-700 text-white rounded-xl text-xs font-semibold shadow-xs"
          >
            + Buat Akun Baru
          </button>
        </div>
      )}

    </div>
  );
};
