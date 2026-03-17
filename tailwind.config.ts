import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-exo2)', 'sans-serif'],
        display: ['var(--font-orbitron)', 'sans-serif'],
      },
      colors: {
        cyan: {
          DEFAULT: '#00e5ff',
          dim: 'rgba(0, 229, 255, 0.6)',
        },
        magenta: {
          DEFAULT: '#e040fb',
        },
        purple: {
          deep: '#0d0021',
          mid: '#1a0040',
          DEFAULT: '#7c3aed',
        },
        gold: '#fbbf24',
        glass: {
          bg: 'rgba(255, 255, 255, 0.04)',
          border: 'rgba(120, 100, 255, 0.18)',
          'border-bright': 'rgba(120, 100, 255, 0.35)',
          shine: 'rgba(255, 255, 255, 0.12)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
