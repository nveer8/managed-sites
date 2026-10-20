import type { Faq as FaqItem, FaqSection } from "@/engine/schema/types";
import type { SiteContext } from "@/engine/site-context";
import { Section, SectionHeading } from "../primitives/section";
import { headingId, type SectionProps } from "./types";

export function pickFaqs(ctx: SiteContext, ids?: string[]): FaqItem[] {
  if (!ids?.length) return ctx.site.faqs;
  return ids.flatMap((id) => ctx.site.faqs.find((f) => f.id === id) ?? []);
}

/** Native <details> accordion: accessible and works without JavaScript. */
export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  return (
    <div className="border-t border-line">
      {faqs.map((faq) => (
        <details key={faq.id} className="group border-b border-line">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-lg font-semibold [&::-webkit-details-marker]:hidden">
            {faq.question}
            <span
              aria-hidden="true"
              className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-xl leading-none transition-transform group-open:rotate-45"
            >
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-6 text-muted">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}

export function Faq({ section, ctx, index }: SectionProps<FaqSection>) {
  const faqs = pickFaqs(ctx, section.faqIds);
  const id = headingId(index);

  if (section.variant === "two-column") {
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <dl className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {faqs.map((faq) => (
            <div key={faq.id} className="flex flex-col gap-3">
              <dt className="text-h3">{faq.question}</dt>
              <dd className="text-muted">{faq.answer}</dd>
            </div>
          ))}
        </dl>
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <FaqList faqs={faqs} />
      </div>
    </Section>
  );
}
