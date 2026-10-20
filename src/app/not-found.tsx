import Link from "next/link";
import { brandTheme } from "@/brand/brand";
import { themeDataAttributes, themeToCssVariables } from "@/engine/theme/theme-style";

export default function NotFound() {
  return (
    <main
      className="theme-root grid min-h-svh place-items-center p-8 text-center"
      style={themeToCssVariables(brandTheme)}
      {...themeDataAttributes(brandTheme)}
    >
      <div className="flex flex-col items-center gap-5">
        <p className="eyebrow">404</p>
        <h1 className="text-h2">This page doesn’t exist.</h1>
        <Link href="/" className="btn btn-primary">
          Go to the home page
        </Link>
      </div>
    </main>
  );
}
