import type { Metadata } from "next";
import { brand, brandTheme } from "@/brand/brand";
import { MarketingFooter } from "@/components/marketing/footer";
import { MarketingHeader } from "@/components/marketing/header";
import { themeDataAttributes, themeToCssVariables } from "@/engine/theme/theme-style";

export const metadata: Metadata = {
  title: { default: `${brand.name} | ${brand.positioning}`, template: `%s | ${brand.name}` },
  description:
    "We design, build, host and maintain modern websites for roofers, painters, remodelers and other home-service businesses. $999 setup, $299/month.",
  openGraph: { type: "website", siteName: brand.name, locale: "en_US" },
};

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-root flex min-h-svh flex-col" style={themeToCssVariables(brandTheme, "wide")} {...themeDataAttributes(brandTheme)}>
      <a href="#main" className="sr-only-focusable">
        Skip to content
      </a>
      <MarketingHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <MarketingFooter />
    </div>
  );
}
