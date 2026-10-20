import type { BeforeAfterSection } from "@/engine/schema/types";
import { SampleTag } from "../primitives/sample-tag";
import { Section, SectionHeading } from "../primitives/section";
import { ComparisonSlider } from "../media/comparison-slider";
import { SiteImage } from "../media/site-image";
import { headingId, type SectionProps } from "./types";

export function BeforeAfter({ section, ctx, index }: SectionProps<BeforeAfterSection>) {
  const project = ctx.site.projects.find((p) => p.id === section.projectId);
  if (!project?.beforeAfter) return null;
  const { before, after } = project.beforeAfter;
  const id = headingId(index);

  const details = (
    <div className="flex flex-col gap-5">
      <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading ?? project.title} intro={section.intro} />
      <p className="text-muted">{project.summary}</p>
      {project.facts?.length ? (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line">
          {project.facts.map((fact) => (
            <div key={fact.label} className="flex flex-col gap-1 bg-bg p-4">
              <dt className="text-sm text-muted">{fact.label}</dt>
              <dd className="font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <p className="flex items-center gap-2 text-sm text-muted">
        {project.location}
        {project.isSample ? <SampleTag /> : null}
      </p>
    </div>
  );

  if (section.variant === "side-by-side") {
    return (
      <Section tone={section.tone} labelledBy={id}>
        {details}
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            { label: "Before", media: before },
            { label: "After", media: after },
          ].map(({ label, media }) => (
            <figure key={label} className="flex flex-col gap-3">
              <SiteImage media={media} aspect="4 / 3" sizes="(min-width: 640px) 50vw, 100vw" />
              <figcaption className="text-sm font-semibold uppercase tracking-[0.12em] text-muted">{label}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={id}>
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.5fr] lg:gap-16">
        {details}
        <ComparisonSlider
          label={project.title}
          before={<SiteImage media={before} framed={false} sizes="(min-width: 1024px) 60vw, 100vw" />}
          after={<SiteImage media={after} framed={false} sizes="(min-width: 1024px) 60vw, 100vw" />}
        />
      </div>
    </Section>
  );
}
