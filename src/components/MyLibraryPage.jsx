import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  BookOpen, 
  User, 
  ShoppingBag, 
  Bell, 
  Settings, 
  Download, 
  ExternalLink,
  FileCheck
} from 'lucide-react';

export const MyLibraryPage = () => {
  const { libraryItems, navigateTo, showToast } = useStore();

  const [activeCategoryTab, setActiveCategoryTab] = useState('Semua');
  const [downloadModalItem, setDownloadModalItem] = useState(null);

  const tabs = ['Semua', 'Produk Digital', 'Template & E-book', 'AI Tools'];

  const filteredItems = libraryItems.filter(item => {
    if (activeCategoryTab === 'Semua') return true;
    if (activeCategoryTab === 'Template & E-book') return item.category === 'Template';
    if (activeCategoryTab === 'AI Tools') return item.category === 'AI Tools';
    return true;
  });

  const handleDownloadTrigger = (item) => {
    setDownloadModalItem(item);
  };

  const handleSimulatedDownloadFile = (fileName) => {
    const content = "ZEA DIGITAL STORE - LISENSI RESMI\nProduk: " + (downloadModalItem ? downloadModalItem.name : "Digital Product") + "\nKode Lisensi: ZEA-PRO-" + Math.random().toString(36).substring(2, 9).toUpperCase() + "\nStatus: Terverifikasi & Aktif\nTerima kasih telah berbelanja di ZEA Digital Store.";
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = fileName || 'digital_product_license.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showToast(`Mengunduh ${fileName || 'file'}...`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Customer Account Sidebar */}
        <aside className="lg:col-span-3 space-y-6">
          <div className="bg-white rounded-3xl p-5 border border-rose-100/90 shadow-soft sticky top-24">
            
            {/* User Profile Mini */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-rose-50/50 border border-rose-100 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-rose-200">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80" 
                  alt="Andi Saputra" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-xs text-neutral-800 truncate">Andi Saputra</p>
                <p className="text-[11px] text-neutral-500 truncate">Member Prioritas</p>
              </div>
            </div>

            {/* Sidebar Navigation */}
            <div className="space-y-1">
              <button 
                onClick={() => showToast('Membuka profil akun', 'info')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-neutral-600 hover:bg-rose-50 hover:text-neutral-900 transition-colors"
              >
                <User className="w-4 h-4 text-neutral-400" />
                <span>Akun Saya</span>
              </button>

              <button 
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold bg-rose-50 text-zea-800 border border-rose-200/90 shadow-xs"
              >
                <BookOpen className="w-4 h-4 text-zea-700" />
                <span>Perpustakaan Saya</span>
              </button>

              <button 
                onClick={() => navigateTo('admin')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-neutral-600 hover:bg-rose-50 hover:text-neutral-900 transition-colors"
              >
                <ShoppingBag className="w-4 h-4 text-neutral-400" />
                <span>Pesanan</span>
              </button>

              <button 
                onClick={() => showToast('Belum ada notifikasi baru', 'info')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-neutral-600 hover:bg-rose-50 hover:text-neutral-900 transition-colors"
              >
                <Bell className="w-4 h-4 text-neutral-400" />
                <span>Notifikasi</span>
              </button>

              <button 
                onClick={() => showToast('Pengaturan preferensi akun', 'info')}
                className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold text-neutral-600 hover:bg-rose-50 hover:text-neutral-900 transition-colors"
              >
                <Settings className="w-4 h-4 text-neutral-400" />
                <span>Pengaturan</span>
              </button>
            </div>

          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-9 space-y-6">
          
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-soft space-y-6">
            
            {/* Header */}
            <div>
              <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Perpustakaan Saya
              </h1>
              <p className="text-xs text-neutral-500 mt-1">
                Kelola produk yang sudah kamu beli dan unduh file kapan saja.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 border-b border-rose-50 pb-4">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCategoryTab(tab)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    activeCategoryTab === tab
                      ? 'bg-zea-700 text-white shadow-xs'
                      : 'bg-rose-50/70 text-neutral-600 hover:bg-rose-100/80'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Purchased Items List */}
            {filteredItems.length > 0 ? (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-5 rounded-2xl border border-rose-100 bg-[#FFFDFD] hover:border-rose-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    {/* Item info */}
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-14 rounded-xl overflow-hidden bg-rose-50 border border-rose-100 shrink-0">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>

                      <div className="min-w-0">
                        <h4 className="font-bold text-sm text-neutral-900 truncate">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-neutral-400 mt-0.5">
                          Dibeli pada {item.purchaseDate || '12 Apr 2025'}
                        </p>
                        <span className="inline-block mt-1 text-[10px] font-semibold text-zea-800 bg-rose-100/80 px-2 py-0.5 rounded">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleDownloadTrigger(item)}
                        className="px-4 py-2 rounded-xl bg-zea-700 hover:bg-zea-800 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh</span>
                      </button>

                      <button
                        onClick={() => navigateTo('product-detail', item.id)}
                        className="px-3.5 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-neutral-700 text-xs font-semibold transition-all"
                      >
                        <span>Lihat Detail</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500">
                <BookOpen className="w-10 h-10 mx-auto text-rose-300 mb-2" />
                <p className="text-xs">Tidak ada produk di kategori ini.</p>
              </div>
            )}

          </div>

        </main>

      </div>

      {/* Download / Resource Access Modal */}
      {downloadModalItem && (
        <div className="fixed inset-0 z-50 bg-neutral-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 border border-rose-100 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-rose-100">
              <div className="flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-zea-700" />
                <h3 className="font-bold text-sm text-neutral-900">Akses Berkas Digital</h3>
              </div>
              <button
                onClick={() => setDownloadModalItem(null)}
                className="text-neutral-400 hover:text-neutral-800 text-lg leading-none"
              >
                &times;
              </button>
            </div>

            <div>
              <h4 className="font-extrabold text-base text-neutral-900">{downloadModalItem.name}</h4>
              <p className="text-xs text-neutral-500 mt-0.5">Lisensi Resmi Terverifikasi</p>
            </div>

            <div className="bg-rose-50/60 p-4 rounded-2xl border border-rose-100 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-500">Nama File:</span>
                <span className="font-mono font-semibold text-neutral-800">{downloadModalItem.fileName || 'ZEA_File_Resource.zip'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Tipe:</span>
                <span className="font-semibold text-neutral-800">Template & Panduan Lengkap</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Kunci Lisensi:</span>
                <span className="font-mono text-zea-700 font-bold">ZEA-PRO-2026-X8</span>
              </div>
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={() => {
                  handleSimulatedDownloadFile(downloadModalItem.fileName);
                  setDownloadModalItem(null);
                }}
                className="w-full py-3 rounded-2xl bg-zea-700 hover:bg-zea-800 text-white text-xs font-bold shadow-md shadow-zea-700/25 flex items-center justify-center gap-2 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Unduh Paket File (.ZIP)</span>
              </button>

              <button
                onClick={() => {
                  window.open('https://notion.so', '_blank');
                  showToast('Membuka tautan Notion template...', 'info');
                }}
                className="w-full py-2.5 rounded-2xl border border-rose-200 hover:bg-rose-50 text-neutral-700 text-xs font-semibold flex items-center justify-center gap-2 transition-all"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Buka di Notion / Cloud Workspace</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
