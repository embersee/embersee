/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // black: "#1e1e1e",
        white: "#e7e7d8",
        eagle: "#afac95",
        carrot: "#ff5800",
        matcha: "#abeb67",
        whisper: "#777777",
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
