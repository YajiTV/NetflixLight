/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './client/index.html',
    './client/js/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        netflix: {
          dark: '#1a1a1a',
          red: '#e50914',
        },
      },
    },
  },
  plugins: [],
}
