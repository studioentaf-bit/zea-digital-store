import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment or localStorage for flexible setup
export const getSupabaseConfig = () => {
  const envUrl = import.meta.env.VITE_SUPABASE_URL;
  const envKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const localUrl = localStorage.getItem('zea_supabase_url');
  const localKey = localStorage.getItem('zea_supabase_key');

  const supabaseUrl = localUrl || envUrl || '';
  const supabaseKey = localKey || envKey || '';

  return {
    url: supabaseUrl.trim(),
    key: supabaseKey.trim(),
    isConfigured: Boolean(supabaseUrl && supabaseKey && supabaseUrl.includes('supabase.co'))
  };
};

export const createSupabaseInstance = () => {
  const { url, key, isConfigured } = getSupabaseConfig();
  if (!isConfigured) return null;
  try {
    return createClient(url, key);
  } catch (err) {
    console.error('Error initializing Supabase client:', err);
    return null;
  }
};

export let supabase = createSupabaseInstance();

export const refreshSupabaseClient = () => {
  supabase = createSupabaseInstance();
  return supabase;
};

// Database helper functions
export const testSupabaseConnection = async () => {
  const client = createSupabaseInstance();
  if (!client) return { success: false, message: 'URL atau Anon Key Supabase belum diisi' };
  try {
    const { data, error } = await client.from('zea_products').select('count', { count: 'exact', head: true });
    if (error) throw error;
    return { success: true, message: 'Terhubung ke Supabase!' };
  } catch (err) {
    return { success: false, message: err.message || 'Gagal terhubung ke Supabase' };
  }
};
