import type { Config } from "tailwindcss";

export default {
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
      spacing: {
        "bubble-tail": "10px", // Size of the bubble tail
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".before-user-bubble": {
          "&::before": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            right: "0", // Align tail to the edge of the bubble
            width: "0",
            height: "0",
            borderStyle: "solid",
            borderWidth: "10px 10px 0 0",
            borderColor: "transparent transparent transparent transparent",
          },
        },
        ".before-assistant-bubble": {
          "&::before": {
            content: '""',
            position: "absolute",
            bottom: "-10px",
            left: "0", // Align tail to the edge of the bubble
            width: "0",
            height: "0",
            borderStyle: "solid",
            borderWidth: "10px 0 0 10px",
            borderColor: "transparent transparent transparent transparent",
          },
        },
      });
    },
  ],
} satisfies Config;
