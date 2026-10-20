# Design system

## The problem

Hundreds of customer sites on one codebase tend to converge on one look: same fonts, same hero, same card grid, a different accent color. Contractors notice, and so do their customers. The engine is built so that the **shared parts are invisible** (infrastructure, accessibility, performance, SEO plumbing, forms) and the **visible parts vary a lot**.

## Layers

1. **Tokens.** A tenant `ThemeConfig` becomes CSS custom properties on the site root (`themeToCssVariables`). Components only use semantic utilities (`bg-bg`, `text-ink`, `text-muted`, `border-line`, `bg-primary`, `font-display`, `rounded-card`, `section-y`, `text-h1`…). Tailwind’s default color palette is reset in `globals.css`, so a component *cannot* hard-code `bg-blue-600`.
2. **Treatments.** Switch-like choices are emitted as inheritable custom properties (so the nearest theme wins when themes nest, as in the marketing Examples previews): button construction (`solid`, `solid-square`, `underline-secondary`), eyebrow style (`none`, `caps`, `rule`), image frame (`none`, `inset-border`, `offset-block`), density.
3. **Tones.** Each section can be `default`, `alt`, `inverse` or `accent`. A tone remaps the active `--c-*` tokens from the tenant palette for that band, so the same component reads correctly on light, dark and brand-colored backgrounds.
4. **Variants.** Each section type has 2–3 structurally different layouts (see `site-schema.md`), not just restyles.
5. **Composition.** Section order, which sections appear, and their tones are per-tenant configuration.
6. **Content and imagery.** Copy hierarchy, image subjects, aspect ratios and proof style differ per trade.

## Theme dimensions

| Dimension | Values |
| --- | --- |
| Palette | 13 colors + 4 illustration colors |
| Display font / body font | Curated registry: Barlow Condensed, Barlow, Fraunces, DM Sans, Cormorant Garamond, Manrope, Schibsted Grotesk |
| Display weight, case, tracking | e.g. 700 uppercase +0.005em vs 500 sentence-case −0.02em |
| Type scale | `restrained`, `standard`, `dramatic` |
| Radii | control / card / media, independently |
| Density | `compact`, `comfortable`, `airy` (section padding and stack gaps) |
| Header | `bar`, `utility`, `centered` |
| Footer | `columns`, `statement` |
| Container | `narrow`, `standard`, `wide` |

Adding a font: add a key to `src/engine/theme/fonts.ts` and a loader entry in `font-loader.ts`. Fonts are self-hosted by `next/font`; browsers only download faces a page uses.

## The three demo directions

| | Summit Ridge Roofing | Hollis & Wren Painting | Stillwater Bath Studio |
| --- | --- | --- | --- |
| Feel | Rugged, urgent, practical | Warm, editorial, crafted | Quiet, architectural, premium |
| Type | Barlow Condensed 700 uppercase / Barlow | Fraunces 500 serif / DM Sans | Cormorant Garamond 500 / Manrope |
| Palette | Concrete, charcoal, burnt orange, amber | Cream, deep green, terracotta | Stone, sage-charcoal, brass |
| Corners | 2–3px | 10–18px | 0px |
| Density | Compact | Comfortable | Airy |
| Header | Utility bar with hours and coverage | Centered masthead | Minimal bar |
| Hero | Full-bleed photo with scrim | Split with layered offset images | Centered headline over wide image |
| Services | Icon tiles | Numbered editorial list | Image cards |
| Proof | Slider before/after, scrolling project strip | Feature quote, featured project | Stats band, side-by-side before/after |
| Buttons | Square uppercase | Solid + underlined secondary | Solid, sharp |
| Image frame | None | Offset color block | Inset hairline border |
| Ends with | Accent CTA band | Contained CTA panel | Consultation form |

The marketing site uses the same token system with its own theme (`brandTheme` in `src/brand/brand.ts`).

## Rules of thumb for fulfillment designers

- Start from the trade and the buyer’s state of mind: emergency (roof leak), trust in the home (painting), large planned purchase (remodel).
- Change at least: type pairing, hero variant, header, density and corner radius. Color alone is not differentiation.
- Use `inverse` and `accent` tones sparingly: one or two bands per page.
- Keep primary text contrast at 4.5:1 or better on `bg`, `alt` and `surface`; check `muted` on `alt` especially.
- One primary CTA label per site. Phone always visible on mobile.
- No gradients except functional photo scrims, no glassmorphism, no decorative animation.

## Imagery

No stock or copyrighted photos are committed. Until real photography arrives, `MediaAsset`s without `src` render **placeholder illustrations** (`src/components/site/media/placeholder-art.tsx`): flat architectural scenes drawn with the tenant’s `art` palette, with a worn “before” treatment. The `alt` text doubles as the shot list for the customer’s photographer. Real images go through `next/image` with explicit dimensions and aspect-ratio boxes to prevent layout shift.

## Accessibility and performance baseline

Semantic landmarks, one `h1` per page, skip link, visible focus rings, `aria-labelledby` sections, native `<details>` FAQs, a range-input before/after slider, labeled form fields with error summary and inline errors, 44px+ touch targets, reduced-motion support, and static prerendering of every tenant page.
