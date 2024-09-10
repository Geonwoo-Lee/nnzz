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
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'translateX(-2px)' },
          '50%': { transform: 'translateX(2px)' },
        }
      },
      animation: {
        wiggle: 'wiggle 0.15s linear infinite',
      }
    },
  },
  plugins: [],
};
export default config;
