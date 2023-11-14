/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        headers: ['Poppins', 'sans-serif'],
        texts: ['Noto sans', 'sans-serif'],
      },
      boxShadow: {
        custom: '0 4px 10px 0px rgba(0, 0, 0, 0.25);',
        section: '0 0 20px 3px rgba(0, 0, 0, 0.15);'
      },
      backgroundColor: {
        main: '#fcfcfc',
      },
      colors: {
        primary: {
          200: '#6a97f0',
          300: '#3875ef',
          400: '#0f5bf2',
          600: '#0e49c0',
          800: '#0b368a',
        },
        secondary: {
          400: '#ebebeb',
          600: '#b0b0b0',
          800: '#787878',
        },
      },
    },
  },
  plugins: [],
}