/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        midnight: {
          950: '#080610', // Requested primary background
          900: '#100B1B', // Requested secondary background
          850: '#160F25',
          800: '#1E1533',
          700: '#2A1D47',
        },
        butterfly: {
          purple: '#A855F7',   // Primary purple
          neon: '#BF5AFF',     // Neon violet
          lavender: '#D8B4FE', // Electric lavender
          blue: '#8B9CFF',     // Accent blue
          text: '#FFFFFF',     // Main text
          muted: '#B8AEC7',    // Secondary text
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Syne', '"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'butterfly-flutter': 'flutter 0.35s ease-in-out infinite alternate',
        'soft-glow': 'softGlow 4s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flutter: {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0.2)' },
        },
        softGlow: {
          '0%': { filter: 'drop-shadow(0 0 10px rgba(191,90,255,0.3))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(191,90,255,0.65))' },
        }
      }
    },
  },
  plugins: [],
}
