import Link from "next/link";
import type { SiteContext } from "@/engine/site-context";
import { Icon } from "../primitives/icon";
import { quoteHref } from "../primitives/cta";

/** Sticky two-button bar on small screens: the fastest path to a call or quote. */
export function MobileCallBar({ ctx }: { ctx: SiteContext }) {
  if (!ctx.site.cta.mobileBar) return null;
  const { phone } = ctx.site.business;
  return (
    <div
      data-tone="default"
      className="mobile-bar fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 gap-2 border-t border-line p-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden"
    >
      <a href={`tel:${phone.e164}`} className="btn btn-secondary min-h-12 px-3" data-track="phone_click">
        <Icon name="phone" className="size-5" />
        Call now
      </a>
      <Link href={quoteHref(ctx)} className="btn btn-primary min-h-12 px-3" data-track="quote_click">
        {ctx.site.cta.mobileLabel ?? "Free estimate"}
      </Link>
    </div>
  );
}
