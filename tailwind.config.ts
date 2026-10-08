import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        murloc: {
          dark: "#0F1012",
          darker: "#090A0B",
          card: "#16171A",
          border: "#24262B",
          coral: "#E26D4B",
          peach: "#F49D7E",
          teal: "#4A8B9E",
          slate: "#3B7180",
          cream: "#FAF8F5",
          linen: "#F2EEE8",
          sand: "#E5DEC9",
          muted: "#8C8C94",
        },
        studio: {
          50: "#FAF8F5",
          100: "#F3EFEA",
          200: "#E6DFD5",
          300: "#D3C8B8",
          400: "#9C9283",
          500: "#6E6557",
          600: "#4D463B",
          700: "#363129",
          800: "#221F1B",
          900: "#151311",
          950: "#0C0A09",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Impact", "Bebas Neue", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        vintage: "0 4px 20px -2px rgba(0, 0, 0, 0.4), 0 2px 6px -1px rgba(0, 0, 0, 0.3)",
        card: "0 10px 30px -5px rgba(0, 0, 0, 0.3)",
        glow: "0 0 25px -3px rgba(226, 109, 75, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
