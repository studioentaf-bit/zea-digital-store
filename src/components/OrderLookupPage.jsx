import React, { useState } from 'react';
import { useZea } from '../context/ZeaContext';
import { 
  Search, 
  Key, 
  ExternalLink, 
  Copy, 
  Check, 
  Download, 
  HelpCircle
} from 'lucide-react';

export const OrderLookupPage = () => {
  const { findOrdersByContact } = useZea();
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState([]);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = findOrdersByContact(query);
    setResults(res);
    setSearched(true);
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(id);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1F1F] uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-200/70">
          <Key className="w-3.5 h-3.5" />
          <span>Akses Mandiri Tanpa Login</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 tracking-tight">
          Cek Lisensi & Link Produk Anda
        </h1>
        <p className="text-sm text-neutral-600 max-w-lg mx-auto">
          Lupa mencatat serial lisensi aplikasi atau link produk digital yang sudah dibeli? Cukup masukkan nomor WhatsApp, Email, atau ID Pesanan Anda.
        </p>
      </div>

      {/* Search Input Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl shadow-rose-950/5">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Masukkan No. WhatsApp / Email / ID Pesanan (cth: 0812... / ZEA-ORD-...)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-rose-100 bg-[#FAF6F5]/50 text-xs sm:text-sm text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#7A1F1F]/20 focus:border-[#7A1F1F]"
            />
          </div>
          <button
            type="submit"
            className="px-8 py-3.5 rounded-2xl bg-[#7A1F1F] text-white text-xs sm:text-sm font-bold shadow-md hover:bg-[#661818] transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Cari Data Pesanan</span>
          </button>
        </form>
      </div>

      {/* Results Area */}
      {searched && (
        <div className="space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between text-xs text-neutral-500 px-2">
            <span>Ditemukan {results.length} pesanan untuk: <strong>{query}</strong></span>
          </div>

          {results.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-rose-100 p-6 space-y-2">
              <HelpCircle className="w-10 h-10 text-neutral-300 mx-auto" />
              <h3 className="text-base font-bold text-neutral-800">Pesanan Tidak Ditemukan</h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                Pastikan nomor WhatsApp atau email yang Anda masukkan sesuai persis dengan data yang dimasukkan saat checkout.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((order) => {
                const isApp = order.itemType === 'app_license';
                return (
                  <div
                    key={order.id}
                    className="p-6 rounded-3xl bg-white border border-rose-100 shadow-md space-y-4"
                  >
                    {/* Top Row: Order ID & Date */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-rose-50">
                      <div>
                        <div className="text-xs font-bold text-[#7A1F1F]">{order.id}</div>
                        <div className="text-[11px] text-neutral-400">{order.date}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200">
                          ✓ {order.status}
                        </span>
                        <span className="text-xs font-bold text-neutral-800">
                          Rp {order.price.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>

                    {/* Middle Row: Product Name & Buyer Info */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="text-base font-bold text-neutral-900">{order.itemName}</h3>
                        <p className="text-xs text-neutral-500">
                          Pembeli: <strong>{order.buyerName}</strong> ({order.buyerContact}) • Bayar: {order.paymentMethod}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Row: Key or Product Link */}
                    {isApp && order.licenseKey ? (
                      <div className="p-4 rounded-2xl bg-neutral-950 text-white space-y-2">
                        <div className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider flex items-center justify-between">
                          <span>Serial Lisensi Zea App Manager:</span>
                          <span className="text-emerald-400">Aktif</span>
                        </div>
                        <div className="flex items-center justify-between gap-2 bg-neutral-900 p-2.5 rounded-xl border border-neutral-800">
                          <code className="text-sm font-mono font-bold text-amber-300 select-all">
                            {order.licenseKey}
                          </code>
                          <button
                            onClick={() => handleCopy(order.licenseKey, order.id)}
                            className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs flex items-center gap-1 cursor-pointer"
                          >
                            {copiedKey === order.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedKey === order.id ? 'Disalin' : 'Salin'}</span>
                          </button>
                        </div>
                        <div className="pt-1 flex items-center justify-end">
                          <a
                            href={order.productLink || '/ZeaAppManager-Setup.exe'}
                            download
                            className="inline-flex items-center gap-1.5 text-xs text-rose-300 hover:text-white font-semibold underline cursor-pointer"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Ulang Aplikasi (.exe)</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                        <div className="space-y-1 max-w-md">
                          <span className="text-[11px] font-bold text-[#7A1F1F]">Link Akses Produk Digital:</span>
                          <div className="text-xs font-mono text-neutral-600 truncate">{order.productLink}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleCopy(order.productLink, order.id)}
                            className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-neutral-700 text-xs font-semibold hover:bg-rose-50 flex items-center gap-1.5 cursor-pointer"
                          >
                            {copiedKey === order.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                            <span>{copiedKey === order.id ? 'Disalin' : 'Salin'}</span>
                          </button>
                          <a
                            href={order.productLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-1.5 rounded-xl bg-[#7A1F1F] text-white text-xs font-bold hover:bg-[#661818] flex items-center gap-1.5 shadow-xs cursor-pointer"
                          >
                            <span>Buka Link</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Info Help */}
      <div className="text-center pt-6">
        <p className="text-xs text-neutral-400">
          Butuh bantuan terkait pesanan atau lisensi? Hubungi admin resmi Zea via WhatsApp di{' '}
          <span className="font-bold text-neutral-700">0812-9847-1203</span>
        </p>
      </div>

    </div>
  );
};
