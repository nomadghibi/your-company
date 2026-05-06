import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: '#0f172a',
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e40af',
        },
      },
      boxShadow: {
        soft: '0 18px 55px rgba(15, 23, 42, 0.11)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'grow-bar': {
          '0%': { transform: 'scaleY(0.2)', opacity: '0.45' },
          '100%': { transform: 'scaleY(1)', opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 700ms ease-out forwards',
        'fade-in': 'fade-in 700ms ease-out forwards',
        float: 'float 5s ease-in-out infinite',
        'grow-bar': 'grow-bar 800ms ease-out forwards',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config;
