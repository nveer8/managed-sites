import Link from "next/link";
import { siteHref, type SiteContext } from "@/engine/site-context";
import { Icon } from "../primitives/icon";
import { Logo } from "../primitives/logo";
import { PhoneLink, quoteHref } from "../primitives/cta";
import { MobileNav } from "./mobile-nav";
import { navItems } from "./nav";
import { formatHoursShort } from "./hours";

export function SiteHeader({ ctx }: { ctx: SiteContext }) {
  switch (ctx.site.layout.header) {
    case "utility":
      return <UtilityHeader ctx={ctx} />;
    case "centered":
      return <CenteredHeader ctx={ctx} />;
    default:
      return <BarHeader ctx={ctx} />;
  }
}

function DesktopNav({ ctx, className = "" }: { ctx: SiteContext; className?: string }) {
  return (
    <nav aria-label="Main" className={`hidden lg:block ${className}`}>
      <ul className="flex items-center gap-8">
        {navItems(ctx).map((item) => (
          <li key={item.key}>
            <Link href={item.href} className="text-[0.95rem] font-semibold no-underline hover:text-primary">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function Mobile({ ctx }: { ctx: SiteContext }) {
  return (
    <MobileNav
      items={navItems(ctx)}
      ctaLabel={ctx.site.cta.primaryLabel}
      ctaHref={quoteHref(ctx)}
      phone={ctx.site.business.phone}
    />
  );
}

/** Logo, nav and phone on one row. Practical and compact. */
function BarHeader({ ctx }: { ctx: SiteContext }) {
  return (
    <header data-tone="default" className="sticky top-0 z-30 border-b border-line">
      <div className="container-site relative flex min-h-[4.5rem] items-center justify-between gap-6">
        <Logo logo={ctx.site.business.logo} href={siteHref(ctx, "/")} />
        <DesktopNav ctx={ctx} />
        <div className="flex items-center gap-3">
          <PhoneLink ctx={ctx} className="hidden items-center gap-2 font-semibold no-underline sm:inline-flex" />
          <Link href={quoteHref(ctx)} className="btn btn-primary hidden lg:inline-flex" data-track="quote_click">
            {ctx.site.cta.primaryLabel}
          </Link>
          <Mobile ctx={ctx} />
        </div>
      </div>
    </header>
  );
}

/** Thin inverse bar with hours and service area over the main nav row. */
function UtilityHeader({ ctx }: { ctx: SiteContext }) {
  const { business, serviceAreas } = ctx.site;
  return (
    <header className="sticky top-0 z-30">
      <div data-tone="inverse" className="text-[0.82rem]">
        <div className="container-site flex min-h-10 items-center justify-between gap-4">
          <p className="flex items-center gap-2 text-muted">
            <Icon name="clock" className="size-4" />
            <span>{business.hoursNote ?? formatHoursShort(business.hours)}</span>
          </p>
          <p className="hidden items-center gap-2 text-muted md:flex">
            <Icon name="map-pin" className="size-4" />
            <span>Serving {serviceAreas.map((a) => a.name).join(" · ")}</span>
          </p>
        </div>
      </div>
      <div data-tone="default" className="border-b border-line">
        <div className="container-site relative flex min-h-[4.75rem] items-center justify-between gap-6">
          <Logo logo={business.logo} href={siteHref(ctx, "/")} />
          <DesktopNav ctx={ctx} />
          <div className="flex items-center gap-3">
            <PhoneLink
              ctx={ctx}
              className="btn btn-primary hidden sm:inline-flex"
              label={business.phone.display}
            />
            <Mobile ctx={ctx} />
          </div>
        </div>
      </div>
    </header>
  );
}

/** Centered wordmark over a centered nav. Editorial, unhurried. */
function CenteredHeader({ ctx }: { ctx: SiteContext }) {
  return (
    <header data-tone="default" className="relative z-30 border-b border-line">
      <div className="container-site relative flex min-h-[4.5rem] items-center justify-between gap-4 lg:grid lg:grid-cols-[1fr_auto_1fr] lg:pt-6 lg:pb-2">
        <p className="hidden text-sm text-muted lg:block">{ctx.site.business.tagline}</p>
        <Logo logo={ctx.site.business.logo} href={siteHref(ctx, "/")} size="lg" align="center" />
        <div className="flex items-center justify-end gap-3">
          <PhoneLink ctx={ctx} className="hidden items-center gap-2 text-sm font-semibold no-underline sm:inline-flex" />
          <Mobile ctx={ctx} />
        </div>
      </div>
      <div className="container-site hidden justify-center pb-5 pt-3 lg:flex">
        <DesktopNav ctx={ctx} />
      </div>
    </header>
  );
}
