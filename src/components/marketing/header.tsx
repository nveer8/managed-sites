import Link from "next/link";
import { brand } from "@/brand/brand";
import { MobileNav } from "@/components/site/layout/mobile-nav";
import { BrandMark } from "./brand-mark";
import { marketingNav } from "./nav";

export function MarketingHeader() {
  return (
    <header data-tone="default" className="sticky top-0 z-30 border-b border-line">
      <div className="container-site relative flex min-h-[4.25rem] items-center justify-between gap-6">
        <BrandMark />
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {marketingNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-[0.95rem] font-medium no-underline hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/contact" className="btn btn-primary hidden min-h-11 lg:inline-flex">
            Get your free website review
          </Link>
          <MobileNav items={[...marketingNav]} ctaLabel={brand.primaryCta} ctaHref="/contact" />
        </div>
      </div>
    </header>
  );
}
