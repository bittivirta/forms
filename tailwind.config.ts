/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          "50": "#f2f9fc",
          "100": "#e6f5fc",
          "200": "#c3e4f7",
          "300": "#9ecef0",
          "400": "#5ca1e6",
          "500": "#1e6edb",
          "600": "#1a5ec4",
          "700": "#1046a3",
          "800": "#0b3385",
          "900": "#062263",
          "950": "#031340",
        },
        secondary: {
          darker: "051a2e",
          dark: "#1e3449",
          light: "#d8e7f3",
          lighter: "#f8fafc",
        },
      },
      backgroundImage: {
        "blue-bg": "url('/icon/blue-bg.svg')",
      },
    },
    plugins: [require("flowbite/plugin")],
  },
};
