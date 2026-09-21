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
        command: {
          bg: '#0A0E14',
          subbg: '#0D1117',
          card: '#141A24',
          cardLight: '#18212F',
          border: '#1F2733',
          borderLight: '#2A3649',
          cyan: '#3FA9F5',
          cyanGlow: '#00B4D8',
          crit: '#E85D5D',
          critGlow: '#FF4C4C',
          warn: '#E8A33D',
          warnGlow: '#F59E0B',
          nominal: '#3DDC97',
          nominalGlow: '#10B981',
          textMuted: '#8B95A5',
          textBright: '#E8ECF1',
          textDim: '#5B6577',
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Roboto Condensed"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Roboto Mono"', 'monospace'],
        display: ['"Roboto Condensed"', '"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.2em',
        widest3: '0.25em',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
        'radar-sweep': 'radarSweep 4s linear infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        }
      }
    },
  },
  plugins: [],
}
