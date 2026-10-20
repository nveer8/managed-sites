import type { Project, ProjectsSection } from "@/engine/schema/types";
import type { SiteContext } from "@/engine/site-context";
import { SampleTag } from "../primitives/sample-tag";
import { Section, SectionHeading } from "../primitives/section";
import { SiteImage } from "../media/site-image";
import { headingId, type SectionProps } from "./types";

export function pickProjects(ctx: SiteContext, ids?: string[]): Project[] {
  if (!ids?.length) return ctx.site.projects;
  return ids.flatMap((id) => ctx.site.projects.find((p) => p.id === id) ?? []);
}

function serviceName(ctx: SiteContext, slug: string): string {
  return ctx.site.services.find((s) => s.slug === slug)?.name ?? "";
}

function ProjectCaption({ ctx, project, large = false }: { ctx: SiteContext; project: Project; large?: boolean }) {
  return (
    <div className="flex flex-col gap-1.5 pt-4">
      <p className="flex items-center gap-2 text-sm text-muted">
        <span>{serviceName(ctx, project.serviceSlug)}</span>
        <span aria-hidden="true">·</span>
        <span>{project.location}</span>
        {project.isSample ? <SampleTag className="ml-1" /> : null}
      </p>
      <h3 className={large ? "text-h3 lg:text-[1.9rem]" : "text-h3"}>{project.title}</h3>
      {large ? <p className="max-w-xl text-muted">{project.summary}</p> : null}
    </div>
  );
}

export function Projects({ section, ctx, index }: SectionProps<ProjectsSection>) {
  const projects = pickProjects(ctx, section.projectIds);
  const id = headingId(index);
  const heading = (
    <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
  );

  if (section.variant === "featured") {
    const [lead, ...rest] = projects;
    if (!lead) return null;
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        {heading}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <article>
            <SiteImage media={lead.images[0]!} aspect="4 / 3" sizes="(min-width: 1024px) 60vw, 100vw" />
            <ProjectCaption ctx={ctx} project={lead} large />
          </article>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
            {rest.slice(0, 2).map((project) => (
              <article key={project.id}>
                <SiteImage media={project.images[0]!} aspect="16 / 10" sizes="(min-width: 1024px) 35vw, 50vw" />
                <ProjectCaption ctx={ctx} project={project} />
              </article>
            ))}
          </div>
        </div>
      </Section>
    );
  }

  if (section.variant === "strip") {
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        {heading}
        <div
          className="-mx-[clamp(1.25rem,4vw,2.5rem)] mt-12 overflow-x-auto px-[clamp(1.25rem,4vw,2.5rem)] pb-4 [scroll-snap-type:x_mandatory]"
          role="region"
          aria-label="Project gallery, scroll horizontally"
          tabIndex={0}
        >
          <ul className="flex gap-5">
            {projects.map((project) => (
              <li key={project.id} className="w-[78%] shrink-0 [scroll-snap-align:start] sm:w-[46%] lg:w-[31%]">
                <SiteImage media={project.images[0]!} aspect="3 / 4" sizes="(min-width: 1024px) 30vw, 78vw" />
                <ProjectCaption ctx={ctx} project={project} />
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      {heading}
      <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <li key={project.id}>
            <SiteImage media={project.images[0]!} aspect="4 / 3" sizes="(min-width: 1024px) 33vw, 50vw" />
            <ProjectCaption ctx={ctx} project={project} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
