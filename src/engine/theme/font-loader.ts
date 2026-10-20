import {
  Barlow,
  Barlow_Condensed,
  Cormorant_Garamond,
  DM_Sans,
  Fraunces,
  Manrope,
  Schibsted_Grotesk,
} from "next/font/google";
import type { FontKey } from "./fonts";

/*
 * next/font requires literal options at module scope. Fonts are self-hosted at
 * build time (no runtime requests to Google). preload is off because each
 * tenant uses only two of these; browsers only download faces that are used.
 */

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-barlow-condensed",
  display: "swap",
  preload: false,
});
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-barlow",
  display: "swap",
  preload: false,
});
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  preload: false,
  axes: ["opsz"],
});
const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  preload: false,
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
  preload: false,
});
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: false,
});
const schibsted = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-schibsted",
  display: "swap",
  preload: false,
});

const loaded: Record<FontKey, { variable: string }> = {
  "barlow-condensed": barlowCondensed,
  barlow,
  fraunces,
  "dm-sans": dmSans,
  cormorant,
  manrope,
  schibsted,
};

/** className that defines the CSS variables for the given fonts. */
export function fontVariablesClassName(keys: readonly FontKey[]): string {
  return [...new Set(keys)].map((key) => loaded[key].variable).join(" ");
}
