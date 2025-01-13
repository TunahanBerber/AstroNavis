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
    extend: {
      backgroundImage: {
        'hero-pattern': "url('/assets/img/img-background.jpeg')",
      },
      
    },
  },
  plugins: [],
};
