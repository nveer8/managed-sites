import { isValidSlug } from "@/engine/tenancy/site-segment";
import type { MediaAsset, SectionConfig, SiteConfig } from "./types";

/**
 * Integrity checks the type system cannot express: unique ids, references
 * between collections, and honesty rules for demo content.
 *
 * Runs when a repository loads sites (so a bad fixture fails the build) and
 * will run on write once configs live in a database.
 */

export interface ConfigIssue {
  path: string;
  message: string;
}

export function formatIssues(issues: ConfigIssue[]): string {
  return issues.map((i) => `  - ${i.path}: ${i.message}`).join("\n");
}

export function validateSiteConfig(site: SiteConfig): ConfigIssue[] {
  const issues: ConfigIssue[] = [];
  const add = (path: string, message: string) => issues.push({ path, message });

  if (!isValidSlug(site.slug)) add("slug", `"${site.slug}" must be lowercase words separated by single hyphens`);
  if (!/^\+[1-9]\d{7,14}$/.test(site.business.phone.e164)) add("business.phone.e164", "must be E.164, e.g. +13035550142");
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(site.business.email)) add("business.email", "is not an email address");

  const serviceSlugs = uniqueKeys(site.services.map((s) => s.slug), "services", add);
  const projectIds = uniqueKeys(site.projects.map((p) => p.id), "projects", add);
  const testimonialIds = uniqueKeys(site.testimonials.map((t) => t.id), "testimonials", add);
  const faqIds = uniqueKeys(site.faqs.map((f) => f.id), "faqs", add);

  if (site.services.length === 0) add("services", "a site needs at least one service");

  site.services.forEach((service, i) => {
    if (!isValidSlug(service.slug)) add(`services[${i}].slug`, `"${service.slug}" is not a valid slug`);
    checkMedia(service.image, `services[${i}].image`, add);
    for (const id of service.faqIds ?? []) {
      if (!faqIds.has(id)) add(`services[${i}].faqIds`, `unknown faq "${id}"`);
    }
  });

  site.projects.forEach((project, i) => {
    if (!serviceSlugs.has(project.serviceSlug)) add(`projects[${i}].serviceSlug`, `unknown service "${project.serviceSlug}"`);
    if (project.images.length === 0) add(`projects[${i}].images`, "needs at least one image");
    project.images.forEach((m, j) => checkMedia(m, `projects[${i}].images[${j}]`, add));
    if (site.status === "demo" && !project.isSample) add(`projects[${i}].isSample`, "demo sites may only contain sample projects");
  });

  site.testimonials.forEach((t, i) => {
    if (t.serviceSlug && !serviceSlugs.has(t.serviceSlug)) add(`testimonials[${i}].serviceSlug`, `unknown service "${t.serviceSlug}"`);
    if (site.status === "demo" && !t.isSample) add(`testimonials[${i}].isSample`, "demo sites may only contain sample testimonials");
    if (t.isSample && t.source && t.source !== "direct") add(`testimonials[${i}].source`, "sample testimonials cannot claim a review platform");
  });

  site.trust.forEach((item, i) => {
    if (item.kind === "stat" && !item.value) add(`trust[${i}].value`, "stat trust items need a value");
  });

  if (site.analytics.provider !== "none" && !site.analytics.id) add("analytics.id", `required for provider "${site.analytics.provider}"`);

  const fieldNames = site.leadForm.fields.map((f) => f.name);
  if (!fieldNames.includes("name")) add("leadForm.fields", 'must include "name"');
  if (!fieldNames.includes("phone") && !fieldNames.includes("email")) add("leadForm.fields", 'must include "phone" or "email"');
  if (new Set(fieldNames).size !== fieldNames.length) add("leadForm.fields", "contains duplicate fields");
  if (fieldNames.includes("timeline") && !site.leadForm.timelineOptions?.length) add("leadForm.timelineOptions", 'required when the "timeline" field is used');

  if (site.seo.description.length > 170) add("seo.description", "keep under 170 characters so it is not truncated");
  if (!site.seo.titleTemplate.includes("%s")) add("seo.titleTemplate", 'must contain "%s"');

  const sections = site.pages.home.sections;
  if (sections[0]?.type !== "hero") add("pages.home.sections[0]", "the home page must start with a hero");
  sections.forEach((section, i) =>
    checkSectionRefs(section, `pages.home.sections[${i}]`, { serviceSlugs, projectIds, testimonialIds, faqIds, site }, add),
  );

  for (const key of site.pages.nav) {
    if (!site.pages[key]) add("pages.nav", `"${key}" is in nav but has no page config`);
  }
  if (!site.pages.contact) add("pages.contact", "every site needs a contact page for the lead form");
  if (site.pages.about) checkMedia(site.pages.about.image, "pages.about.image", add);

  return issues;
}

interface RefSets {
  serviceSlugs: Set<string>;
  projectIds: Set<string>;
  testimonialIds: Set<string>;
  faqIds: Set<string>;
  site: SiteConfig;
}

function checkSectionRefs(
  section: SectionConfig,
  path: string,
  refs: RefSets,
  add: (path: string, message: string) => void,
) {
  const check = (ids: string[] | undefined, set: Set<string>, label: string) => {
    for (const id of ids ?? []) if (!set.has(id)) add(path, `unknown ${label} "${id}"`);
  };

  switch (section.type) {
    case "hero":
      checkMedia(section.image, `${path}.image`, add);
      if (section.secondaryImage) checkMedia(section.secondaryImage, `${path}.secondaryImage`, add);
      break;
    case "services":
      check(section.serviceSlugs, refs.serviceSlugs, "service");
      break;
    case "spotlight":
      check(section.serviceSlugs, refs.serviceSlugs, "service");
      if (section.serviceSlugs.length === 0) add(path, "spotlight needs at least one service");
      break;
    case "projects":
      check(section.projectIds, refs.projectIds, "project");
      if (refs.site.projects.length === 0) add(path, "projects section with no projects");
      break;
    case "before-after": {
      const project = refs.site.projects.find((p) => p.id === section.projectId);
      if (!project) add(path, `unknown project "${section.projectId}"`);
      else if (!project.beforeAfter) add(path, `project "${section.projectId}" has no before/after images`);
      break;
    }
    case "testimonials":
      check(section.testimonialIds, refs.testimonialIds, "testimonial");
      if (refs.site.testimonials.length === 0) add(path, "testimonials section with no testimonials");
      break;
    case "faq":
      check(section.faqIds, refs.faqIds, "faq");
      break;
    case "about":
      if (section.variant === "team" && refs.site.team.length === 0) add(path, "team variant needs team members");
      break;
    case "process":
      if (refs.site.process.length === 0) add(path, "process section with no steps");
      break;
    case "service-areas":
      if (refs.site.serviceAreas.length === 0) add(path, "service-areas section with no areas");
      break;
    case "trust":
      if (refs.site.trust.length === 0) add(path, "trust section with no trust items");
      break;
    case "cta":
    case "lead-form":
      break;
  }
}

function uniqueKeys(keys: string[], label: string, add: (path: string, message: string) => void): Set<string> {
  const seen = new Set<string>();
  for (const key of keys) {
    if (seen.has(key)) add(label, `duplicate id "${key}"`);
    seen.add(key);
  }
  return seen;
}

function checkMedia(media: MediaAsset, path: string, add: (path: string, message: string) => void) {
  if (!media.alt.trim()) add(`${path}.alt`, "alt text is required");
  if (media.src && (!media.width || !media.height)) add(path, "images with src need width and height");
  if (!media.src && !media.placeholder) add(path, "needs either src or a placeholder subject");
}
