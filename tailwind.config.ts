import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#00ffff",
          50: "#f0fffe",
          100: "#ccfffe",
          200: "#99ffff",
          300: "#66ffff",
          400: "#33ffff",
          500: "#00ffff",
          600: "#00cccc",
          700: "#009999",
          800: "#006666",
          900: "#003333",
        },
        secondary: {
          DEFAULT: "#ff00ff",
          50: "#fef0fe",
          100: "#feccfe",
          200: "#fd99fd",
          300: "#fc66fc",
          400: "#fb33fb",
          500: "#ff00ff",
          600: "#cc00cc",
          700: "#990099",
          800: "#660066",
          900: "#330033",
        },
        accent: {
          DEFAULT: "#00ff88",
          50: "#f0fffa",
          100: "#ccffee",
          200: "#99ffdd",
          300: "#66ffcc",
          400: "#33ffbb",
          500: "#00ff88",
          600: "#00cc6d",
          700: "#009952",
          800: "#006637",
          900: "#00331b",
        },
        dark: {
          DEFAULT: "#01010f",
          50: "#f7f7f9",
          100: "#ebebf0",
          200: "#d1d1dc",
          300: "#adadc2",
          400: "#8080a3",
          500: "#5c5c87",
          600: "#47476f",
          700: "#3a3a5a",
          800: "#32324c",
          900: "#2d2d41",
          950: "#01010f",
        },
      },
      boxShadow: {
        neon: "0 0 20px rgba(0, 255, 255, 0.5)",
        "neon-pink": "0 0 20px rgba(255, 0, 255, 0.5)",
        "neon-green": "0 0 20px rgba(0, 255, 136, 0.5)",
        glow: "0 0 40px rgba(0, 255, 255, 0.3)",
        "inner-glow": "inset 0 0 20px rgba(0, 255, 255, 0.1)",
      },
      animation: {
        "pulse-neon": "pulse-neon 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        "pulse-neon": {
          "0%": { boxShadow: "0 0 20px rgba(0, 255, 255, 0.5)" },
          "100%": { boxShadow: "0 0 30px rgba(0, 255, 255, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { textShadow: "0 0 10px rgba(0, 255, 255, 0.5)" },
          "100%": { textShadow: "0 0 20px rgba(0, 255, 255, 0.8)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;