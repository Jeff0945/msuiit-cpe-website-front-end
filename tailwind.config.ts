/** @type {import("tailwindcss").Config} */

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
        "cpe-indigo": "#101320",
        "cpe-periwinkle": "#c3c3d2",
        "cpe-dark-blue-darker": "#0d1729",
        "cpe-dark-blue-lighter": "#24356e",
        "cpe-blue-gray": "#3b537a",
        "primary": "#222f53",
        "secondary": "#ccd4ea",
        "accent": "#445ea7",
      },
    },
    fontFamily: {
      sans: [
        '"Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
        {
          fontFeatureSettings: '"cv02", "cv03", "cv04", "cv11"'
        }
      ]
    }
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
}

