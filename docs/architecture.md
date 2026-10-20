# Architecture

This document describes the Phase 1 architecture of the managed-sites codebase and the explicit path from here to a true multi-tenant Vercel deployment. It was written before implementation (as the Phase 1 plan) and updated once the code landed, so it describes what exists, not just what was intended.

## Goals that shaped the design

1. **One codebase, many contractor sites.** A new customer is a new configuration, never a new repository or a fork.
2. **Real visual differentiation.** Two customers on the same engine should not look like the same template with a different accent color.
3. **Phase 1 stays small.** Typed local fixtures instead of a database, no auth, no billing, no CMS, no admin UI.
4. **Persistence and routing are behind interfaces**, so moving tenant data into a database and domains into Edge Config later does not touch the rendering system.

## Environment (checked before implementation)

| Tool | Version | Notes |
| --- | --- | --- |
| Node.js | 22.22.0 (LTS line) | `.nvmrc` pins `22`; `engines.node >= 22.12` |
| npm | 10.9.4 | Package manager. pnpm/yarn are available but npm needs no extra setup on Vercel or locally. |
| Next.js | 16.4.2 (`latest` dist-tag) | App Router, Turbopack default, `proxy.ts` (the renamed middleware) |
| React | 19.3.1 | |
| TypeScript | 6.0.3 | `latest` is 7.0.x (native compiler), but `typescript-eslint` supports `<6.1`. 6.0 is the newest version the whole toolchain supports. |
| Tailwind CSS | 4.3.3 | CSS-first config (`@theme`), no `tailwind.config.js` |
| ESLint | 9.39.x | ESLint 10 exists, but the React plugins inside `eslint-config-next` are still validated on 9. Flat config. |
| Vitest | 5.0.5 | jsdom + Testing Library |

No canary, beta, or RC packages are used.

## Repository structure: a single Next.js app, not a monorepo

```
src/
  app/
    (marketing)/          Company marketing site: /, /how-it-works, /examples, /pricing, /faq, /contact
    sites/[site]/         Every contractor site (demo or real) renders under this one route tree
    robots.ts, sitemap.ts Marketing-site SEO files
  proxy.ts                Host-based tenant routing (custom domains → /sites/…)
  brand/                  Temporary company name/domain/offer values, centralized
  engine/                 The shared site engine (no React pages in here)
    schema/               SiteConfig types + integrity validation
    tenancy/              Tenant repository, domain table, host resolution, route segment encoding
    theme/                Fonts registry + theme → CSS custom properties
    seo/                  Metadata, JSON-LD, sitemap, robots builders (pure functions)
    leads/                Lead validation, spam checks, transport interface + implementations
    links.ts              Tenant-aware link building
  components/
    site/                 Contractor-site component library (sections + variants + primitives)
    marketing/            Components used only by the company marketing site
  tenants/                Typed fixture configs for the three demo tenants + domain table
test/                     Shared test setup
docs/                     Product, architecture, schema, design, fulfillment, report
```

**Why not a monorepo?** A monorepo (Turborepo with `apps/marketing`, `apps/sites`, `packages/engine`) adds build orchestration, two Vercel projects, and package boundaries before we have a second consumer of the engine. The marketing site actually *benefits* from living in the same app: the Examples page renders the real engine components, so "same engine" is demonstrated rather than claimed. The `src/engine` folder has no imports from `src/app` or `src/components/marketing`, so it can be lifted into a package later if a second app ever appears. That boundary is enforced by convention.

## Request flow

```
                     ┌─────────────────────────────────────────────┐
request ──► proxy.ts │ host = platform host? ──► pass through      │
                     │ host = tenant domain?  ──► rewrite to        │
                     │                           /sites/<slug>~d/…  │
                     └─────────────────────────────────────────────┘
                                       │
                     src/app/sites/[site]/…  (statically generated)
                                       │
            parseSiteSegment(site) → { slug, mode: "preview" | "domain" }
                                       │
                 tenantRepository.getSiteBySlug(slug) → SiteConfig
                                       │
         layout: ThemeStyle (CSS variables) + Header + Footer + JSON-LD
         page:   SectionRenderer(site.pages.home.sections) or page template
```

### Two ways to reach a tenant site

| Mode | URL | Links inside the site | Indexing |
| --- | --- | --- | --- |
| **Preview** | `https://<platform>/sites/summit-ridge-roofing/services` | Prefixed with `/sites/<slug>` | Always `noindex`; canonical points at the tenant's primary domain |
| **Domain** | `https://summitridgeroofing.example/services` | Root-relative (`/services`) | Indexable only when the tenant's `status` is `live` |

Preview mode is what customers see before launch and what the marketing site's Examples page links to. It works on any Vercel preview deployment with no DNS.

Domain mode is the production path: `proxy.ts` looks the host up in the domain table and rewrites to `/sites/<slug>~d/<path>`. The `~d` suffix on the segment tells the layout to build root-relative links. Both variants are listed in `generateStaticParams`, so every page of every tenant is prerendered at build time in both modes. No request headers are read during render, so pages stay static (good TTFB and Core Web Vitals).

Locally, `http://<slug>.localhost:3000` resolves through the same domain-mode path, so custom-domain behavior can be tested without DNS.

## Data access: interfaces now, database later

```ts
interface TenantRepository {
  listSites(): Promise<SiteConfig[]>;
  getSiteBySlug(slug: string): Promise<SiteConfig | null>;
}

interface DomainResolver {
  resolveHost(host: string): TenantRoute | null;   // sync: must be cheap enough for proxy
  primaryDomainFor(slug: string): string | null;
}
```

Phase 1 implementations read from `src/tenants/*.ts`. Pages and components only ever receive a `SiteConfig`; they never import fixture files. The repository is async even though fixtures are sync, so swapping in a database call does not change any call sites.

Lead submissions use the same pattern:

```ts
interface LeadTransport { send(lead: LeadSubmission): Promise<LeadTransportResult> }
```

Phase 1 ships `consoleTransport` (default, logs a redacted summary), `memoryTransport` (tests), and `webhookTransport` (POSTs JSON to a URL, only active if `LEAD_WEBHOOK_URL` is set). Nothing is configured to send data anywhere by default.

## Rendering system

- `SiteConfig.pages.home.sections` is an ordered array of a discriminated union (`{ type: "hero", variant: "full-bleed", … }`). `SectionRenderer` maps each `type` to a component and each component switches on `variant`. Adding a variant is a local change to one component plus a union member.
- Inner pages (service detail, projects, about, contact) use fixed templates, but each template composes the same section components, so they inherit the tenant's variants and theme.
- Theme values become CSS custom properties on the site wrapper (`--c-bg`, `--font-display`, `--radius-card`, `--section-y`, …). Tailwind v4 maps those to utilities (`bg-bg`, `text-ink`, `font-display`, `rounded-card`). Components never hard-code a tenant color or font.
- Sections can set `tone` (`default`, `alt`, `inverse`, `accent`), which remaps the color variables for that band only. This is how light/dark sections work without per-section color props.
- Fonts come from a curated registry built on `next/font/google` (self-hosted at build time, no runtime Google requests). Only the fonts a tenant selects are referenced in its CSS, so browsers only download those files.

## SEO and structured data

All SEO output is generated by pure functions in `src/engine/seo` and is unit tested:

- `buildSiteMetadata` / `buildPageMetadata`: title template, description, canonical, Open Graph, robots.
- `buildLocalBusinessJsonLd`, `buildServiceJsonLd`, `buildBreadcrumbJsonLd`: built only from fields present in the tenant config. No ratings, reviews, or claims are synthesized. A service-area business without a public address gets `areaServed` and no street address.
- Tenant `sitemap.xml` and `robots.txt` are route handlers under `/sites/[site]/`, reached via the proxy on tenant domains. Demo and preview tenants disallow crawling.
- No city-page or keyword-page generation. Service-area information is presented on one page as real coverage information.

## Lead forms

`LeadForm` is a client component using `useActionState` against a server action. The same `validateLead` function runs in the browser (instant inline errors) and on the server (the authority). Spam handling is a honeypot field plus a minimum fill time, both silently "succeed" so bots get no signal. The server action re-resolves the tenant from the posted slug, so a form cannot submit into a tenant it doesn't belong to.

## Future migration path to multi-tenant Vercel

Each step is independent and none requires changes to section components.

1. **Domains → Vercel + Edge Config.** Add customer domains to the single Vercel project (wildcard + per-domain), move `src/tenants/domains.ts` into Edge Config, and implement `DomainResolver` against it. `proxy.ts` logic stays the same.
2. **Tenant data → database.** Implement `TenantRepository` against Postgres (Supabase or Neon) storing `SiteConfig` as validated JSON plus a few indexed columns (slug, status). `validateSiteConfig` becomes the write-time guard.
3. **Static → on-demand ISR.** Stop listing every tenant in `generateStaticParams`; use `dynamicParams = true` with `revalidateTag(tenantTag(slug))` on content changes, so publishing one customer's edit rebuilds only their pages.
4. **Media → object storage.** `MediaAsset.src` already accepts URLs; point it at Vercel Blob or an image CDN and add the host to `images.remotePatterns`.
5. **Leads → real transport.** Implement `LeadTransport` for the chosen email/CRM vendor; keep the console transport for development.
6. **Analytics.** `AnalyticsConfig` already carries provider + IDs; wire per-tenant GA4 or Plausible scripts and conversion events.
7. **Operator tooling** (admin console, previews, approvals) reads/writes through the same repository interfaces.

## Later (intentionally not built in Phase 1)

- Supabase or any database
- Customer accounts, authentication, customer dashboard
- Client-facing CMS or admin CRUD
- Stripe subscription automation
- Automated custom-domain onboarding (Vercel Domains API)
- Internal admin console
- Automatic screenshot audits / visual regression
- AI content-generation pipeline
- Lead CRM, automated lead routing, SMS notifications
- Automated reporting and a customer analytics dashboard
- Google Business Profile integration
- Per-tenant OG image generation
- Multi-language sites

## Phase 1 implementation plan

1. Scaffold Next.js 16 + strict TypeScript + Tailwind 4 + ESLint + Vitest.
2. Define `SiteConfig` types and `validateSiteConfig`.
3. Tenancy: repository, domain table, host resolver, site segment encoding, `proxy.ts`.
4. Theme system: font registry, theme → CSS variables, section tones.
5. Component library: header/hero/trust/services/spotlight/projects/before-after/testimonials/process/about/areas/FAQ/CTA/lead form/footer, each with variants; placeholder imagery.
6. Three demo tenants with deliberately different direction.
7. Tenant routes: home, services, service detail, projects, about, contact, sitemap.xml, robots.txt.
8. SEO builders + JSON-LD.
9. Lead pipeline: validation, spam checks, server action, transports.
10. Marketing site: home, how it works, examples, pricing, FAQ, contact/redesign request.
11. Tests for tenancy, config integrity, theme, SEO, leads, rendering.
12. Docs and the Phase 1 report.
