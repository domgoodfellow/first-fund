import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm:   '640px',
      md:   '768px',
      lg:   '1024px',
      xl:   '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
      '4xl': '2560px',
    },
    extend: {
      colors: {
        'ff-bg':          'var(--ff-bg)',
        'ff-surface':     'var(--ff-surface)',
        'ff-surface-alt': 'var(--ff-surface-alt)',
        'ff-raised':      'var(--ff-raised)',
        'ff-dark-alt':    'var(--ff-dark-alt)',
        'ff-accent':      'var(--ff-accent)',
        'ff-glow':        'var(--ff-glow)',
        'ff-text':        'var(--ff-text)',
        'ff-muted':       'var(--ff-muted)',
        'ff-border':      'var(--ff-border)',
      },
      fontFamily: {
        heading: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-montserrat)', 'sans-serif'],
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(var(--ff-accent-rgb),0.3)' },
          '50%': { boxShadow: '0 0 55px rgba(var(--ff-accent-rgb),0.65)' },
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
