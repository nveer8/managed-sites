"use client";

import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";

/** Disclosure menu for small screens. The desktop nav is plain server-rendered links. */
export function MobileNav({
  items,
  ctaLabel,
  ctaHref,
  phone,
}: {
  items: { label: string; href: string }[];
  ctaLabel: string;
  ctaHref: string;
  phone?: { display: string; e164: string };
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-control border border-line px-3 text-sm font-semibold"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
        <span>{open ? "Close" : "Menu"}</span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        className="absolute inset-x-0 top-full z-40 border-b border-line bg-bg shadow-[0_24px_40px_-24px_rgb(0_0_0/0.35)]"
      >
        <nav aria-label="Mobile" className="container-site flex flex-col py-4">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="border-b border-line py-4 text-lg font-semibold no-underline"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <div className="flex flex-col gap-3 pt-5">
            <Link href={ctaHref} className="btn btn-primary" onClick={() => setOpen(false)} data-track="quote_click">
              {ctaLabel}
            </Link>
            {phone ? (
              <a href={`tel:${phone.e164}`} className="btn btn-secondary" data-track="phone_click">
                Call {phone.display}
              </a>
            ) : null}
          </div>
        </nav>
      </div>
    </div>
  );
}
