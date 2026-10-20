import Link from "next/link";
import { siteHref, type SiteContext } from "@/engine/site-context";
import { Icon } from "./icon";

export function quoteHref(ctx: SiteContext): string {
  return `${siteHref(ctx, "/contact")}#quote`;
}

export function PhoneLink({
  ctx,
  className = "",
  showIcon = true,
  label,
}: {
  ctx: SiteContext;
  className?: string;
  showIcon?: boolean;
  label?: string;
}) {
  const { phone } = ctx.site.business;
  return (
    <a href={`tel:${phone.e164}`} className={className} data-track="phone_click">
      {showIcon ? <Icon name="phone" className="size-[1.1em] shrink-0" /> : null}
      <span>{label ?? phone.display}</span>
    </a>
  );
}

/** Primary + secondary call to action, driven by the tenant's CtaConfig. */
export function CtaButtons({
  ctx,
  size = "md",
  align = "start",
  showReassurance = false,
  className = "",
}: {
  ctx: SiteContext;
  size?: "md" | "lg";
  align?: "start" | "center";
  showReassurance?: boolean;
  className?: string;
}) {
  const { cta, business } = ctx.site;
  const sizeClass = size === "lg" ? "btn-lg" : "";
  const primary =
    cta.primaryAction === "call" ? (
      <PhoneLink ctx={ctx} className={`btn btn-primary ${sizeClass}`} label={cta.primaryLabel} />
    ) : (
      <Link href={quoteHref(ctx)} className={`btn btn-primary ${sizeClass}`} data-track="quote_click">
        {cta.primaryLabel}
      </Link>
    );

  const secondary =
    cta.primaryAction === "quote" && cta.showPhone ? (
      <PhoneLink ctx={ctx} className={`btn btn-secondary ${sizeClass}`} label={`Call ${business.phone.display}`} />
    ) : cta.primaryAction === "call" ? (
      <Link href={quoteHref(ctx)} className={`btn btn-secondary ${sizeClass}`} data-track="quote_click">
        Request an estimate
      </Link>
    ) : null;

  return (
    <div className={`flex flex-col gap-3 ${align === "center" ? "items-center" : "items-start"} ${className}`}>
      <div className={`flex flex-wrap gap-3 ${align === "center" ? "justify-center" : ""}`}>
        {primary}
        {secondary}
      </div>
      {showReassurance && cta.reassurance ? <p className="text-sm text-muted">{cta.reassurance}</p> : null}
    </div>
  );
}
