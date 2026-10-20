# Product

## What we sell

A **managed website service** for home-service contractors: roofing, painting, flooring, landscaping, bathroom remodeling, HVAC, plumbing, electrical, concrete, tree service, pressure washing and similar trades.

The promise to the customer is simple:

> We design it. We build it. We host it. We maintain it.
> You never have to manage your website.

### The offer

| | |
| --- | --- |
| Setup | **$999** one time: design, content, build, launch |
| Monthly | **$299/month**: hosting, maintenance, updates, improvements |

Both values live in `src/brand/brand.ts` (`brand.offer`) and are read everywhere the site mentions price.

### What is included

- A custom-looking, modern website designed for the customer’s trade and market
- Hosting and SSL
- Technical maintenance, monitoring and backups
- Analytics and conversion tracking (calls, quote requests)
- Reasonable ongoing content and photo updates
- Technical and local-search foundations: speed, clean structure, accurate business details, truthful structured data
- Ongoing small improvements

### How customers are acquired

The primary call to action is a **free, personalized website review and redesign concept** (“See what we’d do with your website”), not a generic sales consultation. The contractor sees what they would get before paying anything.

## What we deliberately do not sell

- **A self-service website builder.** There is no editor, page builder or customer dashboard. The customer emails or texts changes; we make them.
- **“AI websites.”** AI is an internal production tool. It is never part of the marketing message.
- **Ranking guarantees.** We never promise positions on Google or imply that structured data guarantees rankings.
- **SEO content factories.** No auto-generated city pages, keyword pages or doorway pages.
- **Fabricated proof.** No invented reviews, ratings, project counts or awards. Demo content is always labeled as sample content.
- **Paid advertising management, logo/brand identity design, CRM, or call-center services** (not in the base offer).

## Product decisions recorded in Phase 1

These appear in marketing copy and should be confirmed before launch:

- The customer’s domain stays registered to the customer.
- “Reasonable updates” covers new photos, services, hours, team members and small wording changes. Larger additions (new site sections, a second location, a redesign) are quoted before work starts.
- The customer sees a redesign concept before paying.
- The company name is a **working name** (“Webbr”) on a placeholder `.example` domain. Change it in `src/brand/brand.ts`.

Open questions intentionally not answered on the site yet: contract length and cancellation terms, the exact update allowance, and what happens to the site if a customer leaves.

## Later

Customer accounts, a customer dashboard, a client CMS, Stripe subscription automation, automated reporting to customers, Google Business Profile management and lead CRM are all out of scope for Phase 1 (see `architecture.md` → Later).
