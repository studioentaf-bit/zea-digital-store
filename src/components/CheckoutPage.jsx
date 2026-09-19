import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  QrCode, 
  Copy, 
  BookOpen
} from 'lucide-react';

export const CheckoutPage = () => {
  const {
    selectedCartItems,
    cartSubtotal,
    discountAmount,
    cartTotal,
    completeCheckout,
    navigateTo,
    showToast
  } = useStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: 'Andi Saputra',
    email: 'andi.saputra@gmail.com',
    whatsapp: '0812-3456-7890',
    optInWa: true
  });

  const [paymentMethod, setPaymentMethod] = useState('qris');
  const [orderResult, setOrderResult] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const formatRupiah = (num) => 'Rp' + num.toLocaleString('id-ID');

  const handleNextToPayment = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.whatsapp) {
      showToast('Harap lengkapi semua data kontak', 'error');
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const result = completeCheckout(formData, paymentMethod);
      setOrderResult(result);
      setIsProcessing(false);
      setStep(3);

      try {
        confetti({
          particleCount: 120,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-rose-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
          Checkout
        </h1>
        <p className="text-xs text-neutral-500 mt-1">
          Lengkapi informasi untuk melanjutkan pembayaran.
        </p>
      </div>

      {/* Stepper Indicator */}
      <div className="flex items-center justify-center max-w-xl mx-auto mb-10 text-xs font-semibold">
        
        {/* Step 1 */}
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 1 ? 'bg-zea-700 text-white' : 'bg-neutral-200 text-neutral-600'
          }`}>
            1
          </div>
          <span className={step >= 1 ? 'text-neutral-900 font-bold' : 'text-neutral-400'}>
            Informasi Kontak
          </span>
        </div>

        <div className={`w-12 sm:w-16 h-0.5 mx-3 ${step >= 2 ? 'bg-zea-700' : 'bg-neutral-200'}`} />

        {/* Step 2 */}
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 2 ? 'bg-zea-700 text-white' : 'bg-neutral-200 text-neutral-600'
          }`}>
            2
          </div>
          <span className={step >= 2 ? 'text-neutral-900 font-bold' : 'text-neutral-400'}>
            Pembayaran
          </span>
        </div>

        <div className={`w-12 sm:w-16 h-0.5 mx-3 ${step >= 3 ? 'bg-zea-700' : 'bg-neutral-200'}`} />

        {/* Step 3 */}
        <div className="flex items-center gap-2">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs ${
            step >= 3 ? 'bg-emerald-600 text-white' : 'bg-neutral-200 text-neutral-600'
          }`}>
            3
          </div>
          <span className={step >= 3 ? 'text-neutral-900 font-bold' : 'text-neutral-400'}>
            Selesai
          </span>
        </div>

      </div>

      {/* STEP 1: FORM KONTAK & RINGKASAN */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-soft space-y-6">
            <h3 className="text-base font-bold text-neutral-900 border-b border-rose-50 pb-3">
              Informasi Kontak
            </h3>

            <form onSubmit={handleNextToPayment} className="space-y-4">
              
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-2xl px-4 py-3 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-zea-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="nama@contoh.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-2xl px-4 py-3 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-zea-500/20"
                />
                <p className="text-[11px] text-neutral-400 mt-1">
                  File lisensi dan tautan download akan dikirimkan ke email ini.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1.5">
                  Nomor WhatsApp
                </label>
                <input
                  type="text"
                  required
                  placeholder="08xx-xxxx-xxxx"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-2xl px-4 py-3 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-zea-500/20"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.optInWa}
                    onChange={(e) => setFormData({ ...formData, optInWa: e.target.checked })}
                    className="w-4 h-4 rounded text-zea-700 focus:ring-zea-500 accent-zea-700"
                  />
                  <span className="text-xs text-neutral-600">
                    Kirim saya informasi terbaru melalui WhatsApp
                  </span>
                </label>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigateTo('cart')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Kembali ke Keranjang</span>
                </button>
              </div>

            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-soft space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-neutral-900 border-b border-rose-50 pb-3 mb-4">
                Ringkasan Pesanan
              </h3>

              {/* Items Mini List */}
              <div className="divide-y divide-rose-50 mb-6">
                {selectedCartItems.map(({ product, quantity }) => (
                  <div key={product.id} className="py-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3 min-w-0">
                      <img src={product.image} alt="" className="w-10 h-10 rounded-xl object-cover shrink-0 border border-rose-100" />
                      <div className="truncate">
                        <p className="font-bold text-neutral-800 truncate">{product.name}</p>
                        <p className="text-neutral-400 text-[10px]">Qty: {quantity}x</p>
                      </div>
                    </div>
                    <span className="font-semibold text-neutral-800 shrink-0">
                      {formatRupiah(product.price * quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Calculation */}
              <div className="space-y-2 text-xs border-t border-rose-100 pt-4">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span>{formatRupiah(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>Diskon</span>
                  <span>- {formatRupiah(discountAmount)}</span>
                </div>
                <div className="pt-3 border-t border-rose-100 flex justify-between items-baseline font-bold">
                  <span className="text-sm text-neutral-900">Total</span>
                  <span className="text-lg text-neutral-900 font-extrabold">
                    {formatRupiah(cartTotal)}
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleNextToPayment}
              className="mt-6 w-full py-3.5 px-6 rounded-2xl bg-zea-700 hover:bg-zea-800 text-white font-bold text-xs shadow-md shadow-zea-700/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>Lanjut ke Pembayaran</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      )}

      {/* STEP 2: METODE PEMBAYARAN */}
      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-soft space-y-6">
            <h3 className="text-base font-bold text-neutral-900 border-b border-rose-50 pb-3">
              Pilih Metode Pembayaran
            </h3>

            {/* Methods */}
            <div className="space-y-3">
              
              {/* QRIS */}
              <label 
                onClick={() => setPaymentMethod('qris')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'qris' 
                    ? 'border-zea-600 bg-rose-50/40 shadow-xs' 
                    : 'border-rose-100 hover:border-rose-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-zea-100 text-zea-800 flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">QRIS (Semua E-Wallet & Bank)</p>
                    <p className="text-[11px] text-neutral-500">BCA, Mandiri, GoPay, OVO, Dana, ShopeePay</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'qris'}
                  onChange={() => setPaymentMethod('qris')}
                  className="w-4 h-4 text-zea-700 accent-zea-700"
                />
              </label>

              {/* Virtual Account BCA */}
              <label 
                onClick={() => setPaymentMethod('va-bca')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'va-bca' 
                    ? 'border-zea-600 bg-rose-50/40 shadow-xs' 
                    : 'border-rose-100 hover:border-rose-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs">
                    BCA
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">BCA Virtual Account</p>
                    <p className="text-[11px] text-neutral-500">Konfirmasi otomatis tanpa upload struk</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'va-bca'}
                  onChange={() => setPaymentMethod('va-bca')}
                  className="w-4 h-4 text-zea-700 accent-zea-700"
                />
              </label>

              {/* Mandiri VA */}
              <label 
                onClick={() => setPaymentMethod('va-mandiri')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  paymentMethod === 'va-mandiri' 
                    ? 'border-zea-600 bg-rose-50/40 shadow-xs' 
                    : 'border-rose-100 hover:border-rose-200'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-800 flex items-center justify-center font-bold text-xs">
                    MDR
                  </div>
                  <div>
                    <p className="text-xs font-bold text-neutral-900">Mandiri Virtual Account</p>
                    <p className="text-[11px] text-neutral-500">Livin' by Mandiri & ATM</p>
                  </div>
                </div>
                <input
                  type="radio"
                  name="payment"
                  checked={paymentMethod === 'va-mandiri'}
                  onChange={() => setPaymentMethod('va-mandiri')}
                  className="w-4 h-4 text-zea-700 accent-zea-700"
                />
              </label>

            </div>

            {/* Payment Interactive Visual Preview */}
            <div className="p-5 rounded-2xl bg-rose-50/60 border border-rose-200/80 text-center space-y-3">
              {paymentMethod === 'qris' && (
                <div>
                  <p className="text-xs font-bold text-neutral-800 mb-2">Scan QRIS ZEA Digital Store</p>
                  <div className="w-40 h-40 bg-white p-3 rounded-2xl mx-auto shadow-sm border border-rose-100 flex items-center justify-center">
                    <img 
                      src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=ZEA-DIGITAL-PAYMENT-107000" 
                      alt="QRIS Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <p className="text-[11px] text-neutral-500 mt-2">
                    Total Bayar: <span className="font-bold text-zea-800">{formatRupiah(cartTotal)}</span>
                  </p>
                </div>
              )}

              {paymentMethod.startsWith('va-') && (
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-neutral-600">Nomor Virtual Account:</p>
                  <div className="flex items-center justify-center gap-2 bg-white px-4 py-2.5 rounded-xl border border-rose-200">
                    <span className="font-mono font-bold text-sm text-neutral-900 tracking-wider">
                      8277 0812 3456 7890
                    </span>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText('8277081234567890');
                        showToast('Nomor VA disalin!');
                      }}
                      className="p-1 text-neutral-500 hover:text-zea-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-[11px] text-neutral-500">
                    Atas Nama: <span className="font-bold text-neutral-800">ZEA DIGITAL STORE</span>
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 hover:text-neutral-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Ubah Informasi Kontak</span>
              </button>
            </div>

          </div>

          {/* Right Summary */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-soft space-y-6 flex flex-col justify-between">
            <div>
              <h3 className="text-base font-bold text-neutral-900 border-b border-rose-50 pb-3 mb-4">
                Konfirmasi Pembayaran
              </h3>

              <div className="bg-rose-50/40 p-4 rounded-2xl border border-rose-100 mb-4 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Nama:</span>
                  <span className="font-bold text-neutral-800">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">Email:</span>
                  <span className="font-bold text-neutral-800">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-500">WhatsApp:</span>
                  <span className="font-bold text-neutral-800">{formData.whatsapp}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs pt-2 border-t border-rose-100">
                <div className="flex justify-between text-neutral-600">
                  <span>Total Tagihan</span>
                  <span className="text-lg font-black text-zea-800">{formatRupiah(cartTotal)}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={handleProcessPayment}
              className="w-full py-4 px-6 rounded-2xl bg-zea-700 hover:bg-zea-800 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-zea-700/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isProcessing ? (
                <span>Memproses Pembayaran...</span>
              ) : (
                <>
                  <span>Simulasi Bayar Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

        </div>
      )}

      {/* STEP 3: SUKSES */}
      {step === 3 && orderResult && (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-rose-100/90 shadow-card text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <h2 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
              Pembayaran Berhasil!
            </h2>
            <p className="text-xs text-neutral-500 mt-1">
              Terima kasih telah berbelanja di ZEA Digital Store.
            </p>
          </div>

          <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-100 max-w-md mx-auto text-xs space-y-2.5 text-left">
            <div className="flex justify-between">
              <span className="text-neutral-500">Nomor Pesanan:</span>
              <span className="font-mono font-bold text-zea-800">{orderResult.orderId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Total Pembayaran:</span>
              <span className="font-bold text-neutral-900">{formatRupiah(orderResult.total)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Status:</span>
              <span className="font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full text-[10px]">LUNAS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-neutral-500">Dikirim ke Email:</span>
              <span className="font-medium text-neutral-800 truncate">{formData.email}</span>
            </div>
          </div>

          <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
            Semua lisensi dan file digital telah ditambahkan ke akun Anda dan siap diakses kapan saja.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => navigateTo('library')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-zea-700 hover:bg-zea-800 text-white font-bold text-xs shadow-md shadow-zea-700/25 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              <span>Buka Perpustakaan Saya</span>
            </button>

            <button
              onClick={() => navigateTo('catalog')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-rose-50 text-neutral-700 border border-rose-200 font-semibold text-xs transition-all"
            >
              <span>Belanja Lagi</span>
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
