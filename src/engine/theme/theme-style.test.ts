import { describe, expect, it } from "vitest";
import { allSites } from "@/tenants";
import { brandTheme } from "@/brand/brand";
import { FONT_KEYS, fontVariable } from "./fonts";
import { themeDataAttributes, themeToCssVariables } from "./theme-style";

describe("themeToCssVariables", () => {
  it("maps palette, fonts, radii and rhythm to custom properties", () => {
    const vars = themeToCssVariables(brandTheme, "wide");
    expect(vars["--p-primary"]).toBe(brandTheme.colors.primary);
    expect(vars["--f-display"]).toContain("var(--font-schibsted)");
    expect(vars["--r-card"]).toBe(brandTheme.radius.card);
    expect(vars["--container"]).toBe("88rem");
    expect(vars["--section-y"]).toMatch(/^clamp\(/);
    expect(vars["--art-4"]).toBe(brandTheme.colors.art[3]);
  });

  it("exposes switch-style treatments as data attributes", () => {
    expect(themeDataAttributes(brandTheme)).toEqual({
      "data-buttons": "solid",
      "data-eyebrows": "rule",
      "data-frame": "none",
      "data-density": "comfortable",
    });
  });

  it("every font key has a CSS variable", () => {
    for (const key of FONT_KEYS) expect(fontVariable[key]).toMatch(/^--font-/);
  });

  it("produces different variables for each demo tenant", () => {
    const serialized = allSites.map((s) => JSON.stringify(themeToCssVariables(s.theme, s.layout.container)));
    expect(new Set(serialized).size).toBe(allSites.length);
  });
});
