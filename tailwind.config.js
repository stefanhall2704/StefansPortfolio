/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '54': '13.5rem', // corresponds to 13.5em
      },
    },
  },
  plugins: [],
}