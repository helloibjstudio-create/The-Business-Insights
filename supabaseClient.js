// supabaseClient.js
import { createClient } from "@supabase/supabase-js";

let supabase = null;

export const getSupabase = () => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY;

  if (!url || !key) {
    console.error("❌ Missing Supabase environment variables!");
    throw new Error("Supabase credentials are missing — check Vercel Environment Variables.");
  }

  if (!supabase) {
    supabase = createClient(url, key);
  }
  return supabase;
};
