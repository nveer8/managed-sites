import type { ReactNode } from "react";
import type { SectionTone } from "@/engine/schema/types";

/** A page band. `tone` remaps the color tokens for everything inside. */
export function Section({
  tone = "default",
  id,
  labelledBy,
  className = "",
  innerClassName = "",
  children,
}: {
  tone?: SectionTone;
  id?: string;
  labelledBy?: string;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}) {
  return (
    <section data-tone={tone} id={id} aria-labelledby={labelledBy} className={`section-y ${className}`}>
      <div className={`container-site ${innerClassName}`}>{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  heading,
  intro,
  align = "start",
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  eyebrow?: string;
  heading?: string;
  intro?: string;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
}) {
  if (!heading && !eyebrow && !intro) return null;
  const centered = align === "center";
  return (
    <div className={`flex flex-col gap-4 ${centered ? "items-center text-center mx-auto" : ""} max-w-3xl ${className}`}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      {heading ? (
        <Tag id={id} className={Tag === "h1" ? "text-h1" : "text-h2"}>
          {heading}
        </Tag>
      ) : null}
      {intro ? <p className="text-lead text-muted max-w-2xl">{intro}</p> : null}
    </div>
  );
}
