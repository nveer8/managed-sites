import type { Metadata } from "next";
import { PageHeader, ReviewCta } from "@/components/marketing/blocks";

export const metadata: Metadata = {
  title: "How it works",
  description: "From a free website review to launch and ongoing care: how we design, build, host and maintain your contractor website.",
  alternates: { canonical: "/how-it-works" },
};

const STEPS = [
  {
    title: "Free website review",
    body: "Send us your current website, or just your business details. We look at it the way a homeowner would on their phone and note what’s costing you calls.",
  },
  {
    title: "Your redesign concept",
    body: "We show you what we’d build for your business: the design direction, the page structure and how it would look on a phone. If it isn’t for you, no hard feelings.",
  },
  {
    title: "Kickoff",
    body: "If you go ahead, we collect what makes your business yours: services, the areas you cover, project photos, licenses, reviews you’ve earned, and the jobs you want more of.",
  },
  {
    title: "Build and preview",
    body: "We write the content with you, build the site and send a private preview link. You review it on your own phone, at your own pace.",
  },
  {
    title: "Revisions",
    body: "Tell us what to change in plain language. We make the edits and send the preview back.",
  },
  {
    title: "Launch",
    body: "We connect your domain, set up SSL, analytics and call tracking, and make sure your business details are consistent everywhere the site controls.",
  },
  {
    title: "We look after it",
    body: "Hosting, updates, backups and monitoring every month. Send us new photos or changes whenever you have them, and we’ll keep making small improvements.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHeader
        eyebrow="How it works"
        heading="You run the jobs. We run the website."
        intro="Here’s exactly what happens from your first message to a site that keeps working for years."
      />
      <section data-tone="default" aria-label="Steps" className="pb-[var(--section-y)]">
        <ol className="container-site flex flex-col">
          {STEPS.map((step, i) => (
            <li key={step.title} className="grid gap-4 border-t border-line py-8 md:grid-cols-[6rem_1fr_1.4fr] md:gap-10">
              <span className="display text-[2.5rem] leading-none text-primary">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="text-h3 md:text-[1.75rem]">{step.title}</h2>
              <p className="text-lead text-muted">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>
      <section data-tone="alt" aria-labelledby="need-heading" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-2">
          <h2 id="need-heading" className="text-h2">
            What we need from you
          </h2>
          <ul className="flex flex-col gap-4 text-lead">
            <li>About an hour for the kickoff conversation.</li>
            <li>Photos of your work. Phone photos are fine; we’ll pick and prepare the best ones.</li>
            <li>Access to your domain, or we’ll help you find out who has it.</li>
            <li>Quick replies when we send the preview.</li>
          </ul>
        </div>
      </section>
      <ReviewCta />
    </>
  );
}
