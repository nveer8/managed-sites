import type { Metadata } from "next";
import { marketingSiteUrl } from "@/brand/brand";
import { FONT_KEYS } from "@/engine/theme/fonts";
import { fontVariablesClassName } from "@/engine/theme/font-loader";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(marketingSiteUrl()),
};

/**
 * Root shell shared by the marketing site and every tenant site. Font
 * variables for the whole registry are declared here; browsers only download
 * the faces a page actually uses.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVariablesClassName(FONT_KEYS)}>
      <body>{children}</body>
    </html>
  );
}
