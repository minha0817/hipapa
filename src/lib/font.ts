import { Amatic_SC } from "next/font/google";

const amaticSc = Amatic_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-amaticSc",
  weight: "700",
});

export const amaticScFontClass = amaticSc.variable;