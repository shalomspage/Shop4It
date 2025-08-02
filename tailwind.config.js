/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        'max-sm': { 'max': '640px' },   // <= 640px
        'max-md': { 'max': '768px' },   // <= 768px
        'max-lg': { 'max': '1024px' },  // <= 1024px
      },
    },
  },
  plugins: [],
}

export default config
