/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    'pages/*.page.tsx'
],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            img: {
              // Remove margins until Next/Image issue is resolved
              // https://github.com/vercel/next.js/issues/19817
              "margin-top": "0",
              "margin-bottom": "0",
            },
            a: {
              "color": null
            },
            hr: {
              "margin-top": "0",
              "margin-bottom": "0"
            }
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}
