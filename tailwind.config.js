/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "custom-lavendar-light": "#dec9e9",
        "custom-lavendar-medium": "#968ec2",
        "custom-lavendar-dark": "#47126B",
        "custom-skeleton-dark": "#CCC",
      },
    },
  },
  plugins: [],
};
