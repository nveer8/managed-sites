import { renderTenantRobotsTxt } from "@/engine/seo/sitemap";
import { loadSiteContext, siteStaticParams } from "../context";

export const dynamic = "force-static";
export const generateStaticParams = siteStaticParams;

export async function GET(_request: Request, { params }: RouteContext<"/sites/[site]/robots.txt">) {
  const ctx = await loadSiteContext((await params).site);
  return new Response(renderTenantRobotsTxt(ctx), { headers: { "content-type": "text/plain; charset=utf-8" } });
}
