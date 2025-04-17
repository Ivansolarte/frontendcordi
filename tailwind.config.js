/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['font-coordi', 'sans-serif'],
      },
      colors: {
        primary: '#f05a28',              // Color principal
        primarydark: '#d04c1f',          // Tonalidad más oscura para primary
        secondary: '#003C82',            // Color secundario
        secondarydark: '#002b5c',        // Tonalidad más oscura para secondary
        cancel: '#E0E6E9',               // Color para cancel
        canceldark: '#b8c3c9',      // Tonalidad más oscura para cancel
      },
    },
  },
  plugins: [],
}
