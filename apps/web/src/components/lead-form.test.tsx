import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LeadForm } from "./lead-form";

afterEach(() => vi.unstubAllGlobals());

describe("LeadForm", () => {
  it("shows an accessible summary for an incomplete request", async () => {
    const user = userEvent.setup();
    render(<LeadForm />);
    await user.click(screen.getByRole("button", { name: "Send consultation request" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please review your request");
  });

  it("announces success only after the server confirms delivery", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, message: "Your consultation request has been received.", requestId: "request-test" }) }));
    render(<LeadForm />);
    await user.type(screen.getByLabelText("Name"), "Jordan Lee");
    await user.type(screen.getByLabelText("Email"), "jordan@example.ca");
    await user.type(screen.getByLabelText("Phone"), "+1 416 555 0142");
    await user.selectOptions(screen.getByLabelText("Project context"), "residential");
    await user.selectOptions(screen.getByLabelText("Project type"), "renovation");
    await user.type(screen.getByLabelText("Project location"), "Toronto, Ontario");
    await user.click(screen.getByLabelText("Whole-home / space automation"));
    await user.selectOptions(screen.getByLabelText("Build condition"), "renovation");
    await user.selectOptions(screen.getByLabelText("Approximate stage"), "design");
    await user.selectOptions(screen.getByLabelText("Preferred contact method"), "email");
    await user.selectOptions(screen.getByLabelText("Preferred consultation timing"), "afternoon");
    await user.type(screen.getByLabelText("Project overview"), "We are coordinating a full renovation and want infrastructure resolved before rough-in.");
    await user.click(screen.getByLabelText(/I have read the privacy notice/));
    await user.click(screen.getByRole("button", { name: "Send consultation request" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Request received"));
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

