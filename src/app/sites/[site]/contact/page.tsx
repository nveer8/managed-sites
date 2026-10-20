import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/site/page-intro";
import { Faq } from "@/components/site/sections/faq";
import { LeadFormBlock } from "@/components/site/sections/lead-form";
import { ServiceAreas } from "@/components/site/sections/service-areas";
import { buildPageMetadata } from "@/engine/seo/metadata";
import { loadSiteContext } from "../context";

export async function generateMetadata({ params }: PageProps<"/sites/[site]/contact">): Promise<Metadata> {
  const ctx = await loadSiteContext((await params).site);
  const page = ctx.site.pages.contact;
  return buildPageMetadata(ctx, { path: "/contact", title: page?.heading ?? "Contact", description: page?.intro });
}

export default async function ContactPage({ params }: PageProps<"/sites/[site]/contact">) {
  const ctx = await loadSiteContext((await params).site);
  const page = ctx.site.pages.contact;
  if (!page) notFound();

  return (
    <>
      <PageIntro
        ctx={ctx}
        heading={page.heading}
        intro={page.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]}
      />
      <LeadFormBlock section={{ type: "lead-form", variant: "split", id: "quote" }} ctx={ctx} index={1} />
      <ServiceAreas section={{ type: "service-areas", variant: "columns", tone: "alt", heading: "Where we work" }} ctx={ctx} index={2} />
      <Faq section={{ type: "faq", variant: "accordion", heading: "Common questions" }} ctx={ctx} index={3} />
    </>
  );
}
