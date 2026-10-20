import type { SectionConfig } from "@/engine/schema/types";
import type { SiteContext } from "@/engine/site-context";
import { About } from "./sections/about";
import { BeforeAfter } from "./sections/before-after";
import { Cta } from "./sections/cta";
import { Faq } from "./sections/faq";
import { Hero } from "./sections/hero";
import { LeadFormBlock } from "./sections/lead-form";
import { Process } from "./sections/process";
import { Projects } from "./sections/projects";
import { ServiceAreas } from "./sections/service-areas";
import { Services } from "./sections/services";
import { Spotlight } from "./sections/spotlight";
import { Testimonials } from "./sections/testimonials";
import { Trust } from "./sections/trust";

/** Renders one configured section. Exhaustive: a new section type fails typecheck until handled. */
export function RenderSection({ section, ctx, index }: { section: SectionConfig; ctx: SiteContext; index: number }) {
  switch (section.type) {
    case "hero":
      return <Hero section={section} ctx={ctx} index={index} />;
    case "trust":
      return <Trust section={section} ctx={ctx} index={index} />;
    case "services":
      return <Services section={section} ctx={ctx} index={index} />;
    case "spotlight":
      return <Spotlight section={section} ctx={ctx} index={index} />;
    case "projects":
      return <Projects section={section} ctx={ctx} index={index} />;
    case "before-after":
      return <BeforeAfter section={section} ctx={ctx} index={index} />;
    case "testimonials":
      return <Testimonials section={section} ctx={ctx} index={index} />;
    case "process":
      return <Process section={section} ctx={ctx} index={index} />;
    case "about":
      return <About section={section} ctx={ctx} index={index} />;
    case "service-areas":
      return <ServiceAreas section={section} ctx={ctx} index={index} />;
    case "faq":
      return <Faq section={section} ctx={ctx} index={index} />;
    case "cta":
      return <Cta section={section} ctx={ctx} index={index} />;
    case "lead-form":
      return <LeadFormBlock section={section} ctx={ctx} index={index} />;
    default: {
      const unreachable: never = section;
      throw new Error(`Unknown section ${JSON.stringify(unreachable)}`);
    }
  }
}

export function SectionList({ sections, ctx, offset = 0 }: { sections: SectionConfig[]; ctx: SiteContext; offset?: number }) {
  return (
    <>
      {sections.map((section, i) => (
        <RenderSection key={`${section.type}-${i}`} section={section} ctx={ctx} index={i + offset} />
      ))}
    </>
  );
}
