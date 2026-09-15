import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LeadForm } from "./lead-form";

afterEach(() => vi.unstubAllGlobals());

describe("LeadForm", () => {
  it("shows an accessible summary for an incomplete request", async () => {
    const user = userEvent.setup();
    render(<LeadForm />);
    expect(screen.getByLabelText("Remote management")).not.toBeVisible();
    expect(screen.getByText("Share more project detail")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Send consultation request" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please review your request");
  });

  it("announces success only after the server confirms delivery", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, message: "Your consultation request has been received.", requestId: "request-test" }) }));
    render(<LeadForm />);
    await user.type(screen.getByLabelText("Name"), "Jordan Lee");
    await user.selectOptions(screen.getByLabelText("Preferred contact method"), "email");
    await user.type(screen.getByLabelText("Email address"), "jordan@example.ca");
    await user.type(screen.getByLabelText("Project location"), "Toronto, Ontario");
    await user.type(screen.getByLabelText("Short project description"), "We are coordinating a full renovation and want infrastructure resolved before rough-in.");
    await user.click(screen.getByRole("button", { name: "Send consultation request" }));
    await waitFor(() => expect(screen.getByRole("status")).toHaveTextContent("Request received"));
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("preserves entered details after a delivery failure", async () => {
    const user = userEvent.setup();
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, json: async () => ({ ok: false, message: "Please try again." }) }));
    render(<LeadForm />);
    await user.type(screen.getByLabelText("Name"), "Jordan Lee");
    await user.selectOptions(screen.getByLabelText("Preferred contact method"), "phone");
    await user.type(screen.getByLabelText("Phone number"), "+91 7210800077");
    await user.type(screen.getByLabelText("Project location"), "New Delhi");
    await user.type(screen.getByLabelText("Short project description"), "We are planning lighting and curtain control for our home.");
    await user.click(screen.getByRole("button", { name: "Send consultation request" }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Please try again");
    expect(screen.getByLabelText("Name")).toHaveValue("Jordan Lee");
    expect(screen.getByLabelText("Phone number")).toHaveValue("+91 7210800077");
  });
});
