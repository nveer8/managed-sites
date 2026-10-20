import Link from "next/link";
import { brand } from "@/brand/brand";
import type { SiteContext } from "@/engine/site-context";

/** Shown on every page of a demo tenant so the concept is never mistaken for a real business. */
export function DemoBanner({ ctx }: { ctx: SiteContext }) {
  if (ctx.site.status !== "demo") return null;
  return (
    <div className="bg-[#111] px-4 py-2 text-center text-[0.8rem] leading-snug text-[#f2f2f2]" role="note">
      <strong className="font-semibold">Concept site.</strong> {ctx.site.business.name} is a fictional business built
      to demonstrate the {brand.name} site engine. Reviews and projects are samples.{" "}
      {ctx.route.mode === "preview" ? (
        <Link href="/examples" className="underline underline-offset-2">
          See all examples
        </Link>
      ) : null}
    </div>
  );
}
