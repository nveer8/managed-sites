import { cache } from "react";
import { notFound } from "next/navigation";
import { marketingSiteUrl } from "@/brand/brand";
import { createSiteContext, type SiteContext } from "@/engine/site-context";
import { domainResolver } from "@/engine/tenancy/default-resolver";
import { tenantRepository } from "@/engine/tenancy/registry";
import { encodeSiteSegment, parseSiteSegment } from "@/engine/tenancy/site-segment";

/** Resolves the [site] segment to a SiteContext, or 404s. Cached per request. */
export const loadSiteContext = cache(async (segment: string): Promise<SiteContext> => {
  const route = parseSiteSegment(segment);
  if (!route) notFound();
  const site = await tenantRepository.getSiteBySlug(route.slug);
  if (!site) notFound();
  return createSiteContext(site, route, domainResolver.primaryDomainFor(site.slug), marketingSiteUrl());
});

/** Every tenant in both preview and domain mode, so all pages prerender. */
export async function siteStaticParams(): Promise<{ site: string }[]> {
  const sites = await tenantRepository.listSites();
  return sites.flatMap((s) => [
    { site: encodeSiteSegment({ slug: s.slug, mode: "preview" }) },
    { site: encodeSiteSegment({ slug: s.slug, mode: "domain" }) },
  ]);
}
