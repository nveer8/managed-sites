import type { MetadataRoute } from "next";
import { marketingSiteUrl } from "@/brand/brand";

/**
 * Marketing-site robots. Tenant domains get their own robots.txt via the
 * proxy rewrite to /sites/[site]/robots.txt. /sites/ previews are never indexed.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/sites/"] }],
    sitemap: `${marketingSiteUrl()}/sitemap.xml`,
  };
}
