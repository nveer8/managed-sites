import type { Metadata } from "next";
import Link from "next/link";
import { brand, formatPrice } from "@/brand/brand";
import { INCLUDED, PageHeader, ReviewCta } from "@/components/marketing/blocks";

export const metadata: Metadata = {
  title: "Pricing",
  description: `One plan: ${formatPrice(brand.offer.setup)} setup and ${formatPrice(brand.offer.monthly)}/month for a fully managed website.`,
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        heading="One plan. Everything handled."
        intro="A custom website and someone to look after it, for a predictable monthly cost."
      />
      <section data-tone="default" aria-labelledby="plan-heading" className="pb-[var(--section-y)]">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div data-tone="inverse" className="flex flex-col gap-8 rounded-card p-8 md:p-10">
            <h2 id="plan-heading" className="text-h3">
              Managed website
            </h2>
            <div className="flex flex-col gap-1">
              <p className="display text-h1 leading-none">{formatPrice(brand.offer.monthly)}</p>
              <p className="text-muted">per month</p>
            </div>
            <p className="border-t border-line pt-6">
              <span className="display text-h3">{formatPrice(brand.offer.setup)}</span>{" "}
              <span className="text-muted">one-time setup for design, content and launch</span>
            </p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Start with a free review
            </Link>
            <p className="text-sm text-muted">You see a redesign concept before you pay anything.</p>
          </div>
          <div className="flex flex-col gap-6">
            <h2 className="text-h3">Included</h2>
            <ul className="flex flex-col">
              {INCLUDED.map((item) => (
                <li key={item.title} className="grid gap-1 border-t border-line py-4 sm:grid-cols-[14rem_1fr] sm:gap-6">
                  <span className="font-semibold">{item.title}</span>
                  <span className="text-muted">{item.body}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section data-tone="alt" aria-labelledby="reasonable-heading" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <h2 id="reasonable-heading" className="text-h2">
            What “reasonable updates” means
          </h2>
          <div className="flex flex-col gap-5 text-lead text-muted">
            <p>
              New project photos, a new service, changed hours, a seasonal offer, a new team member, a reworded page:
              send it over and it’s done, as part of your monthly plan.
            </p>
            <p>
              Bigger projects, like a second location, a new section of the site or a full redesign, are quoted
              separately before any work starts. No surprise invoices.
            </p>
          </div>
        </div>
      </section>
      <ReviewCta />
    </>
  );
}
