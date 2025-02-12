/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto-condensed)', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#f9f6f0',
          100: '#f3ede1',
          200: '#e7dbc3',
          300: '#dbc9a5',
          400: '#bda476', // Our new primary button color
          500: '#ab8d59',
          600: '#987947',
          700: '#806439',
          800: '#674e2d',
          900: '#4e3921',
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
    },
  },
  plugins: [],
};
