/**
 * Every tenant page lives under /sites/[site]. The [site] segment encodes both
 * the tenant slug and how the request arrived:
 *
 *   "summit-ridge-roofing"    preview mode: platform URL, links keep the /sites/<slug> prefix
 *   "summit-ridge-roofing~d"  domain mode: proxy rewrite from a custom domain, links are root-relative
 *
 * Both forms are prerendered, so link generation needs no request headers and
 * pages stay static.
 */

export type SiteMode = "preview" | "domain";

export interface SiteRoute {
  slug: string;
  mode: SiteMode;
}

export const SITES_PREFIX = "/sites";
const DOMAIN_MARKER = "~d";
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isValidSlug(slug: string): boolean {
  return SLUG_PATTERN.test(slug);
}

export function encodeSiteSegment(route: SiteRoute): string {
  return route.mode === "domain" ? `${route.slug}${DOMAIN_MARKER}` : route.slug;
}

export function parseSiteSegment(segment: string): SiteRoute | null {
  let value: string;
  try {
    value = decodeURIComponent(segment);
  } catch {
    return null;
  }
  const mode: SiteMode = value.endsWith(DOMAIN_MARKER) ? "domain" : "preview";
  const slug = mode === "domain" ? value.slice(0, -DOMAIN_MARKER.length) : value;
  return isValidSlug(slug) ? { slug, mode } : null;
}

/** Path prefix for links inside a tenant site. */
export function siteBasePath(route: SiteRoute): string {
  return route.mode === "domain" ? "" : `${SITES_PREFIX}/${route.slug}`;
}
