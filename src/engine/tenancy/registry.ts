/**
 * Default wiring of the tenant repository to Phase 1 fixtures. This and
 * default-resolver.ts are the only modules that know where tenant data lives.
 */
import { allSites } from "@/tenants";
import { createFixtureRepository } from "./repository";

export const tenantRepository = createFixtureRepository(allSites);
