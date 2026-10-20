import Link from "next/link";
import type { SpotlightSection } from "@/engine/schema/types";
import { siteHref } from "@/engine/site-context";
import { Icon } from "../primitives/icon";
import { Section, SectionHeading } from "../primitives/section";
import { SiteImage } from "../media/site-image";
import { pickServices } from "./services";
import { headingId, type SectionProps } from "./types";

export function Spotlight({ section, ctx, index }: SectionProps<SpotlightSection>) {
  const services = pickServices(ctx, section.serviceSlugs);
  const id = headingId(index);

  if (section.variant === "feature") {
    const service = services[0];
    if (!service) return null;
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        <div className="relative">
          <SiteImage media={service.image} aspect="16 / 8" sizes="100vw" className="hidden md:block" />
          <SiteImage media={service.image} aspect="4 / 3" sizes="100vw" className="md:hidden" />
          <div className="relative -mt-16 ml-4 mr-4 flex max-w-xl flex-col gap-5 rounded-card bg-surface p-7 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.35)] md:absolute md:bottom-10 md:left-10 md:m-0 md:p-10">
            {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
            <h2 id={id} className="text-h2">
              {section.heading ?? service.name}
            </h2>
            <p className="text-muted">{service.description[0]}</p>
            <Link href={siteHref(ctx, `/services/${service.slug}`)} className="btn btn-primary self-start">
              Explore {service.name.toLowerCase()}
            </Link>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
      <div className={`flex flex-col gap-16 lg:gap-24 ${section.heading ? "mt-14" : ""}`}>
        {services.map((service, i) => (
          <article key={service.slug} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
            <div className={i % 2 === 1 ? "lg:order-2" : ""}>
              <SiteImage media={service.image} aspect="5 / 4" sizes="(min-width: 1024px) 50vw, 100vw" />
            </div>
            <div className="flex flex-col gap-5">
              <h3 className="text-h2">{service.name}</h3>
              <p className="text-lead text-muted">{service.description[0]}</p>
              <ul className="grid gap-2.5 sm:grid-cols-2">
                {service.includes.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Icon name="check" className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={2.25} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href={siteHref(ctx, `/services/${service.slug}`)}
                className="self-start font-semibold text-primary underline-offset-4 hover:underline"
              >
                More about {service.name.toLowerCase()} <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
