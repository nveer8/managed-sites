import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { cloneSite } from "../../../test/fixtures";
import { tenantLeadFields } from "@/engine/leads/fields";
import type { LeadActionState } from "@/engine/leads/process";
import { LeadForm } from "./lead-form";

const site = cloneSite();

function setup(
  action = vi.fn(async (_state: LeadActionState, _formData: FormData): Promise<LeadActionState> => ({ status: "success" })),
) {
  render(
    <LeadForm
      action={action}
      specs={tenantLeadFields(site)}
      hidden={{ site_slug: site.slug }}
      submitLabel="Request inspection"
      successHeading="Request received"
      successMessage="We'll call you."
      label="Quote form"
    />,
  );
  return { action, user: userEvent.setup() };
}

describe("LeadForm", () => {
  it("labels every field and marks optional ones", () => {
    setup();
    expect(screen.getByLabelText(/Your name/)).toBeRequired();
    expect(screen.getByLabelText(/Phone/)).toHaveAttribute("type", "tel");
    expect(screen.getByLabelText(/Email/)).not.toBeRequired();
    expect(screen.getAllByText("Optional").length).toBeGreaterThan(0);
  });

  it("shows an error summary and inline errors without calling the server", async () => {
    const { action, user } = setup();
    await user.click(screen.getByRole("button", { name: "Request inspection" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please check the highlighted fields.");
    const name = screen.getByLabelText(/Your name/);
    expect(name).toHaveAttribute("aria-invalid", "true");
    expect(name).toHaveAccessibleDescription("Your name is required.");
    expect(action).not.toHaveBeenCalled();
  });

  it("submits valid input and shows the confirmation", async () => {
    const { action, user } = setup();
    await user.type(screen.getByLabelText(/Your name/), "Jo Homeowner");
    await user.type(screen.getByLabelText(/Phone/), "3035550100");
    await user.type(screen.getByLabelText(/ZIP code/), "80215");
    await user.selectOptions(screen.getByLabelText(/What do you need/), "Roof Repair");
    await user.click(screen.getByRole("button", { name: "Request inspection" }));
    expect(await screen.findByRole("status")).toHaveTextContent("Request received");
    const formData = action.mock.calls[0]?.[1];
    expect(formData?.get("site_slug")).toBe(site.slug);
    expect(formData?.get("office_fax")).toBe("");
  });
});
