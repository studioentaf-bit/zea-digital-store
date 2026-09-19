import React, { useState } from 'react';
import { useZea } from '../context/ZeaContext';
import { 
  Sparkles, 
  CheckCircle2, 
  Zap, 
  Layers, 
  FolderLock, 
  ArrowRight,
  Monitor,
  ChevronDown,
  HelpCircle,
  Check,
  Globe
} from 'lucide-react';

export const AppLanding = () => {
  const { appLicensePlans, openCheckout, navigateTo } = useZea();
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    {
      q: 'Apakah saya perlu login akun di website ini untuk membeli lisensi?',
      a: 'Tidak perlu sama sekali! Anda cukup klik tombol "Beli Lisensi", masukkan nama dan nomor WhatsApp/Email, lalu lakukan pembayaran. Serial lisensi resmi dan link unduh aplikasi akan langsung muncul detik itu juga di layar Anda.'
    },
    {
      q: 'Bagaimana cara menggunakan lisensi setelah membeli?',
      a: 'Setelah checkout selesai, Anda akan menerima Serial Lisensi (format: ZEA-PRO-XXXX-XXXX-XXXX) dan link unduh aplikasi Zea App Manager. Buka aplikasi di komputer Anda, buka menu Pengaturan, dan masukkan Serial Lisensi Anda untuk membuka akses penuh.'
    },
    {
      q: 'Apakah data akun dan kata sandi saya aman?',
      a: 'Sangat aman. Zea App Manager menggunakan teknologi Microsoft WebView2 dengan penyimpanan sesi 100% lokal di folder komputer Anda. Tidak ada data akun, kata sandi, ataupun cookies yang dikirimkan ke server kami atau pihak ketiga manapun.'
    },
    {
      q: 'Apakah aplikasi ini portabel atau harus diinstall?',
      a: 'Zea App Manager tersedia dalam format Portabel (bisa langsung dijalankan tanpa install bahkan dari flashdisk) dan juga format Setup Installer instan (hanya berukuran ~460 KB) yang otomatis membuat pintasan di desktop Anda.'
    },
    {
      q: 'Apakah saya bisa menambah platform website AI lainnya?',
      a: 'Tentu saja! Selain platform bawaan (Google Flow, Dola AI, ChatGPT), Anda bisa menambahkan website apapun lewat fitur "Tambah Platform Sendiri" seperti Claude, Midjourney, Canva, Perplexity, Gemini, dan media sosial.'
    },
    {
      q: 'Bisa dipindahkan ke komputer atau laptop lain?',
      a: 'Bisa. Lisensi dapat ditautkan ke perangkat baru jika Anda mengganti perangkat kerja atau laptop.'
    }
  ];

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Glow ambient background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-rose-200/50 via-rose-100/40 to-transparent blur-3xl -z-10 rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            
            {/* Pill Announcement */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-100/80 border border-rose-200/60 text-xs font-bold text-[#7A1F1F] tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#7A1F1F] animate-ping"></span>
              <span>VERSI TERBARU • ZEA APP MANAGER V2.4 PORTABLE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-neutral-900 tracking-tight leading-[1.15]">
              Satu Aplikasi Desktop untuk <span className="text-[#7A1F1F] underline decoration-rose-300 decoration-wavy">Kelola Semua Akun AI</span> Tanpa Batas
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-neutral-600 leading-relaxed font-normal">
              Solusi cerdas kelola puluhan akun <strong>Google Flow</strong>, <strong>Dola AI</strong>, <strong>ChatGPT</strong>, hingga platform kustom dalam 1 jendela terpadu. Dilengkapi <em>isolasi sesi WebView2</em> mandiri bebas tabrakan cookie.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('pricing-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7A1F1F] to-[#9B2B2B] text-white font-extrabold text-base shadow-xl shadow-[#7A1F1F]/25 hover:shadow-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <span>Dapatkan Lisensi Sekarang</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('features-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white border border-rose-200 text-neutral-800 font-bold text-base hover:bg-rose-50/60 transition-all flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Monitor className="w-5 h-5 text-[#7A1F1F]" />
                <span>Pelajari Fitur Aplikasi</span>
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-neutral-500 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Windows 10 / 11 Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% Portabel (Hanya 460 KB)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Anti-Tabrakan Cookie & Sesi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Tanpa Perlu Login Akun Web</span>
              </div>
            </div>

          </div>

          {/* APP INTERFACE PREVIEW MOCKUP */}
          <div className="mt-14 max-w-5xl mx-auto">
            <div className="rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-rose-200/60 to-rose-100/40 border border-rose-200/80 shadow-2xl shadow-rose-950/10 backdrop-blur-xs">
              <div className="rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 shadow-inner">
                
                {/* Mockup Titlebar */}
                <div className="h-10 bg-neutral-950 px-4 flex items-center justify-between border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                    <span className="text-xs text-neutral-400 font-medium ml-2 flex items-center gap-1.5">
                      <span className="w-4 h-4 rounded-sm bg-[#7A1F1F] text-[10px] font-black text-white flex items-center justify-center">Z</span>
                      Zea App Manager — Multi Account Workspace
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-emerald-400 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>Status: Lisensi Aktif</span>
                  </div>
                </div>

                {/* Mockup Body: Sidebar + Main Area */}
                <div className="grid grid-cols-12 h-[420px] sm:h-[480px] bg-[#0d0f12] text-neutral-200 font-sans">
                  
                  {/* Left Mock Sidebar */}
                  <div className="col-span-4 sm:col-span-3 bg-neutral-950/90 border-r border-neutral-800/80 p-3 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 px-2 py-1.5 bg-[#7A1F1F]/20 border border-[#7A1F1F]/40 rounded-xl">
                        <div className="w-6 h-6 rounded-lg bg-[#7A1F1F] text-white font-black text-xs flex items-center justify-center">Z</div>
                        <div>
                          <div className="text-xs font-bold text-white">ZEA APP MANAGER</div>
                          <div className="text-[9px] text-neutral-400">Workspace Aktif</div>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase px-2">Platform Unggulan</div>
                        
                        <div className="p-2 rounded-xl bg-neutral-800/80 border border-neutral-700/60 flex items-center justify-between text-xs font-semibold text-white">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-blue-600/30 text-blue-400 flex items-center justify-center text-[10px] font-bold">F</span>
                            <span>Google Flow</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold">8 Akun</span>
                        </div>

                        <div className="p-2 rounded-xl hover:bg-neutral-800/40 flex items-center justify-between text-xs text-neutral-300">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-purple-600/30 text-purple-400 flex items-center justify-center text-[10px] font-bold">D</span>
                            <span>Dola AI</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400">5 Akun</span>
                        </div>

                        <div className="p-2 rounded-xl hover:bg-neutral-800/40 flex items-center justify-between text-xs text-neutral-300">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-emerald-600/30 text-emerald-400 flex items-center justify-center text-[10px] font-bold">C</span>
                            <span>ChatGPT</span>
                          </div>
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-800 text-neutral-400">12 Akun</span>
                        </div>
                      </div>

                      <div className="space-y-1 pt-2 border-t border-neutral-800">
                        <div className="text-[10px] font-bold tracking-wider text-neutral-400 uppercase px-2">Kategori Khusus</div>
                        <div className="p-2 rounded-xl border border-dashed border-neutral-700 text-xs text-neutral-400 flex items-center gap-2">
                          <span className="text-amber-400 font-bold">+</span>
                          <span>Tambah Platform Sendiri</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-[10px] text-neutral-500 text-center py-1">
                      Portable Edition • Offline Engine
                    </div>
                  </div>

                  {/* Right Mock Content Area: Embedded Browser Mock */}
                  <div className="col-span-8 sm:col-span-9 bg-neutral-900/60 flex flex-col">
                    
                    {/* Top tab bar inside app */}
                    <div className="h-11 bg-neutral-950/80 border-b border-neutral-800 px-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-lg bg-neutral-800 border border-neutral-700 text-xs font-medium text-white flex items-center gap-2 shadow-xs">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          <span>Akun Flow #01 - Agency</span>
                        </div>
                        <div className="px-3 py-1 rounded-lg hover:bg-neutral-800/50 text-xs text-neutral-400 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-neutral-600"></span>
                          <span>Akun Flow #02 - Render</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-semibold">
                          WebView2 Active
                        </span>
                      </div>
                    </div>

                    {/* Browser Content Simulated View */}
                    <div className="flex-1 p-6 flex flex-col justify-center items-center text-center space-y-4 bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#7A1F1F] to-[#b33939] text-white flex items-center justify-center shadow-lg shadow-[#7A1F1F]/40">
                        <Monitor className="w-8 h-8" />
                      </div>
                      <div className="max-w-md space-y-1.5">
                        <h4 className="text-base font-bold text-white">Browser WebView2 Tertanam & Berjalan Lancar</h4>
                        <p className="text-xs text-neutral-400">
                          Sesi akun aktif langsung di dalam aplikasi tanpa popup mengganggu. Cookie tersimpan terpisah di folder lokal Anda.
                        </p>
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                          Cookie Isolated
                        </span>
                        <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                          Google Login Supported
                        </span>
                        <span className="px-3 py-1 rounded-full bg-neutral-800 text-neutral-300 border border-neutral-700">
                          Direct Sync
                        </span>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FITUR UNGGULAN & PROBLEM SOLVER */}
      <section id="features-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1F1F] uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-200/70">
            <Zap className="w-3.5 h-3.5" />
            <span>Kelebihan Eksklusif</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
            Mengapa Anda Membutuhkan Zea App Manager?
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Didesain khusus untuk pekerja kreatif, agensi, dan power-user yang lelah dengan browser biasa yang berat dan sering logout sendiri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-xl shadow-rose-950/5 hover:-translate-y-1 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100/70 text-[#7A1F1F] flex items-center justify-center font-bold">
              <FolderLock className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Isolasi Profil Mandiri</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Tiap akun memiliki direktori sesi dan cookies sendiri. Anda bisa login 20 akun Google Flow atau ChatGPT yang berbeda tanpa saling bentrok dan tanpa takut logout otomatis.
            </p>
            <div className="pt-2 text-xs font-bold text-[#7A1F1F] flex items-center gap-1">
              <span>Bebas Tabrakan Cookie</span>
              <Check className="w-4 h-4" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-xl shadow-rose-950/5 hover:-translate-y-1 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100/70 text-[#7A1F1F] flex items-center justify-center font-bold">
              <Layers className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Browser Tertanam (No Pop-up)</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Layar browser terintegrasi langsung di dalam aplikasi utama dengan engine Microsoft WebView2 yang super cepat, minim penggunaan memori RAM, dan stabil.
            </p>
            <div className="pt-2 text-xs font-bold text-[#7A1F1F] flex items-center gap-1">
              <span>Sidebar Hide/Show 100% Fullscreen</span>
              <Check className="w-4 h-4" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-white border border-rose-100 shadow-xl shadow-rose-950/5 hover:-translate-y-1 transition-all space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-rose-100/70 text-[#7A1F1F] flex items-center justify-center font-bold">
              <Globe className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Platform Unggulan & Kustom</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Preset bawaan dengan logo resmi untuk Google Flow, Dola AI, dan ChatGPT. Plus kebebasan menambahkan website custom apapun tanpa batasan jumlah.
            </p>
            <div className="pt-2 text-xs font-bold text-[#7A1F1F] flex items-center gap-1">
              <span>Unlimited Custom Platforms</span>
              <Check className="w-4 h-4" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. PAKET LISENSI RESMI (PRICING SECTION) */}
      <section id="pricing-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1F1F] uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-200/70">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Pilihan Lisensi Resmi</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-neutral-900 tracking-tight">
            Pilih Paket Lisensi Sesuai Kebutuhan
          </h2>
          <p className="text-neutral-600 text-base leading-relaxed">
            Pembelian instan tanpa perlu registrasi akun. Serial lisensi langsung diberikan detik itu juga setelah pembayaran berhasil.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {appLicensePlans.map((plan) => {
            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all ${
                  plan.popular
                    ? 'bg-white border-2 border-[#7A1F1F] shadow-2xl shadow-[#7A1F1F]/15 scale-105 z-10'
                    : 'bg-white/80 border border-rose-100 shadow-lg shadow-rose-950/5 hover:border-rose-300'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#7A1F1F] to-[#9B2B2B] text-white text-xs font-extrabold tracking-wider uppercase shadow-md flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-amber-300" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-black text-neutral-900">{plan.name}</h3>
                      {!plan.popular && (
                        <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-rose-100 text-[#7A1F1F]">
                          {plan.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-neutral-500 mt-2 min-h-[36px]">
                      {plan.description}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="pt-2 border-t border-rose-50">
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-black text-neutral-900">
                        Rp {plan.price.toLocaleString('id-ID')}
                      </span>
                      {plan.originalPrice && (
                        <span className="text-xs text-neutral-400 line-through">
                          Rp {plan.originalPrice.toLocaleString('id-ID')}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-emerald-700 font-semibold mt-1">
                      Durasi: {plan.duration}
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 pt-4 border-t border-rose-50">
                    <div className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                      Fasilitas Lisensi:
                    </div>
                    {plan.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-neutral-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <div className="pt-8">
                  <button
                    onClick={() => openCheckout(plan)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-gradient-to-r from-[#7A1F1F] to-[#9B2B2B] text-white shadow-[#7A1F1F]/25 hover:shadow-lg hover:scale-[1.01]'
                        : 'bg-rose-50 text-[#7A1F1F] border border-rose-200 hover:bg-[#7A1F1F] hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Beli Lisensi Ini</span>
                  </button>
                  <p className="text-[11px] text-center text-neutral-400 mt-2 font-medium">
                    ⚡ Langsung Terbit • Tanpa Registrasi Akun
                  </p>
                </div>

              </div>
            );
          })}
        </div>
      </section>

      {/* 4. CROSS PROMO TO DIGITAL SHOP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-br from-rose-100/80 via-white to-rose-50 border border-rose-200/80 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="px-3 py-1 rounded-full bg-[#7A1F1F] text-white text-xs font-bold">
              SHOP PRODUK DIGITAL
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
              Butuh Template Notion, AI Prompts & SOP Bisnis?
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Jelajahi etalase produk digital kami. Beli langsung tanpa login, dapatkan link akses Google Drive dan Notion template secara instan.
            </p>
          </div>
          <div>
            <button
              onClick={() => navigateTo('shop')}
              className="px-6 py-3.5 rounded-2xl bg-[#7A1F1F] text-white font-bold text-sm shadow-md hover:shadow-lg hover:bg-[#661818] transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <span>Kunjungi Shop Produk</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#7A1F1F] uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full border border-rose-200/70">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Tanya Jawab</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900">
            Pertanyaan yang Sering Diajukan
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-rose-100 bg-white overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setActiveFaq(isOpen ? null : idx)}
                  className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-neutral-800 hover:text-[#7A1F1F] cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-180 text-[#7A1F1F]' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-rose-50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
