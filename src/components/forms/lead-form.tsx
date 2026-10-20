"use client";

import { useActionState, useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { FieldSpec } from "@/engine/leads/fields";
import { initialLeadState, type LeadActionState } from "@/engine/leads/process";
import { HONEYPOT_FIELD, STARTED_AT_FIELD } from "@/engine/leads/spam";
import { validateLead, type FieldErrors } from "@/engine/leads/validate";

export interface LeadFormProps {
  /** Server action. The form works without JavaScript through it. */
  action: (state: LeadActionState, formData: FormData) => Promise<LeadActionState>;
  specs: FieldSpec[];
  /** Extra hidden inputs, e.g. the tenant slug. */
  hidden?: Record<string, string>;
  submitLabel: string;
  successHeading: string;
  successMessage: string;
  privacyNote?: string;
  /** Accessible name for the form. */
  label: string;
}

/**
 * Shared quote/contact form. Validates in the browser with the same rules the
 * server enforces, shows an error summary plus inline errors, and replaces
 * itself with a confirmation on success.
 */
export function LeadForm(props: LeadFormProps) {
  const [state, formAction, pending] = useActionState(props.action, initialLeadState);
  const [clientErrors, setClientErrors] = useState<FieldErrors | null>(null);
  const formId = useId();
  const startedRef = useRef<HTMLInputElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (startedRef.current && !startedRef.current.value) startedRef.current.value = String(Date.now());
  }, []);

  useEffect(() => {
    if (state.status === "success") successRef.current?.focus();
    if (state.status === "error") summaryRef.current?.focus();
  }, [state]);

  const errors = clientErrors ?? state.fieldErrors ?? {};
  const errorEntries = Object.entries(errors);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    const values = Object.fromEntries(
      [...new FormData(event.currentTarget).entries()].map(([k, v]) => [k, typeof v === "string" ? v : ""]),
    );
    const result = validateLead(props.specs, values);
    if (!result.ok) {
      event.preventDefault();
      setClientErrors(result.errors);
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setClientErrors(null);
  }

  if (state.status === "success") {
    return (
      <div role="status" className="flex flex-col gap-3 rounded-card border border-line bg-surface p-8">
        <svg viewBox="0 0 24 24" className="size-10 text-primary" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <circle cx="12" cy="12" r="10" />
          <path d="m7.5 12.5 3 3 6-6.5" />
        </svg>
        <h3 ref={successRef} tabIndex={-1} className="text-h3 outline-none">
          {props.successHeading}
        </h3>
        <p className="text-muted">{props.successMessage}</p>
      </div>
    );
  }

  const hasErrors = errorEntries.length > 0 || (state.status === "error" && !!state.message);

  return (
    <form action={formAction} onSubmit={onSubmit} noValidate aria-label={props.label} className="flex flex-col gap-5">
      <div ref={summaryRef} tabIndex={-1} className="outline-none" aria-live="assertive">
        {hasErrors ? (
          <div className="rounded-control border-2 border-[#c0362c] bg-surface p-4" role="alert">
            <p className="font-semibold field-error">
              {clientErrors ? "Please check the highlighted fields." : (state.message ?? "Please check the highlighted fields.")}
            </p>
            {errorEntries.length ? (
              <ul className="mt-2 list-disc pl-5 text-sm">
                {errorEntries.map(([name, message]) => (
                  <li key={name}>
                    <a href={`#${formId}-${name}`} className="underline">
                      {props.specs.find((s) => s.name === name)?.label}: {message}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {props.specs.map((spec) => (
          <Field
            key={spec.name}
            spec={spec}
            id={`${formId}-${spec.name}`}
            error={errors[spec.name]}
            defaultValue={state.values?.[spec.name]}
          />
        ))}
      </div>

      {Object.entries(props.hidden ?? {}).map(([name, value]) => (
        <input key={name} type="hidden" name={name} value={value} />
      ))}
      <input ref={startedRef} type="hidden" name={STARTED_AT_FIELD} defaultValue="" />
      {/* Honeypot: hidden from people and assistive tech, attractive to bots. */}
      <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
        <label htmlFor={`${formId}-${HONEYPOT_FIELD}`}>Leave this field empty</label>
        <input id={`${formId}-${HONEYPOT_FIELD}`} type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-3 pt-1">
        <button type="submit" className="btn btn-primary btn-lg w-full sm:w-auto sm:self-start" disabled={pending} aria-disabled={pending}>
          {pending ? "Sending…" : props.submitLabel}
        </button>
        {props.privacyNote ? <p className="text-sm text-muted">{props.privacyNote}</p> : null}
      </div>
    </form>
  );
}

function Field({
  spec,
  id,
  error,
  defaultValue,
}: {
  spec: FieldSpec;
  id: string;
  error?: string;
  defaultValue?: string;
}) {
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const describedBy = [spec.hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;
  const span = spec.half ? "" : "sm:col-span-2";

  const label = (
    <span className="flex items-baseline gap-2 font-semibold">
      {spec.label}
      {!spec.required && !spec.label.includes("optional") ? (
        <span className="text-sm font-normal text-muted">Optional</span>
      ) : null}
    </span>
  );
  const messages = (
    <>
      {spec.hint ? (
        <p id={hintId} className="text-sm text-muted">
          {spec.hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="field-error text-sm font-medium">
          {error}
        </p>
      ) : null}
    </>
  );

  if (spec.type === "radio") {
    return (
      <fieldset
        className={`flex flex-col gap-2 ${span}`}
        aria-describedby={describedBy}
        aria-invalid={error ? true : undefined}
        id={id}
        tabIndex={-1}
      >
        <legend className="mb-2">{label}</legend>
        <div className="flex flex-wrap gap-3">
          {spec.options?.map((option) => (
            <label key={option} className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-control border border-line px-4 has-[:checked]:border-primary">
              <input
                type="radio"
                name={spec.name}
                value={option}
                defaultChecked={defaultValue === option}
                className="size-4 accent-[var(--c-primary)]"
              />
              {option}
            </label>
          ))}
        </div>
        {messages}
      </fieldset>
    );
  }

  const common = {
    id,
    name: spec.name,
    required: spec.required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    defaultValue,
    className: "field-control",
  } as const;

  return (
    <div className={`flex flex-col gap-2 ${span}`}>
      <label htmlFor={id}>{label}</label>
      {spec.type === "textarea" ? (
        <textarea {...common} rows={4} maxLength={spec.maxLength} placeholder={spec.placeholder} />
      ) : spec.type === "select" ? (
        <select {...common} defaultValue={defaultValue ?? ""}>
          <option value="" disabled>
            Choose one…
          </option>
          {spec.options?.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          {...common}
          type={spec.type}
          autoComplete={spec.autoComplete}
          inputMode={spec.type === "tel" ? "tel" : spec.type === "email" ? "email" : undefined}
          maxLength={spec.maxLength}
          placeholder={spec.placeholder}
        />
      )}
      {messages}
    </div>
  );
}
