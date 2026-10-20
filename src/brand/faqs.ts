import type { Faq } from "@/engine/schema/types";

/** Marketing FAQ. Policy answers here are product decisions recorded in docs/product.md. */
export const marketingFaqs: Faq[] = [
  {
    id: "seo",
    question: "Will this get me to the top of Google?",
    answer:
      "No one can honestly promise that. We build fast, well-structured sites with accurate business details and clean technical foundations, which is the part a website controls. Rankings also depend on your reviews, your Google Business Profile, competition and time.",
  },
  {
    id: "template",
    question: "Is this a template?",
    answer:
      "Every site runs on the same tested, maintained foundation, which is how we keep it fast, secure and affordable. The design on top of that is chosen for your business: type, colors, layout, photos and the order your story is told in.",
  },
  {
    id: "manage",
    question: "Do I have to log in or edit anything?",
    answer: "No. There’s nothing to log into. Email or text us what you want changed and we take care of it.",
  },
  {
    id: "updates",
    question: "What changes are included each month?",
    answer:
      "Reasonable content and photo updates: new projects, services, hours, team members, small wording changes. Larger additions are quoted before we start.",
  },
  {
    id: "domain",
    question: "Do I keep my domain name?",
    answer: "Yes. Your domain stays registered to you. We connect it to the site and handle the technical setup.",
  },
  {
    id: "content",
    question: "Do I need to write the content?",
    answer: "No. We write it with you, from a kickoff conversation and the details you already know by heart.",
  },
  {
    id: "photos",
    question: "What if I don’t have good photos?",
    answer: "Phone photos of real jobs usually beat stock photos. We’ll help you pick and prepare them, and suggest what to shoot next.",
  },
  {
    id: "existing",
    question: "What happens to my current website?",
    answer: "It stays up until the new site is ready. On launch day we point your domain at the new site.",
  },
];
