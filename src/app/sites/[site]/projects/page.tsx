import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageIntro } from "@/components/site/page-intro";
import { BeforeAfter } from "@/components/site/sections/before-after";
import { Cta } from "@/components/site/sections/cta";
import { Projects } from "@/components/site/sections/projects";
import { buildPageMetadata } from "@/engine/seo/metadata";
import { loadSiteContext } from "../context";

export async function generateMetadata({ params }: PageProps<"/sites/[site]/projects">): Promise<Metadata> {
  const ctx = await loadSiteContext((await params).site);
  const page = ctx.site.pages.projects;
  return buildPageMetadata(ctx, { path: "/projects", title: page?.heading ?? "Projects", description: page?.intro });
}

export default async function ProjectsPage({ params }: PageProps<"/sites/[site]/projects">) {
  const ctx = await loadSiteContext((await params).site);
  const page = ctx.site.pages.projects;
  if (!page) notFound();
  const withComparison = ctx.site.projects.filter((p) => p.beforeAfter);

  return (
    <>
      <PageIntro
        ctx={ctx}
        heading={page.heading}
        intro={page.intro}
        crumbs={[
          { name: "Home", path: "/" },
          { name: "Projects", path: "/projects" },
        ]}
      />
      {withComparison.map((project, i) => (
        <BeforeAfter
          key={project.id}
          section={{ type: "before-after", variant: "slider", projectId: project.id, tone: i % 2 ? "alt" : "default" }}
          ctx={ctx}
          index={i + 1}
        />
      ))}
      <Projects section={{ type: "projects", variant: "grid", tone: "alt", heading: "More projects" }} ctx={ctx} index={10} />
      <Cta section={{ type: "cta", variant: "band", heading: ctx.site.leadForm.heading, body: ctx.site.cta.reassurance }} ctx={ctx} index={11} />
    </>
  );
}
