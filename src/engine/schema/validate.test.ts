import { describe, expect, it } from "vitest";
import { cloneSite } from "../../../test/fixtures";
import { allSites } from "@/tenants";
import { validateSiteConfig } from "./validate";

const messages = (site: Parameters<typeof validateSiteConfig>[0]) => validateSiteConfig(site).map((i) => `${i.path}: ${i.message}`);

describe("validateSiteConfig", () => {
  it.each(allSites.map((s) => [s.slug, s] as const))("%s is valid", (_slug, site) => {
    expect(validateSiteConfig(site)).toEqual([]);
  });

  it("requires demo content to be marked as sample", () => {
    const site = cloneSite();
    site.testimonials[0]!.isSample = false;
    site.projects[0]!.isSample = false;
    const out = messages(site);
    expect(out.some((m) => m.includes("sample testimonials"))).toBe(true);
    expect(out.some((m) => m.includes("sample projects"))).toBe(true);
  });

  it("does not let sample testimonials claim a review platform", () => {
    const site = cloneSite();
    site.testimonials[0]!.source = "google";
    expect(messages(site).join()).toMatch(/cannot claim a review platform/);
  });

  it("catches broken references from sections", () => {
    const site = cloneSite();
    site.pages.home.sections.push({ type: "before-after", variant: "slider", projectId: "arvada-flashing" });
    site.pages.home.sections.push({ type: "services", variant: "cards", serviceSlugs: ["ghost"] });
    const out = messages(site).join("\n");
    expect(out).toMatch(/has no before\/after images/);
    expect(out).toMatch(/unknown service "ghost"/);
  });

  it("requires the home page to open with a hero", () => {
    const site = cloneSite();
    site.pages.home.sections.shift();
    expect(messages(site).join()).toMatch(/must start with a hero/);
  });

  it("checks contact basics and lead form fields", () => {
    const site = cloneSite();
    site.business.phone.e164 = "303-555-0142";
    site.leadForm.fields = [{ name: "message", required: false }];
    const out = messages(site).join("\n");
    expect(out).toMatch(/E\.164/);
    expect(out).toMatch(/must include "name"/);
    expect(out).toMatch(/"phone" or "email"/);
  });

  it("requires alt text and image dimensions", () => {
    const site = cloneSite();
    site.services[0]!.image = { alt: " ", src: "/photo.jpg" };
    const out = messages(site).join("\n");
    expect(out).toMatch(/alt text is required/);
    expect(out).toMatch(/need width and height/);
  });

  it("flags duplicate ids and nav pages without config", () => {
    const site = cloneSite();
    site.faqs.push({ ...site.faqs[0]! });
    delete site.pages.projects;
    const out = messages(site).join("\n");
    expect(out).toMatch(/duplicate id/);
    expect(out).toMatch(/"projects" is in nav/);
  });
});
