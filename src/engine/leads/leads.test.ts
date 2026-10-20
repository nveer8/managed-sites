import { describe, expect, it, vi } from "vitest";
import { cloneSite } from "../../../test/fixtures";
import { redesignRequestFields } from "@/brand/redesign-form";
import { tenantLeadFields } from "./fields";
import { formDataToRecord, processLead } from "./process";
import { checkSpam, HONEYPOT_FIELD, STARTED_AT_FIELD } from "./spam";
import { createMemoryTransport, createWebhookTransport, consoleTransport, leadTransportFromEnv } from "./transport";
import { validateLead } from "./validate";

const site = cloneSite();
const specs = tenantLeadFields(site);
const valid = { name: "Jo Homeowner", phone: "(303) 555-0100", postalCode: "80215", service: "Roof Repair" };

describe("tenantLeadFields", () => {
  it("builds fields from config with tenant services as options", () => {
    expect(specs.map((s) => s.name)).toEqual(["name", "phone", "email", "postalCode", "service", "message"]);
    expect(specs.find((s) => s.name === "service")?.options).toEqual([...site.services.map((s) => s.name), "Something else"]);
    expect(specs.find((s) => s.name === "message")?.label).toBe("What's going on with the roof?");
  });
});

describe("validateLead", () => {
  it("accepts a valid submission and drops unknown keys", () => {
    const result = validateLead(specs, { ...valid, email: "JO@Example.com", injected: "x" });
    expect(result).toEqual({ ok: true, data: { ...valid, email: "jo@example.com" } });
  });

  it("reports required, format and option errors", () => {
    const result = validateLead(specs, { name: " ", phone: "123", email: "nope", postalCode: "80215", service: "Plumbing" });
    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(Object.keys(result.errors).sort()).toEqual(["email", "name", "phone", "service"]);
    expect(result.errors.name).toBe("Your name is required.");
  });

  it("normalizes website URLs on the redesign form", () => {
    const result = validateLead(redesignRequestFields, {
      name: "A",
      business: "B Roofing",
      website: "broofing.com",
      trade: "Roofing",
      location: "Boise, ID",
      email: "a@b.co",
    });
    expect(result).toMatchObject({ ok: true, data: { website: "https://broofing.com/" } });
    expect(validateLead(redesignRequestFields, { website: "not a url" })).toMatchObject({ ok: false, errors: { website: expect.any(String) } });
  });

  it("enforces max length", () => {
    const result = validateLead(specs, { ...valid, message: "x".repeat(2001) });
    expect(result).toMatchObject({ ok: false, errors: { message: expect.stringMatching(/2000/) } });
  });
});

describe("spam checks", () => {
  it("flags a filled honeypot and too-fast submissions", () => {
    expect(checkSpam({ [HONEYPOT_FIELD]: "buy now" }, 10_000)).toBe("honeypot");
    expect(checkSpam({ [STARTED_AT_FIELD]: "9000" }, 10_000)).toBe("too-fast");
    expect(checkSpam({ [STARTED_AT_FIELD]: "1000" }, 10_000)).toBe("ok");
  });

  it("does not penalize visitors without JavaScript", () => {
    expect(checkSpam({ [STARTED_AT_FIELD]: "" }, 10_000)).toBe("ok");
  });
});

describe("processLead", () => {
  const base = { siteSlug: site.slug, formKind: "quote" as const, specs, now: 50_000, createId: () => "lead_1" };

  it("sends valid leads through the transport", async () => {
    const { transport, sent } = createMemoryTransport();
    const state = await processLead({ ...base, raw: { ...valid, [STARTED_AT_FIELD]: "1000" }, transport });
    expect(state).toEqual({ status: "success" });
    expect(sent).toEqual([
      { id: "lead_1", siteSlug: site.slug, formKind: "quote", fields: valid, submittedAt: new Date(50_000).toISOString() },
    ]);
  });

  it("returns field errors and echoes values without sending", async () => {
    const { transport, sent } = createMemoryTransport();
    const state = await processLead({ ...base, raw: { ...valid, phone: "12" }, transport });
    expect(state.status).toBe("error");
    expect(state.fieldErrors).toHaveProperty("phone");
    expect(state.values?.name).toBe(valid.name);
    expect(sent).toHaveLength(0);
  });

  it("silently drops spam with a success response", async () => {
    const { transport, sent } = createMemoryTransport();
    const state = await processLead({ ...base, raw: { ...valid, [HONEYPOT_FIELD]: "x" }, transport });
    expect(state).toEqual({ status: "success" });
    expect(sent).toHaveLength(0);
  });

  it("reports transport failures to the visitor", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const { transport } = createMemoryTransport({ fail: true });
    const state = await processLead({ ...base, raw: valid, transport });
    expect(state.status).toBe("error");
    expect(state.message).toMatch(/call us/);
  });

  it("reads string entries from FormData", () => {
    const fd = new FormData();
    fd.set("name", "Jo");
    fd.set("$ACTION_ID_abc", "");
    expect(formDataToRecord(fd)).toEqual({ name: "Jo" });
  });
});

describe("transports", () => {
  it("defaults to console and uses a webhook only when configured", () => {
    expect(leadTransportFromEnv({})).toBe(consoleTransport);
    expect(leadTransportFromEnv({ LEAD_WEBHOOK_URL: "https://hooks.test/x" }).name).toBe("webhook");
  });

  it("posts JSON to the webhook and surfaces HTTP errors", async () => {
    const fetchImpl = vi.fn(async () => new Response(null, { status: 500 }));
    const transport = createWebhookTransport("https://hooks.test/x", fetchImpl as unknown as typeof fetch);
    const result = await transport.send({ id: "1", siteSlug: "s", formKind: "quote", fields: {}, submittedAt: "t" });
    expect(result).toEqual({ ok: false, error: "webhook responded 500" });
    expect(fetchImpl).toHaveBeenCalledWith("https://hooks.test/x", expect.objectContaining({ method: "POST" }));
  });
});
