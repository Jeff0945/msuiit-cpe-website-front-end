/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        'cpe-indigo': '#101320',
        'cpe-periwinkle': '#c3c3d2',
        'cpe-dark-blue-darker': '#0d1729',
        'cpe-dark-blue-lighter': '#24356e',
        'cpe-blue-gray': '#3b537a',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

