/**
 * Maps request hosts to tenants.
 *
 * Phase 1 reads a static table (src/tenants/domains.ts). In production this
 * becomes an Edge Config or database lookup behind the same DomainResolver
 * interface, which proxy.ts depends on.
 */

export interface TenantDomainRecord {
  slug: string;
  /** Canonical host, without protocol. Used for canonical URLs and sitemaps. */
  primary: string;
  /** Other hosts that serve the same site (e.g. www). */
  aliases?: string[];
}

export type HostResolution =
  | { kind: "platform" }
  | { kind: "tenant"; slug: string; host: string };

export interface DomainResolver {
  resolveHost(host: string | null | undefined): HostResolution;
  primaryDomainFor(slug: string): string | null;
}

export interface DomainResolverOptions {
  domains: readonly TenantDomainRecord[];
  /** Hosts that serve the company marketing site and /sites previews. */
  platformHosts: readonly string[];
  /**
   * Allow "<slug>.localhost" to act as a tenant domain in local development so
   * domain-mode routing can be exercised without DNS.
   */
  localSubdomains?: boolean;
}

export function normalizeHost(host: string | null | undefined): string {
  if (!host) return "";
  // Strip port, trailing dot, and case. IPv6 hosts are platform-only, so a
  // simple split is fine here.
  return host.trim().toLowerCase().replace(/:\d+$/, "").replace(/\.$/, "");
}

export function createDomainResolver(options: DomainResolverOptions): DomainResolver {
  const byHost = new Map<string, string>();
  const primaryBySlug = new Map<string, string>();
  const platform = new Set(options.platformHosts.map(normalizeHost));

  for (const record of options.domains) {
    for (const host of [record.primary, ...(record.aliases ?? [])]) {
      const key = normalizeHost(host);
      const existing = byHost.get(key);
      if (existing && existing !== record.slug) {
        throw new Error(`Host "${key}" is assigned to both "${existing}" and "${record.slug}"`);
      }
      if (platform.has(key)) {
        throw new Error(`Host "${key}" is a platform host and cannot belong to tenant "${record.slug}"`);
      }
      byHost.set(key, record.slug);
    }
    primaryBySlug.set(record.slug, normalizeHost(record.primary));
  }

  const knownSlugs = new Set(options.domains.map((d) => d.slug));

  return {
    resolveHost(rawHost) {
      const host = normalizeHost(rawHost);
      if (!host || platform.has(host)) return { kind: "platform" };

      const slug = byHost.get(host);
      if (slug) return { kind: "tenant", slug, host };

      if (options.localSubdomains && host.endsWith(".localhost")) {
        const sub = host.slice(0, -".localhost".length);
        if (knownSlugs.has(sub)) return { kind: "tenant", slug: sub, host };
      }

      // Unknown hosts (Vercel preview URLs, IPs) serve the platform site.
      return { kind: "platform" };
    },
    primaryDomainFor(slug) {
      return primaryBySlug.get(slug) ?? null;
    },
  };
}
