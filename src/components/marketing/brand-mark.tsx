import Link from "next/link";
import { brand } from "@/brand/brand";

export function BrandMark() {
  return (
    <Link href="/" className="inline-flex items-center gap-2.5 no-underline" aria-label={`${brand.name} home`}>
      <svg viewBox="0 0 28 28" className="size-7 text-primary" aria-hidden="true">
        <rect width="28" height="28" rx="6" fill="currentColor" />
        <path d="M7 15.5 14 9l7 6.5V21H7z" fill="var(--c-bg)" />
        <rect x="12" y="16" width="4" height="5" fill="var(--c-accent)" />
      </svg>
      <span className="display text-[1.35rem] leading-none">{brand.name}</span>
    </Link>
  );
}
