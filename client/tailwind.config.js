/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      borderRadius: {
        'card': '8px',
        'btn': '6px',
      },
      colors: {
        // Top-level colors — these generate .bg-card, .bg-hover, .bg-primary,
        // .text-card, .border-card, etc. (REQUIRED — the codebase uses bg-card/bg-hover everywhere)
        primary: '#150A12',
        secondary: '#1C0F18',
        card: '#221324',
        hover: '#2C1830',
        // Nested aliases (kept for compatibility — generates .bg-bg-card, .text-text-primary, etc.)
        bg: {
          primary: '#150A12',
          secondary: '#1C0F18',
          card: '#221324',
          hover: '#2C1830',
        },
        border: '#3A2238',
        text: {
          primary: '#F8FAFC',
          secondary: '#94A3B8',
          tertiary: '#64748B',
        },
        blue: '#DB2777',
        cyan: '#A855F7',
        green: '#10B981',
        amber: '#F59E0B',
        red: '#DB2777',
        purple: '#8B5CF6',
        accent: {
          blue: '#DB2777',
          cyan: '#A855F7',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#DB2777',
          purple: '#8B5CF6',
        },
        // Flat aliases used by the codebase
        'bg-primary': '#150A12',
        'bg-secondary': '#1C0F18',
        'bg-card': '#221324',
        'bg-hover': '#2C1830',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-tertiary': '#64748B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'shimmer': 'shimmer 2s infinite',
        'fade-in': 'fadeIn 200ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
