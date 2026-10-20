import type { Metadata } from "next";
import { PageHeader, ReviewCta } from "@/components/marketing/blocks";
import { ExampleCard } from "@/components/marketing/example-card";
import { tenantRepository } from "@/engine/tenancy/registry";

export const metadata: Metadata = {
  title: "Examples",
  description: "Concept websites for a roofer, a painter and a bathroom remodeler, showing the range of designs we build.",
  alternates: { canonical: "/examples" },
};

const DIRECTION: Record<string, { summary: string; points: string[] }> = {
  "summit-ridge-roofing": {
    summary: "Urgent, practical and phone-first, for a trade where people call after a storm.",
    points: ["Condensed uppercase headlines", "Full-bleed photo hero with a dark scrim", "Hours and coverage in a utility bar", "Square corners, compact spacing"],
  },
  "hollis-wren-painting": {
    summary: "Warm and editorial, for homeowners choosing who to trust inside their house.",
    points: ["Serif headlines on a cream paper background", "Split hero with layered photos", "Numbered, magazine-style service list", "Generous spacing and soft corners"],
  },
  "stillwater-bath-studio": {
    summary: "Quiet and architectural, for a large, planned purchase.",
    points: ["Light serif display with a clean sans body", "Centered headline over a wide photo", "Facts-first proof and before/after", "Sharp corners and framed imagery"],
  },
};

export default async function ExamplesPage() {
  const sites = await tenantRepository.listSites();
  return (
    <>
      <PageHeader
        eyebrow="Examples"
        heading="Three trades. Three very different sites."
        intro="Each of these concept sites was configured on the same tested foundation, then designed for its trade: different type, color, layout, imagery and page structure."
      />
      <section data-tone="default" aria-label="Example sites" className="pb-[var(--section-y)]">
        <div className="container-site flex flex-col gap-20">
          {sites.map((site) => {
            const d = DIRECTION[site.slug];
            return (
              <div key={site.slug} className="grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
                <ExampleCard site={site} />
                {d ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-lead">{d.summary}</p>
                    <ul className="flex flex-col gap-2 text-muted">
                      {d.points.map((p) => (
                        <li key={p} className="border-t border-line pt-2">
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            );
          })}
          <p className="max-w-2xl rounded-card border border-line p-5 text-sm text-muted">
            These businesses are fictional. Their names, people, projects and reviews were written to demonstrate the
            design range and are marked as samples on each site. Placeholder illustrations stand in for the real project
            photography each customer site uses.
          </p>
        </div>
      </section>
      <ReviewCta heading="Want to see what yours would look like?" />
    </>
  );
}
