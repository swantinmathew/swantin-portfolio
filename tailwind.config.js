/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        page: "#EDEEE6",
        surface: "#FFFFFF",
        ink: "#15181D",
        "ink-soft": "#565B62",
        "ink-faint": "#6D736A",
        accent: "#1E8E5A",
        "accent-soft": "#E4F2E9",
        coral: "#E8836B",
        link: "#3452D9",
        line: "#DDE1D8",
        "line-strong": "#C7CCBF",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
        sans: ["'Inter'", "sans-serif"],
      },
      maxWidth: { page: "1100px" },
      keyframes: {
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};
