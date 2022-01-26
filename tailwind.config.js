module.exports = {
  purge: {
    content: [
      './includes/**/*.php',
      './src/**/*.php',
      './src/**/*.js',
      './templates/**/*.php',
      './theme/**/*.php',
      './theme/**/*.js',
      './views/**/*.php',
      // './theme/**/*.php',
      // './theme/**/*.js'
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