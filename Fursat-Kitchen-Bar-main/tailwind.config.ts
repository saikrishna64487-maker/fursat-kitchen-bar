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
        fursat: {
          // Official Brand Primary & Secondary
          terracotta: "#CF4B37",
          "terracotta-dark": "#B53F2D",
          green: "#2E4E21",
          "green-dark": "#233D19",

          // Official Brand Background & Accent
          sand: "#ECDEC8",
          camel: "#B9946B",

          // Supporting Shades
          charcoal: "#1E1E1E",
          muted: "#4A4A4A",
          "sand-alt": "#E5D5C1",
          black: "#0D0D0D",
          white: "#FFFFFF",
          hairline: "#EFE6D8",

          // Compatibility Mappings to Brand Colors
          ivory: "#ECDEC8",
          cream: "#ECDEC8",
          beige: "#ECDEC8",
          surface: "#ECDEC8",
          "surface-warm": "#E5D5C1",
          "card-warm": "#E5D5C1",
          "card-sand": "#E5D5C1",
          elevated: "#E5D5C1",
          card: "#FFFFFF",
          espresso: "#1E1E1E",
          "espresso-dark": "#0D0D0D",
          "espresso-light": "#1E1E1E",
          brown: "#1E1E1E",
          gold: "#B9946B",
          "gold-light": "#ECDEC8",
          "gold-dim": "rgba(185, 148, 107, 0.18)",
          champagne: "#E5D5C1",
          bronze: "#B9946B",
          amber: "#CF4B37",
          copper: "#CF4B37",
          border: "#EFE6D8",
          "border-subtle": "#EFE6D8",
          "border-gold": "#B9946B",
          dark: "#0D0D0D",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        poppins: ["var(--font-poppins)", "sans-serif"],
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "serif"],
        script: ["var(--font-dancing)", "cursive"],
        display: ["var(--font-anton)", "sans-serif"],
        anton: ["var(--font-anton)", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-8px) rotate(0.5deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
