import type { SiteConfig } from "@/engine/schema/types";
import { siteBasePath, type SiteRoute } from "@/engine/tenancy/site-segment";

/**
 * Everything a tenant page needs to render one request: the config, how the
 * request arrived, and the URLs derived from that.
 */
export interface SiteContext {
  site: SiteConfig;
  route: SiteRoute;
  /** Prefix for internal links: "" on a custom domain, "/sites/<slug>" in preview. */
  basePath: string;
  /** Absolute origin used for canonical URLs, sitemaps and structured data. */
  origin: string;
}

export function createSiteContext(
  site: SiteConfig,
  route: SiteRoute,
  primaryDomain: string | null,
  platformOrigin: string,
): SiteContext {
  return {
    site,
    route,
    basePath: siteBasePath(route),
    origin: primaryDomain ? `https://${primaryDomain}` : `${platformOrigin}/sites/${site.slug}`,
  };
}

/** Internal link within a tenant site. `path` is site-relative, e.g. "/services/roof-repair". */
export function siteHref(ctx: Pick<SiteContext, "basePath">, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return ctx.basePath || "/";
  return `${ctx.basePath}${clean}`;
}

/** Absolute canonical URL for a site-relative path. */
export function absoluteUrl(ctx: Pick<SiteContext, "origin">, path: string): string {
  return path === "/" ? `${ctx.origin}/` : `${ctx.origin}${path}`;
}

/** Only launched sites on their own domain are indexable. */
export function isIndexable(ctx: Pick<SiteContext, "site" | "route">): boolean {
  return ctx.site.status === "live" && ctx.route.mode === "domain";
}
