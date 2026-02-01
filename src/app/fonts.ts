import {
  Bebas_Neue,
  Cookie,
  Fraunces,
  Playfair_Display,
  Poppins,
} from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins",
});

export const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-bebas",
});

export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-playfair",
});

export const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "700", "900"],
  display: "swap",
  variable: "--font-fraunces",
});

export const cookie = Cookie({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  variable: "--font-cookie",
});
