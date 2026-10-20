import { platformHosts } from "@/brand/brand";
import { tenantDomains } from "@/tenants/domains";
import { createDomainResolver } from "./domains";

/**
 * Domain resolver over the Phase 1 domain table. Kept separate from the tenant
 * repository so proxy.ts bundles only hostnames, not tenant content.
 */
export const domainResolver = createDomainResolver({
  domains: tenantDomains,
  platformHosts: platformHosts(),
  localSubdomains: process.env.NODE_ENV !== "production",
});
