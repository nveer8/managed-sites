import type { FieldSpec } from "@/engine/leads/fields";

/** Fields for the marketing site's "see what we'd do with your website" request. */
export const redesignRequestFields: FieldSpec[] = [
  { name: "name", label: "Your name", type: "text", required: true, autoComplete: "name", half: true },
  { name: "business", label: "Business name", type: "text", required: true, autoComplete: "organization", half: true },
  {
    name: "website",
    label: "Current website",
    type: "url",
    required: false,
    autoComplete: "url",
    placeholder: "yourcompany.com",
    hint: "No website yet? Leave this blank and we’ll start from your business details.",
  },
  {
    name: "trade",
    label: "Trade",
    type: "select",
    required: true,
    options: [
      "Roofing",
      "Painting",
      "Flooring",
      "Landscaping",
      "Bathroom & kitchen remodeling",
      "HVAC",
      "Plumbing",
      "Electrical",
      "Concrete",
      "Tree service",
      "Pressure washing",
      "Other home service",
    ],
    half: true,
  },
  { name: "location", label: "City and state", type: "text", required: true, autoComplete: "address-level2", half: true },
  { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", half: true },
  { name: "phone", label: "Phone (optional)", type: "tel", required: false, autoComplete: "tel", half: true },
  {
    name: "message",
    label: "Anything we should know?",
    type: "textarea",
    required: false,
    maxLength: 2000,
    placeholder: "What’s working, what isn’t, which jobs you want more of…",
  },
];
