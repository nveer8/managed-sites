import type { ProcessSection } from "@/engine/schema/types";
import { Section, SectionHeading } from "../primitives/section";
import { headingId, type SectionProps } from "./types";

export function Process({ section, ctx, index }: SectionProps<ProcessSection>) {
  const steps = ctx.site.process;
  const id = headingId(index);

  if (section.variant === "timeline") {
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
          </div>
          <ol className="relative flex flex-col gap-10 border-l-2 border-line pl-8">
            {steps.map((step, i) => (
              <li key={step.title} className="relative">
                <span
                  aria-hidden="true"
                  className="absolute top-0.5 -left-[2.65rem] grid size-8 place-items-center rounded-full bg-primary text-sm font-bold text-on-primary"
                >
                  {i + 1}
                </span>
                <h3 className="text-h3">{step.title}</h3>
                <p className="mt-2 max-w-xl text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-3 border-t-2 border-primary pt-5">
            <span className="display text-[2.5rem] leading-none text-primary" aria-hidden="true">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-h3">{step.title}</h3>
            <p className="text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
