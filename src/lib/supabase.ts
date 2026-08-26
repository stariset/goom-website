import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

// createClient throws if URL is empty — guard so SSR doesn't crash when env
// vars are missing (Vercel deployment without secrets set, etc.)
let _supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseAnonKey) {
  try {
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  } catch (e) {
    console.warn("⚠️ Failed to initialise Supabase client:", e);
  }
} else {
  console.warn(
    "⚠️ Supabase credentials missing! Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Vercel environment variables.",
  );
}

export const supabase = _supabase;
