import type { HeroSection } from "@/engine/schema/types";
import { CtaButtons } from "../primitives/cta";
import { Icon } from "../primitives/icon";
import { SiteImage } from "../media/site-image";
import type { SectionProps } from "./types";

function Highlights({ items, className = "" }: { items?: string[]; className?: string }) {
  if (!items?.length) return null;
  return (
    <ul className={`flex flex-wrap gap-x-6 gap-y-2 text-[0.95rem] ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-center gap-2">
          <Icon name="check" className="size-5 text-accent" strokeWidth={2.25} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

type HeroProps = SectionProps<HeroSection> & {
  /** Thumbnail render (marketing Examples): no h1 and no ids, so the host page stays valid. */
  preview?: boolean;
};

export function Hero({ section, ctx, preview = false }: HeroProps) {
  switch (section.variant) {
    case "full-bleed":
      return <FullBleedHero section={section} ctx={ctx} preview={preview} />;
    case "stacked":
      return <StackedHero section={section} ctx={ctx} preview={preview} />;
    default:
      return <SplitHero section={section} ctx={ctx} preview={preview} />;
  }
}

function HeroHeading({ text, preview, className }: { text: string; preview: boolean; className: string }) {
  return preview ? (
    <p className={`display ${className}`}>{text}</p>
  ) : (
    <h1 id="hero-heading" className={className}>
      {text}
    </h1>
  );
}

/** Photo fills the band; copy sits on a scrim. Strong for roofing/exterior trades. */
function FullBleedHero({ section, ctx, preview }: Omit<HeroProps, "index"> & { preview: boolean }) {
  return (
    <section data-tone="inverse" className="relative isolate overflow-hidden" aria-labelledby={preview ? undefined : "hero-heading"}>
      <div className="absolute inset-0 -z-10">
        <SiteImage media={section.image} priority sizes="100vw" framed={false} />
        {/* Functional scrim for text contrast over any photo. */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(0_0_0/0.82)_0%,rgb(0_0_0/0.6)_45%,rgb(0_0_0/0.15)_100%)]" />
      </div>
      <div className="container-site flex min-h-[min(86svh,50rem)] flex-col justify-end gap-7 py-16 lg:py-24">
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <HeroHeading text={section.heading} preview={preview} className="text-h1 max-w-[16ch]" />
        <p className="text-lead max-w-xl text-muted">{section.subheading}</p>
        <CtaButtons ctx={ctx} size="lg" showReassurance />
        <Highlights items={section.highlights} className="border-t border-line pt-6" />
      </div>
    </section>
  );
}

/** Text column beside a framed photo with an optional overlapping detail shot. */
function SplitHero({ section, ctx, preview }: Omit<HeroProps, "index"> & { preview: boolean }) {
  return (
    <section data-tone={section.tone ?? "default"} aria-labelledby={preview ? undefined : "hero-heading"} className="overflow-hidden">
      <div className="container-site grid items-center gap-12 py-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:py-20">
        <div className="flex flex-col gap-7">
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          <HeroHeading text={section.heading} preview={preview} className="text-h1" />
          <p className="text-lead max-w-xl text-muted">{section.subheading}</p>
          <CtaButtons ctx={ctx} size="lg" showReassurance />
          <Highlights items={section.highlights} />
        </div>
        <div className="relative pb-8 lg:pb-12">
          <div className="media-frame-offset ml-auto w-[92%]">
            <SiteImage media={section.image} aspect="4 / 5" priority sizes="(min-width: 1024px) 45vw, 92vw" />
          </div>
          {section.secondaryImage ? (
            <div className="absolute bottom-0 left-0 w-[42%] shadow-[0_20px_50px_-20px_rgb(0_0_0/0.45)]">
              <SiteImage media={section.secondaryImage} aspect="1 / 1" sizes="(min-width: 1024px) 20vw, 40vw" />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/** Large centered headline, wide image below. Calm and premium. */
function StackedHero({ section, ctx, preview }: Omit<HeroProps, "index"> & { preview: boolean }) {
  return (
    <section data-tone={section.tone ?? "default"} aria-labelledby={preview ? undefined : "hero-heading"}>
      <div className="container-site flex flex-col items-center gap-7 pt-14 pb-12 text-center lg:pt-24 lg:pb-16">
        {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
        <HeroHeading text={section.heading} preview={preview} className="text-h1 max-w-[18ch]" />
        <p className="text-lead max-w-2xl text-muted">{section.subheading}</p>
        <CtaButtons ctx={ctx} size="lg" align="center" showReassurance />
      </div>
      <div className="container-site pb-[var(--section-y)]">
        <div className="relative">
          <SiteImage
            media={section.image}
            aspect="16 / 9"
            priority
            sizes="(min-width: 1280px) 1200px, 100vw"
            className="max-h-[70svh] w-full"
          />
          {section.secondaryImage ? (
            <div className="absolute -bottom-8 right-6 hidden w-[24%] border-[6px] border-[var(--c-bg)] md:block">
              <SiteImage media={section.secondaryImage} aspect="3 / 4" sizes="25vw" />
            </div>
          ) : null}
        </div>
        <Highlights items={section.highlights} className="mt-14 justify-center text-muted" />
      </div>
    </section>
  );
}
