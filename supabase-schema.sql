-- ==========================================================
-- SKEMA DATABASE SUPABASE UNTUK ZEA DIGITAL STORE & APP MANAGER
-- Buka Supabase Dashboard > SQL Editor > New Query > Paste & Run
-- ==========================================================

-- 1. Tabel Produk Digital (zea_products)
CREATE TABLE IF NOT EXISTS zea_products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  product_link TEXT NOT NULL,
  image TEXT,
  description TEXT,
  features JSONB DEFAULT '[]'::jsonb,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  sales_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabel Lisensi Zea App Manager (zea_licenses)
CREATE TABLE IF NOT EXISTS zea_licenses (
  id BIGSERIAL PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  plan_name TEXT NOT NULL,
  buyer_name TEXT NOT NULL,
  buyer_contact TEXT NOT NULL,
  created_date TEXT NOT NULL,
  expiry_date TEXT NOT NULL,
  status TEXT DEFAULT 'Aktif',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabel Pesanan / Transaksi (zea_orders)
CREATE TABLE IF NOT EXISTS zea_orders (
  id TEXT PRIMARY KEY,
  buyer_name TEXT NOT NULL,
  buyer_contact TEXT NOT NULL,
  item_name TEXT NOT NULL,
  item_type TEXT NOT NULL,
  price NUMERIC NOT NULL,
  date TEXT NOT NULL,
  status TEXT DEFAULT 'Lunas',
  payment_method TEXT NOT NULL,
  license_key TEXT,
  product_link TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Izinkan Read & Write Publik (Anon Key) untuk Operasional Guest Checkout
ALTER TABLE zea_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE zea_licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE zea_orders ENABLE ROW LEVEL SECURITY;

-- Policy untuk zea_products (Semua orang bisa baca, insert/update/delete terbuka untuk admin)
CREATE POLICY "Public Read Products" ON zea_products FOR SELECT USING (true);
CREATE POLICY "Public Insert Products" ON zea_products FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Products" ON zea_products FOR UPDATE USING (true);
CREATE POLICY "Public Delete Products" ON zea_products FOR DELETE USING (true);

-- Policy untuk zea_licenses
CREATE POLICY "Public Read Licenses" ON zea_licenses FOR SELECT USING (true);
CREATE POLICY "Public Insert Licenses" ON zea_licenses FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Licenses" ON zea_licenses FOR UPDATE USING (true);

-- Policy untuk zea_orders
CREATE POLICY "Public Read Orders" ON zea_orders FOR SELECT USING (true);
CREATE POLICY "Public Insert Orders" ON zea_orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Update Orders" ON zea_orders FOR UPDATE USING (true);

-- Isi Data Awal Produk Digital
INSERT INTO zea_products (id, name, category, price, original_price, product_link, image, description, features, rating, reviews_count, sales_count)
VALUES
  (
    'prod-notion-planner',
    'Notion Workspace Ultimate Planner Pro',
    'Notion Template',
    65000,
    120000,
    'https://notion.so/templates/zea-workspace-ultimate-pro',
    'https://images.unsplash.com/photo-1517842645767-c639042777db?w=600&auto=format&fit=crop&q=80',
    'Dashboard Notion lengkap untuk manajemen projek, jadwal harian, keuangan, dan habit tracker otomatis.',
    '["Auto habit tracker", "Finance & income dashboard", "Project manager & client CRM", "Video tutorial pemasangan"]'::jsonb,
    4.9,
    142,
    680
  ),
  (
    'prod-ai-prompts',
    'AI Master Prompt Vault 2026 (5000+ Prompts)',
    'AI Prompts',
    85000,
    175000,
    'https://drive.google.com/drive/folders/zea-ai-master-prompts-vault-2026',
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
    'Koleksi 5.000+ formula prompt terbaik untuk Midjourney, Google Flow, ChatGPT, dan Claude untuk bisnis & desain.',
    '["5.000+ formula prompt teruji", "Kategori: Copywriting, Desain, Coding, SEO", "Update berkala via Google Drive", "Contoh hasil output visual"]'::jsonb,
    5.0,
    218,
    1250
  ),
  (
    'prod-content-os',
    'Content Creator OS & Social Media Calendar',
    'Template & SOP',
    75000,
    149000,
    'https://notion.so/templates/zea-content-creator-os',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80',
    'Sistem komplit untuk mengelola ide konten, jadwal posting multi-platform (TikTok, IG, YT), dan analisis performa.',
    '["Kalender konten otomatis", "Script writing & hook bank (100+ hook)", "Sponsor & rate card manager", "Aset checklist produksi video"]'::jsonb,
    4.8,
    97,
    430
  ),
  (
    'prod-financial-sheet',
    'Financial Mastery Spreadsheet & Cashflow Tracker',
    'Spreadsheet',
    55000,
    99000,
    'https://docs.google.com/spreadsheets/d/zea-financial-mastery-template',
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80',
    'Template Google Sheets otomatis dengan grafik visual untuk mengontrol pengeluaran, tabungan, dan investasi.',
    '["Dashboard grafik interaktif", "Multi-rekening & dompet digital", "Kalkulator dana darurat & pensiun", "Format Google Sheets & Excel XLSX"]'::jsonb,
    4.9,
    114,
    520
  ),
  (
    'prod-agency-sop',
    'SOP Digital Agency & Freelance Contract Toolkit',
    'Template & SOP',
    89000,
    199000,
    'https://drive.google.com/drive/folders/zea-agency-sop-contract-toolkit',
    'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=600&auto=format&fit=crop&q=80',
    'Kumpulan draft kontrak kerja resmi, surat penawaran, invoice profesional, dan SOP pengerjaan proyek klien.',
    '["Template kontrak Bahasa Indonesia & Inggris", "Invoice generator otomatis", "SOP onboarding & serah terima proyek", "Siap edit di Word & Google Docs"]'::jsonb,
    4.9,
    76,
    310
  )
ON CONFLICT (id) DO NOTHING;
