import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path' // Importar o módulo 'path' do Node.js

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // ADICIONE ESTA SEÇÃO PARA CRIAR O ATALHO '@'
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})