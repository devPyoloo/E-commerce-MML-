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
        mutedblack: "#0E0E10",
        semiblack: "#0B0B0C",
        lighblack: "#121212",
        lightpink: "#FADADD",
        mutedpink: "#F8E5E5",
        dimpink: "#C39EA0",
        satpink: "#FA255E",
        offpink: "#F4E7E8",
        lightpurple: "#F4E7F4",
        offwhite:'#FAF9F6',
        mutedgray: '#EBEBEB',
      },
      fontFamily: {
        'russo': ['Russo One', 'sans'],
        'lora': ['Lora', 'serif']
      },
      backgroundColor: {
        graygradient: "radial-gradient(circle, rgba(196,196,196,1) 0%, rgba(229,231,235,1) 100%);"
      }
    },
  },
  plugins: [],
}