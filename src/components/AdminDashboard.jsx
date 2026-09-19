import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { adminStats, salesChartData, categoryBreakdown } from '../data/adminData';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Sparkles, 
  CreditCard, 
  Tag, 
  BarChart3, 
  Settings, 
  Search, 
  Bell, 
  TrendingUp, 
  ExternalLink
} from 'lucide-react';

export const AdminDashboard = () => {
  const { orders, navigateTo, showToast } = useStore();

  const [activeSidebarMenu, setActiveSidebarMenu] = useState('Dashboard');
  const [adminSearch, setAdminSearch] = useState('');

  const formatRupiah = (num) => 'Rp ' + num.toLocaleString('id-ID');

  const sidebarMenuItems = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Produk', icon: Package },
    { name: 'Pesanan', icon: ShoppingBag },
    { name: 'Pelanggan', icon: Users },
    { name: 'AI Prompt Generator', icon: Sparkles },
    { name: 'Transaksi', icon: CreditCard },
    { name: 'Kupon', icon: Tag },
    { name: 'Analitik', icon: BarChart3 },
    { name: 'Pengaturan', icon: Settings },
  ];

  const filteredOrders = orders.filter(o => 
    o.customer.toLowerCase().includes(adminSearch.toLowerCase()) ||
    o.id.toLowerCase().includes(adminSearch.toLowerCase()) ||
    o.product.toLowerCase().includes(adminSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDF8F8] flex text-left font-sans">
      
      {/* 1. Left Dark Red Admin Sidebar */}
      <aside className="w-64 bg-[#7A1F1F] text-rose-100 flex flex-col justify-between shrink-0 hidden md:flex border-r border-[#6B1818]">
        <div>
          {/* Brand Header */}
          <div className="h-20 flex items-center gap-2.5 px-6 border-b border-[#8C2727]">
            <div className="w-8 h-8 rounded-xl bg-white text-zea-800 flex items-center justify-center shadow-md font-bold">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2-8 2s-3-2-6-2a9 9 0 0 0-9 9c0 2.21.8 4.24 2.14 5.81L5.7 18.2C5.25 17.24 5 16.15 5 15c0-4.42 3.58-8 8-8 2.05 0 3.91.77 5.33 2.04L17 8z"/>
              </svg>
            </div>
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight">Zea</span>
              <span className="text-xs text-rose-200 ml-1.5 font-medium">Admin</span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="p-4 space-y-1">
            {sidebarMenuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeSidebarMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => {
                    setActiveSidebarMenu(item.name);
                    if (item.name === 'AI Prompt Generator') {
                      navigateTo('ai-prompt');
                    } else if (item.name !== 'Dashboard') {
                      showToast(`Menu ${item.name} siap dikelola`, 'info');
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#A32E2E] text-white shadow-xs font-bold'
                      : 'text-rose-200/80 hover:bg-[#8C2727] hover:text-white'
                  }`}
                >
                  <IconComp className="w-4 h-4 shrink-0" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Back to Store Front Button */}
        <div className="p-4 border-t border-[#8C2727]">
          <button
            onClick={() => navigateTo('home')}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Kunjungi Toko Zea</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Admin Workspace */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-rose-100/90 px-6 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div>
            <h2 className="text-lg font-bold text-neutral-900">Dashboard</h2>
            <p className="text-xs text-neutral-400">Selamat datang, Admin!</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Search Input */}
            <div className="relative hidden sm:block w-72">
              <input
                type="text"
                placeholder="Cari pesanan, pelanggan, produk..."
                value={adminSearch}
                onChange={(e) => setAdminSearch(e.target.value)}
                className="w-full bg-rose-50/40 border border-rose-200 rounded-full pl-9 pr-4 py-1.5 text-xs text-neutral-800 placeholder-neutral-400 focus:outline-none focus:ring-1 focus:ring-zea-600"
              />
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2" />
            </div>

            {/* Mobile Store Switcher */}
            <button
              onClick={() => navigateTo('home')}
              className="md:hidden px-3 py-1 rounded-full text-xs font-bold bg-zea-700 text-white"
            >
              Lihat Toko
            </button>

            {/* Notification Bell */}
            <button className="p-2 text-neutral-500 hover:text-zea-700 relative">
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-zea-600 absolute top-1.5 right-1.5" />
            </button>

            {/* Admin Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-rose-100">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-rose-100 border border-rose-200">
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" 
                  alt="Admin" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="hidden lg:block">
                <span className="text-xs font-bold text-neutral-800 block leading-tight">Admin</span>
                <span className="text-[10px] text-emerald-600 font-semibold">Superuser</span>
              </div>
            </div>
          </div>
        </header>

        {/* Workspace Body Content */}
        <main className="p-6 sm:p-8 space-y-6 max-w-7xl mx-auto w-full">
          
          {/* 4 Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* 1. Total Produk */}
            <div className="bg-white rounded-3xl p-5 border border-rose-100/90 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Total Produk</span>
                <Package className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-neutral-900">
                {adminStats.totalProducts}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{adminStats.productsGrowth}</span>
              </p>
            </div>

            {/* 2. Total Pesanan */}
            <div className="bg-white rounded-3xl p-5 border border-rose-100/90 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Total Pesanan</span>
                <ShoppingBag className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-neutral-900">
                {adminStats.totalOrders}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{adminStats.ordersGrowth}</span>
              </p>
            </div>

            {/* 3. Total Pelanggan */}
            <div className="bg-white rounded-3xl p-5 border border-rose-100/90 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Total Pelanggan</span>
                <Users className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-2xl font-black text-neutral-900">
                {adminStats.totalCustomers}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{adminStats.customersGrowth}</span>
              </p>
            </div>

            {/* 4. Pendapatan */}
            <div className="bg-white rounded-3xl p-5 border border-rose-100/90 shadow-soft space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-500">
                <span>Pendapatan</span>
                <CreditCard className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-xl sm:text-2xl font-black text-neutral-900 truncate">
                {formatRupiah(adminStats.totalRevenue)}
              </div>
              <p className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />
                <span>{adminStats.revenueGrowth}</span>
              </p>
            </div>

          </div>

          {/* Analytical Charts Section: Penjualan 7 Hari & Kategori Donut */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Penjualan 7 Hari Terakhir */}
            <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-rose-100/90 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-neutral-900">Penjualan 7 Hari Terakhir</h3>
                  <p className="text-xs text-neutral-400">Tren pendapatan harian produk digital</p>
                </div>
                <span className="text-xs font-bold text-zea-800 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100">
                  Minggu Ini
                </span>
              </div>

              {/* Clean SVG Area/Line Chart */}
              <div className="h-56 relative pt-4">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 700 200" preserveAspectRatio="none">
                  <line x1="0" y1="180" x2="700" y2="180" stroke="#f5e6e6" strokeWidth="1" />
                  <line x1="0" y1="120" x2="700" y2="120" stroke="#f5e6e6" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="0" y1="60" x2="700" y2="60" stroke="#f5e6e6" strokeWidth="1" strokeDasharray="4 4" />

                  <defs>
                    <linearGradient id="adminSalesGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d25959" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#d25959" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 50,140 L 150,110 L 250,120 L 350,60 L 450,80 L 550,40 L 650,20 L 650,180 L 50,180 Z"
                    fill="url(#adminSalesGradient)"
                  />

                  <path
                    d="M 50,140 L 150,110 L 250,120 L 350,60 L 450,80 L 550,40 L 650,20"
                    fill="none"
                    stroke="#b83b3b"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />

                  {[
                    { x: 50, y: 140 },
                    { x: 150, y: 110 },
                    { x: 250, y: 120 },
                    { x: 350, y: 60 },
                    { x: 450, y: 80 },
                    { x: 550, y: 40 },
                    { x: 650, y: 20 }
                  ].map((pt, i) => (
                    <g key={i}>
                      <circle cx={pt.x} cy={pt.y} r="5" fill="#fff" stroke="#9b2b2b" strokeWidth="2.5" />
                    </g>
                  ))}
                </svg>

                {/* Day Labels */}
                <div className="flex justify-between text-[11px] text-neutral-400 font-medium px-4 mt-2">
                  {salesChartData.map(d => (
                    <span key={d.day}>{d.day}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Kategori Produk Donut Chart */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-rose-100/90 shadow-soft space-y-4 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-neutral-900">Kategori Produk</h3>
                <p className="text-xs text-neutral-400">Distribusi total katalog</p>
              </div>

              {/* Donut Chart Visual */}
              <div className="flex items-center justify-center relative my-2">
                <div className="relative w-36 h-36 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1edea" strokeWidth="14" />
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#9b2b2b" strokeWidth="14" strokeDasharray="70 170" strokeDashoffset="0" />
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#d25959" strokeWidth="14" strokeDasharray="55 185" strokeDashoffset="-70" />
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#e48686" strokeWidth="14" strokeDasharray="45 195" strokeDashoffset="-125" />
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f1b3b3" strokeWidth="14" strokeDasharray="38 202" strokeDashoffset="-170" />
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f8d5d5" strokeWidth="14" strokeDasharray="30 210" strokeDashoffset="-208" />
                  </svg>

                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="text-lg font-black text-neutral-900 leading-none">128</span>
                    <span className="text-[10px] text-neutral-400 font-semibold">Total</span>
                  </div>
                </div>
              </div>

              {/* Breakdown Legend */}
              <div className="space-y-1.5 text-xs">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: cat.color }} />
                      <span className="text-neutral-600">{cat.name}</span>
                    </div>
                    <span className="font-bold text-neutral-800">{cat.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Pesanan Terbaru Table */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100/90 shadow-soft space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-neutral-900">Pesanan Terbaru</h3>
                <p className="text-xs text-neutral-400">Aktivitas transaksi pelanggan terkini</p>
              </div>
              <button 
                onClick={() => showToast('Mengekspor data transaksi .CSV', 'info')}
                className="text-xs font-semibold text-zea-700 hover:text-zea-900"
              >
                Unduh Laporan
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-rose-100 text-neutral-400 uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-3">No. Pesanan</th>
                    <th className="py-3 px-3">Pelanggan</th>
                    <th className="py-3 px-3">Produk</th>
                    <th className="py-3 px-3">Total</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rose-50">
                  {filteredOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-rose-50/30 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-neutral-800">
                        {order.id}
                      </td>
                      <td className="py-3 px-3 font-medium text-neutral-800">
                        {order.customer}
                      </td>
                      <td className="py-3 px-3 text-neutral-600 max-w-xs truncate">
                        {order.product}
                      </td>
                      <td className="py-3 px-3 font-bold text-neutral-900">
                        {formatRupiah(order.total)}
                      </td>
                      <td className="py-3 px-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${order.statusColor || 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>

      </div>

    </div>
  );
};
