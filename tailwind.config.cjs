/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        night: "#090909",
        // white: "#e7e7d8",
        eagle: "#afac95",
        carrot: "#ff5800",
        babycarrot: "#ff7e3b",
        matcha: "#b9ff70",
        whisper: "#5c5b5b",
        flamingo: "#f57abc",
        babyblue: "#78B5F5",
        seafoam: "#43fab7",
        tokyo: "#7381ff",
        brick: "#FF4D4D",
      },
    },
    fontFamily: {
      sans: [
        "Martian Mono",
        "Source Code Pro",
        "Inter",
        ...defaultTheme.fontFamily.sans,
      ],
    },
  },
  plugins: [],
};
