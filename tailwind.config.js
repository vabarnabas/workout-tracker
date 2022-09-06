/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgGray: "#222",
        lighterGray: "#333",
        lightGray: "#444",
      },
    },
  },
  plugins: [],
}
