const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#302c44",
          dark: "#2a253a",
        },
        secondary: {
          DEFAULT: "#4b445c",
          dark: "#3e374c",
        },
        danger: "#d9534f", // Danger color for error messages
        light: "#f8f9fc",
        dark: "#111111",
        gray: colors.gray,
        accent: "#e7c8ff",
      },
      fontFamily: {
        primary: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
