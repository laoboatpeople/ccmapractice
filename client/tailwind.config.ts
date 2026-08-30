import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#031428',
        secondary: '#020F1E',
        card: '#0B2038',
        hover: '#102840',
        border: '#14506B',
        'text-primary': '#F5F8FA',
        'text-secondary': '#A8B7C9',
        'text-tertiary': '#70849A',
        blue: '#20C7C9',
        cyan: '#1688B8',
        green: '#10B981',
        amber: '#F59E0B',
        red: '#20C7C9',
        purple: '#22B8E6',
        // Aliases for pages using accent- prefix
        'accent-blue': '#20C7C9',
        'accent-cyan': '#1688B8',
        'accent-green': '#10B981',
        'accent-amber': '#F59E0B',
        'accent-red': '#20C7C9',
        'accent-purple': '#22B8E6',
        // Aliases for pages using bg- prefix on color names
        'bg-primary': '#031428',
        'bg-secondary': '#020F1E',
        'bg-card': '#0B2038',
        'bg-hover': '#102840',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '8px',
        btn: '6px',
        input: '4px',
      },
    },
  },
  plugins: [],
};

export default config;
