import Image from "next/image";
import type { MediaAsset } from "@/engine/schema/types";
import { PlaceholderArt } from "./placeholder-art";

/**
 * Renders a tenant image: an optimized next/image when the asset has a real
 * `src`, otherwise the on-brand placeholder illustration. Always reserves
 * space with aspect-ratio to avoid layout shift.
 */
export function SiteImage({
  media,
  aspect,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  priority = false,
  className = "",
  framed = true,
}: {
  media: MediaAsset;
  /** CSS aspect-ratio, e.g. "4 / 3". Omit to fill the parent. */
  aspect?: string;
  sizes?: string;
  /** Set for the LCP image (hero). */
  priority?: boolean;
  className?: string;
  /** Apply the theme's media frame treatment. */
  framed?: boolean;
}) {
  const style = aspect ? { aspectRatio: aspect } : { height: "100%" };
  const frameClass = framed ? "media-frame" : "relative overflow-hidden";

  if (media.src) {
    return (
      <div className={`${frameClass} ${className}`} style={style}>
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${frameClass} ${className}`} style={style} role="img" aria-label={media.alt}>
      <PlaceholderArt subject={media.placeholder ?? "house"} condition={media.condition} />
    </div>
  );
}
