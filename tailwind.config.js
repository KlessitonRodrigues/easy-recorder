import colors from "tailwindcss/colors";

const tailwildConfig = {
  theme: {
    extend: {
      colors: {
        gray: colors.gray,
        blue: colors.blue,
        red: colors.rose,
        pink: colors.fuchsia,
        primary: colors.indigo,
        secondary: colors.emerald,
        white: colors.white,
        black: colors.black,
        transparent: "transparent",
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1.125rem",
        lg: "1.25rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "2.5rem",
        "4xl": "3rem",
        "5xl": "4rem",
      },
      gap: {
        0: "0px",
        1: "4px",
        2: "8px",
        3: "12px",
        4: "16px",
        5: "20px",
        6: "24px",
        7: "28px",
        8: "32px",
        9: "36px",
        10: "40px",
      },
    },
  },
  safelist: [{ pattern: /text-/ }, { pattern: /gap-/ }],
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
};

export default tailwildConfig;
