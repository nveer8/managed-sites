import Link from "next/link";
import { brand } from "@/brand/brand";
import { BrandMark } from "./brand-mark";
import { marketingNav } from "./nav";

export function MarketingFooter() {
  return (
    <footer data-tone="inverse" className="py-14">
      <div className="container-site flex flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start">
          <div className="flex max-w-sm flex-col gap-3">
            <BrandMark />
            <p className="text-muted">{brand.positioning}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-12 gap-y-2">
              {[...marketingNav, { label: "Contact", href: "/contact" }].map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-muted no-underline hover:text-ink">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a href={`mailto:${brand.email}`} className="text-muted">
            {brand.email}
          </a>
        </div>
        <p className="border-t border-line pt-6 text-sm text-muted">
          © {new Date().getFullYear()} {brand.name}
          {brand.isWorkingName ? " (working name)" : ""}. Example sites shown are fictional concept businesses.
        </p>
      </div>
    </footer>
  );
}
