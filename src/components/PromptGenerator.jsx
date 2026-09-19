import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { 
  Sparkles, 
  Copy, 
  Check, 
  Wand2, 
  RefreshCw, 
  ArrowRight,
  FileCode,
  Camera,
  Share2
} from 'lucide-react';

export const PromptGenerator = () => {
  const { showToast, navigateTo } = useStore();

  const [category, setCategory] = useState('copywriting');
  const [topic, setTopic] = useState('Peluncuran E-Course Desain Grafis Pemula');
  const [tone, setTone] = useState('Persuasif & Menghipnotis');
  const [targetPlatform, setTargetPlatform] = useState('Instagram Ads & Reels');
  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const presets = [
    {
      id: 'copywriting',
      title: 'Copywriting & Ads',
      icon: Wand2,
      desc: 'Formula copywriting AIDA & PAS untuk konversi tinggi'
    },
    {
      id: 'midjourney',
      title: 'Midjourney Art',
      icon: Camera,
      desc: 'Prompt foto realistik 8K, parameter sinematik & pencahayaan'
    },
    {
      id: 'social',
      title: 'Social Media Script',
      icon: Share2,
      desc: 'Skrip video retention tinggi dengan 3-detik hook awal'
    },
    {
      id: 'coding',
      title: 'Coding Assistant',
      icon: FileCode,
      desc: 'Instruksi Clean Code, refactoring, dan arsitektur modular'
    }
  ];

  const handleGenerate = (e) => {
    e?.preventDefault();
    setIsGenerating(true);

    setTimeout(() => {
      let promptText = '';

      if (category === 'copywriting') {
        promptText = `Bertindaklah sebagai copywriter kelas dunia dengan pengalaman 15 tahun di direct response marketing.\n\nTugas: Buatkan naskah copywriting promosi dengan formula PAS (Problem, Agitate, Solution) untuk produk:\n- Topik/Produk: "${topic}"\n- Nada Bicara (Tone): "${tone}"\n- Target Platform: "${targetPlatform}"\n\nStruktur Penulisan:\n1. 3 Pilihan Hook Pembuka yang memicu rasa ingin tahu (curiosity gap).\n2. Pembahasan rasa sakit / masalah nyata yang dialami audiens saat ini.\n3. Presentasi solusi tak terbantahkan dengan poin keunggulan unik.\n4. Call to Action (CTA) mendesak dengan jaminan risiko nol.`;
      } else if (category === 'midjourney') {
        promptText = `/imagine prompt: A high-end editorial product visualization of ${topic}, aesthetic pastel rose gold and warm terracotta lighting, ultra-detailed shot, soft cinematic reflections, soft focus background, shot on Hasselblad H6D-100c, 85mm f/1.4 lens, photorealistic, 8k resolution, studio product photography --ar 16:9 --v 6.0 --style raw --q 2`;
      } else if (category === 'social') {
        promptText = `Kamu adalah viral content strategist untuk ${targetPlatform}.\n\nBuat skrip video durasi 45-60 detik tentang "${topic}" dengan gaya "${tone}".\n\nFormat Skrip:\n- [00:00 - 00:03] HOOK: Visual & Audio yang menghentikan scroll.\n- [00:04 - 00:20] THE REALITY: Mengapa kebanyakan orang gagal atau salah paham tentang hal ini.\n- [00:21 - 00:45] ACTIONABLE STEPS: 3 langkah konkret yang bisa langsung dicoba hari ini.\n- [00:46 - 00:60] CTA: Ajak penonton simpan video ini & share ke teman mereka.`;
      } else {
        promptText = `Bertindaklah sebagai Senior Staff Software Engineer.\n\nKebutuhan: Buatkan implementasi arsitektur berkualitas tinggi untuk "${topic}" dengan standar ${tone}.\n\nPersyaratan:\n1. Gunakan best practices (Clean Architecture, SOLID principle, TypeScript/React jika relevan).\n2. Berikan penanganan error (error handling) yang komprehensif.\n3. Jelaskan trade-offs dan sertakan contoh implementasi unit test.`;
      }

      setGeneratedPrompt(promptText);
      setIsGenerating(false);
      showToast('Prompt AI berhasil digenerate!', 'success');
    }, 600);
  };

  const handleCopy = () => {
    if (!generatedPrompt) return;
    navigator.clipboard.writeText(generatedPrompt);
    setIsCopied(true);
    showToast('Prompt berhasil disalin ke clipboard!');
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-left">
      
      {/* Header */}
      <div className="mb-8 pb-4 border-b border-rose-100 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-zea-800 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>ZEA AI Engine v3.2</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            AI Prompt Generator
          </h1>
          <p className="text-xs text-neutral-500 mt-1 max-w-xl">
            Alat bantu praktis untuk merumuskan instruksi AI siap pakai dengan parameter optimal untuk ChatGPT, Midjourney, Claude, & Gemini.
          </p>
        </div>

        <button
          onClick={() => navigateTo('product-detail', 'prompt-generator')}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-rose-200 text-neutral-700 hover:text-zea-800 text-xs font-semibold shadow-xs self-start md:self-auto"
        >
          <span>Lihat Produk Prompt Vault (1.000+ Prompt)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Input Parameters Form */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-soft space-y-6">
          <h3 className="text-sm font-bold text-neutral-900">1. Pilih Format Kebutuhan</h3>

          {/* Preset Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {presets.map((item) => {
              const IconComp = item.icon;
              const isSelected = category === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCategory(item.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'border-zea-600 bg-rose-50/60 shadow-xs'
                      : 'border-rose-100 hover:border-rose-200 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-zea-700 text-white' : 'bg-rose-50 text-zea-700'}`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-bold text-neutral-800">{item.title}</span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-tight">{item.desc}</p>
                </button>
              );
            })}
          </div>

          <h3 className="text-sm font-bold text-neutral-900 pt-2">2. Kustomisasi Variabel</h3>

          <form onSubmit={handleGenerate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-700 mb-1">
                Topik / Ide Utama
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Contoh: E-Course Desain, Skincare Pencerah, dll."
                className="w-full bg-rose-50/40 border border-rose-200 rounded-2xl px-4 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-zea-500/20"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Gaya Bahasa / Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-2xl px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-zea-500/20 font-medium"
                >
                  <option value="Persuasif & Menghipnotis">Persuasif & Menghipnotis</option>
                  <option value="Profesional & Otoritatif">Profesional & Otoritatif</option>
                  <option value="Santai & Relatable">Santai & Relatable</option>
                  <option value="Storytelling Emosional">Storytelling Emosional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Platform Target
                </label>
                <select
                  value={targetPlatform}
                  onChange={(e) => setTargetPlatform(e.target.value)}
                  className="w-full bg-rose-50/40 border border-rose-200 rounded-2xl px-3 py-2.5 text-xs text-neutral-800 focus:outline-none focus:ring-2 focus:ring-zea-500/20 font-medium"
                >
                  <option value="Instagram Ads & Reels">Instagram Ads & Reels</option>
                  <option value="TikTok & YouTube Shorts">TikTok & YouTube Shorts</option>
                  <option value="LinkedIn Newsletter">LinkedIn Newsletter</option>
                  <option value="Website Landing Page">Website Landing Page</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating}
              className="w-full py-3.5 px-6 rounded-2xl bg-zea-700 hover:bg-zea-800 text-white font-bold text-xs shadow-md shadow-zea-700/25 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Meracik Formula Prompt...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Prompt Sekarang</span>
                </>
              )}
            </button>
          </form>

        </div>

        {/* Right: Output Box */}
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-soft flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-rose-50 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-zea-600" />
                <h3 className="text-sm font-bold text-neutral-900">Hasil Formula Prompt AI</h3>
              </div>

              {generatedPrompt && (
                <button
                  onClick={handleCopy}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isCopied 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-rose-50 text-zea-800 border border-rose-200 hover:bg-rose-100'
                  }`}
                >
                  {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{isCopied ? 'Tersalin!' : 'Salin Prompt'}</span>
                </button>
              )}
            </div>

            {/* Prompt Display Area */}
            {generatedPrompt ? (
              <div className="p-4 rounded-2xl bg-[#FFFDFD] border border-rose-100 font-mono text-xs text-neutral-800 leading-relaxed whitespace-pre-wrap selection:bg-zea-200 max-h-96 overflow-y-auto">
                {generatedPrompt}
              </div>
            ) : (
              <div className="p-12 text-center text-neutral-400 border border-dashed border-rose-200 rounded-2xl">
                <Sparkles className="w-8 h-8 mx-auto text-rose-300 mb-2" />
                <p className="text-xs font-semibold text-neutral-600">Belum ada prompt digenerate</p>
                <p className="text-[11px] text-neutral-400 mt-1">
                  Klik tombol <strong>"Generate Prompt Sekarang"</strong> untuk membuat naskah instruksi siap pakai.
                </p>
              </div>
            )}
          </div>

          {/* Quick tips */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-[11px] text-neutral-600 space-y-1">
            <p className="font-bold text-neutral-800">Tips Penggunaan:</p>
            <p>Salin prompt di atas dan tempel langsung ke ChatGPT-4o, Claude 3.5 Sonnet, atau Midjourney untuk hasil paling presisi.</p>
          </div>

        </div>

      </div>

    </div>
  );
};
