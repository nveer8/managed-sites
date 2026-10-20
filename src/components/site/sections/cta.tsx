import type { CtaSection } from "@/engine/schema/types";
import { CtaButtons, PhoneLink } from "../primitives/cta";
import { Icon } from "../primitives/icon";
import { Section } from "../primitives/section";
import { formatHoursShort } from "../layout/hours";
import { headingId, type SectionProps } from "./types";

export function Cta({ section, ctx, index }: SectionProps<CtaSection>) {
  const id = headingId(index);

  if (section.variant === "panel") {
    return (
      <Section tone={section.tone ?? "default"} labelledBy={id}>
        <div data-tone="alt" className="flex flex-col items-center gap-6 rounded-card px-6 py-14 text-center md:px-16">
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          <h2 id={id} className="text-h2 max-w-3xl">
            {section.heading}
          </h2>
          {section.body ? <p className="text-lead max-w-2xl text-muted">{section.body}</p> : null}
          <CtaButtons ctx={ctx} size="lg" align="center" showReassurance />
        </div>
      </Section>
    );
  }

  if (section.variant === "split") {
    const { business } = ctx.site;
    return (
      <Section tone={section.tone ?? "inverse"} labelledBy={id}>
        <div className="grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-6">
            <h2 id={id} className="text-h2 max-w-2xl">
              {section.heading}
            </h2>
            {section.body ? <p className="text-lead max-w-xl text-muted">{section.body}</p> : null}
            <CtaButtons ctx={ctx} size="lg" showReassurance />
          </div>
          <div className="flex flex-col gap-4 rounded-card border border-line p-7">
            <p className="text-sm uppercase tracking-[0.14em] text-muted">Talk to a person</p>
            <PhoneLink ctx={ctx} className="display inline-flex items-center gap-3 text-h2 no-underline" />
            <p className="flex items-center gap-2 text-muted">
              <Icon name="clock" className="size-5" />
              {business.hoursNote ?? formatHoursShort(business.hours)}
            </p>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <section data-tone={section.tone ?? "accent"} aria-labelledby={id} className="py-[calc(var(--section-y)*0.7)]">
      <div className="container-site flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex max-w-2xl flex-col gap-3">
          <h2 id={id} className="text-h2">
            {section.heading}
          </h2>
          {section.body ? <p className="text-lead text-muted">{section.body}</p> : null}
        </div>
        <CtaButtons ctx={ctx} size="lg" className="shrink-0" />
      </div>
    </section>
  );
}
