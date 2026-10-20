import { describe, expect, it } from "vitest";
import { cloneSite } from "../../../test/fixtures";
import { allSites } from "@/tenants";
import { tenantDomains } from "@/tenants/domains";
import { createDomainResolver, normalizeHost } from "./domains";
import { createFixtureRepository } from "./repository";
import { routeRequest } from "./route-request";
import { encodeSiteSegment, parseSiteSegment, siteBasePath } from "./site-segment";

const resolver = createDomainResolver({
  domains: [
    { slug: "acme-roofing", primary: "acmeroofing.com", aliases: ["www.acmeroofing.com"] },
    { slug: "blue-paint", primary: "bluepaint.co" },
  ],
  platformHosts: ["localhost", "platform.test"],
  localSubdomains: true,
});

describe("site segment", () => {
  it("round-trips preview and domain modes", () => {
    for (const mode of ["preview", "domain"] as const) {
      const segment = encodeSiteSegment({ slug: "acme-roofing", mode });
      expect(parseSiteSegment(segment)).toEqual({ slug: "acme-roofing", mode });
    }
  });

  it("decodes a URL-encoded marker", () => {
    expect(parseSiteSegment("acme-roofing%7Ed")).toEqual({ slug: "acme-roofing", mode: "domain" });
  });

  it("rejects invalid slugs", () => {
    for (const bad of ["", "Acme", "acme--roofing", "acme_roofing", "-acme", "%E0%A4%A", "../etc"]) {
      expect(parseSiteSegment(bad)).toBeNull();
    }
  });

  it("builds link prefixes per mode", () => {
    expect(siteBasePath({ slug: "acme-roofing", mode: "preview" })).toBe("/sites/acme-roofing");
    expect(siteBasePath({ slug: "acme-roofing", mode: "domain" })).toBe("");
  });
});

describe("domain resolver", () => {
  it("normalizes case, ports and trailing dots", () => {
    expect(normalizeHost(" WWW.AcmeRoofing.com:443 ")).toBe("www.acmeroofing.com");
    expect(normalizeHost("AcmeRoofing.com.")).toBe("acmeroofing.com");
    expect(normalizeHost(null)).toBe("");
  });

  it("resolves primary and alias hosts to the tenant", () => {
    expect(resolver.resolveHost("acmeroofing.com")).toMatchObject({ kind: "tenant", slug: "acme-roofing" });
    expect(resolver.resolveHost("www.acmeroofing.com:3000")).toMatchObject({ kind: "tenant", slug: "acme-roofing" });
  });

  it("treats platform and unknown hosts as the platform", () => {
    expect(resolver.resolveHost("localhost:3000")).toEqual({ kind: "platform" });
    expect(resolver.resolveHost("my-branch-abc.vercel.app")).toEqual({ kind: "platform" });
    expect(resolver.resolveHost(undefined)).toEqual({ kind: "platform" });
  });

  it("supports <slug>.localhost only for known slugs", () => {
    expect(resolver.resolveHost("blue-paint.localhost:3000")).toMatchObject({ kind: "tenant", slug: "blue-paint" });
    expect(resolver.resolveHost("nobody.localhost")).toEqual({ kind: "platform" });
  });

  it("does not resolve local subdomains when disabled", () => {
    const prod = createDomainResolver({ domains: [{ slug: "blue-paint", primary: "bluepaint.co" }], platformHosts: [] });
    expect(prod.resolveHost("blue-paint.localhost")).toEqual({ kind: "platform" });
  });

  it("exposes the primary domain for canonical URLs", () => {
    expect(resolver.primaryDomainFor("acme-roofing")).toBe("acmeroofing.com");
    expect(resolver.primaryDomainFor("missing")).toBeNull();
  });

  it("refuses a host assigned to two tenants or to the platform", () => {
    expect(() =>
      createDomainResolver({
        domains: [
          { slug: "a", primary: "shared.com" },
          { slug: "b", primary: "SHARED.com" },
        ],
        platformHosts: [],
      }),
    ).toThrow(/assigned to both/);
    expect(() => createDomainResolver({ domains: [{ slug: "a", primary: "localhost" }], platformHosts: ["localhost"] })).toThrow(
      /platform host/,
    );
  });
});

describe("routeRequest (proxy decisions)", () => {
  it("passes platform requests through, including previews", () => {
    expect(routeRequest(resolver, "localhost:3000", "/pricing")).toEqual({ kind: "pass" });
    expect(routeRequest(resolver, "platform.test", "/sites/acme-roofing/services")).toEqual({ kind: "pass" });
  });

  it("rewrites tenant domains into domain mode", () => {
    expect(routeRequest(resolver, "acmeroofing.com", "/")).toEqual({ kind: "rewrite", pathname: "/sites/acme-roofing~d" });
    expect(routeRequest(resolver, "www.acmeroofing.com", "/services/roof-repair")).toEqual({
      kind: "rewrite",
      pathname: "/sites/acme-roofing~d/services/roof-repair",
    });
    expect(routeRequest(resolver, "bluepaint.co", "/sitemap.xml")).toEqual({
      kind: "rewrite",
      pathname: "/sites/blue-paint~d/sitemap.xml",
    });
  });

  it("hides platform paths on tenant domains and the internal segment on the platform", () => {
    expect(routeRequest(resolver, "acmeroofing.com", "/sites/blue-paint")).toEqual({ kind: "not-found" });
    expect(routeRequest(resolver, "localhost", "/sites/acme-roofing~d/about")).toEqual({ kind: "not-found" });
    expect(routeRequest(resolver, "localhost", "/sites/acme-roofing%7Ed")).toEqual({ kind: "not-found" });
  });
});

describe("fixture repository", () => {
  it("lists and finds the demo tenants", async () => {
    const repo = createFixtureRepository(allSites);
    expect((await repo.listSites()).map((s) => s.slug)).toEqual([
      "summit-ridge-roofing",
      "hollis-wren-painting",
      "stillwater-bath-studio",
    ]);
    expect((await repo.getSiteBySlug("hollis-wren-painting"))?.business.trade).toBe("Residential painting");
    expect(await repo.getSiteBySlug("nope")).toBeNull();
  });

  it("fails loudly on invalid or duplicate configs", () => {
    const broken = cloneSite();
    broken.projects[0]!.serviceSlug = "does-not-exist";
    expect(() => createFixtureRepository([broken])).toThrow(/unknown service/);
    expect(() => createFixtureRepository([cloneSite(), cloneSite()])).toThrow(/Duplicate site slug/);
  });

  it("has a domain record for every tenant", () => {
    expect(tenantDomains.map((d) => d.slug).sort()).toEqual(allSites.map((s) => s.slug).sort());
  });
});
