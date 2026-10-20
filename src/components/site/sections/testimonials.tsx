import type { Testimonial, TestimonialsSection } from "@/engine/schema/types";
import type { SiteContext } from "@/engine/site-context";
import { SampleTag } from "../primitives/sample-tag";
import { Section, SectionHeading } from "../primitives/section";
import { headingId, type SectionProps } from "./types";

/*
 * Deliberately no star ratings: a rating needs a verifiable source, and a
 * contractor's own site is not one.
 */

export function pickTestimonials(ctx: SiteContext, ids?: string[]): Testimonial[] {
  if (!ids?.length) return ctx.site.testimonials;
  return ids.flatMap((id) => ctx.site.testimonials.find((t) => t.id === id) ?? []);
}

function Attribution({ t }: { t: Testimonial }) {
  return (
    <figcaption className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
      <span className="font-semibold">{t.author}</span>
      {t.context ? <span className="text-muted">{t.context}</span> : null}
      {t.isSample ? <SampleTag className="ml-1" /> : null}
    </figcaption>
  );
}

export function Testimonials({ section, ctx, index }: SectionProps<TestimonialsSection>) {
  const items = pickTestimonials(ctx, section.testimonialIds);
  const id = headingId(index);

  if (section.variant === "feature") {
    const [lead, ...rest] = items;
    if (!lead) return null;
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <figure className="mt-10 flex max-w-4xl flex-col gap-6">
          <blockquote>
            <p className="display text-h2 leading-[1.15]">
              <span aria-hidden="true">“</span>
              {lead.quote}
              <span aria-hidden="true">”</span>
            </p>
          </blockquote>
          <Attribution t={lead} />
        </figure>
        {rest.length ? (
          <div className="mt-14 grid gap-8 border-t border-line pt-10 md:grid-cols-2">
            {rest.slice(0, 2).map((t) => (
              <figure key={t.id} className="flex flex-col gap-4">
                <blockquote>
                  <p className="text-lead">“{t.quote}”</p>
                </blockquote>
                <Attribution t={t} />
              </figure>
            ))}
          </div>
        ) : null}
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
      <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {items.map((t) => (
          <li key={t.id}>
            <figure className="flex h-full flex-col justify-between gap-6 rounded-card border border-line bg-surface p-7">
              <blockquote>
                <p>“{t.quote}”</p>
              </blockquote>
              <Attribution t={t} />
            </figure>
          </li>
        ))}
      </ul>
    </Section>
  );
}
