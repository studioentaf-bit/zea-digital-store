import React, { useState } from 'react';
import { useZea } from '../context/ZeaContext';
import { 
  Key, 
  ShoppingBag, 
  DollarSign, 
  Plus, 
  Edit3, 
  Trash2, 
  ExternalLink, 
  Copy, 
  Check, 
  X,
  Database,
  RefreshCw,
  FileCode
} from 'lucide-react';
import { testSupabaseConnection } from '../lib/supabase';

export const ZeaAdminPanel = () => {
  const { 
    orders, 
    licenses, 
    digitalProducts, 
    updateProduct, 
    addProduct, 
    deleteProduct, 
    createManualLicense,
    isSupabaseConnected,
    supabaseConfig,
    saveSupabaseCredentials,
    syncWithSupabase,
    showToast
  } = useZea();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'licenses' | 'products'
  const [copiedText, setCopiedText] = useState(null);

  // Supabase Settings Modal
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);
  const [sbUrl, setSbUrl] = useState(supabaseConfig.url || '');
  const [sbKey, setSbKey] = useState(supabaseConfig.key || '');
  const [isTestingSb, setIsTestingSb] = useState(false);
  const [sbTestResult, setSbTestResult] = useState(null);

  // Modal: Create Manual License
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [newLicPlan, setNewLicPlan] = useState('Lisensi 1 Tahun');
  const [newLicBuyer, setNewLicBuyer] = useState('');
  const [newLicContact, setNewLicContact] = useState('');
  const [newLicExpiry, setNewLicExpiry] = useState('1 Tahun ke Depan');

  // Modal: Edit/Add Product
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [prodForm, setProdForm] = useState({
    name: '',
    category: 'Notion Template',
    price: 50000,
    originalPrice: 99000,
    productLink: '',
    image: '',
    description: ''
  });

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2500);
  };

  // Stats Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.price || 0), 0);
  const totalOrdersCount = orders.length;
  const activeLicensesCount = licenses.filter(l => l.status === 'Aktif').length;
  const totalProductsCount = digitalProducts.length;

  const handleCreateLicense = (e) => {
    e.preventDefault();
    if (!newLicBuyer.trim()) return;
    createManualLicense({
      planName: newLicPlan,
      buyerName: newLicBuyer,
      buyerContact: newLicContact,
      expiryDate: newLicExpiry
    });
    setNewLicBuyer('');
    setNewLicContact('');
    setIsLicenseModalOpen(false);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProdForm({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      originalPrice: prod.originalPrice || '',
      productLink: prod.productLink,
      image: prod.image,
      description: prod.description
    });
    setIsProductModalOpen(true);
  };

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdForm({
      name: '',
      category: 'Notion Template',
      price: 65000,
      originalPrice: 120000,
      productLink: 'https://drive.google.com/drive/folders/...',
      image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
      description: ''
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!prodForm.name.trim() || !prodForm.productLink.trim()) return;

    if (editingProductId) {
      updateProduct(editingProductId, {
        name: prodForm.name,
        category: prodForm.category,
        price: Number(prodForm.price),
        originalPrice: Number(prodForm.originalPrice) || null,
        productLink: prodForm.productLink,
        image: prodForm.image,
        description: prodForm.description
      });
    } else {
      addProduct({
        name: prodForm.name,
        category: prodForm.category,
        price: Number(prodForm.price),
        originalPrice: Number(prodForm.originalPrice) || null,
        productLink: prodForm.productLink,
        image: prodForm.image,
        description: prodForm.description,
        features: ['Akses instan via link', 'Update gratis']
      });
    }
    setIsProductModalOpen(false);
  };

  const handleSaveSupabase = async (e) => {
    e.preventDefault();
    await saveSupabaseCredentials(sbUrl, sbKey);
    setIsSupabaseModalOpen(false);
  };

  const handleTestSupabase = async () => {
    setIsTestingSb(true);
    setSbTestResult(null);
    // Temporary set to test
    if (sbUrl) localStorage.setItem('zea_supabase_url', sbUrl.trim());
    if (sbKey) localStorage.setItem('zea_supabase_key', sbKey.trim());
    const res = await testSupabaseConnection();
    setSbTestResult(res);
    setIsTestingSb(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#7A1F1F] text-white flex items-center justify-center font-black text-2xl shadow-md">
            Z
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-neutral-900">Panel Admin Zea</h1>
              {isSupabaseConnected ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Supabase Connected
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                  Local Storage Mode
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-500">
              Kelola pesanan, serial lisensi aplikasi, dan link produk digital.
            </p>
          </div>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              setSbUrl(supabaseConfig.url || '');
              setSbKey(supabaseConfig.key || '');
              setSbTestResult(null);
              setIsSupabaseModalOpen(true);
            }}
            className="px-3.5 py-2.5 rounded-xl bg-white border border-rose-200 text-neutral-700 text-xs font-bold hover:bg-rose-50 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Database className="w-3.5 h-3.5 text-[#7A1F1F]" />
            <span>Database Supabase</span>
          </button>
          <button
            onClick={() => setIsLicenseModalOpen(true)}
            className="px-3.5 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Key className="w-3.5 h-3.5 text-amber-400" />
            <span>Generate Lisensi Manual</span>
          </button>
          <button
            onClick={handleOpenAddProduct}
            className="px-3.5 py-2.5 rounded-xl bg-[#7A1F1F] text-white text-xs font-bold hover:bg-[#661818] flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Produk Digital</span>
          </button>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-md space-y-1">
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Total Penjualan</div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900">
            Rp {totalRevenue.toLocaleString('id-ID')}
          </div>
          <div className="text-[11px] text-emerald-600 font-semibold">Semua waktu (Lunas)</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-md space-y-1">
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Total Transaksi</div>
          <div className="text-2xl sm:text-3xl font-black text-[#7A1F1F]">
            {totalOrdersCount} Pesanan
          </div>
          <div className="text-[11px] text-neutral-500 font-medium">Guest Checkout</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-md space-y-1">
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Lisensi App Aktif</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700">
            {activeLicensesCount} Lisensi
          </div>
          <div className="text-[11px] text-neutral-500 font-medium">Zea App Manager</div>
        </div>

        <div className="p-6 rounded-3xl bg-white border border-rose-100 shadow-md space-y-1">
          <div className="text-xs text-neutral-400 font-semibold uppercase tracking-wider">Katalog Produk</div>
          <div className="text-2xl sm:text-3xl font-black text-neutral-900">
            {totalProductsCount} Produk
          </div>
          <div className="text-[11px] text-neutral-500 font-medium">Dilengkapi Link Akses</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center justify-between gap-4 border-b border-rose-100 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'orders'
                ? 'bg-[#7A1F1F] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:bg-rose-50'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>Data Pesanan ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('licenses')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'licenses'
                ? 'bg-[#7A1F1F] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:bg-rose-50'
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Data Lisensi App ({licenses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`px-5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'products'
                ? 'bg-[#7A1F1F] text-white shadow-xs'
                : 'bg-white text-neutral-600 hover:bg-rose-50'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Produk & Link Akses ({digitalProducts.length})</span>
          </button>
        </div>

        <button
          onClick={() => syncWithSupabase()}
          className="p-2 rounded-xl bg-white border border-rose-100 text-neutral-600 hover:text-[#7A1F1F] text-xs font-semibold flex items-center gap-1.5"
          title="Sinkronisasi Ulang Database"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Refresh Data</span>
        </button>
      </div>

      {/* TAB 1: DATA PESANAN */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
          <div className="p-4 border-b border-rose-50 flex items-center justify-between">
            <h3 className="text-sm font-bold text-neutral-800">Daftar Seluruh Pesanan Pengunjung</h3>
            <span className="text-xs text-neutral-400">
              {isSupabaseConnected ? 'Tersinkron dengan Supabase' : 'Tersimpan di Browser Lokal'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-[#FAF6F5] text-neutral-500 font-bold border-b border-rose-100 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Order ID & Tanggal</th>
                  <th className="py-3 px-4">Pembeli (Guest)</th>
                  <th className="py-3 px-4">Item Pesanan</th>
                  <th className="py-3 px-4">Harga & Metode</th>
                  <th className="py-3 px-4">Serial Lisensi / Link Produk</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {orders.map((ord) => {
                  const isApp = ord.itemType === 'app_license';
                  return (
                    <tr key={ord.id} className="hover:bg-rose-50/40 transition-colors">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">{ord.id}</div>
                        <div className="text-[10px] text-neutral-400">{ord.date}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-neutral-800">{ord.buyerName}</div>
                        <div className="text-[10px] text-neutral-400">{ord.buyerContact}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-neutral-800">{ord.itemName}</div>
                        <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-neutral-100 text-neutral-600">
                          {isApp ? 'Desktop License' : 'Digital Link'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-neutral-900">Rp {ord.price.toLocaleString('id-ID')}</div>
                        <div className="text-[10px] text-neutral-400">{ord.paymentMethod}</div>
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        {isApp ? (
                          <div className="flex items-center gap-1.5">
                            <code className="bg-neutral-900 text-amber-300 px-2 py-1 rounded text-[11px] font-mono">
                              {ord.licenseKey}
                            </code>
                            <button
                              onClick={() => handleCopy(ord.licenseKey, ord.id)}
                              className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
                              title="Salin Serial"
                            >
                              {copiedText === ord.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs text-neutral-500 truncate max-w-[160px]">
                              {ord.productLink}
                            </span>
                            <button
                              onClick={() => handleCopy(ord.productLink, ord.id)}
                              className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
                              title="Salin Link"
                            >
                              {copiedText === ord.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                            <a
                              href={ord.productLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
                              title="Buka Link"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {ord.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: DATA LISENSI APLIKASI */}
      {activeTab === 'licenses' && (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
          <div className="p-4 border-b border-rose-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-800">Daftar Serial Lisensi Zea App Manager</h3>
              <p className="text-xs text-neutral-400">Serial yang digenerate otomatis saat checkout atau manual oleh admin.</p>
            </div>
            <button
              onClick={() => setIsLicenseModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-neutral-900 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Generate Baru</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-[#FAF6F5] text-neutral-500 font-bold border-b border-rose-100 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Serial Lisensi</th>
                  <th className="py-3 px-4">Paket</th>
                  <th className="py-3 px-4">Pemilik (User)</th>
                  <th className="py-3 px-4">Tgl Terbit</th>
                  <th className="py-3 px-4">Masa Berlaku</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {licenses.map((lic, idx) => (
                  <tr key={idx} className="hover:bg-rose-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <code className="bg-neutral-900 text-amber-300 px-2 py-1 rounded text-xs font-mono font-bold">
                          {lic.key}
                        </code>
                        <button
                          onClick={() => handleCopy(lic.key, lic.key)}
                          className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
                        >
                          {copiedText === lic.key ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-neutral-800">
                      {lic.planName}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-900">{lic.buyerName}</div>
                      <div className="text-[10px] text-neutral-400">{lic.buyerContact}</div>
                    </td>
                    <td className="py-3.5 px-4 text-neutral-500">{lic.createdDate}</td>
                    <td className="py-3.5 px-4 text-emerald-700 font-semibold">{lic.expiryDate}</td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                        {lic.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: PRODUK DIGITAL & LINK AKSES */}
      {activeTab === 'products' && (
        <div className="bg-white rounded-3xl border border-rose-100 shadow-md overflow-hidden">
          <div className="p-4 border-b border-rose-50 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-neutral-800">Kelola Katalog Produk Digital & Link Akses</h3>
              <p className="text-xs text-neutral-400">Ubah link Google Drive / Notion / harga produk secara langsung.</p>
            </div>
            <button
              onClick={handleOpenAddProduct}
              className="px-3.5 py-1.5 rounded-xl bg-[#7A1F1F] text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah Produk Baru</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-neutral-600">
              <thead className="bg-[#FAF6F5] text-neutral-500 font-bold border-b border-rose-100 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Produk</th>
                  <th className="py-3 px-4">Kategori</th>
                  <th className="py-3 px-4">Harga Jual</th>
                  <th className="py-3 px-4">Link Akses Pembeli (Google Drive / Notion)</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rose-50">
                {digitalProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-rose-50/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-10 h-10 rounded-xl object-cover border" />
                        <div>
                          <div className="font-bold text-neutral-900">{p.name}</div>
                          <div className="text-[10px] text-neutral-400">{p.salesCount}+ terjual</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-full bg-rose-50 text-[#7A1F1F] font-bold text-[10px]">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-bold text-neutral-900">
                      Rp {p.price.toLocaleString('id-ID')}
                    </td>
                    <td className="py-3.5 px-4 max-w-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-neutral-700 truncate max-w-[200px]">
                          {p.productLink}
                        </span>
                        <a
                          href={p.productLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-600 cursor-pointer"
                          title="Buka Link Produk"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => handleOpenEditProduct(p)}
                          className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 cursor-pointer"
                          title="Edit Produk & Link"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Hapus produk '${p.name}'?`)) {
                              deleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 cursor-pointer"
                          title="Hapus Produk"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL: SUPABASE CONFIGURATION */}
      {isSupabaseModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-[#7A1F1F]" />
                <span>Pengaturan Database Supabase</span>
              </h3>
              <button onClick={() => setIsSupabaseModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSupabase} className="space-y-4 text-xs">
              <p className="text-neutral-600 text-xs leading-relaxed">
                Sambungkan website ke Supabase gratis untuk menyimpan data pesanan, lisensi, dan link produk di cloud secara permanen.
              </p>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Supabase Project URL</label>
                <input
                  type="url"
                  placeholder="https://xyzproject.supabase.co"
                  value={sbUrl}
                  onChange={(e) => setSbUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 font-mono text-xs focus:ring-2 focus:ring-[#7A1F1F]/20"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Supabase Anon Key (Public)</label>
                <textarea
                  rows="3"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={sbKey}
                  onChange={(e) => setSbKey(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200 font-mono text-xs focus:ring-2 focus:ring-[#7A1F1F]/20"
                />
              </div>

              {/* Schema Notice */}
              <div className="p-3 rounded-2xl bg-rose-50/80 border border-rose-100 space-y-1">
                <div className="font-bold text-[#7A1F1F] flex items-center gap-1.5">
                  <FileCode className="w-4 h-4" />
                  <span>Skema SQL Tersedia</span>
                </div>
                <p className="text-[11px] text-neutral-600">
                  File skema tabel lengkap tersimpan di <code>supabase-schema.sql</code>. Buka menu SQL Editor di Supabase Dashboard Anda lalu jalankan query tersebut untuk membuat tabel otomatis.
                </p>
              </div>

              {sbTestResult && (
                <div className={`p-2.5 rounded-xl text-xs font-semibold ${
                  sbTestResult.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}>
                  {sbTestResult.message}
                </div>
              )}

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={handleTestSupabase}
                  disabled={isTestingSb}
                  className="px-4 py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-bold"
                >
                  {isTestingSb ? 'Menguji...' : 'Tes Koneksi'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#7A1F1F] text-white font-bold hover:bg-[#661818]"
                >
                  Simpan Konfigurasi
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: CREATE MANUAL LICENSE */}
      {isLicenseModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <Key className="w-4 h-4 text-[#7A1F1F]" />
                <span>Terbitkan Lisensi Manual</span>
              </h3>
              <button onClick={() => setIsLicenseModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateLicense} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Paket Lisensi</label>
                <select
                  value={newLicPlan}
                  onChange={(e) => setNewLicPlan(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                >
                  <option value="Lisensi 1 Bulan">Lisensi 1 Bulan</option>
                  <option value="Lisensi 1 Tahun">Lisensi 1 Tahun</option>
                  <option value="Lisensi Lifetime">Lisensi Lifetime (Permanen)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Nama Pemilik / Klien</label>
                <input
                  type="text"
                  required
                  placeholder="Nama klien"
                  value={newLicBuyer}
                  onChange={(e) => setNewLicBuyer(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">WhatsApp / Email</label>
                <input
                  type="text"
                  placeholder="0812... / email"
                  value={newLicContact}
                  onChange={(e) => setNewLicContact(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Masa Berlaku</label>
                <input
                  type="text"
                  value={newLicExpiry}
                  onChange={(e) => setNewLicExpiry(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#7A1F1F] text-white font-bold hover:bg-[#661818] cursor-pointer"
                >
                  Terbitkan Lisensi Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT / ADD PRODUCT & LINK */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-sm font-bold text-neutral-900 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-[#7A1F1F]" />
                <span>{editingProductId ? 'Edit Produk & Link Akses' : 'Tambah Produk Digital Baru'}</span>
              </h3>
              <button onClick={() => setIsProductModalOpen(false)} className="text-neutral-400 hover:text-neutral-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-neutral-700 mb-1">Nama Produk</label>
                <input
                  type="text"
                  required
                  value={prodForm.name}
                  onChange={(e) => setProdForm({ ...prodForm, name: e.target.value })}
                  placeholder="Contoh: Notion Ultimate Planner"
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Kategori</label>
                  <select
                    value={prodForm.category}
                    onChange={(e) => setProdForm({ ...prodForm, category: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-neutral-200"
                  >
                    <option value="Notion Template">Notion Template</option>
                    <option value="AI Prompts">AI Prompts</option>
                    <option value="Template & SOP">Template & SOP</option>
                    <option value="Spreadsheet">Spreadsheet</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-neutral-700 mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    required
                    value={prodForm.price}
                    onChange={(e) => setProdForm({ ...prodForm, price: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-neutral-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-rose-700 mb-1">
                  Link Akses Produk (Google Drive / Notion / File) *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/drive/folders/... atau https://notion.so/..."
                  value={prodForm.productLink}
                  onChange={(e) => setProdForm({ ...prodForm, productLink: e.target.value })}
                  className="w-full p-2.5 rounded-xl border-2 border-rose-200 bg-rose-50/50 font-mono text-xs focus:ring-2 focus:ring-[#7A1F1F]/20"
                />
                <span className="text-[10px] text-neutral-400 mt-0.5 block">
                  Link ini akan langsung diberikan kepada pembeli begitu pembayaran selesai.
                </span>
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">URL Gambar Thumbnail</label>
                <input
                  type="text"
                  value={prodForm.image}
                  onChange={(e) => setProdForm({ ...prodForm, image: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                />
              </div>

              <div>
                <label className="block font-bold text-neutral-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows="2"
                  value={prodForm.description}
                  onChange={(e) => setProdForm({ ...prodForm, description: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-neutral-200"
                ></textarea>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#7A1F1F] text-white font-bold hover:bg-[#661818] cursor-pointer"
                >
                  {editingProductId ? 'Simpan Perubahan' : 'Tambah Produk Sekarang'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
