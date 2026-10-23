/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tn: {
          navy: {
            950: '#070f1e',
            900: '#0a192f',
            800: '#112240',
            700: '#1d3356',
            600: '#233f6b',
            500: '#2d5289',
          },
          slate: {
            900: '#0f172a',
            800: '#1e293b',
            700: '#334155',
            600: '#475569',
            500: '#64748b',
            400: '#94a3b8',
            300: '#cbd5e1',
            200: '#e2e8f0',
            100: '#f1f5f9',
            50: '#f8fafc',
          },
          gold: {
            500: '#d97706',
            600: '#b45309',
            400: '#f59e0b',
            100: '#fef3c7',
            50: '#fffbeb',
          },
          crimson: {
            700: '#991b1b',
            600: '#dc2626',
            500: '#ef4444',
            100: '#fee2e2',
            50: '#fef2f2',
          },
          emerald: {
            700: '#047857',
            600: '#059669',
            500: '#10b981',
            100: '#d1fae5',
            50: '#ecfdf5',
          },
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
