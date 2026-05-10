import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#20302c",
        clay: "#b96f52",
        marigold: "#f0c45d",
        pond: "#5b8f9d",
        leaf: "#819f68",
        oat: "#f5efe4",
        shell: "#fffaf2"
      },
      boxShadow: {
        soft: "0 24px 70px rgba(81, 62, 43, 0.14)",
        insetCalm: "inset 0 0 0 1px rgba(32, 48, 44, 0.08)"
      },
      fontFamily: {
        sans: [
          "var(--font-body)",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        dyslexia: [
          "Verdana",
          "Atkinson Hyperlegible",
          "Arial",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};

export default config;
