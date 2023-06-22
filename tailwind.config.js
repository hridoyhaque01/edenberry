/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    scrollbar: ["rounded"],

    colors: {
      transparent: "transparent",
      disabled: "rgba(0, 0, 0, 0.04)",
      overlay: "rgba(0, 0, 0, 0.45)",

      successColor: "#2CC672",
      primaryColor: "#005959",
      secondaryColor: "#F3BDB6",
      errorColor: "#FF6B6B",
      warningColor: "#FF9F43",
      infoColor: "#54A0FF",
      alertColor: "#FECA57",

      cyan: "#00EDDF",
      cyanHigh: "#00FFF8",
      cyanSemi: "#7BFFFF",
      cyanMid: "#BDFFFE",

      teal: "#003B3D",
      tealHigh: "#007777",
      tealSemi: "#009794",
      tealMid: "#00BFB9",

      pink: "#F7D5D1",
      pinkHigh: "#FAE8E6",
      pinkSemi: "#FCF5F4",
      pinkMid: "#FFF8F6",

      rust: "#88372C",
      rustHigh: "#A43E31",
      rustSemi: "#A43E31",
      rustMid: "#D86A5B",

      black: "#212121",
      blackHigh: "#616161",
      blackSemi: "#757575",
      blackMid: "#EEEEEE",
      blackReg: "#D0D0D0",
      blackLow: "#6C6C6C",

      dark: "#181A20",
      darkHigh: "#474747",
      darkSemi: "#424242",
      darkMid: "#484848",

      blueLight: "#EAEDF7",

      aqua: "#E0EBEC",
      aquaHigh: "#E8E8E8",
      aquaLight: "#E6EFEF",

      fade: "#F7F6F4",
      fadeHigh: "#9E9E9E",
      fadeSemi: "#919191",
      fadeMid: "#d9d9d9",
      fadeReg: "#BDBDBD",

      white: "#fff",
      whiteHigh: "#F5F5F5",
      whiteSemi: "#FAFAFA",
    },

    fontFamily: {
      mont: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [require("daisyui"), require("preline/plugin")],
  daisyui: {
    themes: false,
  },
};
