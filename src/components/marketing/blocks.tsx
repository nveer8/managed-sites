import Link from "next/link";
import { brand, formatPrice } from "@/brand/brand";

/** Closing call to action used at the bottom of most marketing pages. */
export function ReviewCta({ heading = "See what we’d do with your website." }: { heading?: string }) {
  return (
    <section data-tone="accent" aria-labelledby="review-cta" className="section-y">
      <div className="container-site grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-end">
        <div className="flex flex-col gap-4">
          <h2 id="review-cta" className="text-h2 max-w-3xl">
            {heading}
          </h2>
          <p className="text-lead max-w-2xl text-muted">
            Send us your current site, or just your business details. We’ll put together a personalized review and a
            redesign concept for your business. Free, and there’s no sales call required to see it.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:items-end">
          <Link href="/contact" className="btn btn-primary btn-lg">
            {brand.primaryCta}
          </Link>
          <p className="text-sm text-muted">
            {formatPrice(brand.offer.setup)} setup · {formatPrice(brand.offer.monthly)}/month if you go ahead
          </p>
        </div>
      </div>
    </section>
  );
}

export function PageHeader({ eyebrow, heading, intro }: { eyebrow: string; heading: string; intro: string }) {
  return (
    <section data-tone="default" aria-labelledby="page-heading" className="pt-16 pb-10 lg:pt-24 lg:pb-14">
      <div className="container-site flex flex-col gap-5">
        <p className="eyebrow">{eyebrow}</p>
        <h1 id="page-heading" className="text-h1 max-w-5xl">
          {heading}
        </h1>
        <p className="text-lead max-w-2xl text-muted">{intro}</p>
      </div>
    </section>
  );
}

export const INCLUDED = [
  { title: "Custom design", body: "A site designed around your trade, your work and your area. Not a template with your logo dropped in." },
  { title: "Hosting & SSL", body: "Fast, secure hosting with HTTPS. No servers, plugins or renewals for you to think about." },
  { title: "Maintenance & backups", body: "Updates, monitoring and backups handled for you, every month." },
  { title: "Content & photo updates", body: "Send us new project photos, services or hours and we’ll update the site." },
  { title: "Analytics & call tracking", body: "Analytics and conversion tracking set up from day one, so we can see which pages bring in calls and quote requests." },
  { title: "Local search foundations", body: "Clean structure, accurate business details and page speed that give search engines what they need." },
  { title: "Ongoing improvements", body: "Small improvements over time based on what’s actually bringing in work." },
] as const;
