"use client";

import { useEffect } from "react";

/**
 * Conversion tracking hook point. Elements with data-track="<event>" (phone
 * links, quote buttons) are reported through one delegated listener. Events go
 * to window.dataLayer when a tag manager/GA4 is configured, and nowhere
 * otherwise. Provider scripts are intentionally not loaded in Phase 1.
 */
export function ConversionTracking({ siteSlug }: { siteSlug: string }) {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (!target) return;
      trackEvent(target.dataset.track ?? "click", { site: siteSlug });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [siteSlug]);
  return null;
}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackEvent(event: string, params: Record<string, string> = {}) {
  window.dataLayer?.push({ event, ...params });
}
