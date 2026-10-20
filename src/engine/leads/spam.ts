/**
 * Lightweight bot defenses that need no third-party service.
 *
 * - Honeypot: a visually hidden field humans never fill.
 * - Fill time: the client stamps when the form became interactive; very fast
 *   submissions are bots. Without JavaScript the stamp is absent and the check
 *   is skipped, so no-JS visitors are never penalized.
 *
 * A CAPTCHA/Turnstile check can be added behind the same `checkSpam` call.
 */

export const HONEYPOT_FIELD = "office_fax";
export const STARTED_AT_FIELD = "form_started_at";
export const MIN_FILL_MS = 2500;

export type SpamVerdict = "ok" | "honeypot" | "too-fast";

export function checkSpam(raw: Record<string, string | undefined>, now: number): SpamVerdict {
  if ((raw[HONEYPOT_FIELD] ?? "").trim() !== "") return "honeypot";
  const started = Number(raw[STARTED_AT_FIELD]);
  if (Number.isFinite(started) && started > 0 && now - started < MIN_FILL_MS) return "too-fast";
  return "ok";
}
