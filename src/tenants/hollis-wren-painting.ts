import type { SiteConfig } from "@/engine/schema/types";

/**
 * DEMO TENANT: fictional residential painting company.
 *
 * Design direction: warm, editorial, unhurried. Serif display type, cream
 * paper background, deep green and terracotta, generous whitespace, soft
 * radii, offset image blocks, centered masthead header and an editorial
 * numbered service list. Sells care and craft rather than urgency.
 */
export const hollisWrenPainting: SiteConfig = {
  id: "tnt_demo_painting",
  slug: "hollis-wren-painting",
  status: "demo",

  business: {
    name: "Hollis & Wren Painting Co.",
    trade: "Residential painting",
    schemaType: "HousePainter",
    tagline: "Careful painting for older homes.",
    description:
      "Hollis & Wren paints interiors, exteriors and cabinets for Portland-area homes, with a focus on prep, clean lines and protecting the house while we work.",
    logo: { text: "Hollis & Wren", tagline: "Painting Co.", mark: "brush" },
    phone: { display: "(503) 555-0177", e164: "+15035550177" },
    email: "studio@holliswrenpainting.example",
    address: { city: "Portland", region: "OR", country: "US" },
    showStreetAddress: false,
    hours: [{ days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "08:00", closes: "17:00" }],
    hoursNote: "Estimates Monday to Friday",
    foundedYear: 2014,
    licenseNumbers: ["CCB DEMO-221947"],
    social: [],
    priceRange: "$$$",
  },

  services: [
    {
      slug: "interior-painting",
      name: "Interior Painting",
      summary: "Walls, ceilings and trim with real prep, low-odor paint and furniture handled with care.",
      description: [
        "Good interior painting is mostly preparation. We move and cover furniture, mask floors, fill and sand, caulk trim gaps and spot-prime before a drop of finish goes on.",
        "We work room by room so your house stays livable, and we clean up at the end of each day.",
      ],
      includes: [
        "Furniture moving and full floor protection",
        "Patching, sanding and caulking",
        "Two finish coats in low-VOC paint",
        "Crisp cut lines at ceilings and trim",
        "Daily cleanup and final walkthrough",
      ],
      image: { alt: "Freshly painted living room with large window", placeholder: "interior" },
      icon: "paint-roller",
      featured: true,
      faqIds: ["prep", "colors"],
    },
    {
      slug: "exterior-painting",
      name: "Exterior Painting",
      summary: "Siding and trim scraped, repaired and repainted to stand up to Pacific Northwest rain.",
      description: [
        "Exterior paint fails at the prep. We wash, scrape, sand and repair soft wood before priming bare spots and applying two coats of exterior acrylic.",
        "Older homes get lead-safe work practices and careful protection of plants and windows.",
      ],
      includes: ["Pressure wash and scrape", "Wood repair and replacement", "Lead-safe practices for pre-1978 homes", "Two coats on body and trim"],
      image: { alt: "Painter on a ladder beside newly painted lap siding", placeholder: "exterior-paint" },
      icon: "brush",
      featured: true,
      faqIds: ["weather", "prep"],
    },
    {
      slug: "cabinet-refinishing",
      name: "Cabinet Refinishing",
      summary: "A factory-smooth sprayed finish on existing kitchen cabinets, without the cost of new ones.",
      description: [
        "We remove doors and drawers, degrease, sand and prime in our shop, then spray a durable cabinet-grade finish. Boxes are finished on site with the kitchen fully masked.",
      ],
      includes: ["Doors sprayed in our shop", "Bonding primer and two finish coats", "New hardware installation on request"],
      image: { alt: "Kitchen cabinet doors with a fresh painted finish", placeholder: "paint-detail" },
      icon: "cabinet",
    },
    {
      slug: "color-consultation",
      name: "Color Consultation",
      summary: "An hour with our color lead and large sample boards painted for your actual light.",
      description: ["Choosing color from a tiny chip is hard. We paint large sample boards and look at them in your rooms at different times of day."],
      includes: ["One-hour in-home session", "Up to six large sample boards", "Written color schedule"],
      image: { alt: "Paint sample boards leaning against a wall", placeholder: "paint-detail" },
      icon: "brush",
    },
    {
      slug: "deck-fence-staining",
      name: "Deck & Fence Staining",
      summary: "Cleaning, brightening and penetrating stain for cedar decks and fences.",
      description: ["We clean and brighten weathered wood, then apply a penetrating oil stain that soaks in rather than peeling."],
      includes: ["Cleaning and wood brightener", "Penetrating stain", "Maintenance schedule"],
      image: { alt: "Stained cedar deck", placeholder: "exterior-paint" },
      icon: "deck",
    },
  ],

  projects: [
    {
      id: "laurelhurst-foursquare",
      title: "A 1912 foursquare, three colors deep",
      location: "Laurelhurst, Portland",
      serviceSlug: "exterior-painting",
      summary: "Full exterior with wood repair on the porch, a muted green body, cream trim and a deep red door.",
      facts: [
        { label: "Duration", value: "9 working days" },
        { label: "Wood repaired", value: "Porch & sills" },
      ],
      images: [{ alt: "Foursquare house with fresh green siding", placeholder: "exterior-paint" }],
      beforeAfter: {
        before: { alt: "Peeling, faded siding before painting", placeholder: "exterior-paint", condition: "before" },
        after: { alt: "Same siding after prep and two coats", placeholder: "exterior-paint" },
      },
      isSample: true,
    },
    {
      id: "sellwood-living",
      title: "Living and dining rooms, warm white",
      location: "Sellwood, Portland",
      serviceSlug: "interior-painting",
      summary: "Plaster repair, ceilings, walls and original trim in a soft warm white.",
      images: [{ alt: "Bright living room after repainting", placeholder: "interior" }],
      isSample: true,
    },
    {
      id: "lake-oswego-kitchen",
      title: "Oak cabinets to deep green",
      location: "Lake Oswego",
      serviceSlug: "cabinet-refinishing",
      summary: "Thirty-year-old oak cabinets sprayed a deep green with new brass pulls.",
      images: [{ alt: "Kitchen with green painted cabinets", placeholder: "paint-detail" }],
      isSample: true,
    },
  ],

  testimonials: [
    {
      id: "t1",
      quote: "They spent the first two days just on prep, and you can see it. Every line is clean, and our hundred-year-old trim has never looked this good.",
      author: "Sample client",
      context: "Exterior, Laurelhurst",
      serviceSlug: "exterior-painting",
      isSample: true,
    },
    {
      id: "t2",
      quote: "The sample boards saved us from a gray we would have hated.",
      author: "Sample client",
      context: "Color consultation",
      isSample: true,
    },
    {
      id: "t3",
      quote: "Furniture back where it was, floors spotless. We barely knew they'd been here, apart from the walls.",
      author: "Sample client",
      context: "Interior, Sellwood",
      isSample: true,
    },
  ],

  trust: [
    { kind: "license", label: "Licensed, bonded & insured" },
    { kind: "certification", label: "EPA lead-safe certified firm" },
    { kind: "warranty", label: "3-year workmanship warranty" },
  ],

  team: [
    { name: "June Hollis", role: "Co-owner, estimates" },
    { name: "Theo Wren", role: "Co-owner, production" },
    { name: "Ana Belén", role: "Color lead" },
  ],

  faqs: [
    { id: "prep", question: "What does prep include?", answer: "Moving and covering furniture, masking, washing, filling, sanding, caulking and spot-priming. It is usually half the job, and it is written into every estimate." },
    { id: "colors", question: "Can you help us choose colors?", answer: "Yes. Every project includes a short color conversation, and a full consultation with large sample boards is available." },
    { id: "weather", question: "When can you paint exteriors?", answer: "Generally May through early October, when surfaces stay dry and temperatures stay above 50°F overnight. We book exterior work in late winter and spring." },
    { id: "home", question: "Do we need to be home?", answer: "Not for most of the job. We agree a daily schedule and lock up when we leave." },
    { id: "pay", question: "How does payment work?", answer: "A small deposit holds your dates, and the balance is due after the final walkthrough." },
  ],

  process: [
    { title: "Walkthrough & estimate", body: "We look at every surface with you and send a written estimate that spells out prep, products and coats." },
    { title: "Color", body: "Bring your colors, or work with our color lead and large sample boards in your light." },
    { title: "Prep & paint", body: "Protection first, then repairs and prep, then two finish coats. Daily cleanup." },
    { title: "Final walkthrough", body: "We walk the work together with blue tape in hand and touch up anything you spot." },
  ],

  serviceAreas: [
    { name: "Portland", includes: ["Inner Southeast", "Northeast", "Sellwood-Moreland", "Laurelhurst"] },
    { name: "Southwest suburbs", includes: ["Lake Oswego", "West Linn", "Milwaukie"] },
  ],

  cta: {
    primaryLabel: "Book an estimate",
    primaryAction: "quote",
    showPhone: true,
    mobileBar: true,
    reassurance: "Written estimates within three business days.",
  },

  leadForm: {
    heading: "Tell us about your project",
    intro: "We'll reply within one business day to set up a walkthrough.",
    fields: [
      { name: "name", required: true },
      { name: "email", required: true },
      { name: "phone", required: false },
      { name: "address", required: false, label: "Neighborhood or address" },
      { name: "service", required: true },
      { name: "timeline", required: false },
      { name: "contactPreference", required: false },
      { name: "message", required: false },
    ],
    timelineOptions: ["As soon as possible", "In the next 1–3 months", "Later this year", "Just planning"],
    submitLabel: "Send project details",
    successHeading: "Thank you",
    successMessage: "This is a demo site, so nothing was sent. On a live site, June or Theo would reply within one business day.",
    privacyNote: "We never share your details.",
  },

  seo: {
    defaultTitle: "Hollis & Wren Painting Co. | Interior & Exterior Painting in Portland",
    titleTemplate: "%s | Hollis & Wren Painting",
    description: "Interior, exterior and cabinet painting for Portland-area homes, with careful prep, lead-safe practices and written estimates.",
  },
  analytics: { provider: "none" },

  theme: {
    colors: {
      bg: "#fbf7f0",
      surface: "#ffffff",
      alt: "#f2e9dc",
      ink: "#1d2a24",
      muted: "#56605a",
      line: "#e2d8c6",
      primary: "#2f5d50",
      onPrimary: "#fbf7f0",
      accent: "#e07a5f",
      onAccent: "#1d2a24",
      inverse: "#1f3a33",
      onInverse: "#fbf7f0",
      inverseMuted: "#b9c6bf",
      art: ["#2f5d50", "#efe3cf", "#e07a5f", "#c9b48a"],
    },
    fonts: {
      display: "fraunces",
      body: "dm-sans",
      displayWeight: 500,
      displayCase: "none",
      displayTracking: -0.02,
      scale: "dramatic",
    },
    radius: { control: "10px", card: "18px", media: "18px" },
    density: "comfortable",
    buttons: "underline-secondary",
    eyebrows: "rule",
    imageFrame: "offset-block",
  },

  layout: { header: "centered", footer: "columns", container: "standard" },

  pages: {
    home: {
      sections: [
        {
          type: "hero",
          variant: "split",
          eyebrow: "Portland painters since 2014",
          heading: "Careful painting for older homes",
          subheading: "Interiors, exteriors and cabinets, with the slow, thorough prep that makes paint last and lines stay sharp.",
          image: { alt: "Sunlit living room with freshly painted walls", placeholder: "interior" },
          secondaryImage: { alt: "Close-up of a brush cutting in along trim", placeholder: "paint-detail" },
          highlights: ["Lead-safe certified", "Written estimates", "3-year warranty"],
        },
        {
          type: "services",
          variant: "list",
          eyebrow: "Services",
          heading: "What we paint",
          intro: "Every estimate itemizes prep, products and the number of coats.",
        },
        {
          type: "spotlight",
          variant: "alternating",
          tone: "alt",
          serviceSlugs: ["interior-painting", "exterior-painting"],
        },
        {
          type: "testimonials",
          variant: "feature",
          eyebrow: "Kind words",
        },
        {
          type: "before-after",
          variant: "slider",
          tone: "alt",
          eyebrow: "Before & after",
          projectId: "laurelhurst-foursquare",
        },
        {
          type: "projects",
          variant: "featured",
          eyebrow: "Recent projects",
          heading: "Houses we've had the pleasure of painting",
        },
        {
          type: "process",
          variant: "timeline",
          tone: "inverse",
          eyebrow: "Our process",
          heading: "Unhurried, start to finish",
          intro: "Four steps, each one written down before we begin.",
        },
        {
          type: "about",
          variant: "team",
          eyebrow: "The studio",
          heading: "Small crew, same faces every day",
        },
        { type: "faq", variant: "two-column", tone: "alt", eyebrow: "Questions", heading: "Before you book" },
        {
          type: "cta",
          variant: "panel",
          heading: "Let's talk about your house",
          body: "Tell us what you're planning and we'll set up a walkthrough.",
        },
      ],
    },
    services: { heading: "Painting services", intro: "Interior, exterior and specialty finishes for Portland homes." },
    projects: { heading: "Selected work", intro: "Sample projects showing the kind of homes and finishes we work on." },
    about: {
      heading: "A small studio that takes its time",
      intro: "Two painters who got tired of rushed jobs started Hollis & Wren to do it the slow way.",
      story: [
        "June and Theo met on a commercial crew where speed was the only measure. They started Hollis & Wren in 2014 to paint houses the way they would paint their own: thorough prep, quality paint and a crew that treats your home like a home.",
        "We still keep our crew small so the same people are at your house every day, and we only take as many projects as we can do properly.",
      ],
      image: { alt: "Painters' tools laid out on a drop cloth", placeholder: "paint-detail" },
    },
    contact: { heading: "Start with a walkthrough", intro: "Send a few details and we'll find a time to see the house." },
    nav: ["services", "projects", "about", "contact"],
  },
};
