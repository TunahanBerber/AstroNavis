/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,css,scss}",
  ],
  darkMode: 'class',
  safelist: [
    {
      pattern: /^bg-/,
    },
    {
      pattern: /^text-/,
    },
    {
      pattern: /^p-/,
    },
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
