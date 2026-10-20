import type { DayOfWeek, Service } from "@/engine/schema/types";
import { absoluteUrl, type SiteContext } from "@/engine/site-context";

/**
 * schema.org builders. Every value comes from tenant config: nothing is
 * inferred, padded, or invented. In particular there is no aggregateRating or
 * review markup, because testimonials on a contractor site are not a
 * verifiable review source.
 */

type JsonLd = Record<string, unknown>;

const DAY_URL: Record<DayOfWeek, string> = {
  Mo: "https://schema.org/Monday",
  Tu: "https://schema.org/Tuesday",
  We: "https://schema.org/Wednesday",
  Th: "https://schema.org/Thursday",
  Fr: "https://schema.org/Friday",
  Sa: "https://schema.org/Saturday",
  Su: "https://schema.org/Sunday",
};

export function businessId(ctx: SiteContext): string {
  return `${ctx.origin}/#business`;
}

export function buildLocalBusinessJsonLd(ctx: SiteContext): JsonLd {
  const { business, serviceAreas, services } = ctx.site;
  const address = business.address;

  const data: JsonLd = {
    "@context": "https://schema.org",
    "@type": business.schemaType,
    "@id": businessId(ctx),
    name: business.name,
    description: business.description,
    url: absoluteUrl(ctx, "/"),
    telephone: business.phone.e164,
    email: business.email,
    address: compact({
      "@type": "PostalAddress",
      streetAddress: business.showStreetAddress ? address.street : undefined,
      addressLocality: address.city,
      addressRegion: address.region,
      postalCode: business.showStreetAddress ? address.postalCode : undefined,
      addressCountry: address.country,
    }),
    areaServed: serviceAreas.map((area) => ({ "@type": "Place", name: area.name })),
    openingHoursSpecification: business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days.map((d) => DAY_URL[d]),
      opens: h.opens,
      closes: h.closes,
    })),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Services",
      itemListElement: services.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: s.name, url: absoluteUrl(ctx, `/services/${s.slug}`) },
      })),
    },
  };

  if (business.logo.image?.src) data.logo = new URL(business.logo.image.src, ctx.origin).toString();
  if (business.social.length > 0) data.sameAs = business.social.map((s) => s.url);
  if (business.foundedYear) data.foundingDate = String(business.foundedYear);
  if (business.priceRange) data.priceRange = business.priceRange;
  if (business.legalName) data.legalName = business.legalName;

  return data;
}

export function buildServiceJsonLd(ctx: SiteContext, service: Service): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    description: service.summary,
    url: absoluteUrl(ctx, `/services/${service.slug}`),
    provider: { "@id": businessId(ctx) },
    areaServed: ctx.site.serviceAreas.map((area) => ({ "@type": "Place", name: area.name })),
  };
}

export function buildBreadcrumbJsonLd(ctx: SiteContext, crumbs: { name: string; path: string }[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(ctx, c.path),
    })),
  };
}

/** Serializes JSON-LD for a <script> tag, escaping "<" so content cannot close the tag. */
export function serializeJsonLd(data: JsonLd | JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

function compact(obj: Record<string, unknown>): Record<string, unknown> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined && v !== ""));
}
