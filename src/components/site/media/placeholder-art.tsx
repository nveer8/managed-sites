import type { ReactNode } from "react";
import type { PlaceholderSubject } from "@/engine/schema/types";

/**
 * Art-directed placeholder illustrations.
 *
 * Demo tenants ship without photography (no stock or copyrighted images in the
 * repo). Each subject is a flat architectural illustration drawn with the
 * tenant's --art-* palette, so placeholders look intentional and on-brand
 * until real project photos replace them during fulfillment.
 *
 * Scenes are drawn on an 800×600 canvas and cropped with "slice", so they fill
 * any aspect ratio.
 */

const A1 = "var(--art-1)";
const A2 = "var(--art-2)";
const A3 = "var(--art-3)";
const A4 = "var(--art-4)";
const mix = (a: string, b: string, pct: number) => `color-mix(in oklab, ${a} ${pct}%, ${b})`;
const LIGHT = mix(A2, "#fff", 55);
const SHADE = mix(A1, "#000", 70);

export function PlaceholderArt({
  subject,
  condition = "after",
  className,
}: {
  subject: PlaceholderSubject;
  condition?: "before" | "after";
  className?: string;
}) {
  const id = `ph-${subject}-${condition}`;
  const worn = condition === "before";
  return (
    <svg
      viewBox="0 0 800 600"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ display: "block", width: "100%", height: "100%" }}
    >
      <defs>
        <filter id={`${id}-worn`}>
          <feColorMatrix type="saturate" values="0.18" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="0.82" />
            <feFuncG type="linear" slope="0.8" />
            <feFuncB type="linear" slope="0.76" />
          </feComponentTransfer>
        </filter>
        <pattern id={`${id}-shingle`} width="64" height="56" patternUnits="userSpaceOnUse">
          <rect width="64" height="56" fill={A1} />
          <rect y="28" width="64" height="28" fill={mix(A1, "#000", 90)} />
          <path d="M0 27H64M0 55H64M1 0V27M33 28V55" stroke={SHADE} strokeWidth="2" />
        </pattern>
        <pattern id={`${id}-siding`} width="800" height="26" patternUnits="userSpaceOnUse">
          <rect width="800" height="26" fill={A4} />
          <rect y="22" width="800" height="4" fill={mix(A4, "#000", 78)} />
        </pattern>
        <pattern id={`${id}-tile`} width="80" height="80" patternUnits="userSpaceOnUse">
          <rect width="80" height="80" fill={LIGHT} />
          <path d="M0 79.5H80M79.5 0V80" stroke={mix(A4, "#fff", 45)} strokeWidth="2" />
        </pattern>
        <pattern id={`${id}-zellige`} width="40" height="120" patternUnits="userSpaceOnUse">
          <rect width="40" height="120" fill={A4} />
          <rect x="2" y="2" width="36" height="116" fill={mix(A4, "#fff", 82)} />
        </pattern>
        <pattern id={`${id}-herringbone`} width="60" height="60" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="60" height="60" fill={LIGHT} />
          <rect x="2" y="2" width="56" height="26" fill={mix(A4, "#fff", 60)} />
          <rect x="2" y="32" width="26" height="26" fill={mix(A4, "#fff", 40)} />
          <rect x="32" y="32" width="26" height="26" fill={mix(A4, "#fff", 75)} />
        </pattern>
      </defs>
      <g filter={worn ? `url(#${id}-worn)` : undefined}>{SCENES[subject](id)}</g>
      {worn ? <Wear /> : null}
    </svg>
  );
}

function Wear() {
  return (
    <g opacity="0.55">
      <path d="M120 80c40 30 30 80 80 90s70 60 40 110-90 40-120 0-60-170 0-200z" fill="#3a3229" opacity="0.35" />
      <path d="M560 360c50-10 110 20 120 70s-40 90-100 80-80-40-70-80 10-60 50-70z" fill="#3a3229" opacity="0.3" />
      <path d="M420 0l-30 120 40 60-50 140" stroke="#2a2420" strokeWidth="3" fill="none" opacity="0.5" />
      <path d="M700 120l-60 90 20 70" stroke="#2a2420" strokeWidth="2.5" fill="none" opacity="0.45" />
    </g>
  );
}

const SCENES: Record<PlaceholderSubject, (id: string) => ReactNode> = {
  house: () => (
    <>
      <rect width="800" height="600" fill={A2} />
      <circle cx="640" cy="150" r="90" fill={mix(A3, A2, 70)} />
      <rect y="470" width="800" height="130" fill={mix(A4, "#000", 70)} />
      <rect x="170" y="290" width="460" height="190" fill={LIGHT} />
      <path d="M130 300L400 120L670 300Z" fill={A1} />
      <path d="M130 300L400 120L670 300" stroke={SHADE} strokeWidth="10" fill="none" />
      <rect x="370" y="360" width="62" height="120" fill={A1} />
      <rect x="220" y="340" width="90" height="70" fill={A4} />
      <rect x="490" y="340" width="90" height="70" fill={A4} />
      <path d="M265 340V410M220 375H310M535 340V410M490 375H580" stroke={LIGHT} strokeWidth="5" />
      <rect x="520" y="160" width="40" height="80" fill={mix(A1, "#000", 85)} />
      <circle cx="120" cy="470" r="60" fill={mix(A4, "#000", 60)} />
      <circle cx="700" cy="480" r="48" fill={mix(A4, "#000", 60)} />
    </>
  ),
  roof: (id) => (
    <>
      <rect width="800" height="600" fill={A2} />
      <circle cx="700" cy="90" r="60" fill={mix(A3, A2, 70)} />
      <path d="M-40 600L330 150L860 330V600Z" fill={`url(#${id}-shingle)`} />
      <path d="M-40 600L330 150L860 330" stroke={A3} strokeWidth="12" fill="none" />
      <rect x="520" y="190" width="46" height="110" fill={mix(A1, "#000", 85)} transform="skewY(19)" />
      <path d="M330 150L860 330" stroke={LIGHT} strokeWidth="3" fill="none" opacity="0.6" />
    </>
  ),
  "roof-detail": (id) => (
    <>
      <rect width="800" height="600" fill={`url(#${id}-shingle)`} />
      <path d="M0 210L800 90V150L0 270Z" fill={A3} />
      <path d="M0 270L800 150" stroke={SHADE} strokeWidth="4" />
      <rect x="560" y="300" width="120" height="200" fill={mix(A4, "#000", 85)} />
      <rect x="548" y="290" width="144" height="18" fill={A3} />
    </>
  ),
  interior: () => (
    <>
      <rect width="800" height="600" fill={A2} />
      <rect y="460" width="800" height="140" fill={mix(A4, "#000", 80)} />
      <rect x="470" y="70" width="230" height="300" fill={LIGHT} />
      <path d="M585 70V370M470 220H700" stroke={A2} strokeWidth="10" />
      <rect x="465" y="60" width="240" height="320" fill="none" stroke={A1} strokeWidth="10" />
      <rect x="110" y="150" width="190" height="130" fill={A3} />
      <rect x="110" y="150" width="190" height="130" fill="none" stroke={A1} strokeWidth="8" />
      <rect x="70" y="360" width="340" height="110" rx="24" fill={A1} />
      <rect x="90" y="330" width="300" height="60" rx="20" fill={mix(A1, "#fff", 80)} />
      <path d="M720 460c-10-60 10-120 40-160M720 460c0-50-30-90-60-110" stroke={mix(A4, "#000", 50)} strokeWidth="8" fill="none" />
      <rect x="690" y="440" width="60" height="40" fill={A1} />
    </>
  ),
  "exterior-paint": (id) => (
    <>
      <rect width="800" height="600" fill={`url(#${id}-siding)`} />
      <rect x="120" y="120" width="200" height="260" fill={LIGHT} />
      <rect x="140" y="140" width="160" height="220" fill={A1} />
      <path d="M220 140V360M140 250H300" stroke={LIGHT} strokeWidth="10" />
      <rect x="100" y="372" width="240" height="22" fill={LIGHT} />
      <path d="M470 600L600 40M560 600L690 40" stroke={A3} strokeWidth="14" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${487 + i * 22} ${528 - i * 95}L${577 + i * 22} ${528 - i * 95}`} stroke={A3} strokeWidth="10" />
      ))}
    </>
  ),
  "paint-detail": () => (
    <>
      <rect width="800" height="600" fill={A2} />
      <rect x="0" y="0" width="470" height="600" fill={A4} />
      <path d="M470 0C455 120 488 240 466 360 450 460 480 540 470 600H490V0Z" fill={A4} />
      <rect x="430" y="110" width="250" height="90" rx="14" fill={A3} />
      <rect x="430" y="110" width="250" height="90" rx="14" fill="none" stroke={mix(A3, "#000", 70)} strokeWidth="6" />
      <path d="M680 155H730V290H600V420" stroke={A1} strokeWidth="14" fill="none" strokeLinejoin="round" />
      <rect x="585" y="410" width="30" height="170" rx="10" fill={A1} />
    </>
  ),
  bathroom: (id) => (
    <>
      <rect width="800" height="600" fill={`url(#${id}-tile)`} />
      <rect y="470" width="800" height="130" fill={mix(A4, "#000", 70)} />
      <rect x="520" y="70" width="190" height="250" rx="95" fill={LIGHT} />
      <rect x="520" y="70" width="190" height="250" rx="95" fill="none" stroke={A1} strokeWidth="6" />
      <path d="M150 360H560V400C560 460 510 490 450 490H260C200 490 150 460 150 400Z" fill="#fff" />
      <path d="M150 360H560" stroke={mix(A4, "#000", 60)} strokeWidth="8" />
      <path d="M200 490L190 520M510 490L520 520" stroke={A1} strokeWidth="10" />
      <path d="M520 360V250H470" stroke={A1} strokeWidth="8" fill="none" />
      <rect x="80" y="160" width="28" height="200" rx="6" fill={A3} />
    </>
  ),
  shower: (id) => (
    <>
      <rect width="800" height="600" fill={`url(#${id}-zellige)`} />
      <rect y="520" width="800" height="80" fill={mix(A4, "#000", 70)} />
      <rect x="140" y="160" width="140" height="70" fill={mix(A4, "#000", 70)} />
      <path d="M560 60V120H500" stroke={A1} strokeWidth="10" fill="none" />
      <rect x="470" y="116" width="60" height="14" rx="7" fill={A1} />
      <rect x="380" y="0" width="420" height="520" fill="#fff" opacity="0.22" />
      <path d="M380 0V520" stroke={A1} strokeWidth="8" />
      <path d="M430 40L560 300" stroke="#fff" strokeWidth="10" opacity="0.5" />
    </>
  ),
  "tile-detail": (id) => (
    <>
      <rect width="800" height="600" fill={`url(#${id}-herringbone)`} />
      <rect x="0" y="420" width="800" height="12" fill={A3} />
    </>
  ),
  vanity: () => (
    <>
      <rect width="800" height="600" fill={A2} />
      <rect y="0" width="800" height="300" fill={mix(A2, A4, 80)} />
      <circle cx="400" cy="160" r="110" fill={LIGHT} />
      <circle cx="400" cy="160" r="110" fill="none" stroke={A3} strokeWidth="8" />
      <rect x="230" y="120" width="12" height="70" rx="6" fill={A3} />
      <rect x="558" y="120" width="12" height="70" rx="6" fill={A3} />
      <rect x="170" y="330" width="460" height="22" fill={LIGHT} />
      <rect x="190" y="352" width="420" height="180" fill={A1} />
      <path d="M400 352V532M190 442H610" stroke={mix(A1, "#fff", 80)} strokeWidth="4" />
      <ellipse cx="400" cy="318" rx="80" ry="24" fill="#fff" />
      <path d="M400 250V300M400 250H430" stroke={A3} strokeWidth="8" fill="none" />
    </>
  ),
  crew: () => (
    <>
      <rect width="800" height="600" fill={A2} />
      <rect y="440" width="800" height="160" fill={mix(A4, "#000", 75)} />
      <rect x="430" y="250" width="320" height="200" rx="16" fill={A1} />
      <rect x="430" y="250" width="110" height="110" rx="12" fill={mix(A1, "#fff", 70)} />
      <circle cx="510" cy="455" r="34" fill={SHADE} />
      <circle cx="680" cy="455" r="34" fill={SHADE} />
      {[160, 300].map((x) => (
        <g key={x}>
          <rect x={x - 45} y="250" width="90" height="190" rx="36" fill={A4} />
          <circle cx={x} cy="205" r="38" fill={mix(A3, "#000", 55)} />
          <path d={`M${x - 46} 196a46 40 0 0 1 92 0z`} fill={A3} />
          <rect x={x - 54} y="192" width="108" height="10" rx="5" fill={A3} />
        </g>
      ))}
    </>
  ),
  portrait: () => (
    <>
      <rect width="800" height="600" fill={mix(A4, A2, 45)} />
      <circle cx="400" cy="250" r="110" fill={mix(A1, "#fff", 70)} />
      <path d="M170 620C170 470 280 400 400 400S630 470 630 620Z" fill={A1} />
    </>
  ),
};
