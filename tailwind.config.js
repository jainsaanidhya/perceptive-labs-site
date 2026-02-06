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
        brand3: "hsl(var(--brand3) / <alpha-value>)",
      },

      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },

      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.05), 0 14px 40px rgba(15, 23, 42, 0.07)",
        card: "0 1px 2px rgba(15, 23, 42, 0.06), 0 30px 80px rgba(15, 23, 42, 0.12)",
        glow: "0 0 0 1px rgba(15, 23, 42, 0.06), 0 35px 110px rgba(59, 130, 246, 0.20)",
      },

      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-70%)" },
          "100%": { transform: "translateX(70%)" },
        },
      },

      animation: {
        float: "float 9s ease-in-out infinite",
        shimmer: "shimmer 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};