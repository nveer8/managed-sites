import type { ThemeConfig } from "@/engine/schema/types";

/**
 * Temporary company brand values.
 *
 * The company does not have a permanent name yet. Everything that names the
 * company, its domain, or its offer reads from here, so a rename is a one-file
 * change (plus the marketing copy that deliberately avoids the name).
 */
export const brand = {
  /** WORKING NAME. Replace before launch. */
  name: "Webbr",
  isWorkingName: true,
  /** Placeholder domain on the reserved .example TLD. */
  domain: "webbr.example",
  email: "hello@webbr.example",
  positioning: "Modern managed websites for home-service businesses.",
  primaryCta: "See what we’d do with your website",
  offer: {
    setup: 999,
    monthly: 299,
    currency: "USD",
  },
} as const;

/** Absolute site URL for the marketing site. Override per environment. */
export function marketingSiteUrl(): string {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? `https://${brand.domain}`).replace(/\/$/, "");
}

/**
 * Hosts that serve the marketing site and /sites previews rather than a
 * tenant. Vercel preview URLs are not listed: unknown hosts fall back to the
 * platform site anyway.
 */
export function platformHosts(): string[] {
  const extra = (process.env.PLATFORM_HOSTS ?? "")
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);
  return ["localhost", "127.0.0.1", brand.domain, `www.${brand.domain}`, ...extra];
}

export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: brand.offer.currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

/** The marketing site uses the same token system as tenant sites. */
export const brandTheme: ThemeConfig = {
  colors: {
    bg: "#f4f1ea",
    surface: "#ffffff",
    alt: "#e9e4d8",
    ink: "#15171a",
    muted: "#53575d",
    line: "#d8d1c2",
    primary: "#1f3d2b",
    onPrimary: "#f4f1ea",
    accent: "#e2a93b",
    onAccent: "#15171a",
    inverse: "#15171a",
    onInverse: "#f4f1ea",
    inverseMuted: "#a8acb1",
    art: ["#1f3d2b", "#c9bfa9", "#e2a93b", "#8a9a8e"],
  },
  fonts: {
    display: "schibsted",
    body: "schibsted",
    displayWeight: 700,
    displayCase: "none",
    displayTracking: -0.035,
    scale: "dramatic",
  },
  radius: { control: "6px", card: "10px", media: "8px" },
  density: "comfortable",
  buttons: "solid",
  eyebrows: "rule",
  imageFrame: "none",
};
