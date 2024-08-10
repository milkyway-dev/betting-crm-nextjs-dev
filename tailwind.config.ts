import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#A191DE',
        dark_black: '#000',
        bg_dashboard: '#0A0C0C',
        light_black:'#232525'
      }
    },
  },
  plugins: [],
};

export default config;