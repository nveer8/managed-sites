import type { Metadata } from "next";
import Link from "next/link";
import { brand, formatPrice } from "@/brand/brand";
import { ExampleCard } from "@/components/marketing/example-card";
import { INCLUDED, ReviewCta } from "@/components/marketing/blocks";
import { tenantRepository } from "@/engine/tenancy/registry";

export const metadata: Metadata = {
  title: { absolute: `${brand.name} | ${brand.positioning}` },
  alternates: { canonical: "/" },
};

const PROMISE = ["We design it.", "We build it.", "We host it.", "We maintain it."];

export default async function HomePage() {
  const sites = await tenantRepository.listSites();

  return (
    <>
      <section data-tone="default" aria-labelledby="home-heading" className="pt-14 pb-16 lg:pt-24 lg:pb-24">
        <div className="container-site grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div className="flex flex-col gap-6">
            <p className="eyebrow">{brand.positioning}</p>
            <h1 id="home-heading" className="text-h1">
              {PROMISE.map((line, i) => (
                <span key={line} className={`block ${i === PROMISE.length - 1 ? "text-primary" : ""}`}>
                  {line}
                </span>
              ))}
            </h1>
          </div>
          <div className="flex flex-col gap-6 lg:pb-3">
            <p className="text-lead text-muted">
              A modern website for your home-service business, without you ever having to manage it. You run the jobs.
              We look after the site that brings them in.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-primary btn-lg">
                {brand.primaryCta}
              </Link>
              <Link href="/examples" className="btn btn-secondary btn-lg">
                See examples
              </Link>
            </div>
            <p className="text-sm text-muted">
              {formatPrice(brand.offer.setup)} setup, then {formatPrice(brand.offer.monthly)}/month. Hosting, updates and
              maintenance included.
            </p>
          </div>
        </div>
      </section>

      <section data-tone="alt" aria-labelledby="examples-heading" className="section-y">
        <div className="container-site flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div className="flex max-w-2xl flex-col gap-4">
              <p className="eyebrow">Example sites</p>
              <h2 id="examples-heading" className="text-h2">
                Built for your trade, not stamped from a template
              </h2>
            </div>
            <Link href="/examples" className="font-semibold text-primary underline-offset-4 hover:underline">
              About these examples <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {sites.map((site) => (
              <ExampleCard key={site.slug} site={site} />
            ))}
          </div>
          <p className="text-sm text-muted">These are concept sites for fictional businesses, made to show the range of designs we build.</p>
        </div>
      </section>

      <section data-tone="default" aria-labelledby="included-heading" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow">What’s included</p>
            <h2 id="included-heading" className="text-h2">
              Everything a contractor website needs. None of the work.
            </h2>
            <p className="text-muted">
              No logins to remember, no plugin updates, no calling a nephew when the site breaks.
            </p>
          </div>
          <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {INCLUDED.map((item) => (
              <li key={item.title} className="flex flex-col gap-2 border-t-2 border-ink pt-4">
                <h3 className="text-h3">{item.title}</h3>
                <p className="text-muted">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section data-tone="inverse" aria-labelledby="how-heading" className="section-y">
        <div className="container-site flex flex-col gap-12">
          <div className="flex max-w-2xl flex-col gap-4">
            <p className="eyebrow">How it works</p>
            <h2 id="how-heading" className="text-h2">
              You see it before you pay for it.
            </h2>
          </div>
          <ol className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Send us your site", "Or just your business name and trade if you don’t have one yet."],
              ["See our redesign", "We review your current site and show you what we’d build for you."],
              ["We build and launch", "We gather your photos and details, build the site, and move your domain over."],
              ["We look after it", "Hosting, updates, backups and small improvements every month."],
            ].map(([title, body], i) => (
              <li key={title} className="flex flex-col gap-3">
                <span className="display text-[2.75rem] leading-none text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-h3">{title}</h3>
                <p className="text-muted">{body}</p>
              </li>
            ))}
          </ol>
          <Link href="/how-it-works" className="btn btn-secondary self-start">
            The full process
          </Link>
        </div>
      </section>

      <section data-tone="default" aria-labelledby="honest-heading" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <p className="eyebrow">Straight talk</p>
            <h2 id="honest-heading" className="text-h2">
              What we won’t promise you
            </h2>
          </div>
          <div className="flex flex-col gap-6 text-lead">
            <p>
              <strong>We won’t promise first place on Google.</strong> Nobody can honestly guarantee rankings. We build
              fast, well-structured sites with accurate business information, which is the part a website can control.
            </p>
            <p>
              <strong>We won’t lock you into a page builder.</strong> There’s nothing for you to log into or maintain.
              If you want a change, you tell us.
            </p>
            <p>
              <strong>We won’t invent reviews or results.</strong> Your site shows your real work and what your real
              customers say.
            </p>
          </div>
        </div>
      </section>

      <ReviewCta />
    </>
  );
}
