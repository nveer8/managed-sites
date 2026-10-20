import type { MetadataRoute } from "next";
import { marketingSiteUrl } from "@/brand/brand";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = marketingSiteUrl();
  return ["", "/how-it-works", "/examples", "/pricing", "/faq", "/contact"].map((path) => ({
    url: `${base}${path}`,
    priority: path === "" ? 1 : 0.7,
  }));
}
