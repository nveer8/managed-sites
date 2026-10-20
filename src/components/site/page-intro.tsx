import Link from "next/link";
import { siteHref, type SiteContext } from "@/engine/site-context";

export interface Crumb {
  name: string;
  path: string;
}

/** Heading band for inner pages, with breadcrumbs. */
export function PageIntro({
  ctx,
  heading,
  intro,
  crumbs,
  eyebrow,
  children,
}: {
  ctx: SiteContext;
  heading: string;
  intro?: string;
  crumbs: Crumb[];
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  return (
    <section data-tone="alt" aria-labelledby="page-heading" className="py-[calc(var(--section-y)*0.75)]">
      <div className="container-site flex flex-col gap-5">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
            {crumbs.map((crumb, i) => (
              <li key={crumb.path} className="flex items-center gap-2">
                {i > 0 ? <span aria-hidden="true">/</span> : null}
                {i === crumbs.length - 1 ? (
                  <span aria-current="page">{crumb.name}</span>
                ) : (
                  <Link href={siteHref(ctx, crumb.path)} className="hover:text-ink">
                    {crumb.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 id="page-heading" className="text-h1 max-w-4xl">
          {heading}
        </h1>
        {intro ? <p className="text-lead max-w-2xl text-muted">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}
