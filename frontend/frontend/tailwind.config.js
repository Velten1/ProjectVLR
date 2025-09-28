/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        valorant: ["Valorant", "sans-serif"],
      },
      backdropBlur: {
        sm: "4px",
        DEFAULT: "8px",
        lg: "16px",
        xl: "24px",
      },
      boxShadow: {
        custom: "0px 0px 15px rgba(0, 0, 0, 0.8)",
      },
    },
  },
  plugins: [],
};
