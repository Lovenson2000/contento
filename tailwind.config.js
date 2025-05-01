/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#051542",
      },
      boxShadow: {
        custom: "0px 4px 6px rgba(0,0,0,0.1)",
      },
    },
  },
  plugins: [],
};
