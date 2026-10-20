import type { Metadata } from "next";
import { SectionList } from "@/components/site/section-renderer";
import { buildPageMetadata } from "@/engine/seo/metadata";
import { loadSiteContext } from "./context";

export async function generateMetadata({ params }: PageProps<"/sites/[site]">): Promise<Metadata> {
  const ctx = await loadSiteContext((await params).site);
  return buildPageMetadata(ctx, { path: "/" });
}

export default async function SiteHome({ params }: PageProps<"/sites/[site]">) {
  const ctx = await loadSiteContext((await params).site);
  return <SectionList sections={ctx.site.pages.home.sections} ctx={ctx} />;
}
