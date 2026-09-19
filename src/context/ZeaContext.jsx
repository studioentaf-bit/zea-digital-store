import React, { createContext, useContext, useState, useEffect } from 'react';
import { appLicensePlans, initialDigitalProducts, initialOrders, initialLicenses } from '../data/storeData';
import { supabase, getSupabaseConfig, testSupabaseConnection, refreshSupabaseClient } from '../lib/supabase';

const ZeaContext = createContext();

export const ZeaProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home'); // 'home' | 'shop' | 'check-order' | 'admin'
  const [checkoutItem, setCheckoutItem] = useState(null);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [toast, setToast] = useState(null);
  const [isSupabaseConnected, setIsSupabaseConnected] = useState(false);
  const [supabaseConfig, setSupabaseConfig] = useState(getSupabaseConfig());

  // Digital Products state
  const [digitalProducts, setDigitalProducts] = useState(() => {
    const saved = localStorage.getItem('zea_products_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialDigitalProducts;
  });

  // Orders state
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('zea_orders_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialOrders;
  });

  // Licenses state
  const [licenses, setLicenses] = useState(() => {
    const saved = localStorage.getItem('zea_licenses_v2');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return initialLicenses;
  });

  // Load and sync from Supabase if configured
  const syncWithSupabase = async () => {
    const config = getSupabaseConfig();
    setSupabaseConfig(config);
    if (!config.isConfigured) {
      setIsSupabaseConnected(false);
      return;
    }

    try {
      const client = refreshSupabaseClient();
      if (!client) return;

      // 1. Fetch products
      const { data: remoteProducts, error: pErr } = await client
        .from('zea_products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!pErr && remoteProducts && remoteProducts.length > 0) {
        // map remote products
        const mappedProds = remoteProducts.map(p => ({
          ...p,
          originalPrice: p.original_price,
          productLink: p.product_link,
          reviewsCount: p.reviews_count,
          salesCount: p.sales_count
        }));
        setDigitalProducts(mappedProds);
      } else if (!pErr && (!remoteProducts || remoteProducts.length === 0)) {
        // If Supabase table is empty, seed initial products
        for (const prod of initialDigitalProducts) {
          await client.from('zea_products').upsert({
            id: prod.id,
            name: prod.name,
            category: prod.category,
            price: prod.price,
            original_price: prod.originalPrice,
            product_link: prod.productLink,
            image: prod.image,
            description: prod.description,
            features: prod.features,
            rating: prod.rating,
            reviews_count: prod.reviewsCount,
            sales_count: prod.salesCount
          });
        }
      }

      // 2. Fetch orders
      const { data: remoteOrders, error: oErr } = await client
        .from('zea_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!oErr && remoteOrders && remoteOrders.length > 0) {
        const mappedOrders = remoteOrders.map(o => ({
          ...o,
          buyerName: o.buyer_name,
          buyerContact: o.buyer_contact,
          itemName: o.item_name,
          itemType: o.item_type,
          paymentMethod: o.payment_method,
          licenseKey: o.license_key,
          productLink: o.product_link
        }));
        setOrders(mappedOrders);
      }

      // 3. Fetch licenses
      const { data: remoteLicenses, error: lErr } = await client
        .from('zea_licenses')
        .select('*')
        .order('created_at', { ascending: false });

      if (!lErr && remoteLicenses && remoteLicenses.length > 0) {
        const mappedLicenses = remoteLicenses.map(l => ({
          ...l,
          planName: l.plan_name,
          buyerName: l.buyer_name,
          buyerContact: l.buyer_contact,
          createdDate: l.created_date,
          expiryDate: l.expiry_date
        }));
        setLicenses(mappedLicenses);
      }

      setIsSupabaseConnected(true);
    } catch (err) {
      console.warn('Supabase sync warning:', err);
      setIsSupabaseConnected(false);
    }
  };

  useEffect(() => {
    syncWithSupabase();
  }, []);

  useEffect(() => {
    localStorage.setItem('zea_products_v2', JSON.stringify(digitalProducts));
  }, [digitalProducts]);

  useEffect(() => {
    localStorage.setItem('zea_orders_v2', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('zea_licenses_v2', JSON.stringify(licenses));
  }, [licenses]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCheckout = (item) => {
    setCheckoutItem(item);
    setIsCheckoutModalOpen(true);
  };

  const closeCheckout = () => {
    setIsCheckoutModalOpen(false);
    setCheckoutItem(null);
  };

  // Generate random segment for license key
  const randomSegment = (len = 4) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let res = '';
    for (let i = 0; i < len; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return res;
  };

  // Complete Guest Checkout
  const completeCheckout = async ({ buyerName, buyerContact, paymentMethod }) => {
    if (!checkoutItem) return null;

    const orderId = `ZEA-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) + ', ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    let licenseKey = null;
    let productLink = null;

    if (checkoutItem.type === 'app_license') {
      const prefix = checkoutItem.id === 'license-1mo' ? 'ZEA-1M' : (checkoutItem.id === 'license-lifetime' ? 'ZEA-LIFE' : 'ZEA-PRO');
      licenseKey = `${prefix}-${randomSegment()}-${randomSegment()}-${randomSegment()}`;

      let expiryStr = '1 Bulan ke Depan';
      if (checkoutItem.id === 'license-1yr') expiryStr = '1 Tahun ke Depan';
      if (checkoutItem.id === 'license-lifetime') expiryStr = 'Selamanya (Lifetime)';

      const newLicense = {
        key: licenseKey,
        planName: checkoutItem.name,
        buyerName,
        buyerContact,
        createdDate: formattedDate,
        expiryDate: expiryStr,
        status: 'Aktif'
      };

      setLicenses(prev => [newLicense, ...prev]);
      productLink = checkoutItem.downloadUrl || '/ZeaAppManager-Setup.exe';

      // Push to Supabase if connected
      const client = refreshSupabaseClient();
      if (client) {
        client.from('zea_licenses').insert({
          key: licenseKey,
          plan_name: checkoutItem.name,
          buyer_name: buyerName,
          buyer_contact: buyerContact,
          created_date: formattedDate,
          expiry_date: expiryStr,
          status: 'Aktif'
        }).then(({ error }) => {
          if (error) console.error('Error writing license to Supabase:', error);
        });
      }
    } else {
      productLink = checkoutItem.productLink;
    }

    const newOrder = {
      id: orderId,
      buyerName,
      buyerContact,
      itemName: checkoutItem.name,
      itemType: checkoutItem.type,
      price: checkoutItem.price,
      date: formattedDate,
      status: 'Lunas',
      paymentMethod,
      licenseKey,
      productLink
    };

    setOrders(prev => [newOrder, ...prev]);

    // Push order to Supabase if connected
    const client = refreshSupabaseClient();
    if (client) {
      client.from('zea_orders').insert({
        id: orderId,
        buyer_name: buyerName,
        buyer_contact: buyerContact,
        item_name: checkoutItem.name,
        item_type: checkoutItem.type,
        price: checkoutItem.price,
        date: formattedDate,
        status: 'Lunas',
        payment_method: paymentMethod,
        license_key: licenseKey,
        product_link: productLink
      }).then(({ error }) => {
        if (error) console.error('Error writing order to Supabase:', error);
      });
    }

    showToast(`Pembelian ${checkoutItem.name} berhasil!`, 'success');

    return {
      orderId,
      newOrder,
      licenseKey,
      productLink
    };
  };

  // Search orders / licenses by Phone, Email, or Order ID
  const findOrdersByContact = (query) => {
    if (!query) return [];
    const cleanQuery = query.trim().toLowerCase();
    return orders.filter(o => 
      o.id.toLowerCase().includes(cleanQuery) ||
      o.buyerContact.toLowerCase().includes(cleanQuery) ||
      o.buyerName.toLowerCase().includes(cleanQuery) ||
      (o.licenseKey && o.licenseKey.toLowerCase().includes(cleanQuery))
    );
  };

  // Admin Management Functions
  const updateProduct = async (id, updatedFields) => {
    setDigitalProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast('Produk berhasil diperbarui');

    const client = refreshSupabaseClient();
    if (client) {
      const payload = {};
      if (updatedFields.name) payload.name = updatedFields.name;
      if (updatedFields.category) payload.category = updatedFields.category;
      if (updatedFields.price !== undefined) payload.price = updatedFields.price;
      if (updatedFields.originalPrice !== undefined) payload.original_price = updatedFields.originalPrice;
      if (updatedFields.productLink) payload.product_link = updatedFields.productLink;
      if (updatedFields.image) payload.image = updatedFields.image;
      if (updatedFields.description) payload.description = updatedFields.description;
      await client.from('zea_products').update(payload).eq('id', id);
    }
  };

  const addProduct = async (newProd) => {
    const id = `prod-${Date.now()}`;
    const product = {
      id,
      rating: 5.0,
      reviewsCount: 1,
      salesCount: 0,
      type: 'digital_product',
      ...newProd
    };
    setDigitalProducts(prev => [product, ...prev]);
    showToast('Produk digital baru berhasil ditambahkan');

    const client = refreshSupabaseClient();
    if (client) {
      await client.from('zea_products').insert({
        id,
        name: product.name,
        category: product.category,
        price: product.price,
        original_price: product.originalPrice,
        product_link: product.productLink,
        image: product.image,
        description: product.description,
        features: product.features || [],
        rating: 5.0,
        reviews_count: 1,
        sales_count: 0
      });
    }
  };

  const deleteProduct = async (id) => {
    setDigitalProducts(prev => prev.filter(p => p.id !== id));
    showToast('Produk dihapus', 'info');

    const client = refreshSupabaseClient();
    if (client) {
      await client.from('zea_products').delete().eq('id', id);
    }
  };

  const createManualLicense = async ({ planName, buyerName, buyerContact, expiryDate }) => {
    const key = `ZEA-ADM-${randomSegment()}-${randomSegment()}-${randomSegment()}`;
    const now = new Date();
    const createdDate = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    const newLicense = {
      key,
      planName,
      buyerName,
      buyerContact,
      createdDate,
      expiryDate: expiryDate || '1 Tahun',
      status: 'Aktif'
    };

    setLicenses(prev => [newLicense, ...prev]);

    const client = refreshSupabaseClient();
    if (client) {
      await client.from('zea_licenses').insert({
        key,
        plan_name: planName,
        buyer_name: buyerName,
        buyer_contact: buyerContact,
        created_date: createdDate,
        expiry_date: expiryDate || '1 Tahun',
        status: 'Aktif'
      });
    }

    showToast(`Lisensi manual dibuat: ${key}`);
    return key;
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
    showToast(`Status pesanan ${orderId} diubah menjadi ${newStatus}`);

    const client = refreshSupabaseClient();
    if (client) {
      await client.from('zea_orders').update({ status: newStatus }).eq('id', orderId);
    }
  };

  const saveSupabaseCredentials = async (url, key) => {
    if (url) localStorage.setItem('zea_supabase_url', url.trim());
    else localStorage.removeItem('zea_supabase_url');

    if (key) localStorage.setItem('zea_supabase_key', key.trim());
    else localStorage.removeItem('zea_supabase_key');

    const config = getSupabaseConfig();
    setSupabaseConfig(config);
    refreshSupabaseClient();
    await syncWithSupabase();
    showToast('Konfigurasi Supabase disimpan!');
  };

  return (
    <ZeaContext.Provider
      value={{
        currentPage,
        navigateTo,
        appLicensePlans,
        digitalProducts,
        orders,
        licenses,
        checkoutItem,
        isCheckoutModalOpen,
        openCheckout,
        closeCheckout,
        completeCheckout,
        findOrdersByContact,
        updateProduct,
        addProduct,
        deleteProduct,
        createManualLicense,
        updateOrderStatus,
        isSupabaseConnected,
        supabaseConfig,
        saveSupabaseCredentials,
        syncWithSupabase,
        toast,
        showToast
      }}
    >
      {children}
    </ZeaContext.Provider>
  );
};

export const useZea = () => {
  const context = useContext(ZeaContext);
  if (!context) {
    throw new Error('useZea must be used within ZeaProvider');
  }
  return context;
};
