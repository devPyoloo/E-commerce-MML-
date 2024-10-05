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
      xl: '1440px',
      '2xl': '1536px', 
      '3xl': '1920px', 
      '4xl': '2560px' 
    },
    extend: {
      colors: {
        mutedblack: "#0E0E10",
        semiblack: "#0B0B0C",
        lightblack: "#121212",
        lightpink: "#FADADD",
        mutedpink: "#F8E5E5",
        dimpink: "#C39EA0",
        satpink: "#FA255E",
        offpink: "#F4E7E8",
        lightpurple: "#F4E7F4",
        offwhite:'#FAF9F6',
        lightwhite: '#E0E0E0',
        mutedgray: '#EBEBEB',
        lightgray: "#424141",
        extraLightGray: "#F3F3F3"
      },
      fontFamily: {
        'russo': ['Russo One', 'sans'],
        'lora': ['Lora', 'serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },  
      backgroundColor: {
        graygradient: "radial-gradient(circle, rgba(196,196,196,1) 0%, rgba(229,231,235,1) 100%);"
      }
    },
  },
  plugins: [],
}