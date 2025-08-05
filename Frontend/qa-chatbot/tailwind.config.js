// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',                // enable dark-mode toggle
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      typography: ({theme}) => ({
        DEFAULT: { css: { color: theme('colors.slate.700') } },
        dark:    { css: { color: theme('colors.slate.100') } },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),   // nicer form controls[16]
  ],
}
