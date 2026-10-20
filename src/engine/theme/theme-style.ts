import type { CSSProperties } from "react";
import type { ThemeConfig } from "@/engine/schema/types";
import { fontStack, type FontKey } from "./fonts";

/**
 * Converts a ThemeConfig into CSS custom properties plus data attributes.
 *
 * Palette values land in --p-* variables. globals.css maps them onto the
 * active --c-* tokens per section tone (default/alt/inverse/accent), and
 * Tailwind utilities (bg-bg, text-ink, font-display, rounded-card…) read the
 * --c-* tokens. Components never reference a tenant color directly.
 */

const SECTION_Y: Record<ThemeConfig["density"], string> = {
  compact: "clamp(3rem, 6vw, 4.75rem)",
  comfortable: "clamp(4rem, 8vw, 6.5rem)",
  airy: "clamp(5rem, 11vw, 9rem)",
};

const STACK_GAP: Record<ThemeConfig["density"], string> = {
  compact: "1.25rem",
  comfortable: "1.75rem",
  airy: "2.5rem",
};

const TYPE_SCALE: Record<ThemeConfig["fonts"]["scale"], { h1: string; h2: string; h3: string }> = {
  restrained: {
    h1: "clamp(2.25rem, 1.6rem + 2.8vw, 3.75rem)",
    h2: "clamp(1.75rem, 1.4rem + 1.6vw, 2.6rem)",
    h3: "clamp(1.2rem, 1.1rem + 0.4vw, 1.4rem)",
  },
  standard: {
    h1: "clamp(2.5rem, 1.6rem + 4vw, 4.75rem)",
    h2: "clamp(1.9rem, 1.4rem + 2.2vw, 3.1rem)",
    h3: "clamp(1.25rem, 1.1rem + 0.5vw, 1.5rem)",
  },
  dramatic: {
    h1: "clamp(2.9rem, 1.4rem + 6.6vw, 6.75rem)",
    h2: "clamp(2.1rem, 1.3rem + 3.4vw, 4rem)",
    h3: "clamp(1.3rem, 1.1rem + 0.7vw, 1.65rem)",
  },
};

export const CONTAINER_WIDTH = {
  narrow: "68rem",
  standard: "76rem",
  wide: "88rem",
} as const;

export type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

export function themeToCssVariables(
  theme: ThemeConfig,
  container: keyof typeof CONTAINER_WIDTH = "standard",
): ThemeStyle {
  const { colors, fonts, radius } = theme;
  const scale = TYPE_SCALE[fonts.scale];
  return {
    "--p-bg": colors.bg,
    "--p-surface": colors.surface,
    "--p-alt": colors.alt,
    "--p-ink": colors.ink,
    "--p-muted": colors.muted,
    "--p-line": colors.line,
    "--p-primary": colors.primary,
    "--p-on-primary": colors.onPrimary,
    "--p-accent": colors.accent,
    "--p-on-accent": colors.onAccent,
    "--p-inverse": colors.inverse,
    "--p-on-inverse": colors.onInverse,
    "--p-inverse-muted": colors.inverseMuted,
    "--art-1": colors.art[0],
    "--art-2": colors.art[1],
    "--art-3": colors.art[2],
    "--art-4": colors.art[3],
    "--f-display": fontStack(fonts.display),
    "--f-body": fontStack(fonts.body),
    "--fw-display": String(fonts.displayWeight),
    "--tt-display": fonts.displayCase,
    "--ls-display": `${fonts.displayTracking}em`,
    "--fs-h1": scale.h1,
    "--fs-h2": scale.h2,
    "--fs-h3": scale.h3,
    "--r-control": radius.control,
    "--r-card": radius.card,
    "--r-media": radius.media,
    "--section-y": SECTION_Y[theme.density],
    "--stack": STACK_GAP[theme.density],
    "--container": CONTAINER_WIDTH[container],
    ...TREATMENTS.buttons[theme.buttons],
    ...TREATMENTS.eyebrows[theme.eyebrows],
    ...TREATMENTS.frame[theme.imageFrame],
  };
}

/*
 * Switch-like treatments expressed as inheritable custom properties (read by
 * .btn, .eyebrow and .media-frame in globals.css), so nested themes resolve to
 * the nearest theme root.
 */
const TREATMENTS = {
  buttons: {
    solid: { "--btn-underline": "0", "--btn-case": "none", "--btn-tracking": "0", "--btn-weight": "600", "--btn-size": "1rem" },
    "solid-square": {
      "--btn-underline": "0",
      "--btn-case": "uppercase",
      "--btn-tracking": "0.06em",
      "--btn-weight": "700",
      "--btn-size": "0.9375rem",
    },
    "underline-secondary": {
      "--btn-underline": "1",
      "--btn-case": "none",
      "--btn-tracking": "0",
      "--btn-weight": "600",
      "--btn-size": "1rem",
    },
  },
  eyebrows: {
    none: { "--eyebrow-display": "none", "--eyebrow-rule": "0px" },
    caps: { "--eyebrow-display": "inline-flex", "--eyebrow-rule": "0px" },
    rule: { "--eyebrow-display": "inline-flex", "--eyebrow-rule": "2rem" },
  },
  frame: {
    none: { "--frame-inset": "0", "--frame-offset": "0px", "--frame-offset-on": "0" },
    "inset-border": { "--frame-inset": "1", "--frame-offset": "0px", "--frame-offset-on": "0" },
    "offset-block": { "--frame-inset": "0", "--frame-offset": "1.25rem", "--frame-offset-on": "1" },
  },
} satisfies {
  buttons: Record<ThemeConfig["buttons"], Record<`--${string}`, string>>;
  eyebrows: Record<ThemeConfig["eyebrows"], Record<`--${string}`, string>>;
  frame: Record<ThemeConfig["imageFrame"], Record<`--${string}`, string>>;
};

/** Data attributes naming the treatments, for debugging and test hooks. Styling uses the variables above. */
export function themeDataAttributes(theme: ThemeConfig): Record<`data-${string}`, string> {
  return {
    "data-buttons": theme.buttons,
    "data-eyebrows": theme.eyebrows,
    "data-frame": theme.imageFrame,
    "data-density": theme.density,
  };
}

export function themeFonts(theme: ThemeConfig): FontKey[] {
  return [theme.fonts.display, theme.fonts.body];
}
