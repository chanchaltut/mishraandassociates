/** @type {import('tailwindcss').Config} */

// Colours are defined as RGB channels in src/index.css (:root).
// To re-theme the whole site (e.g. to match the final logo), edit those variables only.
const v = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '475px',
      },
      colors: {
        ink: {
          950: v('ink-950'),
          900: v('ink-900'),
          800: v('ink-800'),
          700: v('ink-700'),
        },
        brand: {
          50: v('brand-50'),
          100: v('brand-100'),
          200: v('brand-200'),
          500: v('brand-500'),
          600: v('brand-600'),
          700: v('brand-700'),
          800: v('brand-800'),
        },
        brass: {
          100: v('brass-100'),
          300: v('brass-300'),
          400: v('brass-400'),
          500: v('brass-500'),
          600: v('brass-600'),
        },
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
        serif: ['Fraunces', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        site: '80rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgb(13 35 29 / 0.04), 0 8px 24px -12px rgb(13 35 29 / 0.12)',
        lift: '0 2px 4px rgb(13 35 29 / 0.05), 0 20px 40px -20px rgb(13 35 29 / 0.25)',
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
