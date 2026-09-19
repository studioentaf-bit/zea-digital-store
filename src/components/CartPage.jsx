import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  Tag, 
  AlertCircle
} from 'lucide-react';

export const CartPage = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    toggleItemSelection,
    selectedCartItems,
    cartSubtotal,
    discountAmount,
    cartTotal,
    appliedVoucher,
    applyVoucher,
    removeVoucher,
    voucherError,
    navigateTo
  } = useStore();

  const [voucherCodeInput, setVoucherCodeInput] = useState('');

  const formatRupiah = (num) => 'Rp' + num.toLocaleString('id-ID');

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (voucherCodeInput.trim()) {
      applyVoucher(voucherCodeInput);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mx-auto mb-4 text-zea-700">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900">Keranjang Belanja Kosong</h2>
        <p className="text-sm text-neutral-500 mt-2 max-w-sm mx-auto">
          Belum ada produk digital di keranjang Anda. Jelajahi katalog kami dan temukan tools yang Anda butuhkan!
        </p>
        <button
          onClick={() => navigateTo('catalog')}
          className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-zea-700 text-white font-semibold text-xs shadow-md shadow-zea-700/20 hover:bg-zea-800 transition-all"
        >
          <span>Mulai Belanja</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-rose-100 gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Keranjang Belanja
          </h1>
          <p className="text-xs text-neutral-500 mt-1">
            Yuk, cek kembali produk yang kamu pilih.
          </p>
        </div>

        <button
          onClick={() => navigateTo('catalog')}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-zea-700 hover:text-zea-800 transition-colors self-start sm:self-auto"
        >
          <span>Lanjut Belanja</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Cart Container Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-soft space-y-6">
        
        {/* Cart Table Header (Desktop) */}
        <div className="hidden md:grid md:grid-cols-12 gap-4 pb-3 border-b border-rose-100 text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          <div className="col-span-6">Produk</div>
          <div className="col-span-2 text-center">Harga</div>
          <div className="col-span-2 text-center">Jumlah</div>
          <div className="col-span-2 text-right pr-4">Subtotal</div>
        </div>

        {/* Cart Items List */}
        <div className="divide-y divide-rose-50">
          {cart.map(({ product, quantity, selected }) => (
            <div 
              key={product.id}
              className="py-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-center group transition-colors"
            >
              {/* Product Info & Checkbox */}
              <div className="col-span-6 flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleItemSelection(product.id)}
                  className="w-4 h-4 rounded text-zea-700 focus:ring-zea-500 accent-zea-700 cursor-pointer"
                />

                <div 
                  onClick={() => navigateTo('product-detail', product.id)}
                  className="w-16 h-14 rounded-xl overflow-hidden bg-rose-50 border border-rose-100 shrink-0 cursor-pointer"
                >
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>

                <div className="min-w-0">
                  <h4 
                    onClick={() => navigateTo('product-detail', product.id)}
                    className="text-sm font-bold text-neutral-900 hover:text-zea-700 cursor-pointer truncate"
                  >
                    {product.name}
                  </h4>
                  <p className="text-[11px] text-neutral-400 truncate max-w-xs">
                    {product.shortDesc}
                  </p>
                </div>
              </div>

              {/* Unit Price */}
              <div className="col-span-2 text-left md:text-center text-xs font-semibold text-neutral-700">
                <span className="md:hidden text-neutral-400 font-normal mr-2">Harga:</span>
                {formatRupiah(product.price)}
              </div>

              {/* Quantity Stepper */}
              <div className="col-span-2 flex items-center md:justify-center gap-2">
                <div className="inline-flex items-center border border-rose-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => updateQuantity(product.id, -1)}
                    disabled={quantity <= 1}
                    className="p-1.5 px-2 text-neutral-500 hover:bg-rose-50 disabled:opacity-30 transition-colors"
                    aria-label="Kurang jumlah"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="px-3 text-xs font-bold text-neutral-800">
                    {quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(product.id, 1)}
                    className="p-1.5 px-2 text-neutral-500 hover:bg-rose-50 transition-colors"
                    aria-label="Tambah jumlah"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* Subtotal & Trash */}
              <div className="col-span-2 flex items-center justify-between md:justify-end gap-3">
                <div className="text-right">
                  <span className="md:hidden text-neutral-400 text-xs font-normal mr-2">Subtotal:</span>
                  <span className="text-sm font-bold text-neutral-900">
                    {formatRupiah(product.price * quantity)}
                  </span>
                </div>

                <button
                  onClick={() => removeFromCart(product.id)}
                  className="p-2 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="Hapus produk"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Voucher & Order Summary Section */}
        <div className="pt-6 border-t border-rose-100 flex flex-col md:flex-row justify-between items-start gap-8">
          
          {/* Voucher Input */}
          <div className="w-full md:max-w-md space-y-2">
            <label className="text-xs font-bold text-neutral-700 block">
              Punya kode voucher?
            </label>
            
            {appliedVoucher ? (
              <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-emerald-600" />
                  <div>
                    <p className="text-xs font-bold text-emerald-800">{appliedVoucher.code} ({appliedVoucher.name})</p>
                    <p className="text-[10px] text-emerald-600">Diskon {appliedVoucher.discountPercent}% berhasil digunakan</p>
                  </div>
                </div>
                <button
                  onClick={removeVoucher}
                  className="text-xs font-semibold text-red-600 hover:underline"
                >
                  Hapus
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyVoucher} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Masukkan kode (contoh: ZEASALE)"
                  value={voucherCodeInput}
                  onChange={(e) => setVoucherCodeInput(e.target.value)}
                  className="flex-1 bg-rose-50/40 border border-rose-200 rounded-xl px-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-zea-500/20"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-rose-200/70 hover:bg-rose-300/80 text-zea-900 font-semibold text-xs shadow-xs transition-colors shrink-0"
                >
                  Terapkan
                </button>
              </form>
            )}

            {voucherError && (
              <p className="text-xs text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{voucherError}</span>
              </p>
            )}

            <p className="text-[11px] text-neutral-400">
              Gunakan kode <span className="font-bold text-zea-700">ZEASALE</span> untuk potongan 15%.
            </p>
          </div>

          {/* Ringkasan Belanja Box */}
          <div className="w-full md:w-80 space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between font-bold text-neutral-800">
                <span>Ringkasan Belanja</span>
                <span>{selectedCartItems.length} produk</span>
              </div>
              
              <div className="flex justify-between text-neutral-500">
                <span>Subtotal</span>
                <span>{formatRupiah(cartSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Diskon Kupon</span>
                  <span>- {formatRupiah(discountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-rose-100 flex justify-between items-baseline">
                <span className="font-extrabold text-sm text-neutral-900">Total</span>
                <span className="font-black text-xl text-neutral-900">
                  {formatRupiah(cartTotal)}
                </span>
              </div>
            </div>

            <button
              onClick={() => navigateTo('checkout')}
              disabled={selectedCartItems.length === 0}
              className="w-full py-3.5 px-6 rounded-2xl bg-zea-700 hover:bg-zea-800 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-zea-700/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <span>Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
