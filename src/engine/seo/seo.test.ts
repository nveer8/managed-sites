import { describe, expect, it } from "vitest";
import { cloneSite, ctxFor } from "../../../test/fixtures";
import { stillwaterBathStudio } from "@/tenants/stillwater-bath-studio";
import { buildBreadcrumbJsonLd, buildLocalBusinessJsonLd, buildServiceJsonLd, serializeJsonLd } from "./json-ld";
import { buildPageMetadata, pageTitle } from "./metadata";
import { buildTenantSitemap, renderSitemapXml, renderTenantRobotsTxt } from "./sitemap";

describe("page metadata", () => {
  it("uses the default title on home and the template elsewhere", () => {
    const ctx = ctxFor(cloneSite());
    expect(pageTitle(ctx)).toBe(ctx.site.seo.defaultTitle);
    expect(pageTitle(ctx, "Roof Repair")).toBe("Roof Repair | Summit Ridge Roofing");
  });

  it("points canonical URLs at the primary domain even in preview mode", () => {
    const meta = buildPageMetadata(ctxFor(cloneSite(), "preview", "summitroof.com"), { path: "/services/roof-repair", title: "Roof Repair" });
    expect(meta.alternates?.canonical).toBe("https://summitroof.com/services/roof-repair");
    expect(meta.openGraph).toMatchObject({ url: "https://summitroof.com/services/roof-repair", siteName: "Summit Ridge Roofing" });
  });

  it("falls back to the platform preview URL when there is no domain", () => {
    const meta = buildPageMetadata(ctxFor(cloneSite(), "preview", null), { path: "/about" });
    expect(meta.alternates?.canonical).toBe("https://platform.test/sites/summit-ridge-roofing/about");
  });

  it("only indexes live tenants on their own domain", () => {
    const live = cloneSite();
    live.status = "live";
    expect(buildPageMetadata(ctxFor(live, "domain"), { path: "/" }).robots).toEqual({ index: true, follow: true });
    expect(buildPageMetadata(ctxFor(live, "preview"), { path: "/" }).robots).toEqual({ index: false, follow: false });
    expect(buildPageMetadata(ctxFor(cloneSite(), "domain"), { path: "/" }).robots).toEqual({ index: false, follow: false });
  });

  it("only emits OG images that actually exist", () => {
    const site = cloneSite();
    expect(buildPageMetadata(ctxFor(site), { path: "/" }).openGraph).not.toHaveProperty("images");
    site.seo.ogImage = { src: "/og.jpg", alt: "Crew", width: 1200, height: 630 };
    const og = buildPageMetadata(ctxFor(site), { path: "/" }).openGraph as { images: { url: string }[] };
    expect(og.images[0]?.url).toBe("https://example.test/og.jpg");
  });
});

describe("structured data", () => {
  it("describes the business from config only, with no ratings or reviews", () => {
    const ld = buildLocalBusinessJsonLd(ctxFor(cloneSite()));
    expect(ld["@type"]).toBe("RoofingContractor");
    expect(ld.telephone).toBe("+13035550142");
    expect(ld).not.toHaveProperty("aggregateRating");
    expect(ld).not.toHaveProperty("review");
    expect(JSON.stringify(ld)).not.toMatch(/rating/i);
  });

  it("hides the street address of service-area businesses", () => {
    const roofing = buildLocalBusinessJsonLd(ctxFor(cloneSite()));
    expect(roofing.address).toEqual({ "@type": "PostalAddress", addressLocality: "Lakewood", addressRegion: "CO", addressCountry: "US" });
    const bath = buildLocalBusinessJsonLd(ctxFor(cloneSite(stillwaterBathStudio)));
    expect(bath.address).toMatchObject({ streetAddress: "210 Demo Avenue N, Suite 4", postalCode: "55401" });
  });

  it("lists real service areas, hours and services", () => {
    const ld = buildLocalBusinessJsonLd(ctxFor(cloneSite()));
    expect(ld.areaServed).toEqual([
      { "@type": "Place", name: "Denver West" },
      { "@type": "Place", name: "North Metro" },
      { "@type": "Place", name: "South Metro" },
    ]);
    expect((ld.openingHoursSpecification as { dayOfWeek: string[] }[])[1]?.dayOfWeek).toEqual(["https://schema.org/Saturday"]);
    expect(JSON.stringify(ld.hasOfferCatalog)).toContain("https://example.test/services/roof-replacement");
    expect(ld).not.toHaveProperty("sameAs");
  });

  it("links services and breadcrumbs to the business", () => {
    const ctx = ctxFor(cloneSite());
    const service = buildServiceJsonLd(ctx, ctx.site.services[0]!);
    expect(service.provider).toEqual({ "@id": "https://example.test/#business" });
    const crumbs = buildBreadcrumbJsonLd(ctx, [
      { name: "Home", path: "/" },
      { name: "Services", path: "/services" },
    ]);
    expect(crumbs.itemListElement).toEqual([
      { "@type": "ListItem", position: 1, name: "Home", item: "https://example.test/" },
      { "@type": "ListItem", position: 2, name: "Services", item: "https://example.test/services" },
    ]);
  });

  it("escapes < so content cannot close the script tag", () => {
    expect(serializeJsonLd({ name: "</script><b>" })).not.toContain("</script>");
  });
});

describe("sitemap and robots", () => {
  it("lists one URL per real page and no generated location pages", () => {
    const ctx = ctxFor(cloneSite());
    const urls = buildTenantSitemap(ctx).map((e) => e.url);
    expect(urls).toHaveLength(1 + ctx.site.pages.nav.length + ctx.site.services.length);
    expect(urls).toContain("https://example.test/services/storm-damage");
    expect(urls.some((u) => /lakewood|arvada/i.test(u))).toBe(false);
    expect(renderSitemapXml(buildTenantSitemap(ctx))).toContain("<loc>https://example.test/</loc>");
  });

  it("blocks crawling for demo sites and allows it for live domains", () => {
    expect(renderTenantRobotsTxt(ctxFor(cloneSite(), "domain"))).toBe("User-agent: *\nDisallow: /\n");
    const live = cloneSite();
    live.status = "live";
    expect(renderTenantRobotsTxt(ctxFor(live, "domain"))).toContain("Sitemap: https://example.test/sitemap.xml");
  });
});
