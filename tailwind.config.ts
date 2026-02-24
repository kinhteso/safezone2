import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-deep": "#0A2D6E",
        "blue-mid": "#1B6CA8",
        "blue-light": "#3B9FE8",
        "blue-pale": "#E8F4FD",
        "green-safe": "#16A86A",
        "red-alert": "#E53E3E",
        "orange-warn": "#F6A623",
        "gray-800": "#1E2D3D",
        "gray-400": "#8BA0B8",
        "gray-100": "#EEF2F7",
        "gray-50": "#F8FAFC",
      },
      fontFamily: {
        body: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      boxShadow: {
        soft: "0 10px 30px rgba(10, 45, 110, 0.08)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1.25rem",
      },
      animation: {
        pulseSoft: "pulseSoft 2.2s ease-in-out infinite",
        floatIn: "floatIn 0.6s ease-out both",
      },
      keyframes: {
        pulseSoft: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.05)", opacity: "1" },
        },
        floatIn: {
          "0%": { transform: "translateY(14px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
