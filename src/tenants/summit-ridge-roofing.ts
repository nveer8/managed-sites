import type { SiteConfig } from "@/engine/schema/types";

/**
 * DEMO TENANT: fictional roofing contractor.
 *
 * Design direction: rugged, practical, high-contrast. Condensed uppercase
 * display type, square corners, compact rhythm, full-bleed photo hero, utility
 * header with hours/coverage, dark process band. Optimized for urgency
 * (storm damage) and phone calls.
 */
export const summitRidgeRoofing: SiteConfig = {
  id: "tnt_demo_roofing",
  slug: "summit-ridge-roofing",
  status: "demo",

  business: {
    name: "Summit Ridge Roofing",
    trade: "Roofing",
    schemaType: "RoofingContractor",
    tagline: "Roofs built for Front Range weather.",
    description:
      "Summit Ridge Roofing replaces, repairs and inspects residential roofs across the Denver metro, with a crew-lead on site for every job and hail-claim documentation handled in-house.",
    logo: { text: "Summit Ridge", tagline: "Roofing & Exteriors", mark: "peak" },
    phone: { display: "(303) 555-0142", e164: "+13035550142" },
    email: "office@summitridgeroofing.example",
    address: { street: "4100 Demo Industrial Pkwy", city: "Lakewood", region: "CO", postalCode: "80215", country: "US" },
    showStreetAddress: false,
    hours: [
      { days: ["Mo", "Tu", "We", "Th", "Fr"], opens: "07:00", closes: "18:00" },
      { days: ["Sa"], opens: "08:00", closes: "12:00" },
    ],
    hoursNote: "Mon–Fri 7am–6pm · Emergency tarping after storms",
    foundedYear: 2009,
    licenseNumbers: ["Reg. DEMO-RC-1042"],
    social: [],
    priceRange: "$$",
  },

  services: [
    {
      slug: "roof-replacement",
      name: "Roof Replacement",
      summary: "Full tear-off and new architectural shingle or metal roof, typically finished in one to two days.",
      description: [
        "When a roof is past repair, we strip it to the deck, replace any soft or damaged sheathing, and install a complete system: ice and water shield at eaves and valleys, synthetic underlayment, new flashing, ridge ventilation and the shingle or metal panel you choose.",
        "Before any work starts you get a written scope with the materials, the warranty terms and the cleanup plan. A crew lead is on site the whole time and walks the finished roof with you.",
      ],
      includes: [
        "Full tear-off to the deck",
        "Decking inspection and replacement as needed",
        "Ice and water shield in valleys and eaves",
        "New drip edge, flashing and pipe boots",
        "Ridge vent or balanced attic ventilation",
        "Magnetic sweep and full site cleanup",
      ],
      image: { alt: "Crew installing architectural shingles on a steep roof", placeholder: "roof" },
      icon: "roof",
      featured: true,
      faqIds: ["how-long", "insurance"],
    },
    {
      slug: "roof-repair",
      name: "Roof Repair",
      summary: "Leaks, missing shingles, failed flashing and vent boots fixed properly the first time.",
      description: [
        "Most leaks come from flashing, vent boots or a handful of damaged shingles rather than the whole roof. We find the actual source, show you photos, and repair it with matching materials wherever possible.",
        "If a repair would only buy you a few months, we tell you so and explain the options.",
      ],
      includes: ["Leak tracing with photo report", "Shingle and ridge cap replacement", "Flashing and chimney repairs", "Pipe boot and vent replacement"],
      image: { alt: "Close-up of new flashing along a chimney", placeholder: "roof-detail" },
      icon: "inspect",
      featured: true,
      faqIds: ["repair-or-replace"],
    },
    {
      slug: "storm-damage",
      name: "Hail & Storm Damage",
      summary: "Emergency tarping, damage documentation and help working with your insurance adjuster.",
      description: [
        "After hail or high wind, we tarp active leaks quickly, then document damage with labeled photos and measurements you can share with your insurer.",
        "We can meet your adjuster on site. We do not promise a claim outcome; the decision belongs to your insurance company.",
      ],
      includes: ["Emergency tarping", "Photo documentation", "Adjuster meetings on request", "Itemized repair or replacement scope"],
      image: { alt: "Roof after a hailstorm with damaged shingles", placeholder: "roof-detail", condition: "before" },
      icon: "storm",
      featured: true,
      faqIds: ["insurance"],
    },
    {
      slug: "gutters",
      name: "Gutters & Downspouts",
      summary: "Seamless aluminum gutters sized for Colorado snowmelt, plus guards and repairs.",
      description: [
        "We form seamless gutters on site, size downspouts for the roof area they drain, and pitch everything so water leaves the foundation.",
      ],
      includes: ["Seamless 5\" and 6\" gutters", "Oversized downspouts", "Gutter guards", "Fascia repair"],
      image: { alt: "Seamless gutter along a roof edge", placeholder: "house" },
      icon: "gutter",
    },
    {
      slug: "roof-inspections",
      name: "Roof Inspections",
      summary: "A clear written report on roof condition for buyers, sellers and homeowners.",
      description: [
        "A full inspection covers shingles, flashing, ventilation, attic moisture and gutters, with photos and an honest estimate of remaining life.",
      ],
      includes: ["Roof and attic inspection", "Photo report within 48 hours", "Remaining-life estimate", "Prioritized repair list"],
      image: { alt: "Inspector checking shingles on a ridge", placeholder: "roof" },
      icon: "inspect",
    },
  ],

  projects: [
    {
      id: "lakewood-tearoff",
      title: "Hail-damaged roof replaced in two days",
      location: "Lakewood, CO",
      serviceSlug: "roof-replacement",
      summary:
        "A 1970s ranch with hail bruising across every slope. Full tear-off, two sheets of new decking, and an impact-resistant architectural shingle in Weathered Wood.",
      facts: [
        { label: "Roof size", value: "31 squares" },
        { label: "On site", value: "2 days" },
        { label: "Shingle", value: "Class 4 impact" },
        { label: "Decking replaced", value: "2 sheets" },
      ],
      images: [{ alt: "Finished roof on a ranch home", placeholder: "house" }],
      beforeAfter: {
        before: { alt: "Ranch roof with hail-damaged, faded shingles", placeholder: "roof", condition: "before" },
        after: { alt: "Same roof with new architectural shingles", placeholder: "roof" },
      },
      isSample: true,
    },
    {
      id: "arvada-flashing",
      title: "Chimney leak traced and reflashed",
      location: "Arvada, CO",
      serviceSlug: "roof-repair",
      summary: "A recurring ceiling stain traced to failed step flashing. New counter-flashing and cricket, no further leaks.",
      images: [{ alt: "New chimney flashing", placeholder: "roof-detail" }],
      isSample: true,
    },
    {
      id: "golden-gutters",
      title: "Seamless gutters for a hillside home",
      location: "Golden, CO",
      serviceSlug: "gutters",
      summary: "Six-inch seamless gutters and oversized downspouts to handle runoff from a steep two-story roof.",
      images: [{ alt: "Two-story home with new gutters", placeholder: "house" }],
      isSample: true,
    },
    {
      id: "littleton-metal",
      title: "Standing-seam accent roof",
      location: "Littleton, CO",
      serviceSlug: "roof-replacement",
      summary: "Standing-seam metal over a front porch paired with a new shingle main roof.",
      images: [{ alt: "Metal porch roof detail", placeholder: "roof-detail" }],
      isSample: true,
    },
  ],

  testimonials: [
    {
      id: "t1",
      quote: "They tarped us the night of the storm and had the whole roof replaced eight days later. The crew lead texted me photos every afternoon.",
      author: "Sample homeowner",
      context: "Lakewood",
      serviceSlug: "storm-damage",
      isSample: true,
    },
    {
      id: "t2",
      quote: "Two other companies said we needed a new roof. Summit Ridge found the actual leak at the chimney and fixed it for a fraction of that.",
      author: "Sample homeowner",
      context: "Arvada",
      serviceSlug: "roof-repair",
      isSample: true,
    },
    {
      id: "t3",
      quote: "Clean site, clear paperwork, and they met our adjuster so we didn't have to figure it out alone.",
      author: "Sample homeowner",
      context: "Wheat Ridge",
      isSample: true,
    },
  ],

  trust: [
    { kind: "license", label: "Licensed & insured" },
    { kind: "warranty", label: "10-year workmanship warranty" },
    { kind: "certification", label: "Manufacturer-certified installers" },
    { kind: "stat", value: "Since 2009", label: "in the Denver metro" },
  ],

  team: [
    { name: "Dana Ruiz", role: "Owner & estimator" },
    { name: "Marcus Hale", role: "Crew lead" },
    { name: "Priya Shah", role: "Insurance & scheduling" },
  ],

  faqs: [
    { id: "how-long", question: "How long does a roof replacement take?", answer: "Most homes take one to two days on site. Larger or steeper roofs can take three. We schedule around the weather and will not open a roof with storms in the forecast." },
    { id: "insurance", question: "Do you work with insurance claims?", answer: "Yes. We document damage, provide an itemized scope and can meet your adjuster. Your insurance company decides what is covered; we never promise a claim result." },
    { id: "repair-or-replace", question: "How do I know if I need a repair or a replacement?", answer: "We inspect, photograph what we find and give you both options when both are reasonable. If a repair will hold for years, we recommend the repair." },
    { id: "deposit", question: "Do you require a deposit?", answer: "For replacements, a deposit is due when materials are ordered. Repairs are billed on completion." },
    { id: "warranty", question: "What warranty do I get?", answer: "Shingles carry the manufacturer's warranty, and our workmanship is covered for ten years in writing." },
  ],

  process: [
    { title: "Inspection", body: "We get on the roof and in the attic, then send a photo report within 48 hours." },
    { title: "Written scope", body: "Materials, price, warranty and timeline in plain language. No pressure to sign that day." },
    { title: "Install day", body: "A crew lead runs the job, protects your landscaping and keeps you updated with photos." },
    { title: "Walkthrough", body: "We walk the finished roof with you, sweep for nails and hand over your warranty." },
  ],

  serviceAreas: [
    { name: "Denver West", includes: ["Lakewood", "Wheat Ridge", "Golden", "Edgewater"] },
    { name: "North Metro", includes: ["Arvada", "Westminster", "Broomfield"] },
    { name: "South Metro", includes: ["Littleton", "Englewood", "Centennial"] },
  ],

  cta: {
    primaryLabel: "Get a free inspection",
    primaryAction: "quote",
    showPhone: true,
    mobileBar: true,
    reassurance: "Free inspection with photo report. No obligation.",
  },

  leadForm: {
    heading: "Request a free roof inspection",
    intro: "Tell us a little about the roof. We'll call within one business day to schedule.",
    fields: [
      { name: "name", required: true },
      { name: "phone", required: true },
      { name: "email", required: false },
      { name: "postalCode", required: true },
      { name: "service", required: true },
      { name: "message", required: false, label: "What's going on with the roof?" },
    ],
    submitLabel: "Request inspection",
    successHeading: "Request received",
    successMessage: "Thanks. This is a demo site, so nothing was sent, but on a live site the office would call you within one business day.",
    privacyNote: "We only use your details to respond to this request.",
  },

  seo: {
    defaultTitle: "Summit Ridge Roofing | Roof Replacement & Repair in the Denver Metro",
    titleTemplate: "%s | Summit Ridge Roofing",
    description: "Roof replacement, repair and hail damage help across Lakewood, Arvada, Golden and the Denver metro. Free inspections with a photo report.",
  },
  analytics: { provider: "none" },

  theme: {
    colors: {
      bg: "#f2f0eb",
      surface: "#ffffff",
      alt: "#e5e2db",
      ink: "#16191d",
      muted: "#4f545b",
      line: "#d2cec5",
      primary: "#c2410c",
      onPrimary: "#ffffff",
      accent: "#f5a524",
      onAccent: "#16191d",
      inverse: "#15191e",
      onInverse: "#f2f0eb",
      inverseMuted: "#a5abb3",
      art: ["#2c3238", "#c7d1da", "#f5a524", "#8c7b6b"],
    },
    fonts: {
      display: "barlow-condensed",
      body: "barlow",
      displayWeight: 700,
      displayCase: "uppercase",
      displayTracking: 0.005,
      scale: "dramatic",
    },
    radius: { control: "2px", card: "3px", media: "2px" },
    density: "compact",
    buttons: "solid-square",
    eyebrows: "caps",
    imageFrame: "none",
  },

  layout: { header: "utility", footer: "columns", container: "wide" },

  pages: {
    home: {
      sections: [
        {
          type: "hero",
          variant: "full-bleed",
          eyebrow: "Denver metro roofing since 2009",
          heading: "Roofs built for Front Range weather",
          subheading: "Replacement, repair and hail-damage help from a crew that shows up when they say and leaves your yard cleaner than they found it.",
          image: { alt: "Crew installing a new shingle roof on a two-story home", placeholder: "roof" },
          highlights: ["Free inspection & photo report", "10-year workmanship warranty", "Emergency tarping after storms"],
        },
        { type: "trust", variant: "inline" },
        {
          type: "services",
          variant: "tiles",
          eyebrow: "What we do",
          heading: "Roofing, start to finish",
          intro: "One crew for the roof, the flashing, the gutters and the paperwork.",
        },
        {
          type: "before-after",
          variant: "slider",
          tone: "alt",
          eyebrow: "Recent work",
          heading: "Hail-damaged roof replaced in two days",
          projectId: "lakewood-tearoff",
        },
        {
          type: "process",
          variant: "steps",
          tone: "inverse",
          eyebrow: "How it works",
          heading: "No surprises, start to finish",
        },
        {
          type: "projects",
          variant: "strip",
          eyebrow: "Project gallery",
          heading: "Roofs around the metro",
        },
        {
          type: "testimonials",
          variant: "cards",
          tone: "alt",
          eyebrow: "What homeowners say",
          heading: "Straight answers, clean job sites",
        },
        {
          type: "service-areas",
          variant: "columns",
          eyebrow: "Service area",
          heading: "Serving the west, north and south metro",
        },
        { type: "faq", variant: "accordion", tone: "alt", eyebrow: "FAQ", heading: "Common questions" },
        {
          type: "cta",
          variant: "band",
          heading: "Storm hit your roof? Get it looked at this week.",
          body: "Free inspection with a photo report you can share with your insurer.",
        },
      ],
    },
    services: { heading: "Roofing services", intro: "Everything from a single leak to a full tear-off, done by our own crews." },
    projects: { heading: "Recent roofing projects", intro: "A sample of the kind of work we do across the Denver metro." },
    about: {
      heading: "A local crew, not a storm chaser",
      intro: "We've been roofing the west metro since 2009 and we're still here after the hail trucks leave.",
      story: [
        "Summit Ridge started as a two-person repair outfit in Lakewood. We still run every job the same way: one crew lead from tear-off to walkthrough, and a photo record of the work you can't see once the shingles are on.",
        "We grew by doing repairs other companies wanted to turn into replacements, and by being reachable after the job is done.",
      ],
      image: { alt: "Roofing crew standing beside their truck", placeholder: "crew" },
    },
    contact: { heading: "Schedule a free inspection", intro: "Call the office or send the form. We answer the phone during business hours." },
    nav: ["services", "projects", "about", "contact"],
  },
};
