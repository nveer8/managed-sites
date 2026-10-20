import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ctxFor } from "../../../../test/fixtures";
import { SiteFooter } from "@/components/site/layout/footer";
import { SiteHeader } from "@/components/site/layout/header";
import { DemoBanner } from "@/components/site/layout/demo-banner";
import { SectionList } from "@/components/site/section-renderer";
import type { SiteConfig } from "@/engine/schema/types";
import { allSites } from "@/tenants";
import { hollisWrenPainting } from "@/tenants/hollis-wren-painting";

function renderHome(site: SiteConfig, mode: "preview" | "domain" = "preview") {
  const ctx = ctxFor(site, mode);
  return render(
    <div>
      <DemoBanner ctx={ctx} />
      <SiteHeader ctx={ctx} />
      <main>
        <SectionList sections={site.pages.home.sections} ctx={ctx} />
      </main>
      <SiteFooter ctx={ctx} />
    </div>,
  );
}

describe.each(allSites.map((s) => [s.slug, s] as const))("%s home page", (_slug, site) => {
  it("renders every configured section with exactly one h1", () => {
    const { container } = renderHome(site);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
      site.pages.home.sections[0]!.type === "hero" ? site.pages.home.sections[0]!.heading : "",
    );
    // One landmark section per configured section, plus header/footer chrome.
    expect(container.querySelectorAll("main > section").length).toBe(site.pages.home.sections.length);
  });

  it("offers click-to-call with the E.164 number", () => {
    const { container } = renderHome(site);
    const tel = container.querySelectorAll(`a[href="tel:${site.business.phone.e164}"]`);
    expect(tel.length).toBeGreaterThan(0);
  });

  it("discloses that it is a concept business and marks sample content", () => {
    renderHome(site);
    expect(screen.getByRole("note")).toHaveTextContent(/fictional business/);
    expect(screen.getAllByText("Sample").length).toBeGreaterThan(0);
  });

  it("gives every image an accessible name", () => {
    const { container } = renderHome(site);
    for (const img of container.querySelectorAll('[role="img"]')) {
      expect(img.getAttribute("aria-label")?.trim()).toBeTruthy();
    }
  });

  it("never renders star ratings", () => {
    const { container } = renderHome(site);
    expect(container.textContent).not.toMatch(/★|\d(\.\d)? out of 5|stars/i);
  });
});

describe("tenant-aware links", () => {
  it("prefixes links in preview mode and keeps them root-relative on a domain", () => {
    const preview = renderHome(hollisWrenPainting, "preview");
    const mainNav = within(preview.container.querySelector('nav[aria-label="Main"]') as HTMLElement);
    expect(mainNav.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/sites/hollis-wren-painting/services");
    preview.unmount();

    const domain = renderHome(hollisWrenPainting, "domain");
    const domainNav = within(domain.container.querySelector('nav[aria-label="Main"]') as HTMLElement);
    expect(domainNav.getByRole("link", { name: "Services" })).toHaveAttribute("href", "/services");
  });
});

describe("visual differentiation", () => {
  // The product requirement: tenants must differ by more than logo and color.
  const pick = <T,>(f: (s: SiteConfig) => T) => new Set(allSites.map((s) => JSON.stringify(f(s)))).size;

  it("uses different typography, hero, header, density, corners and image framing per tenant", () => {
    expect(pick((s) => [s.theme.fonts.display, s.theme.fonts.body])).toBe(allSites.length);
    expect(pick((s) => s.pages.home.sections.find((x) => x.type === "hero")?.variant)).toBe(allSites.length);
    expect(pick((s) => s.layout.header)).toBe(allSites.length);
    expect(pick((s) => s.theme.density)).toBe(allSites.length);
    expect(pick((s) => s.theme.radius.card)).toBe(allSites.length);
    expect(pick((s) => s.theme.imageFrame)).toBe(allSites.length);
  });

  it("composes home pages in a different section order", () => {
    expect(pick((s) => s.pages.home.sections.map((x) => `${x.type}:${x.variant}`))).toBe(allSites.length);
  });

  it("renders different DOM structure for the same content types", () => {
    const shapes = allSites.map((site) => {
      const { container, unmount } = renderHome(site);
      const shape = [...container.querySelectorAll("main > section")].map((s) => s.firstElementChild?.className ?? "").join("|");
      unmount();
      return shape;
    });
    expect(new Set(shapes).size).toBe(allSites.length);
  });
});
