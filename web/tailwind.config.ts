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
        'ff-bg':            'var(--ff-bg)',
        'ff-surface':       'var(--ff-surface)',
        'ff-surface-alt':   'var(--ff-surface-alt)',
        'ff-raised':        'var(--ff-raised)',
        'ff-brand-tint':    'var(--ff-brand-tint)',
        'ff-dark-section':  'var(--ff-dark-section)',
        'ff-dark-alt':      'var(--ff-dark-alt)',
        'ff-accent':        'var(--ff-accent)',
        'ff-glow':          'var(--ff-glow)',
        'ff-text':          'var(--ff-text)',
        'ff-muted':         'var(--ff-muted)',
        'ff-subtle':        'var(--ff-subtle)',
        'ff-border':        'var(--ff-border)',
        'ff-border-strong': 'var(--ff-border-strong)',
        'ff-border-blue':   'var(--ff-border-blue)',
      },
      spacing: {
        navbar: 'var(--ff-navbar-offset)',
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body:    ['var(--font-body)',    'system-ui', 'sans-serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        shimmerSwipe: {
          '0%':   { transform: 'translateX(-100%) skewX(-15deg)' },
          '100%': { transform: 'translateX(250%) skewX(-15deg)' },
        },
        carouselScroll: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        float:            'float 6s ease-in-out infinite',
        shimmer:          'shimmer 3s linear infinite',
        'shimmer-swipe':  'shimmerSwipe 2.4s ease-in-out infinite',
        'carousel-scroll':'carouselScroll 30s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
