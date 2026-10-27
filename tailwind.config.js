/** @type {import('tailwindcss').Config} */

// Colours are defined as RGB channels in src/index.css (:root).
// To re-theme the whole site, edit those variables only.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        // Warm near-black used for text, dark sections and outlines
        ink: {
          950: v('ink-950'),
          900: v('ink-900'),
          800: v('ink-800'),
          700: v('ink-700'),
        },
        // Teal accent: links, icons, focus
        brand: {
          50: v('brand-50'),
          100: v('brand-100'),
          200: v('brand-200'),
          500: v('brand-500'),
          600: v('brand-600'),
          700: v('brand-700'),
          800: v('brand-800'),
          900: v('brand-900'),
        },
        // Signature yellow
        sun: {
          DEFAULT: v('sun'),
          light: v('sun-light'),
          deep: v('sun-deep'),
        },
        // Soft section and card fills
        cream: v('cream'),
        cornflower: v('cornflower'),
        mint: v('mint'),
        rose: v('rose'),
        peach: v('peach'),
        paper: {
          DEFAULT: v('paper'),
          2: v('paper-2'),
        },
        line: v('line'),
        muted: v('muted'),
        body: v('body'),
        whatsapp: '#1FAF54',
      },
      fontFamily: {
        serif: ['Newsreader', 'Georgia', 'Times', '"Times New Roman"', 'serif'],
        sans: ['"Hanken Grotesk"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        site: '80rem',
      },
      borderRadius: {
        card: '1rem',
        panel: '1.625rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(35 30 21 / 0.05)',
        lift: '0 16px 40px -20px rgb(35 30 21 / 0.35)',
        edge: '0 0 0 1px rgb(35 30 21)',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        rise: {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        ticker: 'ticker 60s linear infinite',
        rise: 'rise .7s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
