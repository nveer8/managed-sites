import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CtaButtons } from "@/components/site/primitives/cta";
import { Icon } from "@/components/site/primitives/icon";
import { JsonLd } from "@/components/site/primitives/json-ld";
import { Section, SectionHeading } from "@/components/site/primitives/section";
import { PageIntro } from "@/components/site/page-intro";
import { SiteImage } from "@/components/site/media/site-image";
import { Cta } from "@/components/site/sections/cta";
import { FaqList, pickFaqs } from "@/components/site/sections/faq";
import { Projects } from "@/components/site/sections/projects";
import { Testimonials } from "@/components/site/sections/testimonials";
import { buildBreadcrumbJsonLd, buildServiceJsonLd } from "@/engine/seo/json-ld";
import { buildPageMetadata } from "@/engine/seo/metadata";
import { tenantRepository } from "@/engine/tenancy/registry";
import { encodeSiteSegment } from "@/engine/tenancy/site-segment";
import { loadSiteContext } from "../../context";

export const dynamicParams = false;

export async function generateStaticParams() {
  const sites = await tenantRepository.listSites();
  return sites.flatMap((site) =>
    (["preview", "domain"] as const).flatMap((mode) =>
      site.services.map((service) => ({ site: encodeSiteSegment({ slug: site.slug, mode }), service: service.slug })),
    ),
  );
}

async function load(params: PageProps<"/sites/[site]/services/[service]">["params"]) {
  const { site, service: slug } = await params;
  const ctx = await loadSiteContext(site);
  const service = ctx.site.services.find((s) => s.slug === slug);
  if (!service) notFound();
  return { ctx, service };
}

export async function generateMetadata({ params }: PageProps<"/sites/[site]/services/[service]">): Promise<Metadata> {
  const { ctx, service } = await load(params);
  return buildPageMetadata(ctx, {
    path: `/services/${service.slug}`,
    title: service.seo?.title ?? service.name,
    description: service.seo?.description ?? service.summary,
    image: service.image,
  });
}

export default async function ServicePage({ params }: PageProps<"/sites/[site]/services/[service]">) {
  const { ctx, service } = await load(params);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: service.name, path: `/services/${service.slug}` },
  ];
  const projectIds = ctx.site.projects.filter((p) => p.serviceSlug === service.slug).map((p) => p.id);
  const testimonialIds = ctx.site.testimonials.filter((t) => t.serviceSlug === service.slug).map((t) => t.id);
  const faqs = pickFaqs(ctx, service.faqIds);

  return (
    <>
      <PageIntro ctx={ctx} heading={service.name} intro={service.summary} crumbs={crumbs}>
        <CtaButtons ctx={ctx} className="pt-2" showReassurance />
      </PageIntro>

      <Section labelledBy="service-detail">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SiteImage media={service.image} aspect="16 / 10" priority sizes="(min-width: 1024px) 60vw, 100vw" />
            <div className="prose-site max-w-2xl text-lead">
              <h2 id="service-detail" className="sr-only">
                About {service.name.toLowerCase()}
              </h2>
              {service.description.map((p) => (
                <p key={p.slice(0, 40)}>{p}</p>
              ))}
            </div>
          </div>
          <aside className="flex flex-col gap-5 self-start rounded-card border border-line bg-surface p-7 lg:sticky lg:top-32">
            <h2 className="text-h3">What’s included</h2>
            <ul className="flex flex-col gap-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3">
                  <Icon name="check" className="mt-0.5 size-5 shrink-0 text-primary" strokeWidth={2.25} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <CtaButtons ctx={ctx} className="border-t border-line pt-5" />
          </aside>
        </div>
      </Section>

      {projectIds.length ? (
        <Projects
          section={{ type: "projects", variant: "grid", tone: "alt", heading: `Recent ${service.name.toLowerCase()} projects`, projectIds }}
          ctx={ctx}
          index={2}
        />
      ) : null}

      {testimonialIds.length ? (
        <Testimonials section={{ type: "testimonials", variant: "cards", heading: "What clients say", testimonialIds }} ctx={ctx} index={3} />
      ) : null}

      {faqs.length ? (
        <Section labelledBy="service-faq">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr]">
            <SectionHeading id="service-faq" heading={`${service.name} questions`} />
            <FaqList faqs={faqs} />
          </div>
        </Section>
      ) : null}

      <Cta section={{ type: "cta", variant: "band", heading: ctx.site.leadForm.heading, body: ctx.site.cta.reassurance }} ctx={ctx} index={5} />

      <JsonLd data={[buildServiceJsonLd(ctx, service), buildBreadcrumbJsonLd(ctx, crumbs)]} />
    </>
  );
}
