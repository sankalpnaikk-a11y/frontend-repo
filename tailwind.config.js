/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Expletus Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        premium: "0 18px 45px rgba(15,23,42,0.75)",
      },
      keyframes: {
        glowPulse: {
          "0%,100%": { boxShadow: "0 0 10px rgba(93,81,201,0.4)" },
          "50%": { boxShadow: "0 0 22px rgba(93,81,201,0.9)" },
        },
      },
      animation: {
        glowPulse: "glowPulse 2.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
