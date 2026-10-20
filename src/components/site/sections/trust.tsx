import type { IconName, TrustItem, TrustSection } from "@/engine/schema/types";
import { Icon } from "../primitives/icon";
import { Section, SectionHeading } from "../primitives/section";
import { headingId, type SectionProps } from "./types";

const KIND_ICON: Record<TrustItem["kind"], IconName> = {
  license: "shield",
  insurance: "shield",
  certification: "check",
  warranty: "calendar",
  membership: "home",
  stat: "ruler",
};

export function Trust({ section, ctx, index }: SectionProps<TrustSection>) {
  const items = ctx.site.trust;
  const id = headingId(index);

  if (section.variant === "inline") {
    return (
      <section data-tone={section.tone ?? "alt"} aria-label={section.heading ?? "Credentials"} className="py-6">
        <ul className="container-site flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-between">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5 text-[0.95rem] font-semibold">
              <Icon name={KIND_ICON[item.kind]} className="size-5 text-primary" />
              <span>{item.value ? `${item.value} ${item.label}` : item.label}</span>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (section.variant === "stats") {
    const stats = items.filter((i) => i.kind === "stat");
    const rest = items.filter((i) => i.kind !== "stat");
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <dl className="mt-12 grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <div key={item.label} className="flex flex-col gap-2 bg-bg p-7">
              <dt className="order-2 text-muted">{item.label}</dt>
              <dd className="display order-1 text-h2 leading-none">{item.value}</dd>
            </div>
          ))}
        </dl>
        {rest.length ? (
          <ul className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-[0.95rem]">
            {rest.map((item) => (
              <li key={item.label} className="flex items-center gap-2">
                <Icon name={KIND_ICON[item.kind]} className="size-5 text-primary" />
                {item.label}
              </li>
            ))}
          </ul>
        ) : null}
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <li key={item.label} className="flex flex-col gap-3 rounded-card border border-line bg-surface p-6">
            <Icon name={KIND_ICON[item.kind]} className="size-7 text-primary" />
            <p className="font-semibold leading-snug">{item.value ? `${item.value} ${item.label}` : item.label}</p>
            {item.detail ? <p className="text-sm text-muted">{item.detail}</p> : null}
          </li>
        ))}
      </ul>
    </Section>
  );
}
