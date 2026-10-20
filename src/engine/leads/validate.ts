import type { FieldSpec } from "./fields";

export type FieldErrors = Record<string, string>;

export type ValidationResult =
  | { ok: true; data: Record<string, string> }
  | { ok: false; errors: FieldErrors };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Validates submitted values against field specs. Runs in the browser for
 * instant feedback and again on the server, which is the authority.
 * Unknown keys are dropped.
 */
export function validateLead(specs: FieldSpec[], values: Record<string, string | undefined>): ValidationResult {
  const errors: FieldErrors = {};
  const data: Record<string, string> = {};

  for (const spec of specs) {
    const value = (values[spec.name] ?? "").trim();
    const max = spec.maxLength ?? (spec.type === "textarea" ? 2000 : 200);

    if (!value) {
      if (spec.required) errors[spec.name] = requiredMessage(spec);
      continue;
    }
    if (value.length > max) {
      errors[spec.name] = `Please keep this under ${max} characters.`;
      continue;
    }

    const error = checkFormat(spec, value);
    if (error) errors[spec.name] = error;
    else data[spec.name] = normalize(spec, value);
  }

  return Object.keys(errors).length > 0 ? { ok: false, errors } : { ok: true, data };
}

function requiredMessage(spec: FieldSpec): string {
  if (spec.type === "select" || spec.type === "radio") return "Please choose an option.";
  if (spec.type === "email") return "Please enter your email.";
  if (spec.type === "tel") return "Please enter a phone number.";
  return `${spec.label} is required.`;
}

function checkFormat(spec: FieldSpec, value: string): string | null {
  switch (spec.type) {
    case "email":
      return EMAIL.test(value) ? null : "Please enter a valid email, like name@example.com.";
    case "tel": {
      const digits = value.replace(/\D/g, "");
      const ok = digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
      return ok ? null : "Please enter a 10-digit phone number.";
    }
    case "url":
      return toUrl(value) ? null : "Please enter a web address, like yourcompany.com.";
    case "select":
    case "radio":
      return spec.options?.includes(value) ? null : "Please choose one of the listed options.";
    default:
      return null;
  }
}

function normalize(spec: FieldSpec, value: string): string {
  if (spec.type === "url") return toUrl(value) ?? value;
  if (spec.type === "email") return value.toLowerCase();
  return value;
}

function toUrl(value: string): string | null {
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`;
  try {
    const url = new URL(candidate);
    return url.hostname.includes(".") ? url.toString() : null;
  } catch {
    return null;
  }
}
