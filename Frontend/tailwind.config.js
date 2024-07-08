/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#ff725d',
        'secondary': '#3a596c',
        'background': "#161a1d",
      }
    },
    keyframes: {
      float: {
        '0%, 100%': { transform: 'translateX(0)' },
        '50%': { transform: 'translateX(-100px)' },
      },
    },
    animation: {
      float: 'float 3s ease-in-out infinite',
    },
  },
  plugins: [],
}