/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          DEFAULT: '#461927',
          dark: '#2E0E18',
          deep: '#230811',
          light: '#5E2235',
          soft: '#742D44',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
          card: '#FDFBF7',
          warm: '#F4EFEA',
          border: '#E8DFD5',
        },
        gold: {
          DEFAULT: '#C5A059',
          light: '#E2C889',
          dark: '#9E7C38',
          metallic: '#D4AF37',
        },
        sand: '#EFE7DC',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        cinzel: ['Cinzel', 'serif'],
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        script: ['"Great Vibes"', 'cursive'],
      },
      boxShadow: {
        'royal': '0 12px 36px -8px rgba(70, 25, 39, 0.25)',
        'gold-glow': '0 0 25px rgba(197, 160, 89, 0.4)',
        'card-subtle': '0 4px 20px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'petal-fall': 'petalFall 10s linear infinite',
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
      },
      keyframes: {
        petalFall: {
          '0%': { transform: 'translateY(-10%) rotate(0deg)', opacity: '0.9' },
          '100%': { transform: 'translateY(110vh) rotate(360deg)', opacity: '0.2' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
