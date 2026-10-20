import type { Metadata } from "next";
import type { MediaAsset } from "@/engine/schema/types";
import { absoluteUrl, isIndexable, type SiteContext } from "@/engine/site-context";

export interface PageSeoInput {
  /** Site-relative path, e.g. "/services/roof-repair". */
  path: string;
  /** Page title; omitted for the home page (uses seo.defaultTitle). */
  title?: string;
  description?: string;
  image?: MediaAsset;
}

export function pageTitle(ctx: SiteContext, title?: string): string {
  return title ? ctx.site.seo.titleTemplate.replace("%s", title) : ctx.site.seo.defaultTitle;
}

export function buildPageMetadata(ctx: SiteContext, input: PageSeoInput): Metadata {
  const { site } = ctx;
  const title = pageTitle(ctx, input.title);
  const description = input.description ?? site.seo.description;
  const canonical = absoluteUrl(ctx, input.path);
  const image = input.image?.src ? input.image : site.seo.ogImage?.src ? site.seo.ogImage : undefined;
  const indexable = isIndexable(ctx);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical },
    robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: site.business.name,
      title,
      description,
      locale: "en_US",
      ...(image?.src
        ? { images: [{ url: new URL(image.src, ctx.origin).toString(), width: image.width, height: image.height, alt: image.alt }] }
        : {}),
    },
    twitter: { card: image ? "summary_large_image" : "summary", title, description },
  };
}
