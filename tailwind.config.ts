import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        basic: "#1B1B1B",
        main: "#E1FF01",
        point: "#FF6000",
        ivory: "#F6F5F1",

        accent: {
          green: "#18A644",
          purple: "#523BF2",
          sky: "#52BEFF",
          pink: "#FF7BBD",
          "wine-red": "#CE4A38"
        },
        info: {
          yellow: "#FFA000",
          green: "#04B014",
          red: "#DC0000"
        },

        gray: {
          50: "#F7F7F7",
          100: "#F6F5F1",
          200: "#F1F0EB",
          300: "#E3E3E5",
          400: "#CCCCC6",
          500: "#B3B3AE",
          600: "#8B8B8B",
          700: "#6C6C6C",
          800: "#444444",
          900: "#1B1B1B"
        }
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"]
      },
      fontWeight: {
        light: "300",
        regular: "400",
        semibold: "600"
      },
      letterSpacing: {
        "tight-korean": "-0.025em",
        "normal-english": "0em"
      }
    }
  },
  plugins: []
};
export default config;
