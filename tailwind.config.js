/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'main': ['Montserrat', 'sans-serif'],
      },
      colors: {
        "50": "#f6f6f6",
        "100": "#e7e7e7",
        "200": "#dldldl",
        "300": "#bObObO",
        "400": "#888888",
        "500": "6d6d6d",
        "600": "#5d5d5d",
        "700": "#4f4f4f",
        "800": "#454545",
        "900": "#3d3d3d",
        "950": "#1e1e1e",
      },
    },
  },
  plugins: [],
};
