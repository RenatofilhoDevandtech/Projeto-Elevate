// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': 'var(--brand-blue)',
        'brand-blue-dark': 'var(--brand-blue-dark)',
        'brand-blue-hover': 'var(--brand-blue-hover)',
        'brand-green': 'var(--brand-green)',
        'brand-green-dark': 'var(--brand-green-dark)',
        'brand-white': 'var(--brand-white)',
        'brand-gray': 'var(--brand-gray)',
        'brand-gray-medium': 'var(--brand-gray-medium)',
        'brand-gray-dark': 'var(--brand-gray-dark)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-inverse': 'var(--text-inverse)',
        'danger-red': 'var(--danger-red)',
      },
      fontFamily: {
        sans: ['"Libre Franklin"', 'sans-serif'],
      },
      // Se as sombras `shadow-custom-light` etc. não estiverem vindo do Tailwind
      // elas precisarão ser definidas aqui ou continuarão como classes CSS puras.
      // Exemplo (se elas fossem do Tailwind):
      boxShadow: {
        'custom-light': '0px 4px 15px rgba(0, 0, 0, 0.08)', // Exemplo de um valor
        'custom-medium': '0px 8px 25px rgba(0, 0, 0, 0.15)', // Exemplo de um valor
      }
    },
  },
  plugins: [],
}