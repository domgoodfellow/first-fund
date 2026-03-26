import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'ff-bg':          '#09090b',
        'ff-surface':     '#18181a',
        'ff-surface-alt': '#202022',
        'ff-raised':      '#272729',
        'ff-dark-alt':    '#27262b',
        'ff-accent':      '#00a73e',
        'ff-glow':        '#00c44a',
        'ff-text':        '#fcfcfc',
        'ff-muted':       '#8b8b8b',
        'ff-border':      '#3f3f47',
      },
      fontFamily: {
        heading: ['var(--font-eb-garamond)', 'Garamond', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0,167,62,0.3)' },
          '50%': { boxShadow: '0 0 55px rgba(0,167,62,0.65)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
