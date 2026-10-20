# Site schema

A tenant site is one `SiteConfig` object (`src/engine/schema/types.ts`). Everything a tenant page renders comes from it. Phase 1 stores configs as typed fixtures in `src/tenants/`; the shape is designed to be stored as a JSON document later.

Two separate pieces of data exist per tenant:

| Data | Where | Why separate |
| --- | --- | --- |
| `SiteConfig` | `src/tenants/<slug>.ts` | Content and design. Read by pages. |
| Domain record | `src/tenants/domains.ts` | Host routing. Read by `proxy.ts` on every request, so it stays tiny (future: Edge Config). |

## Top level

| Field | Purpose |
| --- | --- |
| `id` | Stable internal id. Never changes. |
| `slug` | URL-safe routing key (`/sites/<slug>` previews). Lowercase words joined by single hyphens. |
| `status` | `demo` (fictional, always noindex, disclosed), `preview` (real customer pre-launch, noindex), `live` (indexable on its primary domain). |
| `business` | Identity, logo, contact, address, hours, licenses, social, schema.org type. |
| `services` | Each service: slug, name, summary, description paragraphs, inclusions, image, icon, related FAQ ids, optional SEO overrides. Each gets a page at `/services/<slug>`. |
| `projects` | Project/proof content with optional `beforeAfter` image pair and `isSample`. |
| `testimonials` | Quote, author, context, optional `source` and `isSample`. |
| `trust` | Licenses, insurance, certifications, warranties, memberships, stats. |
| `team` | People with optional photos. |
| `faqs` | Question/answer pairs referenced by id. |
| `process` | Ordered steps. |
| `serviceAreas` | Area names with optional towns/neighborhoods. Displayed as information; never used to generate pages. |
| `cta` | Primary label and action (`quote` or `call`), phone visibility, mobile call bar, reassurance line. |
| `leadForm` | Which fields to show (name, phone, email, address, postal code, service, timeline, contact preference, message), required flags, labels, timeline options, copy. |
| `seo` | Default title, title template (`%s`), description, optional OG image. |
| `analytics` | Provider placeholder (`none`, `ga4`, `plausible`) and id. |
| `theme` | Visual system: palette, fonts, radii, density, button/eyebrow/image treatments. See `design-system.md`. |
| `layout` | Header variant, footer variant, container width. |
| `pages` | Home page section list, inner page copy, and which inner pages are in the navigation. |

## Media

```ts
interface MediaAsset {
  src?: string;              // real image; omitted → placeholder illustration
  alt: string;               // required; doubles as the photo shot list
  width?: number; height?: number;   // required with src
  placeholder?: PlaceholderSubject;  // "roof", "interior", "bathroom", …
  condition?: "before" | "after";
  credit?: string;
}
```

## Home page composition

`pages.home.sections` is an ordered array. Each entry is one member of the `SectionConfig` union with a `type`, a `variant`, and optional `tone`, `eyebrow`, `heading`, `intro`:

| type | variants | notes |
| --- | --- | --- |
| `hero` | `full-bleed`, `split`, `stacked` | Requires heading, subheading, image; optional secondary image and highlights |
| `trust` | `inline`, `badges`, `stats` | Reads `trust` |
| `services` | `cards`, `list`, `tiles` | Optional `serviceSlugs` subset |
| `spotlight` | `alternating`, `feature` | Requires `serviceSlugs` |
| `projects` | `grid`, `featured`, `strip` | Optional `projectIds` |
| `before-after` | `slider`, `side-by-side` | Requires a project with `beforeAfter` |
| `testimonials` | `cards`, `feature` | Optional `testimonialIds` |
| `process` | `steps`, `timeline` | Reads `process` |
| `about` | `story`, `team` | Reads `pages.about` and `team` |
| `service-areas` | `columns`, `inline` | Reads `serviceAreas` |
| `faq` | `accordion`, `two-column` | Optional `faqIds` |
| `cta` | `band`, `panel`, `split` | Requires heading |
| `lead-form` | `split`, `contained` | Reads `leadForm` |

`tone` is `default`, `alt`, `inverse` (dark band) or `accent` (brand-color band).

Inner pages (services, service detail, projects, about, contact) use fixed templates composed from the same section components, and reuse the variant the tenant chose on its home page where relevant.

## Integrity rules (`validateSiteConfig`)

The type system can’t express everything, so `src/engine/schema/validate.ts` checks, and the repository refuses to load a site that fails:

- slug format, E.164 phone, email shape
- unique service slugs, project, testimonial and FAQ ids
- every reference resolves (project → service, section → services/projects/testimonials/FAQs, service → FAQs)
- a `before-after` section points at a project that has a before/after pair
- the home page starts with a hero; every nav page has page config; a contact page exists
- **honesty rules:** demo sites may only contain `isSample` projects and testimonials; sample testimonials cannot claim a review platform; stat trust items need a value
- every image has alt text; real images have dimensions
- lead form has a name field and a phone or email field; timeline options exist if the timeline field is used
- analytics id present when a provider is set; SEO description under 170 characters; title template contains `%s`

## Adding a tenant (Phase 1)

1. Copy the closest demo file in `src/tenants/` and rename.
2. Fill in business data, services, proof and copy. Mark anything not yet real as `isSample` and keep `status: "preview"`.
3. Choose a theme and compose the home page (see `design-system.md`).
4. Add it to `allSites` in `src/tenants/index.ts` and a domain record to `src/tenants/domains.ts`.
5. `npm run check`. Validation errors name the exact field.
