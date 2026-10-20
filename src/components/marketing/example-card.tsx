import Link from "next/link";
import { SiteHeader } from "@/components/site/layout/header";
import { Hero } from "@/components/site/sections/hero";
import type { HeroSection, SiteConfig } from "@/engine/schema/types";
import { createSiteContext } from "@/engine/site-context";
import { themeDataAttributes, themeToCssVariables } from "@/engine/theme/theme-style";
import { ScaledPreview } from "./scaled-preview";

/** A live, scaled render of a demo tenant's header + hero, produced by the real engine. */
export function ExamplePreview({ site }: { site: SiteConfig }) {
  const ctx = createSiteContext(site, { slug: site.slug, mode: "preview" }, null, "");
  const hero = site.pages.home.sections.find((s): s is HeroSection => s.type === "hero");
  return (
    <ScaledPreview>
      <div className="theme-root" style={themeToCssVariables(site.theme, site.layout.container)} {...themeDataAttributes(site.theme)}>
        <SiteHeader ctx={ctx} />
        {hero ? <Hero section={hero} ctx={ctx} index={0} preview /> : null}
      </div>
    </ScaledPreview>
  );
}

export function ExampleCard({ site, direction }: { site: SiteConfig; direction?: string }) {
  return (
    <article className="group flex flex-col gap-4">
      <Link
        href={`/sites/${site.slug}`}
        className="block overflow-hidden rounded-card border border-line bg-surface shadow-[0_24px_50px_-30px_rgb(0_0_0/0.4)] transition-transform group-hover:-translate-y-1"
        aria-label={`Open the ${site.business.name} concept site`}
      >
        <div className="flex items-center gap-1.5 border-b border-line px-3 py-2" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
          <span className="size-2.5 rounded-full bg-line" />
        </div>
        <ExamplePreview site={site} />
      </Link>
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted">
          {site.business.trade} · <span className="font-semibold">Concept business</span>
        </p>
        <h3 className="text-h3">
          <Link href={`/sites/${site.slug}`} className="no-underline hover:text-primary">
            {site.business.name}
          </Link>
        </h3>
        {direction ? <p className="text-muted">{direction}</p> : null}
      </div>
    </article>
  );
}
