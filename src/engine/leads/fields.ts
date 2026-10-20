import type { LeadFieldName, SiteConfig } from "@/engine/schema/types";

/** Hidden input carrying the tenant slug on quote forms. */
export const SITE_SLUG_FIELD = "site_slug";

/**
 * A rendered, validated form field. Both tenant quote forms and the marketing
 * site's redesign request are described as FieldSpec lists, so one form
 * component and one validator serve every form.
 */
export interface FieldSpec {
  name: string;
  label: string;
  type: "text" | "tel" | "email" | "url" | "textarea" | "select" | "radio";
  required: boolean;
  autoComplete?: string;
  options?: string[];
  placeholder?: string;
  hint?: string;
  maxLength?: number;
  /** Lay out at half width on wide screens. */
  half?: boolean;
}

const TENANT_FIELD_DEFAULTS: Record<LeadFieldName, Omit<FieldSpec, "required">> = {
  name: { name: "name", label: "Your name", type: "text", autoComplete: "name", half: true },
  phone: { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", half: true },
  email: { name: "email", label: "Email", type: "email", autoComplete: "email", half: true },
  postalCode: { name: "postalCode", label: "ZIP code", type: "text", autoComplete: "postal-code", half: true, maxLength: 10 },
  address: { name: "address", label: "Project address", type: "text", autoComplete: "street-address" },
  service: { name: "service", label: "What do you need?", type: "select" },
  timeline: { name: "timeline", label: "Timeline", type: "select" },
  contactPreference: {
    name: "contactPreference",
    label: "Best way to reach you",
    type: "radio",
    options: ["Phone call", "Text message", "Email"],
  },
  message: {
    name: "message",
    label: "Tell us about the project",
    type: "textarea",
    maxLength: 2000,
    placeholder: "A few details help us prepare: age of the roof, rooms involved, photos you can send later…",
  },
};

export function tenantLeadFields(site: SiteConfig): FieldSpec[] {
  return site.leadForm.fields.map((field) => {
    const base = TENANT_FIELD_DEFAULTS[field.name];
    const spec: FieldSpec = { ...base, required: field.required, label: field.label ?? base.label };
    if (field.name === "service") spec.options = [...site.services.map((s) => s.name), "Something else"];
    if (field.name === "timeline") spec.options = site.leadForm.timelineOptions ?? [];
    return spec;
  });
}
