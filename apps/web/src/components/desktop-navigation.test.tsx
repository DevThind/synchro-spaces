import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { DesktopNavigation } from "./desktop-navigation";

vi.mock("next/navigation", () => ({ usePathname: () => "/services" }));

describe("DesktopNavigation", () => {
  it("keeps Control4 first and groups Residential and Commercial under Projects", async () => {
    const user = userEvent.setup();
    render(<DesktopNavigation />);

    const navigation = screen.getByRole("navigation", { name: "Primary navigation" });
    const topLevelLinks = navigation.querySelectorAll(":scope > a");
    expect(topLevelLinks[0]).toHaveAccessibleName("Control4");
    expect([...topLevelLinks].some((link) => link.textContent === "Residential")).toBe(false);
    expect([...topLevelLinks].some((link) => link.textContent === "Commercial")).toBe(false);
    const labels = [...navigation.querySelectorAll(":scope > a, :scope > .desktop-nav__group > a")].map((link) => link.textContent);
    expect(labels.indexOf("Our services")).toBe(labels.indexOf("Process") + 1);
    const servicesLink = within(navigation).getByRole("link", { name: "Our services" });
    expect(servicesLink).toHaveAttribute("href", "/services");
    expect(servicesLink).toHaveAttribute("aria-current", "page");

    const trigger = within(navigation).getByRole("button", { name: "Show project sections" });
    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(trigger).toHaveAccessibleName("Hide project sections");
    expect(within(navigation).getByRole("link", { name: "Residential" })).toHaveAttribute("href", "/residential");
    expect(within(navigation).getByRole("link", { name: "Commercial" })).toHaveAttribute("href", "/commercial");

    await user.keyboard("{Escape}");
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(trigger).toHaveFocus();
  });
});
