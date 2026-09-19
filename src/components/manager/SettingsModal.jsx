import React, { useState } from 'react';
import { useManager } from '../../context/ManagerContext';
import { 
  X, 
  Download, 
  Upload, 
  Trash2, 
  Folder, 
  ShieldCheck, 
  RotateCcw,
  Sparkles,
  HardDrive
} from 'lucide-react';

export const SettingsModal = () => {
  const { 
    isSettingsModalOpen, 
    setIsSettingsModalOpen, 
    exportAccountsJson, 
    importAccountsJson, 
    showToast 
  } = useManager();

  const [importJsonText, setImportJsonText] = useState('');
  const [showImportArea, setShowImportArea] = useState(false);

  if (!isSettingsModalOpen) return null;

  const handleImportSubmit = () => {
    if (!importJsonText.trim()) return;
    const success = importAccountsJson(importJsonText);
    if (success) {
      setImportJsonText('');
      setShowImportArea(false);
      setIsSettingsModalOpen(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const success = importAccountsJson(content);
      if (success) {
        setIsSettingsModalOpen(false);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-rose-100 shadow-2xl space-y-6 text-left animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-rose-100">
          <div>
            <h3 className="text-base font-extrabold text-neutral-900">
              Pengaturan & Cadangan Data
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              Zea App Manager • Multi-Profile Engine
            </p>
          </div>
          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="p-1 rounded-full text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Storage Location Info */}
        <div className="bg-rose-50/50 p-4 rounded-2xl border border-rose-100 text-xs space-y-2">
          <div className="flex items-center gap-2 text-zea-800 font-bold">
            <HardDrive className="w-4 h-4 text-zea-700" />
            <span>Penyimpanan Profil Lokal (WebView2)</span>
          </div>
          <p className="text-neutral-500 font-mono text-[11px] break-all bg-white p-2 rounded-xl border border-rose-200/60">
            %LOCALAPPDATA%\ZeaAppManager\Profiles
          </p>
          <p className="text-[11px] text-neutral-500 leading-relaxed">
            Semua cookies, data login Google/Dola/ChatGPT, dan cache tersimpan terpisah di folder lokal komputer Anda tanpa diunggah ke cloud pihak ketiga.
          </p>
        </div>

        {/* Backup & Restore */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
            Cadangkan / Pulihkan Akun (accounts.json)
          </h4>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={exportAccountsJson}
              className="p-3 rounded-2xl border border-rose-200 hover:border-zea-600 bg-white hover:bg-rose-50 text-neutral-700 hover:text-zea-800 flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-xs"
            >
              <Download className="w-4 h-4 text-zea-700" />
              <span>Ekspor accounts.json</span>
            </button>

            <label className="p-3 rounded-2xl border border-rose-200 hover:border-zea-600 bg-white hover:bg-rose-50 text-neutral-700 hover:text-zea-800 flex items-center justify-center gap-2 text-xs font-bold transition-all shadow-xs cursor-pointer">
              <Upload className="w-4 h-4 text-zea-700" />
              <span>Impor Berkas JSON</span>
              <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
            </label>
          </div>

          {showImportArea ? (
            <div className="space-y-2 pt-2">
              <textarea
                placeholder="Tempelkan isi file accounts.json di sini..."
                value={importJsonText}
                onChange={(e) => setImportJsonText(e.target.value)}
                className="w-full h-24 p-3 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-mono focus:outline-none"
              />
              <div className="flex gap-2">
                <button
                  onClick={handleImportSubmit}
                  className="px-3 py-1.5 bg-zea-700 text-white rounded-lg text-xs font-bold"
                >
                  Proses Impor
                </button>
                <button
                  onClick={() => setShowImportArea(false)}
                  className="px-3 py-1.5 bg-neutral-200 text-neutral-700 rounded-lg text-xs font-medium"
                >
                  Tutup
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowImportArea(true)}
              className="text-[11px] text-zea-700 hover:underline"
            >
              Atau tempel format JSON manual
            </button>
          )}
        </div>

        {/* Clear All Cache / Clean Profiles */}
        <div className="pt-2 border-t border-rose-100 flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('Reset seluruh daftar akun ke profil awal?')) {
                localStorage.removeItem('zea_accounts');
                window.location.reload();
              }
            }}
            className="text-xs text-red-600 hover:text-red-700 hover:underline flex items-center gap-1 font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset ke Contoh Default</span>
          </button>

          <button
            onClick={() => setIsSettingsModalOpen(false)}
            className="px-4 py-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold transition-colors"
          >
            Selesai
          </button>
        </div>

      </div>
    </div>
  );
};
