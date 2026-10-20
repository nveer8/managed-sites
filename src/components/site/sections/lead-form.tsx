import type { LeadFormSection } from "@/engine/schema/types";
import { submitTenantLead } from "@/engine/leads/actions";
import { SITE_SLUG_FIELD, tenantLeadFields } from "@/engine/leads/fields";
import type { SiteContext } from "@/engine/site-context";
import { LeadForm } from "@/components/forms/lead-form";
import { Icon } from "../primitives/icon";
import { PhoneLink } from "../primitives/cta";
import { Section } from "../primitives/section";
import { formatHoursLine } from "../layout/hours";
import { headingId, type SectionProps } from "./types";

export function TenantLeadForm({ ctx }: { ctx: SiteContext }) {
  const { leadForm, business } = ctx.site;
  return (
    <LeadForm
      action={submitTenantLead}
      specs={tenantLeadFields(ctx.site)}
      hidden={{ [SITE_SLUG_FIELD]: ctx.site.slug }}
      submitLabel={leadForm.submitLabel}
      successHeading={leadForm.successHeading}
      successMessage={leadForm.successMessage}
      privacyNote={leadForm.privacyNote}
      label={`Request an estimate from ${business.name}`}
    />
  );
}

export function ContactDetails({ ctx }: { ctx: SiteContext }) {
  const { business, serviceAreas } = ctx.site;
  return (
    <ul className="flex flex-col gap-4">
      <li className="flex items-start gap-3">
        <Icon name="phone" className="mt-1 size-5 text-primary" />
        <PhoneLink ctx={ctx} showIcon={false} className="text-xl font-semibold no-underline" />
      </li>
      <li className="flex items-start gap-3">
        <Icon name="clock" className="mt-1 size-5 text-primary" />
        <span className="flex flex-col">
          {business.hours.map((h) => (
            <span key={h.days.join("")}>{formatHoursLine(h)}</span>
          ))}
          {business.hoursNote ? <span className="text-muted">{business.hoursNote}</span> : null}
        </span>
      </li>
      <li className="flex items-start gap-3">
        <Icon name="map-pin" className="mt-1 size-5 text-primary" />
        <span>Serving {serviceAreas.map((a) => a.name).join(", ")}</span>
      </li>
      <li className="flex items-start gap-3">
        <svg viewBox="0 0 24 24" className="mt-1 size-5 text-primary" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
          <path d="M3 5h18v14H3zM3 6l9 7 9-7" />
        </svg>
        <a href={`mailto:${business.email}`}>{business.email}</a>
      </li>
    </ul>
  );
}

export function LeadFormBlock({ section, ctx, index }: SectionProps<LeadFormSection>) {
  const { leadForm } = ctx.site;
  const id = headingId(index);
  const heading = section.heading ?? leadForm.heading;
  const intro = section.intro ?? leadForm.intro;

  if (section.variant === "contained") {
    return (
      <Section tone={section.tone ?? "alt"} labelledBy={id} id={section.id ?? "quote"}>
        <div className="mx-auto flex max-w-2xl flex-col gap-8 rounded-card bg-surface p-6 sm:p-10" data-tone="default">
          <div className="flex flex-col gap-3">
            {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
            <h2 id={id} className="text-h2">
              {heading}
            </h2>
            {intro ? <p className="text-muted">{intro}</p> : null}
          </div>
          <TenantLeadForm ctx={ctx} />
        </div>
      </Section>
    );
  }

  return (
    <Section tone={section.tone} labelledBy={id} id={section.id ?? "quote"}>
      <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="flex flex-col gap-6">
          {section.eyebrow ? <p className="eyebrow">{section.eyebrow}</p> : null}
          <h2 id={id} className="text-h2">
            {heading}
          </h2>
          {intro ? <p className="text-lead text-muted">{intro}</p> : null}
          <ContactDetails ctx={ctx} />
        </div>
        <div data-tone="default" className="rounded-card border border-line p-6 sm:p-8">
          <TenantLeadForm ctx={ctx} />
        </div>
      </div>
    </Section>
  );
}
