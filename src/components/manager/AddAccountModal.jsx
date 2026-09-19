import React, { useState, useEffect } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  featuredPlatforms, 
  otherPlatforms, 
  customPlatformDef,
  allSupportedPlatforms 
} from '../../data/platforms';
import { PlatformLogo } from './PlatformLogo';
import { 
  X, 
  Plus, 
  ShieldCheck, 
  Check, 
  Globe, 
  Flame,
  Wrench
} from 'lucide-react';

export const AddAccountModal = () => {
  const { isAddModalOpen, setIsAddModalOpen, editingAccount, addAccount, updateAccount } = useManager();

  const [provider, setProvider] = useState('google-flow');
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (editingAccount && editingAccount.id) {
      setProvider(editingAccount.provider || 'google-flow');
      setName(editingAccount.name || '');
      setUrl(editingAccount.url || '');
      setEmail(editingAccount.email || '');
      setNotes(editingAccount.notes || '');
    } else if (editingAccount && editingAccount.provider) {
      setProvider(editingAccount.provider);
      setName(editingAccount.provider === 'custom' ? 'Platform Saya' : '');
      setUrl(editingAccount.provider === 'custom' ? 'https://' : (allSupportedPlatforms.find(p => p.id === editingAccount.provider)?.defaultUrl || 'https://'));
      setEmail('');
      setNotes('');
    } else {
      const defaultPlat = featuredPlatforms[0];
      setProvider(defaultPlat.id);
      setName('');
      setUrl(defaultPlat.defaultUrl);
      setEmail('');
      setNotes('');
    }
  }, [editingAccount, isAddModalOpen]);

  const handleProviderSelect = (pId) => {
    setProvider(pId);
    const plat = allSupportedPlatforms.find(p => p.id === pId) || customPlatformDef;
    if (plat && plat.id !== 'custom') {
      setUrl(plat.defaultUrl);
      if (!name) setName(`${plat.name} Akun`);
    } else if (plat.id === 'custom') {
      setUrl('https://');
      if (!name) setName('Platform Saya');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let finalUrl = url.trim();
    if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
      finalUrl = 'https://' + finalUrl;
    }

    if (editingAccount && editingAccount.id) {
      updateAccount(editingAccount.id, {
        name: name.trim() || 'Akun Platform',
        provider,
        url: finalUrl,
        email: email || null,
        notes
      });
    } else {
      addAccount({
        name: name.trim() || (provider === 'custom' ? 'Platform Saya' : 'Akun Baru'),
        provider,
        url: finalUrl,
        email: email || null,
        notes
      });
    }
  };

  if (!isAddModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-rose-100 shadow-2xl space-y-6 text-left animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900">
              {editingAccount ? 'Edit Akun Platform' : 'Tambah Akun Platform Baru'}
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Profil berjalan langsung di dalam Zea App Manager.
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Section 1: Platform Unggulan */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>Platform Unggulan:</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {featuredPlatforms.map((plat) => {
                const isSelected = provider === plat.id;
                return (
                  <button
                    type="button"
                    key={plat.id}
                    onClick={() => handleProviderSelect(plat.id)}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col items-center justify-center gap-2 ${
                      isSelected
                        ? 'border-zea-600 bg-rose-50 text-zea-900 shadow-xs font-bold ring-2 ring-zea-500/20'
                        : 'border-rose-100 bg-white text-neutral-600 hover:border-rose-200 hover:bg-neutral-50'
                    }`}
                  >
                    <PlatformLogo provider={plat.id} size="md" />
                    <span className="text-xs font-bold text-center truncate max-w-full">
                      {plat.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Tambah Platform Sendiri */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-extrabold text-neutral-800 mb-2">
              <Globe className="w-3.5 h-3.5 text-zea-700" />
              <span>Tambah Platform Sendiri:</span>
            </div>
            <button
              type="button"
              onClick={() => handleProviderSelect('custom')}
              className={`w-full p-3 rounded-2xl border text-left transition-all flex items-center justify-between ${
                provider === 'custom'
                  ? 'border-zea-600 bg-rose-50 text-zea-900 shadow-xs ring-2 ring-zea-500/20'
                  : 'border-rose-100 bg-white text-neutral-700 hover:border-rose-200 hover:bg-neutral-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <PlatformLogo provider="custom" size="sm" />
                <div>
                  <p className="text-xs font-bold">Platform Sendiri (Kustom URL)</p>
                  <p className="text-[10px] text-neutral-400">Gunakan platform AI atau web tools Anda sendiri</p>
                </div>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-zea-800 font-bold">
                Kustom
              </span>
            </button>
          </div>

          {/* Section 3: Platform Lainnya */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-500 mb-2">
              <Wrench className="w-3.5 h-3.5" />
              <span>Platform Lainnya:</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {otherPlatforms.map((plat) => {
                const isSelected = provider === plat.id;
                return (
                  <button
                    type="button"
                    key={plat.id}
                    onClick={() => handleProviderSelect(plat.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      isSelected
                        ? 'border-zea-600 bg-rose-50 text-zea-900 shadow-xs font-bold'
                        : 'border-rose-100 bg-white text-neutral-600 hover:border-rose-200'
                    }`}
                  >
                    <PlatformLogo provider={plat.id} size="sm" />
                    <span className="text-xs font-semibold">{plat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Account Name */}
          <div className="pt-2">
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Nama Profil Akun:
            </label>
            <input
              type="text"
              required
              placeholder="Contoh: Pro1, pro 2, dol1, Flow Utama..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-rose-50/40 border border-rose-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-zea-500/20 font-medium"
            />
          </div>

          {/* Target URL */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Target URL Platform:
            </label>
            <input
              type="url"
              required
              placeholder="https://labs.google/flow atau https://web.dola.me"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-rose-50/40 border border-rose-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 font-mono focus:outline-none focus:ring-2 focus:ring-zea-500/20"
            />
          </div>

          {/* Email / Tag */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Label Email Akun (Opsional):
            </label>
            <input
              type="email"
              placeholder="nama.akun@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-rose-50/40 border border-rose-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-zea-500/20"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-neutral-700 mb-1">
              Catatan / Pengingat Akun:
            </label>
            <input
              type="text"
              placeholder="Contoh: Akun video rendering, langganan tim..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-rose-50/40 border border-rose-200 rounded-xl px-3.5 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-zea-500/20"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 flex items-center justify-end gap-2.5 border-t border-rose-50">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-neutral-200 hover:bg-neutral-50 text-neutral-600 text-xs font-semibold transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-zea-700 hover:bg-zea-800 text-white text-xs font-bold shadow-md shadow-zea-700/20 transition-all active:scale-[0.98]"
            >
              {editingAccount ? 'Simpan Perubahan' : 'Simpan & Buka Akun'}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
