/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        yaldevi: "Yaldevi",
        rubik: "Rubik",
        roboto: "Roboto",
      },
      screens: {
        scr500: "500px",
        scr600: "600px",
        scr700: "700px",
        scr800: "800px",
        scr900: "900px",
        scr1000: "1000px",
        scr1100: "1100px",
        scr1150: "1150px",
        scr1200: "1200px",
        scr1250: "1250px",
      },
      maxWidth: {
        w1300: "1300px",
      },
      keyframes: {
        fade: {
          "0%": { opacity: "0" },
        },
      }
    },
  },
  plugins: [],
};
