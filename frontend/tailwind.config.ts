import type { Config } from "tailwindcss";
import { createThemes } from "tw-colors";
import colors from "tailwindcss/colors";

const baseColors = [
  "gray", 
  "red", 
  "yellow", 
  "green",
  "blue", 
  "indigo", 
  "purple",
  "pink", 
] as const;

const shadeMapping = {
  "50": "900",
  "100": "800",
  "200": "700",
  "300": "600",
  "400": "500",
  "500": "400",
  "600": "300",
  "700": "200",
  "800": "100",
  "900": "50",
} as const;

type ColorShade = keyof typeof shadeMapping;

interface ThemeColors {
  [key: string]: {
    [shade: string]: string;
  };
}

const generateThemeObject = (colors: typeof import("tailwindcss/colors"), mapping: typeof shadeMapping, invert = false): ThemeColors => {
  const theme: ThemeColors = {};
  baseColors.forEach((color) => {
    theme[color] = {};
    Object.entries(mapping).forEach(([key, value]) => {
      const shadeKey = invert ? value : key;
      theme[color][key as ColorShade] = colors[color][shadeKey as ColorShade];
    });
  });

  return theme;
};

const lightTheme = generateThemeObject(colors, shadeMapping);
const darkTheme = generateThemeObject(colors, shadeMapping, true);

const config = {
  darkMode: "class",
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
    },
  },
  plugins: [
    createThemes({
      light: {
        ...lightTheme,
        white: "#ffffff",
      },
      dark: {
        ...darkTheme,
        white: colors.gray["950"],
        black: colors.gray["50"],
      },
    })
  ],
} satisfies Config;

export default config;