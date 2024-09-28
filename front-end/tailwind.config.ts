import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#A65729',   
          100: '#E4CDBF', 
          200: '#D3AB94',
          300: '#C18969',
          400: '#AF683E',
          600: '#954E25',
          700: '#743D1D',
          800: '#532C15',
          900: '#321A0C',
        },
        dark:{
          DEFAULT: '#593325',   
          100: '#CDC2BE', 
          200: '#AC9992',
          300: '#8B7066',
          400: '#6A473B',
          600: '#502E21',
          700: '#3E241A',
          800: '#532C15',
          900: '#1B0F0B',
        },
        neutral:{
          DEFAULT: '#D98B48',   
          100: '#F4DCC8', 
          200: '#ECC5A4',
          300: '#E4AE7F',
          400: '#DD975A',
          600: '#C37D41',
          700: '#986132',
          800: '#6D4624',
          900: '#412A16',
        },
        light:{
          DEFAULT: '#F2D7B6',   
          100: '#FBF3E9', 
          200: '#F9EBDB',
          300: '#F6E3CC',
          400: '#F3DBBD',
          600: '#DAC2A4',
          700: '#A9977F',
          800: '#796C5B',
          900: '#494037',
        },

      },
    },
  },
  plugins: [],
};
export default config;
