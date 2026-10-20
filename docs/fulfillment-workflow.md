# Fulfillment workflow

How an operator takes a contractor from first contact to a maintained live site. Phase 1 supports the **configuration** steps with code (a typed `SiteConfig`, validation, previews); the rest is process, documented here so tooling can be built against it later.

```
lead → intake → research → content → visual direction → site configuration
     → internal QA → customer preview → revision → domain setup
     → production launch → analytics → ongoing maintenance
```

## 1. Lead
- Source: the marketing site redesign request (`/contact`), referrals, outbound.
- Captured fields: name, business, current website, trade, city/state, email, phone, notes.
- Output: a personalized review of the current site plus a redesign concept (often a `preview`-status config rendered at `/sites/<slug>`).

## 2. Intake
- Kickoff call (~1 hour). Confirm services, the jobs they want more of, service areas, licenses/insurance, warranty terms, hours, real reviews they’ve earned, team.
- Collect: logo files, project photos (phone photos are fine), domain registrar access, existing Google Business Profile URL.

## 3. Research
- Current site, Google Business Profile, top local competitors, how homeowners in the area describe the work.
- Note what is verifiable (license numbers, years in business, warranty) versus what must not be claimed.

## 4. Content
- Write services (summary, description, inclusions), about story, process, FAQs, CTA language.
- Only real testimonials with the customer’s permission; record `source` truthfully.
- Pick and prepare photos; use the `alt` text as the shot list for gaps.

## 5. Visual direction
- Choose the direction from the buyer’s mindset (see `design-system.md`): type pairing, palette, density, radii, header, hero, treatments.
- Rule: never ship a new tenant that differs from an existing one only by color and logo.

## 6. Site configuration
- Create `src/tenants/<slug>.ts` with `status: "preview"`, compose the home page sections, add a domain record.
- `npm run check` must pass (lint, types, tests including config validation, build).

## 7. Internal QA
- Mobile first: tap targets, call button, sticky call bar, form on a real phone.
- Content accuracy: phone, email, hours, license numbers, service areas.
- Honesty review: no unverifiable claims, no ratings, no ranking promises, samples removed.
- Accessibility spot check (keyboard, screen reader headings), contrast, Lighthouse.
- Structured data validated with the Schema Markup Validator.

## 8. Customer preview
- Share `https://<platform>/sites/<slug>` (noindexed, canonical points at their domain).

## 9. Revision
- Collect changes in plain language, apply, re-share. Track rounds.

## 10. Domain setup
- Add the domain to the Vercel project and to the domain table; set DNS (apex A / `www` CNAME) at the registrar. Domain stays in the customer’s name.
- SSL is issued automatically by Vercel.

## 11. Production launch
- Flip `status` to `live`. Confirm `robots.txt` allows crawling and `sitemap.xml` lists real pages only.
- Redirect important old URLs. Submit sitemap in Search Console.

## 12. Analytics
- Configure `analytics` (GA4 or Plausible), verify phone-click and quote events reach the property, connect lead transport to the customer’s email.

## 13. Ongoing maintenance
- Monthly: dependency/platform updates (one codebase, all tenants), uptime and form checks, content/photo updates on request, one small improvement based on calls/quote data.
- Larger changes are quoted first.

## Later (tooling to build when volume requires it)
Intake form that produces a draft `SiteConfig`, internal admin console, automated screenshot/visual QA, automated domain onboarding via the Vercel API, lead routing/CRM, monthly customer reports.
