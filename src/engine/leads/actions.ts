"use server";

import { redesignRequestFields } from "@/brand/redesign-form";
import { tenantRepository } from "@/engine/tenancy/registry";
import { SITE_SLUG_FIELD, tenantLeadFields } from "./fields";
import { formDataToRecord, processLead, type LeadActionState } from "./process";
import { leadTransportFromEnv } from "./transport";

/** Quote/contact form on a tenant site. The tenant is re-resolved from the posted slug. */
export async function submitTenantLead(_prev: LeadActionState, formData: FormData): Promise<LeadActionState> {
  const raw = formDataToRecord(formData);
  const site = await tenantRepository.getSiteBySlug(raw[SITE_SLUG_FIELD] ?? "");
  if (!site) return { status: "error", message: "This form is not available right now. Please call us instead." };

  return processLead({
    siteSlug: site.slug,
    formKind: "quote",
    specs: tenantLeadFields(site),
    raw,
    transport: leadTransportFromEnv(),
  });
}

/** Redesign request on the company marketing site. */
export async function submitRedesignRequest(_prev: LeadActionState, formData: FormData): Promise<LeadActionState> {
  return processLead({
    siteSlug: "platform",
    formKind: "redesign-request",
    specs: redesignRequestFields,
    raw: formDataToRecord(formData),
    transport: leadTransportFromEnv(),
  });
}
