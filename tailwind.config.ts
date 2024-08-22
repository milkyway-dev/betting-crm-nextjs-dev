import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:"class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/component/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      flex: {
        '.1': '.1 .1 0%',
        '.2': '.2 .2 0%',
        '.3': '.3 .3 0%',
        '.4': '.4 .4 0%',
        '.5': '.5 .5 0%',
        '.6': '.6 .6 0%',
        '.7': '.7 .7 0%',
        '.8': '.8 .8 0%',
        '.9': '.9 .9 0%',
      },
      colors: {
        primary: '#A191DE',
        dark_black: '#000',
        bg_dashboard: '#0A0C0C',
        light_black: '#232525',
        dark_light_black: '#1A1A1A',
        onDark:'#F3F4F6'
      }
    },
  },
  plugins: [],
};

export default config;