/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./navigation/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          dark: "#0A3435",
          medium: "#165556",
          DEFAULT: "#009B74",
          light: "#AFBFBF",
        },
        yellow: {
          dark: "#E6BC45",
          DEFAULT: "#FFD765",
          "light-100": "#FDF8E6",
          "light-200": "#F3EED9",
          "light-300": "#EFE9D3",
        },
        rose: "#FFC5D3",
        blue: "#1fb6ff",
        purple: "#7e5bef",
        pink: "#ff49db",
        orange: "#FF9B68",
        "gray-dark": "#273444",
        gray: "#8492a6",
        "gray-light": "#d3dce6",
      },
      borderRadius: {
        large: "1.25rem",
      },
    },
  },
  plugins: [],
};
