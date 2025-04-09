/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./source/**/*.{js,jsx,ts,tsx}",
    "./source/**/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")], // NativeWind preset'ini ekle
  theme: {
    extend: {},
  },
  plugins: [],
};
