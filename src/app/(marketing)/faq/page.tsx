import type { Metadata } from "next";
import { marketingFaqs } from "@/brand/faqs";
import { PageHeader, ReviewCta } from "@/components/marketing/blocks";
import { FaqList } from "@/components/site/sections/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about our managed websites for home-service businesses: updates, domains, content, search and pricing.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHeader eyebrow="FAQ" heading="Questions contractors ask us" intro="If yours isn’t here, send it with your website review request." />
      <section data-tone="default" aria-label="Questions" className="pb-[var(--section-y)]">
        <div className="container-site max-w-4xl">
          <FaqList faqs={marketingFaqs} />
        </div>
      </section>
      <ReviewCta />
    </>
  );
}
