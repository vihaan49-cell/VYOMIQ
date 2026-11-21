/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#080e1e',
          850: '#0c152e',
          800: '#111e3f',
          700: '#1a2c5a',
          600: '#263d7a',
          500: '#3858a7',
        },
        isro: {
          amber: '#f97316',
          gold: '#f59e0b',
          saffron: '#ff6600',
          cyan: '#06b6d4',
          emerald: '#10b981',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'Menlo', 'Consolas', 'monospace'],
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-orange': '0 0 25px -5px rgba(249, 115, 22, 0.4)',
        'glow-gold': '0 0 30px -5px rgba(245, 158, 11, 0.35)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 30s linear infinite',
      }
    },
  },
  plugins: [],
}
