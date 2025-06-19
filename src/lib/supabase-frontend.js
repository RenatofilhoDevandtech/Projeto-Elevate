// src/lib/supabase-frontend.js
import { createClient } from "@supabase/supabase-js";

// SUAS CHAVES PÚBLICAS DO SUPABASE (anon key)
// CORREÇÃO: Usar APENAS import.meta.env para variáveis de ambiente no frontend com Vite
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verifica se as variáveis de ambiente foram realmente encontradas
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    "ERRO CRÍTICO: Variáveis de ambiente VITE_SUPABASE_URL ou VITE_SUPABASE_ANON_KEY não encontradas no frontend."
  );
  console.error(
    "Verifique seu arquivo .env.local ou .env na raiz do projeto frontend e certifique-se de que as chaves começam com VITE_."
  );
  // Não lance um erro aqui, apenas registre no console. Deixe o app iniciar para mostrar a tela de erro / loading.
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true, 
    autoRefreshToken: true, 
    detectSessionInUrl: true, 
    storage: localStorage, 
  },
});