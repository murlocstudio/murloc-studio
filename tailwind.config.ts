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
        studio: {
          50: "var(--studio-50)",
          100: "var(--studio-100)",
          200: "var(--studio-200)",
          300: "var(--studio-300)",
          400: "var(--studio-400)",
          500: "var(--studio-500)",
          600: "var(--studio-600)",
          700: "var(--studio-700)",
          800: "var(--studio-800)",
          900: "var(--studio-900)",
          950: "var(--studio-950)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
          hover: "var(--accent-hover)",
          subtle: "var(--accent-subtle)",
        },
        surface: {
          DEFAULT: "var(--surface)",
          card: "var(--surface-card)",
          muted: "var(--surface-muted)",
          border: "var(--surface-border)",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02)",
        card: "0 4px 20px -2px rgba(0, 0, 0, 0.04), 0 2px 6px -1px rgba(0, 0, 0, 0.02)",
        elevated: "0 12px 36px -4px rgba(0, 0, 0, 0.08), 0 4px 12px -2px rgba(0, 0, 0, 0.04)",
        glow: "0 0 24px -4px rgba(220, 38, 38, 0.15)",
      },
      keyframes: {
        "sound-wave": {
          "0%, 100%": { height: "4px" },
          "50%": { height: "24px" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "sound-wave": "sound-wave 1.2s ease-in-out infinite",
        "pulse-subtle": "pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
