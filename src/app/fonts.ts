import { Inter } from "next/font/google";
import type { NextFontWithVariable } from "next/dist/compiled/@next/font";

const ppEditorialNewUltralightItalic: NextFontWithVariable = {
  className: "font-pp-editorial",
  style: {
    fontFamily: "PPEditorialNew-UltralightItalic",
    fontWeight: 200, // use a number instead of a string
    fontStyle: "italic",
  },
  variable: "--font-pp-editorial",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export { ppEditorialNewUltralightItalic, inter };
