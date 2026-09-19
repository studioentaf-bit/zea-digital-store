import React from 'react';
import { useStore } from '../context/StoreContext';
import { Star, ArrowRight, Check } from 'lucide-react';

export const ProductCard = ({ product }) => {
  const { navigateTo, addToCart, cart } = useStore();

  const isAlreadyInCart = cart.some(item => item.product.id === product.id);

  const formatRupiah = (num) => {
    return 'Rp' + num.toLocaleString('id-ID');
  };

  const handleCardClick = () => {
    navigateTo('product-detail', product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-3xl p-3.5 sm:p-4 border border-rose-100/90 shadow-xs hover:shadow-card hover:border-rose-300/80 transition-all duration-300 flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Product Image Container */}
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-gradient-to-br from-rose-50 to-rose-100/50 mb-3.5">
          
          {/* Badge */}
          {product.badge && (
            <div className="absolute top-2.5 left-2.5 z-10">
              <span className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full border shadow-xs ${product.badgeColor || 'bg-rose-100 text-zea-800 border-rose-200'}`}>
                {product.badge}
              </span>
            </div>
          )}

          {/* Product Image */}
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Quick Hover Overlay */}
          <div className="absolute inset-0 bg-neutral-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="bg-white/95 text-neutral-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md backdrop-blur-xs">
              Lihat Detail
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-1.5">
          <h3 className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-zea-700 transition-colors line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed h-8">
            {product.shortDesc}
          </p>
        </div>
      </div>

      {/* Footer: Rating, Price, & Action Button */}
      <div className="pt-3 mt-3 border-t border-rose-50 flex items-center justify-between">
        <div>
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs text-neutral-500 mb-1">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="font-semibold text-neutral-700">{product.rating}</span>
            <span className="text-[11px] text-neutral-400">({(product.reviewsCount / 1000).toFixed(1)}k)</span>
          </div>

          {/* Price */}
          <div className="font-bold text-sm sm:text-base text-neutral-900">
            {formatRupiah(product.price)}
          </div>
        </div>

        {/* Add to Cart / View Button */}
        <button
          onClick={handleAddToCart}
          title={isAlreadyInCart ? 'Sudah di keranjang' : 'Tambah ke keranjang'}
          className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
            isAlreadyInCart 
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
              : 'bg-rose-50 text-neutral-700 hover:bg-zea-700 hover:text-white border border-rose-100'
          }`}
        >
          {isAlreadyInCart ? <Check className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
        </button>
      </div>

    </div>
  );
};
