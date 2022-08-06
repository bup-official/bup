/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        'lg': '2px 2px 10px -2px rgb(228, 228, 228)',
      },
      fontSize: {
        'hero-h1': 'clamp(1.8rem, 7vw, 4rem)',
        'section-h2': 'clamp(2.4rem, 9vw, 4rem)',
        'contact-h3': 'clamp(1.6rem, 5vw, 3rem)',
        'contact-h4': 'clamp(1.1rem, 3vw, 1.6rem)'
      },
      maxWidth: {
        'section': '1400px'
      },
      textColor: {
        'paragraph': '#354e66'
      }
    },
    fontFamily: {
      'nunito': 'Nunito, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
      'quicksand': 'Quicksand, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
    },
  },
  plugins: [require("daisyui")],

};
