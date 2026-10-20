# managed-sites

Shared site engine and company marketing site for a managed-website service for home-service contractors.

One Next.js app renders:

- the company marketing site (`/`, `/how-it-works`, `/examples`, `/pricing`, `/faq`, `/contact`)
- every contractor site from a typed `SiteConfig` (`/sites/<slug>` previews, or the customer’s own domain via `src/proxy.ts`)

## Quick start

```bash
nvm use            # Node 22
npm install
npm run dev        # http://localhost:3000
```

Demo tenants (fictional businesses):

- http://localhost:3000/sites/summit-ridge-roofing
- http://localhost:3000/sites/hollis-wren-painting
- http://localhost:3000/sites/stillwater-bath-studio

Custom-domain mode locally (no DNS needed): http://summit-ridge-roofing.localhost:3000

## Scripts

| Command | |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route type generation + `tsc --noEmit` |
| `npm test` | Vitest (unit + rendering) |
| `npm run build` | Production build (prerenders every tenant page) |
| `npm run check` | All of the above |

## Docs

- [Product](docs/product.md): what we sell and what we don’t
- [Architecture](docs/architecture.md): structure, request flow, migration path to multi-tenant Vercel
- [Site schema](docs/site-schema.md): the tenant configuration model
- [Design system](docs/design-system.md): how sites stay visually distinct on shared infrastructure
- [Fulfillment workflow](docs/fulfillment-workflow.md): the operator process
- [Phase 1 report](docs/phase-1-report.md)
