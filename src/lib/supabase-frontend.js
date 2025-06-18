import { createClient } from '@supabase/supabase-js';

// CORREÇÃO: Usamos import.meta.env em vez de process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);