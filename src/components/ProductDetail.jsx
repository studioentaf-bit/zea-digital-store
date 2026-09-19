import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { digitalProducts } from '../data/products';
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  ChevronRight, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Share2,
  Check
} from 'lucide-react';

export const ProductDetail = () => {
  const { selectedProductId, navigateTo, addToCart, cart, showToast } = useStore();

  const product = digitalProducts.find(p => p.id === selectedProductId) || digitalProducts[0];
  
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('deskripsi');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isAlreadyInCart = cart.some(item => item.product.id === product.id);

  const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];

  const formatRupiah = (num) => 'Rp' + num.toLocaleString('id-ID');

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigateTo('cart');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    showToast('Tautan produk berhasil disalin!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 mb-6">
        <button onClick={() => navigateTo('home')} className="hover:text-zea-700 transition-colors">
          Beranda
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <button onClick={() => navigateTo('catalog')} className="hover:text-zea-700 transition-colors">
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
        <span className="text-neutral-900 font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Showcase Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-rose-100/90 shadow-soft mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Left Column: Image Preview Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative rounded-3xl overflow-hidden aspect-[16/10] bg-gradient-to-tr from-rose-50 to-white border border-rose-100/80 shadow-xs flex items-center justify-center p-4">
              <img 
                src={images[activeImageIndex]} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-2xl transition-all duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`text-xs font-bold tracking-wider px-3 py-1 rounded-full border shadow-xs ${product.badgeColor || 'bg-rose-100 text-zea-800 border-rose-200'}`}>
                  {product.badge || product.category}
                </span>
              </div>
            </div>

            {/* Thumbnail carousel */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-20 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    activeImageIndex === idx 
                      ? 'border-zea-700 shadow-sm scale-105' 
                      : 'border-rose-100 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Buying Info */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left">
            
            <div className="space-y-4">
              <span className="text-xs font-bold tracking-wider text-zea-700 uppercase">
                {product.category}
              </span>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                {product.name}
              </h1>

              {/* Rating & Stats */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="font-bold text-neutral-800">{product.rating}</span>
                <span className="text-neutral-400">({product.reviewsCount.toLocaleString('id-ID')} ulasan)</span>
                <span className="text-neutral-300">•</span>
                <span className="text-neutral-500 font-medium">{product.salesCount.toLocaleString('id-ID')} terjual</span>
              </div>

              <p className="text-sm text-neutral-600 leading-relaxed">
                {product.shortDesc}
              </p>

              {/* Price */}
              <div className="pt-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-neutral-900 tracking-tight">
                    {formatRupiah(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-neutral-400 line-through">
                      {formatRupiah(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                  Termasuk lisensi resmi & update selamanya
                </p>
              </div>
            </div>

            {/* CTAs & Wishlist */}
            <div className="space-y-3 pt-4 border-t border-rose-100">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-5 rounded-2xl font-bold text-sm shadow-md transition-all ${
                    isAlreadyInCart
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                      : 'bg-zea-700 hover:bg-zea-800 text-white shadow-zea-700/25 active:scale-[0.98]'
                  }`}
                >
                  {isAlreadyInCart ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Sudah di Keranjang (Tambah Lagi)</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>Tambah ke Keranjang</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setIsWishlisted(!isWishlisted);
                    showToast(!isWishlisted ? 'Ditambahkan ke wishlist' : 'Dihapus dari wishlist', 'info');
                  }}
                  className={`p-3.5 rounded-2xl border transition-all ${
                    isWishlisted 
                      ? 'bg-rose-50 border-rose-300 text-zea-600' 
                      : 'border-rose-200 text-neutral-500 hover:text-zea-600 hover:bg-rose-50/50'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-zea-600 text-zea-600' : ''}`} />
                </button>

                <button
                  onClick={handleShare}
                  className="p-3.5 rounded-2xl border border-rose-200 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-all"
                  aria-label="Bagikan"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="w-full py-3 px-5 rounded-2xl font-semibold text-xs text-neutral-800 bg-rose-50 hover:bg-rose-100/80 border border-rose-200 transition-all text-center"
              >
                Beli Sekarang (Langsung Checkout)
              </button>
            </div>

            {/* Key Guarantee Badges */}
            <div className="space-y-2.5 pt-2 text-xs text-neutral-600">
              <div className="flex items-center gap-2.5">
                <Zap className="w-4 h-4 text-zea-600 shrink-0" />
                <span>Akses instan setelah pembayaran</span>
              </div>
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Tersedia untuk semua perangkat</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Lisensi penggunaan pribadi & komersial</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Tabs & Deep Content Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-rose-100/90 shadow-soft text-left">
        
        {/* Tab Headers */}
        <div className="flex items-center gap-8 border-b border-rose-100 pb-4 mb-6 text-sm font-semibold">
          <button
            onClick={() => setActiveTab('deskripsi')}
            className={`pb-2 transition-colors relative ${
              activeTab === 'deskripsi'
                ? 'text-zea-700 font-bold border-b-2 border-zea-700'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Deskripsi
          </button>
          <button
            onClick={() => setActiveTab('spesifikasi')}
            className={`pb-2 transition-colors relative ${
              activeTab === 'spesifikasi'
                ? 'text-zea-700 font-bold border-b-2 border-zea-700'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Spesifikasi
          </button>
          <button
            onClick={() => setActiveTab('ulasan')}
            className={`pb-2 transition-colors relative ${
              activeTab === 'ulasan'
                ? 'text-zea-700 font-bold border-b-2 border-zea-700'
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
          >
            Ulasan ({product.reviewsCount.toLocaleString('id-ID')})
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'deskripsi' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-neutral-900">Tentang Produk</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">
                {product.description}
              </p>
              <p className="text-sm text-neutral-600 leading-relaxed">
                Setiap materi dan template dalam produk ini disusun secara teliti dengan metodologi teruji agar dapat langsung dipraktekkan tanpa kendala teknis. Dilengkapi panduan video dan dukungan update berkala.
              </p>
            </div>

            <div className="md:col-span-5 bg-rose-50/50 rounded-2xl p-6 border border-rose-100 space-y-3">
              <h3 className="text-sm font-bold text-neutral-900">Yang Akan Anda Dapatkan:</h3>
              <ul className="space-y-2.5 text-xs text-neutral-700">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'spesifikasi' && (
          <div className="max-w-2xl space-y-3">
            <h3 className="text-base font-bold text-neutral-900 mb-4">Detail Spesifikasi Teknis</h3>
            <div className="divide-y divide-rose-50 border border-rose-100 rounded-2xl overflow-hidden">
              {product.specifications?.map((spec, i) => (
                <div key={i} className="flex items-center justify-between p-3.5 text-xs bg-white hover:bg-rose-50/30 transition-colors">
                  <span className="font-medium text-neutral-500">{spec.label}</span>
                  <span className="font-semibold text-neutral-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'ulasan' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-neutral-900">Ulasan Pembeli Terverifikasi</h3>
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-800">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{product.rating} dari 5.0</span>
              </div>
            </div>

            <div className="space-y-4">
              {product.reviews?.map((review, i) => (
                <div key={i} className="p-4 rounded-2xl border border-rose-100 bg-[#FFFDFD] space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-zea-100 text-zea-800 font-bold text-xs flex items-center justify-center">
                        {review.user.charAt(0)}
                      </div>
                      <span className="font-bold text-xs text-neutral-800">{review.user}</span>
                      <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                        Pembeli Terverifikasi
                      </span>
                    </div>
                    <span className="text-[11px] text-neutral-400">{review.date}</span>
                  </div>

                  <div className="flex items-center text-amber-400">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs text-neutral-600 leading-relaxed">
                    "{review.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
