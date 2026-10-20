import type { Viewport } from "next";
import { ConversionTracking } from "@/components/site/layout/analytics";
import { DemoBanner } from "@/components/site/layout/demo-banner";
import { SiteFooter } from "@/components/site/layout/footer";
import { SiteHeader } from "@/components/site/layout/header";
import { MobileCallBar } from "@/components/site/layout/mobile-call-bar";
import { JsonLd } from "@/components/site/primitives/json-ld";
import { buildLocalBusinessJsonLd } from "@/engine/seo/json-ld";
import { themeDataAttributes, themeToCssVariables } from "@/engine/theme/theme-style";
import { loadSiteContext, siteStaticParams } from "./context";

export const dynamicParams = false;
export const generateStaticParams = siteStaticParams;

export async function generateViewport({ params }: LayoutProps<"/sites/[site]">): Promise<Viewport> {
  const ctx = await loadSiteContext((await params).site);
  return { themeColor: ctx.site.theme.colors.bg };
}

export default async function SiteLayout({ children, params }: LayoutProps<"/sites/[site]">) {
  const ctx = await loadSiteContext((await params).site);
  const { theme, layout } = ctx.site;

  return (
    <div
      className="theme-root flex min-h-svh flex-col"
      style={themeToCssVariables(theme, layout.container)}
      {...themeDataAttributes(theme)}
    >
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>
      <DemoBanner ctx={ctx} />
      <SiteHeader ctx={ctx} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter ctx={ctx} />
      <MobileCallBar ctx={ctx} />
      <JsonLd data={buildLocalBusinessJsonLd(ctx)} />
      <ConversionTracking siteSlug={ctx.site.slug} />
    </div>
  );
}
