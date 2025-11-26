/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7F00D4",
          light: "#9933E6",
          lighter: "#B366F0",
          dark: "#6600AA",
          darker: "#4D0080",
        },
        background: {
          DEFAULT: "#000000",
          dark: "#0a0a0a",
          card: "#1a1a1a",
          hover: "#2a2a2a",
        },
      },
      backgroundImage: {
        "primary-gradient":
          "linear-gradient(135deg, #4D0080 0%, #7F00D4 50%, #9933E6 100%)",
        "primary-gradient-hover":
          "linear-gradient(135deg, #6600AA 0%, #9933E6 50%, #B366F0 100%)",
        "dark-gradient": "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)",
      },
      animation: {
        "slide-up": "slideUp 0.6s ease-out",
        shake: "shake 0.5s ease-in-out",
        shimmer: "shimmer 2s infinite",
        "move-bg": "moveBackground 20s linear infinite",
      },
      keyframes: {
        slideUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px)" },
          "75%": { transform: "translateX(10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        moveBackground: {
          "0%": { transform: "translate(0, 0)" },
          "100%": { transform: "translate(50px, 50px)" },
        },
      },
    },
  },
  plugins: [],
};
