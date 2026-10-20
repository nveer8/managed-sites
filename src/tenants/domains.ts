import type { TenantDomainRecord } from "@/engine/tenancy/domains";

/**
 * Host → tenant routing table. Demo domains use the reserved .example TLD, so
 * they never resolve publicly; locally use http://<slug>.localhost:3000 to
 * exercise domain-mode routing.
 *
 * In production this table moves to Edge Config (see docs/architecture.md).
 */
export const tenantDomains: TenantDomainRecord[] = [
  { slug: "summit-ridge-roofing", primary: "summitridgeroofing.example", aliases: ["www.summitridgeroofing.example"] },
  { slug: "hollis-wren-painting", primary: "holliswrenpainting.example", aliases: ["www.holliswrenpainting.example"] },
  { slug: "stillwater-bath-studio", primary: "stillwaterbath.example", aliases: ["www.stillwaterbath.example"] },
];
