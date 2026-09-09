import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { MobileNavigation } from "./mobile-navigation";

describe("MobileNavigation", () => {
  it("opens, exposes links, and closes with Escape", async () => {
    const user = userEvent.setup();
    render(<MobileNavigation />);
    const trigger = screen.getByRole("button", { name: "Open navigation" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    const navigation = screen.getByRole("navigation", { name: "Mobile navigation" });
    const links = within(navigation).getAllByRole("link");
    expect(links[0]).toHaveAccessibleName("Control4");
    expect(links[0]).toHaveFocus();
    const projectSections = within(navigation).getByRole("group", { name: "Project sections" });
    expect(within(projectSections).getByRole("link", { name: "Projects" })).toBeVisible();
    expect(within(projectSections).getByRole("link", { name: "Residential" })).toHaveAttribute("href", "/residential");
    expect(within(projectSections).getByRole("link", { name: "Commercial" })).toHaveAttribute("href", "/commercial");
    const processLink = within(navigation).getByRole("link", { name: "Process" });
    const servicesLink = within(navigation).getByRole("link", { name: "Our services" });
    expect(servicesLink).toHaveAttribute("href", "/services");
    expect(processLink.compareDocumentPosition(servicesLink) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    await user.keyboard("{Escape}");
    expect(screen.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
});
