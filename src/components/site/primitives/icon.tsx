import type { ReactNode } from "react";
import type { IconName } from "@/engine/schema/types";

/** Small line-icon set for contractor sites. Decorative unless given a label. */
const PATHS: Record<IconName, ReactNode> = {
  roof: <path d="M2 12 12 4l10 8M5 10v10h14V10" />,
  gutter: <path d="M3 6h18v3a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zM17 12v8M15 20h4" />,
  storm: <path d="M7 15a5 5 0 1 1 1-9.9A6 6 0 0 1 19 8a4 4 0 0 1-1 7.9M13 13l-3 5h4l-3 5" />,
  inspect: <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l5 5M8 11l2 2 4-4" />,
  siding: <path d="M3 5h18M3 9h18M3 13h18M3 17h18M3 21h18" />,
  "paint-roller": <path d="M4 4h13v5H4zM17 6.5h3v6h-8v3M11 15.5h2V22h-2z" />,
  brush: <path d="M14 3l7 7-6 6-7-7zM8 9l-4 4c-1.5 1.5-1 5-1 8 3 0 6.5.5 8-1l4-4" />,
  cabinet: <path d="M4 3h16v18H4zM12 3v18M9.5 11v2M14.5 11v2" />,
  deck: <path d="M2 10h20M4 10v10M20 10v10M2 14h20M2 18h20M7 10V4h10v6" />,
  shower: <path d="M4 21V7a4 4 0 0 1 4-4h0a4 4 0 0 1 4 4M9 9h6M10 13v1M12 13v2M14 13v1M10 17v1M14 17v1" />,
  tub: <path d="M2 12h20v2a6 6 0 0 1-6 6H8a6 6 0 0 1-6-6zM5 12V5a2 2 0 0 1 4 0M7 20l-1 2M17 20l1 2" />,
  tile: <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />,
  vanity: <path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM3 14h18M5 14v8h14v-8M12 14v8" />,
  accessible: <path d="M12 2.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM5 8h14M12 8v6l-3 7M12 14l3 7" />,
  shield: <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5zM8.5 12l2.5 2.5 4.5-5" />,
  clock: <path d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2" />,
  phone: (
    <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z" />
  ),
  check: <path d="M4 12.5 9.5 18 20 6" />,
  star: <path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />,
  "map-pin": <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />,
  calendar: <path d="M4 5h16v16H4zM4 10h16M8 3v4M16 3v4" />,
  ruler: <path d="M3 17 17 3l4 4L7 21zM7 13l2 2M10 10l2 2M13 7l2 2" />,
  home: <path d="M3 11 12 3l9 8M5 9.5V21h5v-6h4v6h5V9.5" />,
};

export function Icon({
  name,
  className = "size-6",
  label,
  strokeWidth = 1.75,
}: {
  name: IconName;
  className?: string;
  label?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {PATHS[name]}
    </svg>
  );
}
