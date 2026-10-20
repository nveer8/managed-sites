import type { SitePageKey } from "@/engine/schema/types";
import { siteHref, type SiteContext } from "@/engine/site-context";

const LABELS: Record<SitePageKey, string> = {
  services: "Services",
  projects: "Our Work",
  about: "About",
  contact: "Contact",
};

export interface NavItem {
  key: SitePageKey;
  label: string;
  href: string;
}

export function navItems(ctx: SiteContext): NavItem[] {
  return ctx.site.pages.nav.map((key) => ({ key, label: LABELS[key], href: siteHref(ctx, `/${key}`) }));
}
