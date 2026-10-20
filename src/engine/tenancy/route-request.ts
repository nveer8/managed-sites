import type { DomainResolver } from "./domains";
import { encodeSiteSegment, SITES_PREFIX } from "./site-segment";

export type RouteDecision =
  | { kind: "pass" }
  | { kind: "rewrite"; pathname: string }
  | { kind: "not-found" };

/**
 * Decides what proxy.ts does with a request. Pure so it can be unit tested.
 *
 * - Platform hosts pass through: the marketing site and /sites/<slug> previews.
 * - Tenant hosts are rewritten into the tenant route tree in domain mode.
 * - On tenant hosts the platform's own paths (/sites/…) are not reachable.
 * - On platform hosts the internal domain-mode segment is not reachable directly.
 */
export function routeRequest(
  resolver: DomainResolver,
  host: string | null,
  pathname: string,
): RouteDecision {
  const resolution = resolver.resolveHost(host);

  if (resolution.kind === "platform") {
    // "/sites/<slug>~d" is an internal rewrite target only.
    const segment = pathname.split("/")[2] ?? "";
    if (pathname.startsWith(`${SITES_PREFIX}/`) && decodeSafe(segment).endsWith("~d")) {
      return { kind: "not-found" };
    }
    return { kind: "pass" };
  }

  if (pathname === SITES_PREFIX || pathname.startsWith(`${SITES_PREFIX}/`)) {
    return { kind: "not-found" };
  }

  const segment = encodeSiteSegment({ slug: resolution.slug, mode: "domain" });
  const rest = pathname === "/" ? "" : pathname;
  return { kind: "rewrite", pathname: `${SITES_PREFIX}/${segment}${rest}` };
}

function decodeSafe(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}
