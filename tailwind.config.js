module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      purple: {
        dark:"#141625",
        DEFAULT:"#7c5dfa",
        light: "#1E2139",

      },
      red: "#ec5757",
      green: "#33d69f",
      orange: "#ff8f00",
      white: "#ffffff",
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
