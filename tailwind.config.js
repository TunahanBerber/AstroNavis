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
      backgroundImage: {
        "hero-pattern": "url('/assets/img/img-background.jpeg')",
      },
      fontFamily: {
        // orbitron: ["Orbitron", "sans-serif"], // Orbitron'u özelleştir
      },
    },
  },
  plugins: [],
};
