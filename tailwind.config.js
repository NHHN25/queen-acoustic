/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['var(--font-roboto-condensed)', 'system-ui', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#FFF9EA',
          100: '#FFF3D6',
          200: '#FFE7AD',
          300: '#F3D384', // This is the base color we're matching
          400: '#E5C16E',
          500: '#D7AF58',
          600: '#C99D42',
          700: '#BB8B2C',
          800: '#8F6A22',
          900: '#634918',
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
        }
      }
    },
  },
  plugins: [],
}
