import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        text: "#f5f5f5",
        accent: "#1c2a1e"
      },
      transitionDuration: {
        fast: "120ms",
        base: "220ms",
        primary: "320ms",
        structural: "480ms"
      },
      transitionTimingFunction: {
        primary: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        expressive: "cubic-bezier(0.2, 0.8, 0.2, 1)"
      }
    }
  },
  plugins: []
};

export default config;
