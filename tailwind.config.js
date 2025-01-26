/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Tailwind を適用するファイルを指定
    "./public/index.html",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
