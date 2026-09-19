import React from 'react';
import { useStore } from '../context/StoreContext';
import { 
  ArrowRight, 
  Sparkles, 
  FileText, 
  CheckSquare, 
  ShieldCheck, 
  Wrench,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export const Hero = () => {
  const { navigateTo, setSelectedCategory } = useStore();

  const handleCategoryClick = (catName) => {
    setSelectedCategory(catName);
    navigateTo('catalog');
  };

  return (
    <section className="relative overflow-hidden pt-6 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Hero Card Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#FFF9F9] via-[#FDF2F2] to-[#FCEBEB] border border-rose-100/90 shadow-soft p-8 sm:p-12 lg:p-16 overflow-hidden">
          
          {/* Decorative subtle background elements */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-rose-200/40 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-orange-100/40 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
            
            {/* Left Column: Typography & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-rose-200/80 shadow-xs">
                <span className="w-2 h-2 rounded-full bg-zea-600 animate-pulse" />
                <span className="text-xs font-semibold text-neutral-600 tracking-wide">
                  Digital Tools untuk Hidup yang Lebih Produktif
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.15]">
                Tools Digital untuk <br className="hidden sm:inline" />
                Setiap Langkah <br className="hidden sm:inline" />
                <span className="text-zea-700 relative inline-block">
                  Produktivitas Anda
                  <svg className="absolute -bottom-1.5 left-0 w-full h-2 text-zea-300" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="3" fill="transparent"/>
                  </svg>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
                Template, AI tools, dan berbagai sumber daya digital yang dirancang untuk membantu pekerjaan Anda lebih mudah.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigateTo('catalog')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-zea-700 hover:bg-zea-800 text-white font-semibold text-sm shadow-md shadow-zea-700/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Jelajahi Produk</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('ai-prompt')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white hover:bg-rose-50/70 border border-rose-200 text-neutral-700 font-semibold text-sm shadow-xs transition-all hover:border-rose-300 active:scale-[0.98]"
                >
                  <Sparkles className="w-4 h-4 text-zea-600" />
                  <span>Generator Prompt AI</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4 text-xs text-neutral-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Akses Langsung Instan</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Garansi Pembaruan File</span>
                </div>
              </div>

            </div>

            {/* Right Column: Aesthetic 3D Soft Pink Workspace Composition */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-md">
                
                {/* Floating handwritten-style badge */}
                <div className="absolute -top-4 right-4 z-20 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-rose-200/80 shadow-md transform rotate-3">
                  <p className="text-xs font-bold text-zea-700 italic">Lebih Mudah,</p>
                  <p className="text-[11px] font-medium text-neutral-600">Lebih Produktif</p>
                </div>

                {/* Main 3D Styled Composition Card */}
                <div className="rounded-3xl p-4 bg-gradient-to-b from-white/90 to-rose-50/70 backdrop-blur-md border border-white shadow-card relative overflow-hidden">
                  
                  {/* Visual Laptop & Productivity Art */}
                  <div className="relative rounded-2xl overflow-hidden shadow-inner bg-gradient-to-tr from-rose-100 via-rose-50 to-white p-5 border border-rose-100">
                    <img 
                      src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=700&q=80" 
                      alt="Workspace Aesthetic"
                      className="w-full h-64 sm:h-72 object-cover rounded-xl shadow-md mix-blend-multiply opacity-90 transition-transform duration-500 hover:scale-105"
                    />

                    {/* Floating Overlay Widgets */}
                    <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-rose-100 flex items-center gap-3 animate-pulse">
                      <div className="w-8 h-8 rounded-xl bg-zea-100 text-zea-700 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-[11px] font-bold text-neutral-800">Financial Planner 2026</p>
                        <p className="text-[10px] text-neutral-500">Auto-sync dashboard</p>
                      </div>
                    </div>

                    <div className="absolute top-10 right-8 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-md border border-rose-100 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span className="text-[11px] font-semibold text-neutral-700">100% Siap Pakai</span>
                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>

        </div>

        {/* Feature Highlights Bar (Below Hero) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
          
          <button 
            onClick={() => handleCategoryClick('AI Tools')}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-rose-100/90 shadow-xs hover:border-zea-300 hover:shadow-soft transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-zea-700 flex items-center justify-center shrink-0 group-hover:bg-zea-700 group-hover:text-white transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 group-hover:text-zea-700 transition-colors">AI Tools</p>
              <p className="text-[11px] text-neutral-400 truncate">Buat ide jadi nyata</p>
            </div>
          </button>

          <button 
            onClick={() => handleCategoryClick('Template')}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-rose-100/90 shadow-xs hover:border-zea-300 hover:shadow-soft transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-zea-700 flex items-center justify-center shrink-0 group-hover:bg-zea-700 group-hover:text-white transition-colors">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 group-hover:text-zea-700 transition-colors">Template</p>
              <p className="text-[11px] text-neutral-400 truncate">Siap pakai & praktis</p>
            </div>
          </button>

          <button 
            onClick={() => handleCategoryClick('Produktivitas')}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-rose-100/90 shadow-xs hover:border-zea-300 hover:shadow-soft transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-zea-700 flex items-center justify-center shrink-0 group-hover:bg-zea-700 group-hover:text-white transition-colors">
              <CheckSquare className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 group-hover:text-zea-700 transition-colors">Produktivitas</p>
              <p className="text-[11px] text-neutral-400 truncate">Atur hidup lebih baik</p>
            </div>
          </button>

          <button 
            onClick={() => handleCategoryClick('Premium Apps')}
            className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-rose-100/90 shadow-xs hover:border-zea-300 hover:shadow-soft transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-zea-700 flex items-center justify-center shrink-0 group-hover:bg-zea-700 group-hover:text-white transition-colors">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 group-hover:text-zea-700 transition-colors">Premium Apps</p>
              <p className="text-[11px] text-neutral-400 truncate">Akses aplikasi terbaik</p>
            </div>
          </button>

          <button 
            onClick={() => handleCategoryClick('Tools Digital')}
            className="col-span-2 sm:col-span-1 flex items-center gap-3.5 p-3.5 rounded-2xl bg-white border border-rose-100/90 shadow-xs hover:border-zea-300 hover:shadow-soft transition-all text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-zea-700 flex items-center justify-center shrink-0 group-hover:bg-zea-700 group-hover:text-white transition-colors">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 group-hover:text-zea-700 transition-colors">Tools Digital</p>
              <p className="text-[11px] text-neutral-400 truncate">Solusi untuk sehari-hari</p>
            </div>
          </button>

        </div>

      </div>
    </section>
  );
};
