/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px'
    },
    extend: {
      colors: {
        mutedblack: "#1D1D1D",
        lightpink: "#FADADD",
        mutedpink: "#F8E5E5",
        dimpink: "#C39EA0",
        satpink: "#FA255E",
        offpink: "#F4E7E8",
        lightpurple: "#F4E7F4",
        offwhite:'#FAF9F6',
        eggshell: '#FFF9E3',
        aliceblue: '#F0F8FF',
        pearl: '#FBFCF8',
        coconut: '#FFF1E6',
        parchment: '#FBF5DF',
      },
      fontFamily: {
        'russo': ['Russo One', 'sans'],
        'lora': ['Lora', 'serif']
      },
    },
  },
  plugins: [],
}