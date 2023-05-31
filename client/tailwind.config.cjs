/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          from: { transform: 'rotate(-10deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        wiggleReverse: {
          from: { transform: 'rotate(10deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
    },
    screens: {
      xl: { max: '1600px' },
      lg: { max: '1400px' },
      md: { max: '1064px' },
      sm: { max: '639px' },
    },
    colors: {
      blue: '#1fb6ff',
      sky: '#2CD3E1',
      black: '#000000',
      white: '#ffffff',
      purple: '#7e5bef',
      pink: '#ff49db',
      red: '#E21818',
      orange: '#ff7849',
      'orange-lite': '#FFA45B',
      green: '#13ce66',
      yellow: '#ffc82c',
      'gray-dark': '#273444',
      gray: '#8492a6',
      'gray-light': '#d3dce6',
    },
  },
  plugins: [],
};
