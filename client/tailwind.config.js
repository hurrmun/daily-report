module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      tablet: "960px",
      desktop: "1248px",
    },
    colors: {
      white: "#ffffff",
      midnight: "#052539",
      "pine-green": "#157a6e",
      "shamrock-green": "#499f68",
      "sea-green": "#77b28c",
      "ash-gray": "#c2c5bb",
      "brown-sugar": "#b4654a",
    },
    fontFamily: {
      "dm-sans": "DM Sans, sans-serif",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
