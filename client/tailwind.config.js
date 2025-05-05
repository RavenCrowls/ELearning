/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  module.exports = {
    theme: {
      extend: {
        // Các cấu hình khác
      },
    },
    plugins: [
      function({ addComponents }) {
        addComponents({
          '.container-fluid': {
            width: '100%',
            paddingLeft: '1rem',
            paddingRight: '1rem',
            marginLeft: 'auto',
            marginRight: 'auto',
            '@screen sm': {
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            },
            '@screen lg': {
              paddingLeft: '2rem',
              paddingRight: '2rem',
            },
          }
        })
      }
    ],
  }
  