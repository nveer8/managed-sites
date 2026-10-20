import Link from "next/link";
import type { AboutSection } from "@/engine/schema/types";
import { siteHref } from "@/engine/site-context";
import { Section, SectionHeading } from "../primitives/section";
import { SiteImage } from "../media/site-image";
import { headingId, type SectionProps } from "./types";

export function About({ section, ctx, index }: SectionProps<AboutSection>) {
  const { business, team, pages } = ctx.site;
  const id = headingId(index);
  const story = pages.about?.story.slice(0, 2) ?? [business.description];
  const image = pages.about?.image;

  if (section.variant === "team") {
    return (
      <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="flex flex-col gap-5">
            <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
            {story.map((p) => (
              <p key={p.slice(0, 32)} className="text-muted">
                {p}
              </p>
            ))}
            {pages.about ? (
              <Link href={siteHref(ctx, "/about")} className="self-start font-semibold text-primary underline-offset-4 hover:underline">
                About {business.name} <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
          <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {team.map((member) => (
              <li key={member.name} className="flex flex-col gap-3">
                <SiteImage
                  media={member.photo ?? { alt: `Portrait of ${member.name}`, placeholder: "portrait" }}
                  aspect="4 / 5"
                  sizes="(min-width: 1024px) 18vw, 45vw"
                />
                <div>
                  <p className="font-semibold">{member.name}</p>
                  <p className="text-sm text-muted">{member.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={section.heading ? id : undefined}>
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {image ? (
          <div className="media-frame-offset">
            <SiteImage media={image} aspect="4 / 5" sizes="(min-width: 1024px) 45vw, 100vw" />
          </div>
        ) : null}
        <div className="flex flex-col gap-5">
          <SectionHeading id={id} eyebrow={section.eyebrow} heading={section.heading} intro={section.intro} />
          {story.map((p) => (
            <p key={p.slice(0, 32)} className="text-lead text-muted">
              {p}
            </p>
          ))}
          {business.foundedYear || business.licenseNumbers?.length ? (
            <dl className="mt-2 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
              {business.foundedYear ? (
                <div>
                  <dt className="text-sm text-muted">Established</dt>
                  <dd className="display text-h3">{business.foundedYear}</dd>
                </div>
              ) : null}
              {business.licenseNumbers?.map((license) => (
                <div key={license}>
                  <dt className="text-sm text-muted">License</dt>
                  <dd className="display text-h3">{license}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
