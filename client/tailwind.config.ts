import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#150A12',
        secondary: '#1C0F18',
        card: '#221324',
        hover: '#2C1830',
        border: '#3A2238',
        'text-primary': '#F8FAFC',
        'text-secondary': '#94A3B8',
        'text-tertiary': '#64748B',
        blue: '#DB2777',
        cyan: '#A855F7',
        green: '#10B981',
        amber: '#F59E0B',
        red: '#DB2777',
        purple: '#8B5CF6',
        // Aliases for pages using accent- prefix
        'accent-blue': '#DB2777',
        'accent-cyan': '#A855F7',
        'accent-green': '#10B981',
        'accent-amber': '#F59E0B',
        'accent-red': '#DB2777',
        'accent-purple': '#8B5CF6',
        // Aliases for pages using bg- prefix on color names
        'bg-primary': '#0A0E1A',
        'bg-secondary': '#111827',
        'bg-card': '#1A2035',
        'bg-hover': '#243047',
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
