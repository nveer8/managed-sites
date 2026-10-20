import Link from "next/link";
import type { Service, ServicesSection } from "@/engine/schema/types";
import { siteHref, type SiteContext } from "@/engine/site-context";
import { Icon } from "../primitives/icon";
import { Section, SectionHeading } from "../primitives/section";
import { SiteImage } from "../media/site-image";
import { headingId, type SectionProps } from "./types";

export function pickServices(ctx: SiteContext, slugs?: string[]): Service[] {
  if (!slugs?.length) return ctx.site.services;
  return slugs.flatMap((slug) => ctx.site.services.find((s) => s.slug === slug) ?? []);
}

export function Services({ section, ctx, index }: SectionProps<ServicesSection>) {
  const services = pickServices(ctx, section.serviceSlugs);
  const id = headingId(index);

  if (section.variant === "list") {
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
          </div>
          <ol className="border-t border-line">
            {services.map((service, i) => (
              <li key={service.slug} className="border-b border-line">
                <Link
                  href={siteHref(ctx, `/services/${service.slug}`)}
                  className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 no-underline sm:grid-cols-[4rem_1fr_auto]"
                >
                  <span className="text-sm font-semibold tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex flex-col gap-2">
                    <span className="display text-h3 group-hover:text-primary">{service.name}</span>
                    <span className="text-muted">{service.summary}</span>
                  </span>
                  <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </Section>
    );
  }

  if (section.variant === "tiles") {
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={siteHref(ctx, `/services/${service.slug}`)}
                className="group flex h-full flex-col gap-4 rounded-card border border-line bg-surface p-7 no-underline transition-colors hover:border-primary"
              >
                <span className="grid size-12 place-items-center rounded-control bg-primary text-on-primary">
                  <Icon name={service.icon ?? "home"} className="size-6" />
                </span>
                <span className="display text-h3">{service.name}</span>
                <span className="text-muted">{service.summary}</span>
                <span className="mt-auto pt-2 text-sm font-semibold text-primary">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
      <ul className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={service.slug}>
            <Link href={siteHref(ctx, `/services/${service.slug}`)} className="group flex flex-col gap-4 no-underline">
              <SiteImage media={service.image} aspect="4 / 3" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
              <span className="display text-h3 group-hover:text-primary">{service.name}</span>
              <span className="text-muted">{service.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
