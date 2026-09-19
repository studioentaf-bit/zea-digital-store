import React, { useState } from 'react';
import { useZea } from '../context/ZeaContext';
import { 
  X, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  QrCode, 
  CreditCard, 
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const InstantCheckoutModal = () => {
  const { isCheckoutModalOpen, closeCheckout, checkoutItem, completeCheckout } = useZea();

  const [buyerName, setBuyerName] = useState('');
  const [buyerContact, setBuyerContact] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('QRIS Instant');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isCheckoutModalOpen || !checkoutItem) return null;

  const handlePay = (e) => {
    e.preventDefault();
    if (!buyerName.trim() || !buyerContact.trim()) return;

    setIsProcessing(true);

    setTimeout(() => {
      const res = completeCheckout({
        buyerName,
        buyerContact,
        paymentMethod
      });
      setResult(res);
      setIsProcessing(false);

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }, 1000);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'key') {
      setCopiedKey(true);
      setTimeout(() => setCopiedKey(false), 2500);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleClose = () => {
    setResult(null);
    setBuyerName('');
    setBuyerContact('');
    setIsProcessing(false);
    closeCheckout();
  };

  const isAppLicense = checkoutItem.type === 'app_license';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-rose-100 overflow-hidden animate-fadeIn my-8">
        
        {/* Modal Header */}
        <div className="p-6 bg-[#FAF6F5] border-b border-rose-100/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#7A1F1F] text-white flex items-center justify-center font-bold text-sm">
              Z
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">
                {result ? 'Pembayaran Berhasil 🎉' : 'Checkout Langsung (Tanpa Login)'}
              </h3>
              <p className="text-[11px] text-neutral-500">
                {result ? 'Pesanan selesai & akses otomatis terbit' : 'Isi data untuk menerima lisensi atau link produk'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-xl text-neutral-400 hover:text-neutral-700 hover:bg-white transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {!result ? (
            /* STEP 1: FORM CHECKOUT */
            <form onSubmit={handlePay} className="space-y-6">
              
              {/* Product Summary Card */}
              <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-100 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#7A1F1F] px-2 py-0.5 rounded-full bg-white border border-rose-200">
                    {isAppLicense ? 'Lisensi Desktop App' : 'Produk Digital'}
                  </span>
                  <h4 className="text-sm font-bold text-neutral-900 line-clamp-1">{checkoutItem.name}</h4>
                  <p className="text-xs text-neutral-500">
                    {isAppLicense ? `Durasi: ${checkoutItem.duration}` : checkoutItem.category}
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-neutral-900">
                    Rp {checkoutItem.price.toLocaleString('id-ID')}
                  </div>
                  {checkoutItem.originalPrice && (
                    <div className="text-xs text-neutral-400 line-through">
                      Rp {checkoutItem.originalPrice.toLocaleString('id-ID')}
                    </div>
                  )}
                </div>
              </div>

              {/* Guest Buyer Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Nama Lengkap Anda <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Budi Santoso"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#7A1F1F]/20 focus:border-[#7A1F1F]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">
                    Nomor WhatsApp / Email <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="08123456789 atau email@domain.com"
                    value={buyerContact}
                    onChange={(e) => setBuyerContact(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-[#7A1F1F]/20 focus:border-[#7A1F1F]"
                  />
                  <span className="text-[11px] text-neutral-400 mt-1 block">
                    Digunakan untuk arsip pesanan & pengecekan lisensi Anda.
                  </span>
                </div>

                {/* Payment Method Selector */}
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-2">
                    Pilih Metode Pembayaran
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'QRIS Instant', icon: QrCode, title: 'QRIS' },
                      { id: 'Virtual Account', icon: CreditCard, title: 'VA Bank' },
                      { id: 'E-Wallet (GoPay/Dana)', icon: Smartphone, title: 'E-Wallet' }
                    ].map((pm) => {
                      const Icon = pm.icon;
                      const isSelected = paymentMethod === pm.id;
                      return (
                        <button
                          type="button"
                          key={pm.id}
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                            isSelected
                              ? 'border-[#7A1F1F] bg-rose-50 text-[#7A1F1F] font-bold shadow-xs'
                              : 'border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300'
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-[11px]">{pm.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#7A1F1F] to-[#9B2B2B] text-white font-extrabold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60 cursor-pointer"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Memproses Pembayaran...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Bayar Sekarang (Rp {checkoutItem.price.toLocaleString('id-ID')})</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 mt-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Aman • Langsung Diterima Tanpa Menunggu</span>
                </div>
              </div>

            </form>
          ) : (
            /* STEP 2: PAYMENT SUCCESS & LICENSE / LINK DELIVERY */
            <div className="space-y-6 animate-fadeIn">
              
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-neutral-900">Pembayaran Berhasil Diverifikasi!</h4>
                <p className="text-xs text-neutral-500">
                  ID Pesanan: <strong className="text-neutral-800">{result.orderId}</strong>
                </p>
              </div>

              {/* CASE A: ZEAP APP MANAGER LICENSE */}
              {isAppLicense ? (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-neutral-950 text-white space-y-2 border border-neutral-800 shadow-inner">
                    <div className="text-[11px] text-neutral-400 uppercase font-bold tracking-wider flex items-center justify-between">
                      <span>Serial Lisensi Zea App Manager:</span>
                      <span className="text-emerald-400">Aktif</span>
                    </div>
                    <div className="flex items-center justify-between gap-2 bg-neutral-900 p-3 rounded-xl border border-neutral-700">
                      <code className="text-sm sm:text-base font-mono font-bold text-amber-300 tracking-wider select-all">
                        {result.licenseKey}
                      </code>
                      <button
                        onClick={() => handleCopy(result.licenseKey, 'key')}
                        className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors flex items-center gap-1 text-xs font-semibold cursor-pointer"
                        title="Salin Lisensi"
                      >
                        {copiedKey ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                        <span>{copiedKey ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-400">
                      Lisensi atas nama: <strong>{buyerName}</strong> ({buyerContact})
                    </p>
                  </div>

                  {/* Download App Action */}
                  <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-100 space-y-3">
                    <h5 className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Download className="w-4 h-4 text-[#7A1F1F]" />
                      <span>Unduh Aplikasi Zea App Manager</span>
                    </h5>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      Jalankan file installer atau gunakan versi portabel, lalu masukkan serial lisensi di atas untuk membuka akses tanpa batas.
                    </p>
                    <a
                      href={result.productLink || '/ZeaAppManager-Setup.exe'}
                      download
                      className="w-full py-2.5 rounded-xl bg-[#7A1F1F] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#661818] shadow-sm transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download ZeaAppManager-Setup.exe (460 KB)</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* CASE B: DIGITAL PRODUCT LINK */
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-rose-50/80 border border-rose-200/80 space-y-3">
                    <div className="text-xs font-bold text-neutral-900 flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#7A1F1F]" />
                      <span>Link Akses Produk Digital Anda:</span>
                    </div>
                    <div className="p-3 bg-white rounded-xl border border-rose-100 flex items-center justify-between gap-2">
                      <span className="text-xs font-mono text-neutral-700 truncate select-all">
                        {result.productLink}
                      </span>
                      <button
                        onClick={() => handleCopy(result.productLink, 'link')}
                        className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-600 text-xs flex items-center gap-1 shrink-0 cursor-pointer"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Disalin' : 'Salin'}</span>
                      </button>
                    </div>

                    <a
                      href={result.productLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-xl bg-[#7A1F1F] text-white text-xs font-bold flex items-center justify-center gap-2 hover:bg-[#661818] shadow-md transition-all"
                    >
                      <span>Buka & Akses Link Sekarang</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-bold transition-all cursor-pointer"
              >
                Selesai & Tutup Jendela
              </button>

            </div>
          )}
        </div>

      </div>
    </div>
  );
};
