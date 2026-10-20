import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/site/page-intro";
import { homeVariant } from "@/components/site/page-helpers";
import { Cta } from "@/components/site/sections/cta";
import { Services } from "@/components/site/sections/services";
import { buildPageMetadata } from "@/engine/seo/metadata";
import { loadSiteContext } from "../context";

export async function generateMetadata({ params }: PageProps<"/sites/[site]/services">): Promise<Metadata> {
  const ctx = await loadSiteContext((await params).site);
  const page = ctx.site.pages.services;
  return buildPageMetadata(ctx, { path: "/services", title: page?.heading ?? "Services", description: page?.intro });
}

export default async function ServicesPage({ params }: PageProps<"/sites/[site]/services">) {
  const ctx = await loadSiteContext((await params).site);
  const page = ctx.site.pages.services;
  if (!page) notFound();

  return (
    <>
      <PageIntro
        ctx={ctx}
        heading={page.heading}
        intro={page.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <Services section={{ type: "services", variant: homeVariant(ctx.site, "services", "cards") }} ctx={ctx} index={1} />
      <Cta
        section={{ type: "cta", variant: "band", heading: ctx.site.leadForm.heading, body: ctx.site.cta.reassurance }}
        ctx={ctx}
        index={2}
      />
    </>
  );
}
