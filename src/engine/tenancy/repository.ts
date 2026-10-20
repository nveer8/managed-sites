import type { SiteConfig } from "@/engine/schema/types";
import { formatIssues, validateSiteConfig } from "@/engine/schema/validate";

/**
 * Read access to tenant site configuration.
 *
 * Async on purpose: Phase 1 reads in-memory fixtures, but a database-backed
 * implementation can drop in without touching any page or component.
 */
export interface TenantRepository {
  listSites(): Promise<SiteConfig[]>;
  getSiteBySlug(slug: string): Promise<SiteConfig | null>;
}

/** Repository over typed fixtures. Validates every site up front so bad config fails the build. */
export function createFixtureRepository(sites: readonly SiteConfig[]): TenantRepository {
  const bySlug = new Map<string, SiteConfig>();
  for (const site of sites) {
    const issues = validateSiteConfig(site);
    if (issues.length > 0) {
      throw new Error(`Invalid site config "${site.slug}":\n${formatIssues(issues)}`);
    }
    if (bySlug.has(site.slug)) throw new Error(`Duplicate site slug "${site.slug}"`);
    bySlug.set(site.slug, site);
  }

  return {
    async listSites() {
      return [...bySlug.values()];
    },
    async getSiteBySlug(slug) {
      return bySlug.get(slug) ?? null;
    },
  };
}
