import type { ServiceAreaSection } from "@/engine/schema/types";
import { Icon } from "../primitives/icon";
import { PhoneLink } from "../primitives/cta";
import { Section, SectionHeading } from "../primitives/section";
import { headingId, type SectionProps } from "./types";

/**
 * Coverage information on one page, for people. This is deliberately not a
 * generator of per-city landing pages.
 */
export function ServiceAreas({ section, ctx, index }: SectionProps<ServiceAreaSection>) {
  const areas = ctx.site.serviceAreas;
  const id = headingId(index);
  const note = (
    <p className="text-muted">
      Not sure if you’re in range? <PhoneLink ctx={ctx} showIcon={false} className="font-semibold text-ink underline underline-offset-4" label="Give us a call" />{" "}
      and we’ll tell you straight away.
    </p>
  );

  if (section.variant === "inline") {
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined} innerClassName="flex flex-col items-center gap-6 text-center">
        <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} align="center" />
        <ul className="flex max-w-3xl flex-wrap justify-center gap-x-2 gap-y-2 text-lg">
          {areas.flatMap((area) => [area.name, ...(area.includes ?? [])]).map((name, i, all) => (
            <li key={name} className="flex items-center gap-2">
              {name}
              {i < all.length - 1 ? <span aria-hidden="true" className="text-muted">·</span> : null}
            </li>
          ))}
        </ul>
        {note}
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
        <div className="flex flex-col gap-5">
          <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
          {note}
        </div>
        <ul className="grid gap-8 sm:grid-cols-2">
          {areas.map((area) => (
            <li key={area.name} className="flex flex-col gap-3 border-t border-line pt-5">
              <h3 className="flex items-center gap-2 text-h3">
                <Icon name="map-pin" className="size-5 text-primary" />
                {area.name}
              </h3>
              {area.includes?.length ? <p className="text-muted">{area.includes.join(", ")}</p> : null}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
