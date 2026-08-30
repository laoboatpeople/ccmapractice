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
        primary: '#031428',
        secondary: '#020F1E',
        card: '#0B2038',
        hover: '#102840',
        // Nested aliases (kept for compatibility — generates .bg-bg-card, .text-text-primary, etc.)
        bg: {
          primary: '#031428',
          secondary: '#020F1E',
          card: '#0B2038',
          hover: '#102840',
        },
        border: '#14506B',
        text: {
          primary: '#F5F8FA',
          secondary: '#A8B7C9',
          tertiary: '#70849A',
        },
        blue: '#20C7C9',
        cyan: '#1688B8',
        green: '#10B981',
        amber: '#F59E0B',
        red: '#20C7C9',
        purple: '#22B8E6',
        accent: {
          blue: '#20C7C9',
          cyan: '#1688B8',
          green: '#10B981',
          amber: '#F59E0B',
          red: '#20C7C9',
          purple: '#22B8E6',
        },
        // Flat aliases used by the codebase
        'bg-primary': '#031428',
        'bg-secondary': '#020F1E',
        'bg-card': '#0B2038',
        'bg-hover': '#102840',
        'text-primary': '#F5F8FA',
        'text-secondary': '#A8B7C9',
        'text-tertiary': '#70849A',
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
