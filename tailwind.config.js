/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange:  '#FF6B00',
          gold:    '#FFB800',
          dark:    '#080808',
          card:    '#111111',
          border:  '#1E1E1E',
          text:    '#F5F5F0',
          muted:   '#888888',
        },
      },
      fontFamily: {
        display: ['var(--font-barlow)', 'sans-serif'],
        body:    ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FF6B00, #FFB800)',
        'gradient-dark':   'linear-gradient(160deg, #0D0D0D, #080808)',
      },
      animation: {
        'float':      'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'shimmer':    'shimmer 3s linear infinite',
        'spin-slow':  'spin 12s linear infinite',
        'bounce-in':  'bounceIn 0.6s cubic-bezier(0.16,1,0.3,1)',
        'ticker':     'ticker 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255,107,0,0.4), 0 0 60px rgba(255,107,0,0.15)' },
          '50%':      { boxShadow: '0 0 40px rgba(255,107,0,0.7), 0 0 100px rgba(255,107,0,0.3)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition:  '200% center' },
        },
        bounceIn: {
          '0%':   { opacity: '0', transform: 'scale(0.8) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1)  translateY(0px)'  },
        },
        ticker: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'orange':     '0 4px 24px rgba(255,107,0,0.3)',
        'orange-lg':  '0 8px 48px rgba(255,107,0,0.4)',
        'card':       '0 2px 16px rgba(0,0,0,0.6)',
      },
    },
  },
  plugins: [],
}
