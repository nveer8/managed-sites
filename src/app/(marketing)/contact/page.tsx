import type { Metadata } from "next";
import { brand } from "@/brand/brand";
import { redesignRequestFields } from "@/brand/redesign-form";
import { LeadForm } from "@/components/forms/lead-form";
import { submitRedesignRequest } from "@/engine/leads/actions";

export const metadata: Metadata = {
  title: "Get your free website review",
  description: "Send us your current website or business details and we’ll show you what we’d build for you.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section data-tone="default" aria-labelledby="page-heading" className="section-y">
      <div className="container-site grid gap-14 lg:grid-cols-[1fr_1.25fr]">
        <div className="flex flex-col gap-6">
          <p className="eyebrow">Free website review</p>
          <h1 id="page-heading" className="text-h1">
            {brand.primaryCta}.
          </h1>
          <p className="text-lead text-muted">
            Tell us about your business. We’ll review your current site and put together a redesign concept, so you can
            see exactly what you’d get before deciding anything.
          </p>
          <div className="flex flex-col gap-3 border-t border-line pt-6">
            <h2 className="text-h3">What happens next</h2>
            <ol className="flex list-decimal flex-col gap-2 pl-5 text-muted">
              <li>We confirm we received your request.</li>
              <li>We review your site the way a homeowner sees it on their phone.</li>
              <li>We send you a personalized review and redesign concept.</li>
            </ol>
          </div>
        </div>
        <div data-tone="alt" className="rounded-card p-6 sm:p-9">
          <LeadForm
            action={submitRedesignRequest}
            specs={redesignRequestFields}
            submitLabel="Request my free review"
            successHeading="Request received"
            successMessage="Thanks! We’ll be in touch by email. (Phase 1 note: requests are logged on the server, not emailed yet.)"
            privacyNote="We only use your details to prepare and send your review."
            label="Website review request"
          />
        </div>
      </div>
    </section>
  );
}
