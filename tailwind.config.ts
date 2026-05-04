import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      zIndex: {
        60: "60",
      },
    },
  },
  plugins: [],
} satisfies Config;
