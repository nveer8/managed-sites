import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/site/page-intro";
import { About } from "@/components/site/sections/about";
import { Cta } from "@/components/site/sections/cta";
import { Testimonials } from "@/components/site/sections/testimonials";
import { Trust } from "@/components/site/sections/trust";
import { buildPageMetadata } from "@/engine/seo/metadata";
import { loadSiteContext } from "../context";

export async function generateMetadata({ params }: PageProps<"/sites/[site]/about">): Promise<Metadata> {
  const ctx = await loadSiteContext((await params).site);
  const page = ctx.site.pages.about;
  return buildPageMetadata(ctx, { path: "/about", title: page?.heading ?? "About", description: page?.intro });
}

export default async function AboutPage({ params }: PageProps<"/sites/[site]/about">) {
  const ctx = await loadSiteContext((await params).site);
  const page = ctx.site.pages.about;
  if (!page) notFound();

  return (
    <>
      <PageIntro
        ctx={ctx}
        heading={page.heading}
        intro={page.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ]}
      />
      <About section={{ type: "about", variant: "story", heading: `About ${ctx.site.business.name}` }} ctx={ctx} index={1} />
      {ctx.site.team.length ? (
        <About section={{ type: "about", variant: "team", tone: "alt", heading: "The people you'll work with" }} ctx={ctx} index={2} />
      ) : null}
      <Trust section={{ type: "trust", variant: "badges", heading: "Credentials" }} ctx={ctx} index={3} />
      {ctx.site.testimonials.length ? (
        <Testimonials section={{ type: "testimonials", variant: "cards", tone: "alt", heading: "What clients say" }} ctx={ctx} index={4} />
      ) : null}
      <Cta section={{ type: "cta", variant: "band", heading: ctx.site.leadForm.heading, body: ctx.site.cta.reassurance }} ctx={ctx} index={5} />
    </>
  );
}
