"use client";

import { useId, useState, type ReactNode } from "react";

/**
 * Before/after comparison. A native range input drives the split, so it is
 * keyboard and screen-reader operable without custom ARIA.
 */
export function ComparisonSlider({
  before,
  after,
  label,
  aspect = "4 / 3",
}: {
  before: ReactNode;
  after: ReactNode;
  label: string;
  aspect?: string;
}) {
  const [position, setPosition] = useState(50);
  const inputId = useId();

  return (
    <div
      className="media-frame select-none has-[input:focus-visible]:outline-[3px] has-[input:focus-visible]:outline-offset-4 has-[input:focus-visible]:outline-accent"
      style={{ aspectRatio: aspect }}
    >
      <div className="absolute inset-0">{after}</div>
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        {before}
      </div>
      <div
        className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.15)]"
        style={{ left: `${position}%` }}
        aria-hidden="true"
      >
        <span className="absolute top-1/2 left-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-[#111] shadow-lg">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.25" aria-hidden="true">
            <path d="M9 6 3 12l6 6M15 6l6 6-6 6" />
          </svg>
        </span>
      </div>
      <span className="pointer-events-none absolute top-4 left-4 rounded-[3px] bg-black/70 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
        Before
      </span>
      <span className="pointer-events-none absolute top-4 right-4 rounded-[3px] bg-black/70 px-2 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white">
        After
      </span>
      <label htmlFor={inputId} className="sr-only">
        {label}: drag to compare before and after
      </label>
      <input
        id={inputId}
        type="range"
        min={0}
        max={100}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        aria-valuetext={`${position}% before image shown`}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0 focus-visible:opacity-0"
      />
    </div>
  );
}
