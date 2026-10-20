import type { SiteConfig } from "@/engine/schema/types";
import { hollisWrenPainting } from "./hollis-wren-painting";
import { stillwaterBathStudio } from "./stillwater-bath-studio";
import { summitRidgeRoofing } from "./summit-ridge-roofing";

/**
 * Phase 1 tenant fixtures. All three are fictional demo businesses.
 * Real customers would be added here (and to domains.ts) until tenant data
 * moves to a database.
 */
export const allSites: SiteConfig[] = [summitRidgeRoofing, hollisWrenPainting, stillwaterBathStudio];
