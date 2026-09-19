import React, { createContext, useContext, useState, useEffect } from 'react';
import { digitalProducts } from '../data/products';
import { initialOrdersList } from '../data/adminData';

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState('prompt-generator');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('zea_cart');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    const p1 = digitalProducts.find(p => p.id === 'financial-planner');
    const p2 = digitalProducts.find(p => p.id === 'habit-tracker');
    const p3 = digitalProducts.find(p => p.id === 'template-ebook');
    return [
      { product: p1, quantity: 1, selected: true },
      { product: p2, quantity: 1, selected: true },
      { product: p3, quantity: 1, selected: true }
    ].filter(item => item.product);
  });

  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherError, setVoucherError] = useState('');

  const [libraryItems, setLibraryItems] = useState(() => {
    const saved = localStorage.getItem('zea_library');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return [
      {
        ...digitalProducts.find(p => p.id === 'financial-planner'),
        purchaseDate: '12 Apr 2025',
        orderId: '#ZEA-0000842'
      },
      {
        ...digitalProducts.find(p => p.id === 'habit-tracker'),
        purchaseDate: '8 Apr 2025',
        orderId: '#ZEA-0000820'
      },
      {
        ...digitalProducts.find(p => p.id === 'prompt-generator'),
        purchaseDate: '5 Apr 2025',
        orderId: '#ZEA-0000795'
      }
    ].filter(Boolean);
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('zea_orders');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialOrdersList;
  });

  const [toast, setToast] = useState(null);

  useEffect(() => {
    localStorage.setItem('zea_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('zea_library', JSON.stringify(libraryItems));
  }, [libraryItems]);

  useEffect(() => {
    localStorage.setItem('zea_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const navigateTo = (page, productId = null) => {
    if (productId) {
      setSelectedProductId(productId);
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity, selected: true }];
    });
    showToast(`'${product.name}' ditambahkan ke keranjang!`);
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    showToast('Produk dihapus dari keranjang', 'info');
  };

  const updateQuantity = (productId, delta) => {
    setCart(prev =>
      prev.map(item => {
        if (item.product.id === productId) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const toggleItemSelection = (productId) => {
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const applyVoucher = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'ZEASALE' || cleanCode === 'ZEA15') {
      setAppliedVoucher({ code: cleanCode, discountPercent: 15, name: 'Diskon Spesial Zea 15%' });
      setVoucherError('');
      showToast('Kupon diskon 15% berhasil diterapkan!');
      return true;
    } else if (cleanCode === 'HEMAT10') {
      setAppliedVoucher({ code: cleanCode, discountPercent: 10, name: 'Potongan 10%' });
      setVoucherError('');
      showToast('Kupon diskon 10% berhasil diterapkan!');
      return true;
    } else {
      setVoucherError('Kode voucher tidak valid atau telah kedaluwarsa.');
      return false;
    }
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    setVoucherError('');
    showToast('Voucher dihapus', 'info');
  };

  const selectedCartItems = cart.filter(item => item.selected);
  const cartSubtotal = selectedCartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discountAmount = appliedVoucher
    ? Math.round((cartSubtotal * appliedVoucher.discountPercent) / 100)
    : 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);

  const completeCheckout = (customerInfo, paymentMethod) => {
    const newOrderId = `#ZEA-${Math.floor(100000 + Math.random() * 900000)}`;
    const nowStr = new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

    const newLibraryEntries = selectedCartItems.map(item => ({
      ...item.product,
      purchaseDate: nowStr,
      orderId: newOrderId
    }));

    setLibraryItems(prev => {
      const existingIds = new Set(prev.map(p => p.id));
      const filtered = newLibraryEntries.filter(p => !existingIds.has(p.id));
      return [...filtered, ...prev];
    });

    const newOrder = {
      id: newOrderId,
      customer: customerInfo.name || 'Pelanggan Baru',
      email: customerInfo.email || 'customer@zea.id',
      product: selectedCartItems.map(i => i.product.name).join(', '),
      total: cartTotal,
      status: 'Selesai',
      statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      date: `${nowStr} (Baru)`,
      paymentMethod
    };

    setOrders(prev => [newOrder, ...prev]);
    setCart(prev => prev.filter(item => !item.selected));
    setAppliedVoucher(null);

    return { orderId: newOrderId, total: cartTotal };
  };

  return (
    <StoreContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedProductId,
        setSelectedProductId,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
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
        libraryItems,
        orders,
        completeCheckout,
        navigateTo,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within StoreProvider');
  }
  return context;
};
