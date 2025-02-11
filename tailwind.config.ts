import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'gold': {
          50: '#FDFAF3',
          100: '#FBF5E7',
          200: '#F7EBCF',
          300: '#F3E1B7',
          400: '#EFD79F',
          500: '#EBCD87',
          600: '#C4A86E',
          700: '#9C8356',
          800: '#745E3D',
          900: '#4C3925',
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
