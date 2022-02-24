module.exports = {
  purge: {
    content: [
      './includes/**/*.php',
      './src/**/*.php',
      './src/**/*.js',
      './templates/**/*.php', 
      './views/**/*.php' 
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