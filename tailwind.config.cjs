/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // black: "#121212",
        white: "#e7e7d8",
        eagle: "#afac95",
        carrot: "#ff5800",
        babycarrot: "#ff7e3b",
        matcha: "#abeb67",
        whisper: "#5c5b5b",
        flamingo: "#f57abc",
        babyblue: "#78B5F5",
        seafoam: "#43fab7",
        tokyo: "#7381ff",
      },
      backgroundImage: {
        "hero-pattern":
          "url('https://media.giphy.com/media/3ohhwGGrCD9wCQ5cwU/giphy.gif')",
        // 'footer-texture': "url('/img/footer-texture.png')",
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [],
};
