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
        cosmos: {
          950: '#05060A',
          900: '#0B0D14',
          850: '#12141C',
          800: '#181B26',
          700: '#232738',
          600: '#343A52',
          400: '#64748B',
          200: '#94A3B8',
          100: '#E2E8F0',
        },
        neon: {
          blue: '#00D4FF',
          cyan: '#38BDF8',
          purple: '#8B5CF6',
          violet: '#A855F7',
          pink: '#EC4899',
        }
      },
      fontFamily: {
        display: ['Space Grotesk', 'Orbitron', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glow 3s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(0, 212, 255, 0.3))' },
          '100%': { filter: 'drop-shadow(0 0 25px rgba(139, 92, 246, 0.5))' },
        }
      },
      boxShadow: {
        'neon-blue': '0 0 25px -5px rgba(0, 212, 255, 0.4)',
        'neon-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glass-glow': '0 8px 32px 0 rgba(0, 212, 255, 0.15)',
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))',
        'neural-mesh': 'radial-gradient(ellipse at 50% -20%, rgba(139, 92, 246, 0.25), transparent 70%), radial-gradient(ellipse at 80% 80%, rgba(0, 212, 255, 0.15), transparent 60%)',
      }
    },
  },
  plugins: [],
}
