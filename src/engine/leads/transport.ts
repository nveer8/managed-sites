/**
 * Where validated leads go. Phase 1 logs them; a production transport (email
 * vendor, CRM, webhook into an automation tool) implements the same interface.
 */

export interface LeadSubmission {
  id: string;
  /** Tenant slug, or "platform" for the company's own marketing site. */
  siteSlug: string;
  formKind: "quote" | "redesign-request";
  fields: Record<string, string>;
  submittedAt: string;
}

export type LeadTransportResult = { ok: true } | { ok: false; error: string };

export interface LeadTransport {
  readonly name: string;
  send(lead: LeadSubmission): Promise<LeadTransportResult>;
}

/** Development default. Logs field names, not values, to keep personal data out of logs. */
export const consoleTransport: LeadTransport = {
  name: "console",
  async send(lead) {
    console.info(
      `[lead] ${lead.formKind} for ${lead.siteSlug} (${lead.id}) fields=${Object.keys(lead.fields).join(",")}`,
    );
    return { ok: true };
  },
};

/** Test transport that keeps submissions in memory. */
export function createMemoryTransport(options: { fail?: boolean } = {}) {
  const sent: LeadSubmission[] = [];
  const transport: LeadTransport = {
    name: "memory",
    async send(lead) {
      if (options.fail) return { ok: false, error: "memory transport set to fail" };
      sent.push(lead);
      return { ok: true };
    },
  };
  return { transport, sent };
}

/** POSTs the lead as JSON. Only used when LEAD_WEBHOOK_URL is configured. */
export function createWebhookTransport(url: string, fetchImpl: typeof fetch = fetch): LeadTransport {
  return {
    name: "webhook",
    async send(lead) {
      try {
        const res = await fetchImpl(url, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(lead),
          signal: AbortSignal.timeout(8000),
        });
        return res.ok ? { ok: true } : { ok: false, error: `webhook responded ${res.status}` };
      } catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : "webhook request failed" };
      }
    },
  };
}

export function leadTransportFromEnv(env: Record<string, string | undefined> = process.env): LeadTransport {
  return env.LEAD_WEBHOOK_URL ? createWebhookTransport(env.LEAD_WEBHOOK_URL) : consoleTransport;
}
