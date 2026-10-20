import { buildTenantSitemap, renderSitemapXml } from "@/engine/seo/sitemap";
import { loadSiteContext, siteStaticParams } from "../context";

export const dynamic = "force-static";
export const generateStaticParams = siteStaticParams;

export async function GET(_request: Request, { params }: RouteContext<"/sites/[site]/sitemap.xml">) {
  const ctx = await loadSiteContext((await params).site);
  return new Response(renderSitemapXml(buildTenantSitemap(ctx)), {
    headers: { "content-type": "application/xml; charset=utf-8" },
  });
}
