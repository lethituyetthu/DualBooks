import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'100': '#E4CDBF',
  				'200': '#D3AB94',
  				'300': '#C18969',
  				'400': '#AF683E',
  				'600': '#954E25',
  				'700': '#743D1D',
  				'800': '#532C15',
  				'900': '#321A0C',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			dark: {
  				'100': '#CDC2BE',
  				'200': '#AC9992',
  				'300': '#8B7066',
  				'400': '#6A473B',
  				'600': '#502E21',
  				'700': '#3E241A',
  				'800': '#532C15',
  				'900': '#1B0F0B',
  				DEFAULT: '#593325'
  			},
  			neutral: {
  				'100': '#F4DCC8',
  				'200': '#ECC5A4',
  				'300': '#E4AE7F',
  				'400': '#DD975A',
  				'600': '#C37D41',
  				'700': '#986132',
  				'800': '#6D4624',
  				'900': '#412A16',
  				DEFAULT: '#D98B48'
  			},
  			light: {
  				'100': '#FBF3E9',
  				'200': '#F9EBDB',
  				'300': '#F6E3CC',
  				'400': '#F3DBBD',
  				'600': '#DAC2A4',
  				'700': '#A9977F',
  				'800': '#796C5B',
  				'900': '#494037',
  				DEFAULT: '#F2D7B6'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  plugins: [
    require('@tailwindcss/line-clamp'),
    // ...
  ],
};

export default config;
