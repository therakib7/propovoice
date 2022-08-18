module.exports = {
  purge: {
    content: [
      './app/**/*.php',
      './src/**/*.php',
      './src/**/*.js',
      './templates/**/*.php',
      './view/**/*.php'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}