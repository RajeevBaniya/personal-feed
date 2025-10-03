/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/shared/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        'xs': '475px',
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      keyframes: {
        'dash-move': {
          '0%': { 
            WebkitMaskPosition: '0px 0px',
            maskPosition: '0px 0px'
          },
          '100%': { 
            WebkitMaskPosition: '16px 0px',
            maskPosition: '16px 0px'
          },
        },
        'chevron-flow': {
          '0%': {
            opacity: '0',
            transform: 'translateX(0)'
          },
          '40%': {
            opacity: '1'
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(10px)'
          }
        },
      },
      animation: {
        'dash-move': 'dash-move 1s linear infinite',
        'chevron-flow': 'chevron-flow 0.9s linear infinite',
      },
    },
  },
  plugins: [],
}