import Link from "next/link";
import Image from "next/image";
import type { Logo as LogoConfig } from "@/engine/schema/types";

function Mark({ mark }: { mark: LogoConfig["mark"] }) {
  const common = {
    viewBox: "0 0 32 32",
    className: "size-8 shrink-0 text-primary",
    "aria-hidden": true,
    focusable: false,
  } as const;
  switch (mark) {
    case "peak":
      return (
        <svg {...common}>
          <path d="M2 24 16 8l14 16h-6L16 15l-8 9z" fill="currentColor" />
          <path d="M11 24h10" stroke="var(--c-accent)" strokeWidth="3" />
        </svg>
      );
    case "brush":
      return (
        <svg {...common}>
          <rect x="4" y="5" width="24" height="10" rx="3" fill="currentColor" />
          <path d="M16 15v4M16 19h0" stroke="currentColor" strokeWidth="3" />
          <rect x="13" y="19" width="6" height="10" rx="2" fill="var(--c-accent)" />
        </svg>
      );
    case "drop":
      return (
        <svg {...common}>
          <path d="M16 3c5 7 9 11.5 9 16a9 9 0 0 1-18 0c0-4.5 4-9 9-16z" fill="none" stroke="currentColor" strokeWidth="2.25" />
          <path d="M11 20a5 5 0 0 0 5 5" stroke="var(--c-accent)" strokeWidth="2.25" fill="none" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

export function Logo({
  logo,
  href,
  size = "md",
  align = "start",
}: {
  logo: LogoConfig;
  href: string;
  size?: "md" | "lg";
  align?: "start" | "center";
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-3 no-underline ${align === "center" ? "justify-center" : ""}`}
      aria-label={`${logo.text} home`}
    >
      {logo.image?.src ? (
        <Image
          src={logo.image.src}
          alt=""
          width={logo.image.width ?? 160}
          height={logo.image.height ?? 48}
          className="h-10 w-auto"
          priority
        />
      ) : (
        <>
          <Mark mark={logo.mark} />
          <span className={`flex flex-col leading-none ${align === "center" ? "items-center" : ""}`}>
            <span
              className={`display ${size === "lg" ? "text-[1.75rem]" : "text-[1.3rem]"} leading-none`}
              style={{ letterSpacing: "var(--ls-display)" }}
            >
              {logo.text}
            </span>
            {logo.tagline ? (
              <span className="mt-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted">{logo.tagline}</span>
            ) : null}
          </span>
        </>
      )}
    </Link>
  );
}
