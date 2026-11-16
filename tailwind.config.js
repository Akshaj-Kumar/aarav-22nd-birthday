/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jet: '#050505',
        'jet-card': '#0a0d14',
        midnight: '#071629',
        'midnight-deep': '#030b15',
        'electric-blue': '#007BFF',
        'neon-blue': '#00d2ff',
        'neon-purple': '#8B5CF6',
        'neon-pink': '#ec4899',
        'metallic-silver': '#C0C0C0',
      },
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
      boxShadow: {
        'neon-blue': '0 0 25px rgba(0, 123, 255, 0.45)',
        'neon-purple': '0 0 25px rgba(139, 92, 246, 0.45)',
        'neon-glow': '0 0 35px rgba(0, 210, 255, 0.35)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(0, 123, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.7))' },
        }
      }
    },
  },
  plugins: [],
}
