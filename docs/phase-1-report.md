# Phase 1 report

**Status:** Phase 1 complete. Stopped before Phase 2 as instructed. Nothing deployed to production; no paid services configured.

- **Branch:** `claude/project-thread-seydru`
- **Final commit:** see the pull request (the SHA is reported there, since this file is part of the commit)

## Architecture summary

A single Next.js 16 App Router app (TypeScript strict, Tailwind 4, npm, Node 22) containing:

1. **Company marketing site** under `src/app/(marketing)`.
2. **Shared site engine** in `src/engine`: typed `SiteConfig` schema + validation, tenancy (repository, domain resolver, request routing), theme → CSS variables, SEO builders, lead pipeline. No React pages inside the engine.
3. **Contractor component library** in `src/components/site`: 13 section types with 2–3 variants each, 3 headers, 2 footers, mobile call bar, lead form.
4. **Tenant fixtures** in `src/tenants`: three demo businesses + a host routing table.

Every tenant renders through `/sites/[site]`. `src/proxy.ts` maps a customer domain to `/sites/<slug>~d/…` (domain mode, root-relative links); `/sites/<slug>` is preview mode on the platform domain. Both modes are statically prerendered. Persistence (`TenantRepository`), host lookup (`DomainResolver`) and lead delivery (`LeadTransport`) are interfaces with fixture/console implementations, so a database, Edge Config and an email/CRM vendor can be swapped in without touching rendering. Full detail and the migration path: `docs/architecture.md`.

Why one app rather than a monorepo: one deploy target, and the marketing Examples page renders real engine output. `src/engine` has no dependency on the marketing site, so it can be extracted later.

## Routes created

Marketing site (static):

| Route | |
| --- | --- |
| `/` | Home |
| `/how-it-works` | Process |
| `/examples` | Live scaled renders of the three demo tenants |
| `/pricing` | $999 setup + $299/month |
| `/faq` | FAQ |
| `/contact` | Redesign / website review request form |
| `/robots.txt`, `/sitemap.xml` | Marketing SEO (disallows `/sites/`) |

Tenant sites (prerendered for every tenant, in preview and domain mode):

| Route | Domain-mode equivalent |
| --- | --- |
| `/sites/[site]` | `/` |
| `/sites/[site]/services` | `/services` |
| `/sites/[site]/services/[service]` | `/services/<slug>` |
| `/sites/[site]/projects` | `/projects` |
| `/sites/[site]/about` | `/about` |
| `/sites/[site]/contact` | `/contact` |
| `/sites/[site]/sitemap.xml` | `/sitemap.xml` |
| `/sites/[site]/robots.txt` | `/robots.txt` |

Build output: 75 static pages + the proxy.

## Demo tenants

All fictional, disclosed on every page with a banner and footer note; all reviews/projects marked “Sample”; phone numbers in the 555-01xx fictional range; domains on the reserved `.example` TLD.

| Tenant | Slug | Direction |
| --- | --- | --- |
| Summit Ridge Roofing (Lakewood, CO) | `summit-ridge-roofing` | Rugged and urgent: condensed uppercase type, charcoal/orange, square corners, compact, utility header, full-bleed hero, icon tiles, slider before/after, dark process band |
| Hollis & Wren Painting Co. (Portland, OR) | `hollis-wren-painting` | Warm editorial: Fraunces serif, cream/green/terracotta, soft corners, centered masthead, split hero with layered images, numbered service list, feature quote, timeline |
| Stillwater Bath Studio (Minneapolis, MN) | `stillwater-bath-studio` | Quiet luxury: Cormorant/Manrope, stone/sage/brass, 0px corners, airy, stacked hero, stats band, feature spotlight, side-by-side before/after, closing consultation form |

## Major reusable components

- Layout: `SiteHeader` (`bar`, `utility`, `centered`), `SiteFooter` (`columns`, `statement`), `MobileNav`, `MobileCallBar`, `DemoBanner`, `PageIntro` with breadcrumbs
- Sections: `Hero` (full-bleed, split, stacked), `Trust` (inline, badges, stats), `Services` (cards, list, tiles), `Spotlight` (alternating, feature), `Projects` (grid, featured, strip), `BeforeAfter` (slider, side-by-side), `Testimonials` (cards, feature), `Process` (steps, timeline), `About` (story, team), `ServiceAreas` (columns, inline), `Faq` (accordion, two-column), `Cta` (band, panel, split), `LeadFormBlock` (split, contained)
- Primitives: `SiteImage` (next/image or placeholder art), `PlaceholderArt` (12 themed illustration subjects + worn “before” state), `ComparisonSlider`, `CtaButtons`, `PhoneLink`, `Logo`, `Icon`, `JsonLd`, `SampleTag`
- Shared: `LeadForm` (client, `useActionState`, works without JS)
- `SectionList` / `RenderSection`: exhaustive renderer for configured sections

## Tenant/config schema summary

`SiteConfig` = `business` (identity, logo, contact, address, hours, licenses, social, schema type) + `services` + `projects` (with before/after) + `testimonials` + `trust` + `team` + `faqs` + `process` + `serviceAreas` + `cta` + `leadForm` + `seo` + `analytics` + `theme` + `layout` + `pages` (ordered home sections + inner page copy + nav). `validateSiteConfig` enforces references, uniqueness, accessibility (alt text) and honesty rules (demo content must be sample; samples can’t claim review platforms). Full reference: `docs/site-schema.md`.

## Verification

| Check | Command | Result |
| --- | --- | --- |
| Tests | `npm test` | **79 passed / 79** in 7 files |
| Lint | `npm run lint` | **Pass**, 0 errors, 0 warnings |
| Typecheck | `npm run typecheck` | **Pass** (strict, `noUncheckedIndexedAccess`) |
| Production build | `npm run build` | **Pass**, 75 static pages |

Test coverage by area:

- Tenancy (17): segment encoding, host normalization, domain/alias/local-subdomain resolution, conflicting-host guards, proxy routing decisions, repository loading and validation failures
- Config validation (10): all fixtures valid; demo honesty rules; broken references; hero-first; contact/lead-form basics; alt text; duplicates
- Theme (4): token mapping, treatments, distinct output per tenant
- SEO (12): titles, canonicals in both modes, robots/indexing rules, OG images, LocalBusiness/Service/Breadcrumb JSON-LD (no ratings, hidden street for service-area businesses), escaping, sitemap and robots
- Leads (14): field building, validation, URL normalization, spam checks, pipeline, transports
- Rendering (19): every tenant home renders all sections with one h1, click-to-call, demo disclosure, accessible images, no star ratings; preview vs domain link prefixes; measurable visual differentiation
- Lead form (3): labels, client-side error summary + inline errors, successful submit with hidden fields

Manually verified against `next start`: tenant pages via `Host:` header in domain mode, `/sites/<slug>~d` blocked on the platform host, tenant robots/sitemap, canonical + noindex output, JSON-LD output, and an end-to-end quote submission in Chromium (client validation → server action → console transport → confirmation).

## Screenshots and preview

Screenshots of the production build are in `docs/screenshots/` (marketing home and examples; each tenant at 1440px and 390px).

To preview locally:

```bash
npm install && npm run dev
open http://localhost:3000                                   # marketing site
open http://localhost:3000/sites/summit-ridge-roofing        # preview mode
open http://hollis-wren-painting.localhost:3000              # domain mode
```

A Vercel preview deployment of this branch will also work as-is (no env vars required); demo previews are at `/sites/<slug>`.

## Known limitations

- **No real photography.** Demo sites use generated placeholder illustrations by design. They read as intentional but are not a substitute for project photos; the visual impression of a real customer site will depend heavily on photos.
- **Leads are not delivered anywhere** by default (console log of field names only). `LEAD_WEBHOOK_URL` enables a generic JSON webhook.
- **Analytics** is a config placeholder plus a `data-track` → `window.dataLayer` hook; no provider scripts are loaded.
- **404s on tenant domains** use the platform’s not-found page, not a tenant-themed one.
- **Font preloading is off** (fonts are shared across tenants), so display fonts swap in after first paint.
- **Every tenant is in `generateStaticParams`.** Fine for dozens; at hundreds, switch to on-demand ISR (architecture step 3).
- **Domain table is in code**, so adding a domain requires a deploy (architecture step 1 moves it to Edge Config).
- Marketing copy contains product decisions to confirm (domain ownership, update allowance, see `docs/product.md`); the company name is a working name.
- Examples-page thumbnails scale real markup; headline sizes use viewport units, so thumbnail proportions vary slightly with screen width.
- `npm audit` reports a high-severity advisory in `braces` via `eslint-config-next` (dev-only lint dependency, not shipped). No fix is available without downgrading.
- TypeScript is pinned to 6.0 because `typescript-eslint` does not yet support TypeScript 7.

## Intentionally deferred

Database/Supabase, authentication and customer accounts, customer dashboard, CMS/admin CRUD, Stripe, automated custom-domain onboarding, internal admin console, screenshot audits/visual regression, AI content pipeline, lead CRM and routing, automated reporting and customer analytics dashboard, Google Business Profile integration, per-tenant OG image generation, tenant-themed 404s, multi-language.

## Files and docs added

- Config: `package.json`, `package-lock.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `vitest.config.mts`, `.nvmrc`, `.gitignore`, `.env.example`, `README.md`
- App: `src/app/**` (root layout, globals.css, marketing routes, tenant routes, robots/sitemap), `src/proxy.ts`
- Engine: `src/engine/{schema,tenancy,theme,seo,leads}/**`, `src/engine/site-context.ts`
- Components: `src/components/site/**`, `src/components/marketing/**`, `src/components/forms/lead-form.tsx`
- Brand and tenants: `src/brand/**`, `src/tenants/**`
- Tests: `src/**/*.test.ts(x)`, `test/setup.ts`, `test/fixtures.ts`
- Docs: `docs/product.md`, `docs/architecture.md`, `docs/site-schema.md`, `docs/design-system.md`, `docs/fulfillment-workflow.md`, `docs/phase-1-report.md`, `docs/screenshots/*.png`

## Recommended Phase 2 (not started)

1. **First real customer pilot.** Configure one real contractor end to end using `docs/fulfillment-workflow.md`, with real photos. This will validate the schema faster than any further engineering.
2. **Production hosting path.** One Vercel project with wildcard + per-customer domains; move the domain table to Edge Config; on-demand ISR with per-tenant revalidation.
3. **Lead delivery.** A real `LeadTransport` (transactional email to the contractor plus a copy to operations), with Turnstile behind `checkSpam`.
4. **Analytics.** Per-tenant GA4 or Plausible, phone-click and form-submit conversions, and a simple monthly summary for customers.
5. **Tenant storage.** Postgres-backed `TenantRepository` storing validated `SiteConfig` JSON, once the number of tenants or operators makes code-based configs slow.
6. **Operator tooling.** An intake form that produces a draft `SiteConfig`, and automated screenshot QA across tenants before each platform release.
7. **More variants as real customers need them** (e.g. reviews widget sourced from a verifiable platform, financing callout, emergency banner), added one at a time.
