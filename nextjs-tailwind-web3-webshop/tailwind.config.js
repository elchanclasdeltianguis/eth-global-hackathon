/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
        display: ["Bebas Neue"],
      },
      backgroundImage: {
        "tianguis-pattern": "url('/images/bg-dim.jpg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
