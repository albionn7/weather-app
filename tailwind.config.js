/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      width: {
        "3/4": "75%",
      },
      fontFamily: {
        abc: ["Rubik", "sans-serif"],
      },
      colors: {
        customOrange: "#eb6e4b",
      },
    },
  },
  plugins: [],
};
