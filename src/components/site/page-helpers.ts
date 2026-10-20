import type { SectionConfig, SectionType, SiteConfig } from "@/engine/schema/types";

type SectionOf<T extends SectionType> = Extract<SectionConfig, { type: T }>;

/** The variant the tenant chose for a section type on its home page, so inner pages stay consistent. */
export function homeVariant<T extends SectionType>(
  site: SiteConfig,
  type: T,
  fallback: SectionOf<T>["variant"],
): SectionOf<T>["variant"] {
  const found = site.pages.home.sections.find((s) => s.type === type) as SectionOf<T> | undefined;
  return (found?.variant ?? fallback) as SectionOf<T>["variant"];
}
