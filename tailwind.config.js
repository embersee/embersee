/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        night: "#090909",
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
        frost: "#9dffff",
        emerald: "hsl(var(--accent))",
        background: "hsl(var(--background, <alpha-values>))",
        foreground: "hsl(var(--foreground))",
        primary: colors.neutral,
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
    fontFamily: {
      sans: ["Geist Mono", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("progress-unfilled", ["&::-webkit-progress-bar", "&"]);
      addVariant("progress-filled", [
        "&::-webkit-progress-value",
        "&::-moz-progress-bar",
        "&",
      ]);
    }),
  ],
};
