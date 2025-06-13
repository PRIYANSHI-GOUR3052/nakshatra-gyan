const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sunset-orange': {
          DEFAULT: '#FF4500',
          light: '#FF6347',
          dark: '#E03E00',
        },
        'ocean-blue': {
          DEFAULT: '#0077B6',
          light: '#0096C7',
          dark: '#005F8A',
        },
        'forest-green': {
          DEFAULT: '#228B22',
          light: '#32CD32',
          dark: '#196619',
        },
        'golden-yellow': {
          DEFAULT: '#FFD700',
          light: '#FFE033',
          dark: '#CCAC00',
        },
        'soft-pink': {
          DEFAULT: '#FFC0CB',
          light: '#FFD6E0',
          dark: '#FFA6B8',
        },
        'midnight-black': {
          DEFAULT: '#121212',
          light: '#1E1E1E',
          dark: '#0A0A0A',
        },
        border: 'var(--border)',
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "float": {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        "glow": {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        "spin-slow": {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        "twinkle": {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "twinkle": "twinkle 3s ease-in-out infinite",
      },
      screens: {
        'xs': '475px',
      },
      transitionDelay: {
        '75': '75ms',
        '150': '150ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
}

