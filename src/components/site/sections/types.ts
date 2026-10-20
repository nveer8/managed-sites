import type { SiteContext } from "@/engine/site-context";

export interface SectionProps<T> {
  section: T;
  ctx: SiteContext;
  /** Position on the page; used for stable heading ids. */
  index: number;
}

export function headingId(index: number): string {
  return `section-${index}-heading`;
}
