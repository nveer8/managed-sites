import { createSiteContext, type SiteContext } from "@/engine/site-context";
import type { SiteConfig } from "@/engine/schema/types";
import type { SiteMode } from "@/engine/tenancy/site-segment";
import { summitRidgeRoofing } from "@/tenants/summit-ridge-roofing";

export function cloneSite(site: SiteConfig = summitRidgeRoofing): SiteConfig {
  return structuredClone(site);
}

export function ctxFor(site: SiteConfig, mode: SiteMode = "preview", domain: string | null = "example.test"): SiteContext {
  return createSiteContext(site, { slug: site.slug, mode }, domain, "https://platform.test");
}
