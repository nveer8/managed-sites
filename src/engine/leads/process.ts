import type { FieldSpec } from "./fields";
import { checkSpam } from "./spam";
import type { LeadSubmission, LeadTransport } from "./transport";
import { validateLead, type FieldErrors } from "./validate";

export interface LeadActionState {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: FieldErrors;
  /** Echoed back so a no-JS submission with errors keeps what the visitor typed. */
  values?: Record<string, string>;
}

export const initialLeadState: LeadActionState = { status: "idle" };

export interface ProcessLeadInput {
  siteSlug: string;
  formKind: LeadSubmission["formKind"];
  specs: FieldSpec[];
  raw: Record<string, string | undefined>;
  transport: LeadTransport;
  now?: number;
  createId?: () => string;
}

/** Shared server-side pipeline: spam check → validation → transport. */
export async function processLead(input: ProcessLeadInput): Promise<LeadActionState> {
  const now = input.now ?? Date.now();

  // Bots get the same success response as people, so they learn nothing.
  if (checkSpam(input.raw, now) !== "ok") return { status: "success" };

  const result = validateLead(input.specs, input.raw);
  if (!result.ok) {
    return {
      status: "error",
      message: "Please check the highlighted fields.",
      fieldErrors: result.errors,
      values: echo(input.specs, input.raw),
    };
  }

  const lead: LeadSubmission = {
    id: (input.createId ?? (() => crypto.randomUUID()))(),
    siteSlug: input.siteSlug,
    formKind: input.formKind,
    fields: result.data,
    submittedAt: new Date(now).toISOString(),
  };

  const sent = await input.transport.send(lead);
  if (!sent.ok) {
    console.error(`[lead] transport "${input.transport.name}" failed: ${sent.error}`);
    return {
      status: "error",
      message: "Something went wrong sending your request. Please try again or call us directly.",
      values: echo(input.specs, input.raw),
    };
  }
  return { status: "success" };
}

export function formDataToRecord(formData: FormData): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string" && !key.startsWith("$ACTION")) out[key] = value;
  }
  return out;
}

function echo(specs: FieldSpec[], raw: Record<string, string | undefined>): Record<string, string> {
  return Object.fromEntries(specs.map((s) => [s.name, (raw[s.name] ?? "").slice(0, 2000)]));
}
