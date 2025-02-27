/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,css,scss}"],
  darkMode: "class",
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
      colors: {
        "off-white": "#f8f8f2",
      },
      backgroundImage: {
        "hero-pattern": "url('/assets/img/img-background.jpeg')",
        "hero-mobile": "url('/assets/img/mobile-background.jpeg')",
        "gradient-to-r": "linear-gradient(to right, #5900f4, #2196F3, #9C27B0)",
      },
    },
  },
  plugins: [],
};
