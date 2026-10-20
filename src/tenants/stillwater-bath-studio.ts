import type { SiteConfig } from "@/engine/schema/types";

/**
 * DEMO TENANT: fictional bathroom remodeling company.
 *
 * Design direction: quiet, architectural, high-end. Light serif display type
 * against a clean grotesque body, stone and sage palette with brass accents,
 * sharp 0px corners, inset-border image frames, a centered stacked hero, and a
 * process-and-proof heavy page that ends in a contained consultation form.
 * Sells planning and certainty for a large purchase.
 */
export const stillwaterBathStudio: SiteConfig = {
  id: "tnt_demo_bath",
  slug: "stillwater-bath-studio",
  status: "demo",

  business: {
    name: "Stillwater Bath Studio",
    trade: "Bathroom remodeling",
    schemaType: "GeneralContractor",
    tagline: "Bathrooms, designed and built by one team.",
    description:
      "Stillwater Bath Studio designs and builds bathroom remodels in the Twin Cities, from primary suites to accessible showers, with one project manager and a fixed schedule agreed before demolition.",
    logo: { text: "Stillwater", tagline: "Bath Studio", mark: "drop" },
    phone: { display: "(612) 555-0119", e164: "+16125550119" },
    email: "design@stillwaterbath.example",
    address: { street: "210 Demo Avenue N, Suite 4", city: "Minneapolis", region: "MN", postalCode: "55401", country: "US" },
    showStreetAddress: true,
    hours: [
      { days: ["Mo", "Tu", "We", "Th"], opens: "09:00", closes: "17:00" },
      { days: ["Fr"], opens: "09:00", closes: "15:00" },
    ],
    hoursNote: "Showroom visits by appointment",
    foundedYear: 2017,
    licenseNumbers: ["MN Lic. DEMO-BC-77810"],
    social: [],
    priceRange: "$$$",
  },

  services: [
    {
      slug: "primary-bathroom-remodel",
      name: "Primary Bathroom Remodels",
      summary: "Full redesigns with walk-in showers, freestanding tubs, heated floors and custom vanities.",
      description: [
        "A primary bathroom remodel starts with a design session: how you use the room, what is not working, and what you want it to feel like. We produce a layout, a finish schedule and a fixed price before anything is demolished.",
        "Our own tile setters, plumbers and carpenters do the work, run by one project manager you can call directly.",
      ],
      includes: [
        "Design session and 3D layout",
        "Fixed price and schedule before demolition",
        "Curbless and walk-in showers",
        "Heated floors and towel warmers",
        "Custom and semi-custom vanities",
        "Dust control and daily cleanup",
      ],
      image: { alt: "Serene primary bathroom with freestanding tub and arched mirror", placeholder: "bathroom" },
      icon: "tub",
      featured: true,
      faqIds: ["timeline", "price"],
    },
    {
      slug: "walk-in-showers",
      name: "Walk-in & Curbless Showers",
      summary: "Tub-to-shower conversions and curbless showers with properly sloped, waterproofed floors.",
      description: [
        "Replacing a tub with a walk-in shower is our most requested project. We rebuild the floor with a continuous slope to a linear drain and waterproof the entire wet area before tile.",
      ],
      includes: ["Tub-to-shower conversion", "Full waterproofing membrane", "Linear drains", "Frameless glass"],
      image: { alt: "Walk-in shower with glass panel and vertical tile", placeholder: "shower" },
      icon: "shower",
      featured: true,
      faqIds: ["waterproofing"],
    },
    {
      slug: "accessible-bathrooms",
      name: "Accessible Bathrooms",
      summary: "Aging-in-place bathrooms that look like the rest of the house, not a hospital.",
      description: [
        "Grab bars that look like towel bars, comfort-height toilets, wider doors and zero-threshold showers, planned with you so the room works now and later.",
      ],
      includes: ["Zero-threshold showers", "Blocking for grab bars", "Comfort-height fixtures", "Wider doorways"],
      image: { alt: "Accessible shower with bench and grab bar", placeholder: "shower" },
      icon: "accessible",
    },
    {
      slug: "tile-and-vanities",
      name: "Tile & Vanity Updates",
      summary: "Smaller refreshes: new vanity, lighting, mirror and tile without moving plumbing.",
      description: ["When the layout works, a vanity, lighting and tile update can change the room in about a week."],
      includes: ["Vanity and top replacement", "Lighting and mirror", "Floor and wall tile"],
      image: { alt: "Floating vanity with round mirror and brass fixtures", placeholder: "vanity" },
      icon: "vanity",
    },
  ],

  projects: [
    {
      id: "edina-primary",
      title: "Edina primary suite",
      location: "Edina, MN",
      serviceSlug: "primary-bathroom-remodel",
      summary:
        "A dated 1990s bathroom with a corner jetted tub became a calm suite with a curbless shower, freestanding tub and heated limestone-look floor.",
      facts: [
        { label: "Duration", value: "5 weeks" },
        { label: "Size", value: "11 × 14 ft" },
        { label: "Shower", value: "Curbless" },
        { label: "Floor", value: "Heated" },
      ],
      images: [{ alt: "Finished primary bathroom", placeholder: "bathroom" }],
      beforeAfter: {
        before: { alt: "Dated bathroom with corner tub before remodel", placeholder: "bathroom", condition: "before" },
        after: { alt: "Same bathroom after remodel with freestanding tub", placeholder: "bathroom" },
      },
      isSample: true,
    },
    {
      id: "st-paul-shower",
      title: "Tub-to-shower conversion",
      location: "St. Paul, MN",
      serviceSlug: "walk-in-showers",
      summary: "An unused tub replaced with a walk-in shower, bench and niche.",
      images: [{ alt: "Walk-in shower with bench", placeholder: "shower" }],
      isSample: true,
    },
    {
      id: "woodbury-powder",
      title: "Powder room refresh",
      location: "Woodbury, MN",
      serviceSlug: "tile-and-vanities",
      summary: "Floating walnut vanity, round mirror and herringbone floor tile.",
      images: [{ alt: "Powder room with floating vanity", placeholder: "vanity" }],
      isSample: true,
    },
  ],

  testimonials: [
    {
      id: "t1",
      quote: "We knew the price and the finish date before they took out a single tile, and they hit both.",
      author: "Sample client",
      context: "Primary suite, Edina",
      serviceSlug: "primary-bathroom-remodel",
      isSample: true,
    },
    {
      id: "t2",
      quote: "My mother can shower on her own again, and the bathroom is the nicest room in the house.",
      author: "Sample client",
      context: "Accessible shower, Roseville",
      serviceSlug: "accessible-bathrooms",
      isSample: true,
    },
    {
      id: "t3",
      quote: "One project manager, one phone number. That alone was worth it.",
      author: "Sample client",
      context: "Shower conversion, St. Paul",
      isSample: true,
    },
  ],

  trust: [
    { kind: "stat", value: "1", label: "project manager for your whole remodel" },
    { kind: "stat", value: "4–6 wks", label: "typical full remodel, agreed up front" },
    { kind: "stat", value: "5-year", label: "written workmanship warranty" },
    { kind: "stat", value: "Fixed", label: "price before demolition starts" },
    { kind: "license", label: "Licensed Minnesota residential contractor" },
    { kind: "insurance", label: "Fully insured" },
  ],

  team: [
    { name: "Elena Marsh", role: "Founder & designer" },
    { name: "Sam Okafor", role: "Project manager" },
  ],

  faqs: [
    { id: "timeline", question: "How long does a bathroom remodel take?", answer: "A full primary bathroom typically takes four to six weeks on site. Smaller updates take one to two weeks. We agree the schedule in writing before demolition." },
    { id: "price", question: "What does a remodel cost?", answer: "It depends on size, layout changes and finishes. After the design session you receive a fixed price, not an estimate that grows during the job." },
    { id: "waterproofing", question: "How do you waterproof showers?", answer: "Every wet area gets a continuous waterproofing membrane, flood-tested before tile goes on." },
    { id: "use", question: "Can we use the bathroom during the remodel?", answer: "Usually not, so we plan the schedule around your other bathrooms and keep demolition and dust contained." },
    { id: "permits", question: "Do you handle permits?", answer: "Yes. We pull the required permits and schedule inspections." },
  ],

  process: [
    { title: "Design session", body: "We meet at your home, measure, and talk through how you use the room." },
    { title: "Plan & fixed price", body: "A layout, finish schedule, price and calendar, all in writing." },
    { title: "Build", body: "Our own trades, one project manager, a weekly update and a clean site every day." },
    { title: "Reveal & warranty", body: "A final walkthrough, a care guide for your finishes and a five-year warranty." },
  ],

  serviceAreas: [
    { name: "Minneapolis", includes: ["Edina", "St. Louis Park", "Golden Valley"] },
    { name: "St. Paul", includes: ["Roseville", "Woodbury", "Stillwater"] },
  ],

  cta: {
    primaryLabel: "Book a design consultation",
    primaryAction: "quote",
    showPhone: false,
    mobileBar: true,
    mobileLabel: "Book a consult",
    reassurance: "Consultations are free and take about an hour.",
  },

  leadForm: {
    heading: "Book a design consultation",
    intro: "Tell us about the room. We'll suggest a time to visit.",
    fields: [
      { name: "name", required: true },
      { name: "email", required: true },
      { name: "phone", required: true },
      { name: "postalCode", required: true },
      { name: "service", required: true, label: "Project type" },
      { name: "timeline", required: true, label: "When would you like to start?" },
      { name: "message", required: false, label: "What isn't working in the room today?" },
    ],
    timelineOptions: ["Within 3 months", "3–6 months", "6–12 months", "Not sure yet"],
    submitLabel: "Request a consultation",
    successHeading: "Thank you",
    successMessage: "This is a demo site, so nothing was sent. On a live site, the studio would reply within one business day to schedule your visit.",
    privacyNote: "Your details are only used to arrange your consultation.",
  },

  seo: {
    defaultTitle: "Stillwater Bath Studio | Bathroom Remodeling in the Twin Cities",
    titleTemplate: "%s | Stillwater Bath Studio",
    description: "Design-build bathroom remodels in Minneapolis and St. Paul: walk-in showers, primary suites and accessible bathrooms, with a fixed price up front.",
  },
  analytics: { provider: "none" },

  theme: {
    colors: {
      bg: "#f6f5f1",
      surface: "#ffffff",
      alt: "#eceae3",
      ink: "#232524",
      muted: "#5a5e5b",
      line: "#d9d6cd",
      primary: "#3d4a42",
      onPrimary: "#f6f5f1",
      accent: "#b08d57",
      onAccent: "#1b1c1b",
      inverse: "#262a27",
      onInverse: "#f1efe9",
      inverseMuted: "#abafaa",
      art: ["#3d4a42", "#e6e2d8", "#b08d57", "#9aa79c"],
    },
    fonts: {
      display: "cormorant",
      body: "manrope",
      displayWeight: 500,
      displayCase: "none",
      displayTracking: -0.01,
      scale: "dramatic",
    },
    radius: { control: "0px", card: "0px", media: "0px" },
    density: "airy",
    buttons: "solid",
    eyebrows: "caps",
    imageFrame: "inset-border",
  },

  layout: { header: "bar", footer: "statement", container: "standard" },

  pages: {
    home: {
      sections: [
        {
          type: "hero",
          variant: "stacked",
          eyebrow: "Design-build bathroom remodeling · Twin Cities",
          heading: "A calmer bathroom, planned to the last tile",
          subheading: "One team designs and builds your bathroom, with a fixed price and schedule agreed before demolition.",
          image: { alt: "Light-filled bathroom with freestanding tub and arched mirror", placeholder: "bathroom" },
          secondaryImage: { alt: "Detail of herringbone floor tile", placeholder: "tile-detail" },
          highlights: ["Fixed price before demolition", "One project manager", "5-year workmanship warranty"],
        },
        { type: "trust", variant: "stats", eyebrow: "What you can count on", heading: "Certainty, in writing" },
        {
          type: "spotlight",
          variant: "feature",
          eyebrow: "Most requested",
          heading: "Walk-in showers, built to stay watertight",
          serviceSlugs: ["walk-in-showers"],
        },
        {
          type: "services",
          variant: "cards",
          tone: "alt",
          eyebrow: "Services",
          heading: "From a vanity swap to a full suite",
        },
        {
          type: "before-after",
          variant: "side-by-side",
          eyebrow: "Before & after",
          projectId: "edina-primary",
        },
        {
          type: "process",
          variant: "steps",
          tone: "alt",
          eyebrow: "The process",
          heading: "Four steps, no surprises",
        },
        { type: "testimonials", variant: "cards", eyebrow: "Clients", heading: "In their words" },
        { type: "about", variant: "story", tone: "inverse", eyebrow: "The studio", heading: "Designers who also build" },
        { type: "faq", variant: "accordion", eyebrow: "FAQ", heading: "Planning questions" },
        { type: "service-areas", variant: "inline", tone: "alt", eyebrow: "Where we work", heading: "Minneapolis, St. Paul and nearby" },
        { type: "lead-form", variant: "contained", tone: "default" },
      ],
    },
    services: { heading: "Bathroom remodeling services", intro: "Design and construction under one roof, for every size of bathroom project." },
    projects: { heading: "Project portfolio", intro: "Sample projects illustrating our design-build approach." },
    about: {
      heading: "Designers who also build",
      intro: "Stillwater Bath Studio was founded on a simple idea: the people who design your bathroom should be accountable for building it.",
      story: [
        "Elena Marsh spent a decade designing bathrooms that other contractors then built, often differently than drawn. In 2017 she started Stillwater Bath Studio to close that gap: one team, one plan, one price.",
        "Today we take on a limited number of remodels at a time so each one gets a dedicated project manager and our own trades from demolition to the final reveal.",
      ],
      image: { alt: "Designer reviewing tile samples on a worktable", placeholder: "tile-detail" },
    },
    contact: { heading: "Start with a conversation", intro: "Consultations are free and take about an hour at your home." },
    nav: ["services", "projects", "about", "contact"],
  },
};
