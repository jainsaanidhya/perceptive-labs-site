/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        text: "hsl(var(--text) / <alpha-value>)",
        subtext: "hsl(var(--subtext) / <alpha-value>)",
        brand: "hsl(var(--brand) / <alpha-value>)",
        brand2: "hsl(var(--brand2) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 1px rgba(15, 23, 42, 0.04), 0 10px 30px rgba(15, 23, 42, 0.06)",
      },
    },
  },
  plugins: [],
};
