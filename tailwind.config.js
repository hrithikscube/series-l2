/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 5px #fff, 0 0 10px #ffffff, 0 0 15px #ffffff' },
          '50%': { textShadow: '0 0 10px #fff, 0 0 20px #ffffff, 0 0 30px #ffffff' },
        },
      },
      animation: {
        glow: 'glow 1.5s infinite',
      },
    },
  },
  plugins: [],
}