/**
 * Curated font registry. Tenants pick fonts by key; the loader in
 * font-loader.ts turns each key into a self-hosted next/font face exposed as
 * a CSS variable. This file stays free of next/font so it can be imported
 * from tests and pure engine code.
 *
 * Adding a font: add a key here, then a matching loader entry.
 */
export const FONT_KEYS = [
  "barlow-condensed",
  "barlow",
  "fraunces",
  "dm-sans",
  "cormorant",
  "manrope",
  "schibsted",
] as const;

export type FontKey = (typeof FONT_KEYS)[number];

export const fontVariable: Record<FontKey, `--font-${string}`> = {
  "barlow-condensed": "--font-barlow-condensed",
  barlow: "--font-barlow",
  fraunces: "--font-fraunces",
  "dm-sans": "--font-dm-sans",
  cormorant: "--font-cormorant",
  manrope: "--font-manrope",
  schibsted: "--font-schibsted",
};

/** Fallback stacks keep layout stable before the web font loads. */
export const fontFallback: Record<FontKey, string> = {
  "barlow-condensed": "'Arial Narrow', Arial, sans-serif",
  barlow: "Arial, Helvetica, sans-serif",
  fraunces: "Georgia, 'Times New Roman', serif",
  "dm-sans": "Arial, Helvetica, sans-serif",
  cormorant: "Garamond, Georgia, serif",
  manrope: "Arial, Helvetica, sans-serif",
  schibsted: "Arial, Helvetica, sans-serif",
};

export function fontStack(key: FontKey): string {
  return `var(${fontVariable[key]}), ${fontFallback[key]}`;
}
