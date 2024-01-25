import {
  JetBrains_Mono as FontMono,
  Lexend_Deca as FontSans,
  Lora as FontSerif,
  Lexend_Zetta as FontWide,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontWide = FontWide({
  subsets: ["latin"],
  variable: "--font-wide",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
});
