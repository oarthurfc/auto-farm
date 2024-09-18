/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: 'Poppins',
      },
      boxShadow: {
        shape: '0px 10px 66px rgba(0, 0, 0, 0.1)'
      }
    }
  },
  plugins: [],
}