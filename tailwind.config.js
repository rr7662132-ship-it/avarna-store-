/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f0',
          100: '#dceddc',
          200: '#badcba',
          300: '#8ec48e',
          400: '#5fa75f',
          500: '#3d8b3d',
          600: '#2d6e2d',
          700: '#265826',
          800: '#224722',
          900: '#1d3b1d',
          950: '#0d200d',
        },
        sage: {
          50: '#f6f7f4',
          100: '#e9ece4',
          200: '#d3d9cb',
          300: '#b5c0a8',
          400: '#96a683',
          500: '#788b65',
          600: '#5e6f4e',
          700: '#4a5840',
          800: '#3d4836',
          900: '#343d2f',
          950: '#1a2017',
        },
        cream: {
          50: '#fefdf8',
          100: '#fdf9ed',
          200: '#faf1d4',
          300: '#f5e5b0',
          400: '#efd58a',
          500: '#e8c262',
          600: '#d9a840',
          700: '#b58a33',
          800: '#936e2d',
          900: '#795a27',
          950: '#422f12',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
