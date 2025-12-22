/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Saira Extra Condensed",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        "bg-deep": "#020617",
        "card-dark": "#0b1120",
        "accent": "#6366f1",
        "accent-soft": "#4f46e5",
        "accent-emerald": "#10b981",
      },
      boxShadow: {
        "soft-xl": "0 24px 80px rgba(15,23,42,0.85)",
      },
    },
  },
  plugins: [],
};
