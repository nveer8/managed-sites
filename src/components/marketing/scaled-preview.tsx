"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Renders children at a fixed desktop width and scales them down to fit the
 * container, so real engine output can be shown as a thumbnail. The content
 * is inert: not focusable, not clickable, hidden from assistive tech.
 */
export function ScaledPreview({
  children,
  width = 1280,
  height = 820,
}: {
  children: ReactNode;
  width?: number;
  height?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [width]);

  return (
    <div ref={ref} className="relative w-full overflow-hidden" style={{ aspectRatio: `${width} / ${height}` }} aria-hidden="true">
      <div inert className="pointer-events-none absolute top-0 left-0 origin-top-left" style={{ width, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  );
}
