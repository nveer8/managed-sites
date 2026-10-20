/**
 * SiteConfig is the complete description of one contractor website.
 *
 * Everything a tenant page renders comes from here. Phase 1 stores these as
 * typed fixtures in src/tenants; later they move to a database behind
 * TenantRepository without changing this shape.
 */

import type { FontKey } from "@/engine/theme/fonts";

/* -------------------------------------------------------------------------- */
/* Primitives                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Subjects the placeholder illustration system can draw. Real photography
 * replaces these during fulfillment by setting `src`.
 */
export type PlaceholderSubject =
  | "house"
  | "roof"
  | "roof-detail"
  | "interior"
  | "exterior-paint"
  | "paint-detail"
  | "bathroom"
  | "shower"
  | "tile-detail"
  | "vanity"
  | "crew"
  | "portrait";

export interface MediaAsset {
  /** Real image URL or /public path. When absent, a placeholder illustration renders. */
  src?: string;
  /** Required. Describes the image for screen readers and doubles as the photo shot list. */
  alt: string;
  /** Intrinsic size, required by next/image when `src` is set. */
  width?: number;
  height?: number;
  /** Placeholder illustration subject when there is no `src`. */
  placeholder?: PlaceholderSubject;
  /** Render the placeholder in a worn "before" state. */
  condition?: "before" | "after";
  /** Photo credit, if the license requires one. */
  credit?: string;
}

export interface Logo {
  /** Wordmark text. Used when no image is supplied, and as the accessible name. */
  text: string;
  /** Optional secondary line under the wordmark, e.g. "Roofing & Exteriors". */
  tagline?: string;
  /** Optional mark drawn next to the wordmark. */
  mark?: "peak" | "brush" | "drop" | "none";
  image?: MediaAsset;
}

export interface PostalAddress {
  street?: string;
  city: string;
  region: string;
  postalCode?: string;
  country: string;
}

/** 24h "HH:MM" */
export type ClockTime = `${number}:${number}`;
export type DayOfWeek = "Mo" | "Tu" | "We" | "Th" | "Fr" | "Sa" | "Su";

export interface OpeningHours {
  days: DayOfWeek[];
  opens: ClockTime;
  closes: ClockTime;
}

export interface SocialLink {
  network: "facebook" | "instagram" | "youtube" | "linkedin" | "nextdoor" | "houzz" | "google";
  url: string;
}

/* -------------------------------------------------------------------------- */
/* Business content                                                            */
/* -------------------------------------------------------------------------- */

export interface Service {
  /** URL slug, unique per site. */
  slug: string;
  name: string;
  /** One line used on cards. */
  summary: string;
  /** Paragraphs used on the service detail page. */
  description: string[];
  /** Concrete inclusions, rendered as a checklist. */
  includes: string[];
  image: MediaAsset;
  /** Optional icon hint for list/compact variants. */
  icon?: IconName;
  /** Show in homepage spotlights / first in grids. */
  featured?: boolean;
  /** FAQ ids from `faqs` relevant to this service. */
  faqIds?: string[];
  seo?: { title?: string; description?: string };
}

export interface Project {
  id: string;
  title: string;
  location: string;
  /** Service slug this project demonstrates. */
  serviceSlug: string;
  summary: string;
  /** Short facts, e.g. "3 days", "42 squares". */
  facts?: { label: string; value: string }[];
  images: MediaAsset[];
  beforeAfter?: { before: MediaAsset; after: MediaAsset };
  /** Demo content must be marked so it is never presented as a real case study. */
  isSample: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  /** e.g. "Homeowner, Lakewood" */
  context?: string;
  serviceSlug?: string;
  /** Where the review came from, if real. Never fabricate a source. */
  source?: "google" | "facebook" | "nextdoor" | "direct";
  isSample: boolean;
}

export interface TrustItem {
  label: string;
  detail?: string;
  kind: "license" | "insurance" | "certification" | "warranty" | "membership" | "stat";
  /** Only for kind "stat": the emphasized figure. Must be truthful. */
  value?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio?: string;
  photo?: MediaAsset;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface ProcessStep {
  title: string;
  body: string;
}

export interface ServiceArea {
  name: string;
  /** Optional neighborhoods/towns listed under the area. Plain information, not generated pages. */
  includes?: string[];
}

/* -------------------------------------------------------------------------- */
/* Conversion                                                                  */
/* -------------------------------------------------------------------------- */

export interface CtaConfig {
  /** Label for the primary action, e.g. "Get a free estimate". */
  primaryLabel: string;
  /** Primary action goes to the contact page form or dials the phone. */
  primaryAction: "quote" | "call";
  /** Show "Call (555) 555-0100" as the secondary action. */
  showPhone: boolean;
  /** Sticky bottom call/quote bar on small screens. */
  mobileBar: boolean;
  /** Short label for the quote button in the mobile bar. Defaults to "Free estimate". */
  mobileLabel?: string;
  /** Short reassurance line under CTAs, e.g. "Free, no-pressure estimates". */
  reassurance?: string;
}

export type LeadFieldName =
  | "name"
  | "phone"
  | "email"
  | "address"
  | "postalCode"
  | "service"
  | "timeline"
  | "contactPreference"
  | "message";

export interface LeadFieldConfig {
  name: LeadFieldName;
  required: boolean;
  /** Override the default label. */
  label?: string;
}

export interface LeadFormConfig {
  heading: string;
  intro?: string;
  fields: LeadFieldConfig[];
  submitLabel: string;
  successHeading: string;
  successMessage: string;
  /** Timeline options when the "timeline" field is used. */
  timelineOptions?: string[];
  /** Short privacy/consent line under the submit button. */
  privacyNote?: string;
}

/* -------------------------------------------------------------------------- */
/* SEO / analytics                                                             */
/* -------------------------------------------------------------------------- */

/**
 * schema.org LocalBusiness subtypes we actually use. Keep this list honest:
 * pick the most specific type that is true for the business.
 */
export type LocalBusinessType =
  | "RoofingContractor"
  | "HousePainter"
  | "GeneralContractor"
  | "HomeAndConstructionBusiness"
  | "HVACBusiness"
  | "Plumber"
  | "Electrician";

export interface SeoConfig {
  /** Used for the home page <title>. */
  defaultTitle: string;
  /** Template for inner pages, `%s` is replaced with the page title. */
  titleTemplate: string;
  description: string;
  ogImage?: MediaAsset;
  /** Extra keywords are deliberately not supported; meta keywords are ignored by search engines. */
}

export interface AnalyticsConfig {
  provider: "none" | "ga4" | "plausible";
  /** GA4 measurement id ("G-XXXX") or Plausible domain. */
  id?: string;
}

/* -------------------------------------------------------------------------- */
/* Design                                                                       */
/* -------------------------------------------------------------------------- */

/** Any CSS color value. */
export type CssColor = string;

export interface ColorPalette {
  /** Page background. */
  bg: CssColor;
  /** Raised surfaces (cards, form panels). */
  surface: CssColor;
  /** Alternate band background (tone "alt"). */
  alt: CssColor;
  /** Primary text. */
  ink: CssColor;
  /** Secondary text. Must keep 4.5:1 contrast on bg. */
  muted: CssColor;
  /** Hairlines and dividers. */
  line: CssColor;
  /** Brand primary, used for buttons and emphasis. */
  primary: CssColor;
  /** Text on primary. */
  onPrimary: CssColor;
  /** Secondary highlight, used sparingly. */
  accent: CssColor;
  /** Text on accent. */
  onAccent: CssColor;
  /** Dark/inverse band background (tone "inverse"). */
  inverse: CssColor;
  /** Text on inverse. */
  onInverse: CssColor;
  /** Muted text on inverse. */
  inverseMuted: CssColor;
  /** Colors the placeholder illustrations draw with. */
  art: [CssColor, CssColor, CssColor, CssColor];
}

export interface ThemeConfig {
  colors: ColorPalette;
  fonts: {
    display: FontKey;
    body: FontKey;
    /** CSS font-weight for headings. */
    displayWeight: 400 | 500 | 600 | 700 | 800;
    displayCase: "none" | "uppercase";
    /** Letter spacing for headings, in em. */
    displayTracking: number;
    /** Heading size ramp. "dramatic" is for sites whose headlines carry the design. */
    scale: "restrained" | "standard" | "dramatic";
  };
  radius: {
    /** Buttons and inputs. */
    control: string;
    /** Cards and panels. */
    card: string;
    /** Images. */
    media: string;
  };
  /** Vertical rhythm. Compact sites feel busy and practical; airy sites feel premium. */
  density: "compact" | "comfortable" | "airy";
  /** Button construction. */
  buttons: "solid" | "solid-square" | "underline-secondary";
  /** Small eyebrow labels above headings. */
  eyebrows: "none" | "caps" | "rule";
  /** Image framing treatment. */
  imageFrame: "none" | "inset-border" | "offset-block";
}

/* -------------------------------------------------------------------------- */
/* Layout                                                                       */
/* -------------------------------------------------------------------------- */

export type IconName =
  | "roof"
  | "gutter"
  | "storm"
  | "inspect"
  | "siding"
  | "paint-roller"
  | "brush"
  | "cabinet"
  | "deck"
  | "shower"
  | "tub"
  | "tile"
  | "vanity"
  | "accessible"
  | "shield"
  | "clock"
  | "phone"
  | "check"
  | "star"
  | "map-pin"
  | "calendar"
  | "ruler"
  | "home";

export type SectionTone = "default" | "alt" | "inverse" | "accent";

interface SectionBase {
  /** Optional anchor id. */
  id?: string;
  tone?: SectionTone;
  eyebrow?: string;
  heading?: string;
  intro?: string;
}

export interface HeroSection extends SectionBase {
  type: "hero";
  /**
   * full-bleed: photo fills the band, text over a scrim.
   * split: text column beside a framed image.
   * stacked: big centered headline, wide image below.
   */
  variant: "full-bleed" | "split" | "stacked";
  heading: string;
  subheading: string;
  image: MediaAsset;
  /** Secondary image for split/stacked compositions. */
  secondaryImage?: MediaAsset;
  /** Short proof points under the CTA, e.g. "Licensed & insured". */
  highlights?: string[];
}

export interface TrustSection extends SectionBase {
  type: "trust";
  variant: "inline" | "badges" | "stats";
}

export interface ServicesSection extends SectionBase {
  type: "services";
  /** cards: image cards. list: numbered editorial list. tiles: icon tiles. */
  variant: "cards" | "list" | "tiles";
  /** Limit to these slugs; defaults to all services. */
  serviceSlugs?: string[];
}

export interface SpotlightSection extends SectionBase {
  type: "spotlight";
  /** alternating: image/text rows that flip sides. feature: one large service feature. */
  variant: "alternating" | "feature";
  serviceSlugs: string[];
}

export interface ProjectsSection extends SectionBase {
  type: "projects";
  /** grid: uniform grid. featured: one large + supporting. strip: horizontal scroller. */
  variant: "grid" | "featured" | "strip";
  projectIds?: string[];
}

export interface BeforeAfterSection extends SectionBase {
  type: "before-after";
  /** slider: draggable comparison. side-by-side: two labeled images. */
  variant: "slider" | "side-by-side";
  projectId: string;
}

export interface TestimonialsSection extends SectionBase {
  type: "testimonials";
  /** cards: grid of cards. feature: one large quote with supporting quotes. */
  variant: "cards" | "feature";
  testimonialIds?: string[];
}

export interface ProcessSection extends SectionBase {
  type: "process";
  variant: "steps" | "timeline";
}

export interface AboutSection extends SectionBase {
  type: "about";
  /** story: narrative + image. team: narrative + team grid. */
  variant: "story" | "team";
}

export interface ServiceAreaSection extends SectionBase {
  type: "service-areas";
  variant: "columns" | "inline";
}

export interface FaqSection extends SectionBase {
  type: "faq";
  variant: "accordion" | "two-column";
  faqIds?: string[];
}

export interface CtaSection extends SectionBase {
  type: "cta";
  /** band: full-width strip. panel: contained card. split: CTA beside contact details. */
  variant: "band" | "panel" | "split";
  heading: string;
  body?: string;
}

export interface LeadFormSection extends SectionBase {
  type: "lead-form";
  /** split: form beside contact details. contained: centered form panel. */
  variant: "split" | "contained";
}

export type SectionConfig =
  | HeroSection
  | TrustSection
  | ServicesSection
  | SpotlightSection
  | ProjectsSection
  | BeforeAfterSection
  | TestimonialsSection
  | ProcessSection
  | AboutSection
  | ServiceAreaSection
  | FaqSection
  | CtaSection
  | LeadFormSection;

export type SectionType = SectionConfig["type"];

export interface LayoutConfig {
  /**
   * bar: logo, nav and phone on one row.
   * utility: thin top bar with hours/phone over a main nav row.
   * centered: centered wordmark over nav (editorial).
   */
  header: "bar" | "utility" | "centered";
  /** columns: classic multi-column. statement: large CTA statement then compact links. */
  footer: "columns" | "statement";
  /** Max content width. */
  container: "narrow" | "standard" | "wide";
}

/** Inner pages that exist for this site. Home always exists. */
export type SitePageKey = "services" | "projects" | "about" | "contact";

export interface PagesConfig {
  home: { sections: SectionConfig[] };
  /** Intro copy for inner pages. Enabled pages appear in navigation in this order. */
  services?: { heading: string; intro: string };
  projects?: { heading: string; intro: string };
  about?: { heading: string; intro: string; story: string[]; image: MediaAsset };
  contact?: { heading: string; intro: string };
  nav: SitePageKey[];
}

/* -------------------------------------------------------------------------- */
/* Root                                                                         */
/* -------------------------------------------------------------------------- */

export interface SiteConfig {
  /** Stable id. Never changes even if the business renames. */
  id: string;
  /** URL-safe slug used in preview URLs and as the routing key. */
  slug: string;
  /**
   * demo: fictional concept business, always noindex, disclosed on every page.
   * preview: real customer before launch, noindex.
   * live: launched, indexable on its primary domain.
   */
  status: "demo" | "preview" | "live";

  business: {
    name: string;
    /** Legal name if different, used in the footer. */
    legalName?: string;
    trade: string;
    schemaType: LocalBusinessType;
    tagline: string;
    description: string;
    logo: Logo;
    phone: { display: string; e164: string };
    email: string;
    address: PostalAddress;
    /**
     * Service-area businesses (most contractors) usually do not publish a street
     * address. When false, the street is hidden on the site and in schema.
     */
    showStreetAddress: boolean;
    hours: OpeningHours[];
    /** Free text shown next to hours, e.g. "Emergency tarping 24/7". */
    hoursNote?: string;
    foundedYear?: number;
    licenseNumbers?: string[];
    social: SocialLink[];
    priceRange?: "$" | "$$" | "$$$" | "$$$$";
  };

  services: Service[];
  projects: Project[];
  testimonials: Testimonial[];
  trust: TrustItem[];
  team: TeamMember[];
  faqs: Faq[];
  process: ProcessStep[];
  serviceAreas: ServiceArea[];

  cta: CtaConfig;
  leadForm: LeadFormConfig;
  seo: SeoConfig;
  analytics: AnalyticsConfig;

  theme: ThemeConfig;
  layout: LayoutConfig;
  pages: PagesConfig;
}
