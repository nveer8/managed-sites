import { absoluteUrl, isIndexable, type SiteContext } from "@/engine/site-context";

export interface SitemapEntry {
  url: string;
  priority: number;
}

/** One entry per real page. No generated location or keyword pages. */
export function buildTenantSitemap(ctx: SiteContext): SitemapEntry[] {
  const { site } = ctx;
  const entries: SitemapEntry[] = [{ url: absoluteUrl(ctx, "/"), priority: 1 }];
  for (const key of site.pages.nav) entries.push({ url: absoluteUrl(ctx, `/${key}`), priority: key === "contact" ? 0.8 : 0.7 });
  if (site.pages.contact && !site.pages.nav.includes("contact")) entries.push({ url: absoluteUrl(ctx, "/contact"), priority: 0.8 });
  for (const service of site.services) entries.push({ url: absoluteUrl(ctx, `/services/${service.slug}`), priority: 0.8 });
  return entries;
}

export function renderSitemapXml(entries: SitemapEntry[]): string {
  const urls = entries
    .map((e) => `  <url>\n    <loc>${escapeXml(e.url)}</loc>\n    <priority>${e.priority.toFixed(1)}</priority>\n  </url>`)
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function renderTenantRobotsTxt(ctx: SiteContext): string {
  if (!isIndexable(ctx)) return "User-agent: *\nDisallow: /\n";
  return `User-agent: *\nAllow: /\n\nSitemap: ${absoluteUrl(ctx, "/sitemap.xml")}\n`;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
