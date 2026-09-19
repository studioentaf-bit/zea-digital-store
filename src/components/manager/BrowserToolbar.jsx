import React, { useState, useEffect } from 'react';
import { useManager } from '../../context/ManagerContext';
import { allSupportedPlatforms } from '../../data/platforms';
import { PlatformLogo } from './PlatformLogo';
import { 
  ArrowLeft, 
  ArrowRight, 
  RotateCw, 
  Home, 
  Lock, 
  Copy, 
  ExternalLink, 
  Trash2, 
  ShieldCheck
} from 'lucide-react';

export const BrowserToolbar = ({ 
  account, 
  currentUrl, 
  onNavigate, 
  onReload, 
  onGoBack, 
  onGoForward, 
  canGoBack, 
  canGoForward 
}) => {
  const { showToast } = useManager();
  const [inputUrl, setInputUrl] = useState(currentUrl || account.url);

  const platform = allSupportedPlatforms.find(p => p.id === account.provider) || allSupportedPlatforms[0];

  useEffect(() => {
    setInputUrl(currentUrl || account.url);
  }, [currentUrl, account.url]);

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (onNavigate && inputUrl.trim()) {
      onNavigate(inputUrl);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(inputUrl);
    showToast('Tautan berhasil disalin ke clipboard!');
  };

  const handleOpenExternal = () => {
    window.open(inputUrl, '_blank');
    showToast('Membuka di browser eksternal...', 'info');
  };

  const handleClearSession = () => {
    if (window.confirm(`Hapus cookies & cache sesi untuk akun '${account.name}'? Anda harus login kembali.`)) {
      if (window.chrome?.webview) {
        window.chrome.webview.postMessage({
          type: 'CLEAR_SESSION',
          tabId: account.id
        });
      }
      showToast(`Sesi akun '${account.name}' berhasil dibersihkan!`, 'success');
      if (onReload) onReload();
    }
  };

  return (
    <div className="h-12 bg-white border-b border-rose-100 flex items-center justify-between px-3 gap-2 select-none shrink-0">
      
      {/* Navigation buttons */}
      <div className="flex items-center gap-1">
        <button 
          onClick={onGoBack}
          disabled={!canGoBack}
          className={`p-1.5 rounded-lg transition-colors ${
            canGoBack 
              ? 'text-neutral-700 hover:bg-rose-50 hover:text-zea-700 cursor-pointer' 
              : 'text-neutral-300 cursor-not-allowed'
          }`}
          title="Kembali"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        <button 
          onClick={onGoForward}
          disabled={!canGoForward}
          className={`p-1.5 rounded-lg transition-colors ${
            canGoForward 
              ? 'text-neutral-700 hover:bg-rose-50 hover:text-zea-700 cursor-pointer' 
              : 'text-neutral-300 cursor-not-allowed'
          }`}
          title="Maju"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button 
          onClick={() => {
            if (onReload) onReload();
            showToast('Memuat ulang tab browser...', 'info');
          }}
          className="p-1.5 rounded-lg text-neutral-600 hover:bg-rose-50 hover:text-zea-700 transition-colors"
          title="Muat Ulang (Reload)"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>

        <button 
          onClick={() => {
            if (onNavigate) onNavigate(platform.defaultUrl);
          }}
          className="p-1.5 rounded-lg text-neutral-600 hover:bg-rose-50 hover:text-zea-700 transition-colors"
          title="Beranda Platform"
        >
          <Home className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* URL Address Bar */}
      <form onSubmit={handleUrlSubmit} className="flex-1 max-w-2xl flex items-center bg-rose-50/50 border border-rose-200/70 rounded-full px-3 py-1 text-xs text-neutral-700">
        <div className="flex items-center gap-1.5 mr-2 shrink-0 text-emerald-600">
          <Lock className="w-3 h-3" />
          <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100/70 text-emerald-800 px-1.5 py-0.2 rounded">
            In-App
          </span>
        </div>

        <input
          type="text"
          value={inputUrl}
          onChange={(e) => setInputUrl(e.target.value)}
          className="w-full bg-transparent text-xs text-neutral-800 focus:outline-none font-mono"
        />

        <button
          type="button"
          onClick={handleCopyUrl}
          className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors shrink-0"
          title="Salin URL"
        >
          <Copy className="w-3 h-3" />
        </button>
      </form>

      {/* Profile info & actions */}
      <div className="flex items-center gap-2 shrink-0">
        
        {/* Profile badge with Official Logo */}
        <div className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200 text-xs">
          <PlatformLogo provider={platform.id} size="xs" />
          <span className="font-bold text-neutral-800">{account.name}</span>
          <span className="text-[10px] text-neutral-400">({platform.name})</span>
        </div>

        <button
          onClick={handleClearSession}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Bersihkan Sesi & Cookies Akun Ini"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleOpenExternal}
          className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 hover:bg-rose-50 transition-colors"
          title="Buka di Browser Luar (Jika Diperlukan)"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </button>

      </div>

    </div>
  );
};
