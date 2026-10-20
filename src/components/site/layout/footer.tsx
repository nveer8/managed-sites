import Link from "next/link";
import { siteHref, type SiteContext } from "@/engine/site-context";
import { Icon } from "../primitives/icon";
import { Logo } from "../primitives/logo";
import { CtaButtons, PhoneLink } from "../primitives/cta";
import { formatHoursLine } from "./hours";
import { navItems } from "./nav";

export function SiteFooter({ ctx }: { ctx: SiteContext }) {
  return ctx.site.layout.footer === "statement" ? <StatementFooter ctx={ctx} /> : <ColumnsFooter ctx={ctx} />;
}

function AddressLines({ ctx }: { ctx: SiteContext }) {
  const { address, showStreetAddress } = ctx.site.business;
  return (
    <p className="text-muted">
      {showStreetAddress && address.street ? (
        <>
          {address.street}
          <br />
        </>
      ) : null}
      {address.city}, {address.region}
      {showStreetAddress && address.postalCode ? ` ${address.postalCode}` : ""}
    </p>
  );
}

function FooterMeta({ ctx }: { ctx: SiteContext }) {
  const { business, status } = ctx.site;
  const year = new Date().getFullYear();
  return (
    <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
      <p>
        © {year} {business.legalName ?? business.name}
        {business.licenseNumbers?.length ? ` · ${business.licenseNumbers.join(" · ")}` : ""}
      </p>
      {status === "demo" ? (
        <p>Concept site for demonstration. This business, its people, projects and reviews are fictional.</p>
      ) : null}
    </div>
  );
}

function SocialLinks({ ctx }: { ctx: SiteContext }) {
  const { social } = ctx.site.business;
  if (social.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-x-5 gap-y-2">
      {social.map((s) => (
        <li key={s.url}>
          <a href={s.url} className="capitalize text-muted hover:text-ink" rel="noopener">
            {s.network}
          </a>
        </li>
      ))}
    </ul>
  );
}

function ColumnsFooter({ ctx }: { ctx: SiteContext }) {
  const { business, services, serviceAreas } = ctx.site;
  return (
    <footer data-tone="inverse" className="pt-16 pb-28 lg:pb-10">
      <div className="container-site">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <Logo logo={business.logo} href={siteHref(ctx, "/")} />
            <p className="max-w-xs text-muted">{business.tagline}</p>
            <PhoneLink ctx={ctx} className="inline-flex items-center gap-2 text-xl font-semibold no-underline" />
            <a href={`mailto:${business.email}`} className="text-muted">
              {business.email}
            </a>
          </div>
          <FooterColumn title="Services">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={siteHref(ctx, `/services/${s.slug}`)} className="text-muted no-underline hover:text-ink">
                  {s.name}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <FooterColumn title="Company">
            {navItems(ctx).map((item) => (
              <li key={item.key}>
                <Link href={item.href} className="text-muted no-underline hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </FooterColumn>
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ fontFamily: "var(--f-body)" }}>
              Hours & area
            </h2>
            <ul className="flex flex-col gap-1 text-muted">
              {business.hours.map((h) => (
                <li key={h.days.join("")}>{formatHoursLine(h)}</li>
              ))}
            </ul>
            <AddressLines ctx={ctx} />
            <p className="text-muted">Serving {serviceAreas.map((a) => a.name).join(", ")}</p>
            <SocialLinks ctx={ctx} />
          </div>
        </div>
        <FooterMeta ctx={ctx} />
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ fontFamily: "var(--f-body)" }}>
        {title}
      </h2>
      <ul className="flex flex-col gap-2">{children}</ul>
    </div>
  );
}

/** Big closing statement + CTA, then compact details. */
function StatementFooter({ ctx }: { ctx: SiteContext }) {
  const { business, serviceAreas } = ctx.site;
  return (
    <footer data-tone="inverse" className="pt-20 pb-28 lg:pb-12">
      <div className="container-site">
        <div className="grid gap-10 border-b border-line pb-14 lg:grid-cols-[1.5fr_1fr] lg:items-end">
          <p className="display text-h2 max-w-3xl">{business.tagline}</p>
          <CtaButtons ctx={ctx} size="lg" className="lg:items-end" />
        </div>
        <div className="grid gap-8 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-3">
            <Logo logo={business.logo} href={siteHref(ctx, "/")} />
          </div>
          <div className="flex flex-col gap-2 text-muted">
            <PhoneLink ctx={ctx} className="inline-flex items-center gap-2 font-semibold text-ink no-underline" />
            <a href={`mailto:${business.email}`}>{business.email}</a>
            <AddressLines ctx={ctx} />
          </div>
          <div className="flex flex-col gap-2 text-muted">
            {business.hours.map((h) => (
              <p key={h.days.join("")} className="flex items-center gap-2">
                <Icon name="clock" className="size-4" /> {formatHoursLine(h)}
              </p>
            ))}
            <p>Serving {serviceAreas.map((a) => a.name).join(", ")}</p>
          </div>
          <nav aria-label="Footer" className="flex flex-col gap-2">
            {navItems(ctx).map((item) => (
              <Link key={item.key} href={item.href} className="text-muted no-underline hover:text-ink">
                {item.label}
              </Link>
            ))}
            <SocialLinks ctx={ctx} />
          </nav>
        </div>
        <FooterMeta ctx={ctx} />
      </div>
    </footer>
  );
}
