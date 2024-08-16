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
        "line-black": "#111",
        black: "#000000",
        main: "#E1FF01",
        point: "#FF6000",
        ivory: "#F6F5F1",

        accent: {
          green: "#18A644",
          purple: "#523BF2",
          sky: "#52BEFF",
          pink: "#FF7BBD",
          "wine-red": "#CE4238"
        },
        info: {
          yellow: "#FFAA00",
          green: "#04B014",
          red: "#DC0000"
        },
        deemed: {
          800: "#505050"
        },
        gray: {
          50: "#F5F5F5",
          100: "#EBEBEB",
          200: "#E3E3E3",
          300: "#C9C9C9",
          400: "#A6A6A6",
          500: "#7F7F7F",
          600: "#666666",
          700: "#505050",
          800: "#333333",
          900: "#1B1B1B"
        }
      },
      fontFamily: {
        pretendard: ["var(--font-pretendard)"]
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
  plugins: [require("tailwind-scrollbar-hide")]
};
export default config;
