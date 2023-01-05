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
        // general
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
        gray: {
          dark: "#273444",
          DEFAULT: "#8492A6",
          light: "#D3DCE6",
        },
        rose: "#FFC5D3",
        orange: "#FF9B68",
        error: "#FF5170",

        // plants
        karotte: "#FDE5C6",
        gurke: "#EDF1E1",
        tomate: "#FFE3DA",
        kartoffel: "#F2ECD6",
      },
      borderRadius: {
        full: "100%",
        20: "20px",
        16: "16px",
        12: "12px",
        8: "8px",
      },
      borderWidth: {
        2: "2px",
      },
      spacing: {
        96: "96px",
        72: "72px",
        32: "32px",
        24: "24px",
        20: "20px",
        16: "16px",
        12: "12px",
        8: "8px",
        4: "4px",
      },
      opacity: {
        100: "1",
        40: ".4",
        30: ".3",
        20: ".2",
        10: ".1",
      },
      backdropBlur: {
        DEFAULT: "8px",
        xl: "40px",
      },
    },
  },
  plugins: [],
};
