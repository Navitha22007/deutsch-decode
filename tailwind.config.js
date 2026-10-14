/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deBlack: {
          DEFAULT: '#111111',
          light: '#1F1F1F',
          card: '#18181B',
          border: '#27272A',
        },
        deRed: {
          DEFAULT: '#E63946',
          dark: '#D02937',
          light: '#FF6B78',
          soft: '#FEE2E2',
        },
        deGold: {
          DEFAULT: '#FFC857',
          dark: '#E0A838',
          light: '#FFE494',
          soft: '#FEF3C7',
        },
        deCream: {
          DEFAULT: '#FDFBF7',
          warm: '#F7F3E9',
          card: '#FFFFFF',
          border: '#E8E4DA',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'pocket': '0 6px 0 0 #111111',
        'pocket-red': '0 6px 0 0 #9B1C1C',
        'pocket-gold': '0 6px 0 0 #B45309',
        'card-elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'expo-board': '0 20px 40px -15px rgba(0, 0, 0, 0.3)',
      },
      keyframes: {
        pop: {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.05)' },
          '100%': { transform: 'scale(1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        }
      },
      animation: {
        pop: 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
