import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { FaqAccordion } from "./ui";

describe("FaqAccordion", () => {
  it("uses native disclosure semantics", async () => {
    const user = userEvent.setup();
    render(<FaqAccordion items={[{ id: "one", category: "test", question: "What is included?", answer: "A clear, project-specific scope." }]} />);
    const summary = screen.getByText("What is included?");
    expect(summary.closest("details")).not.toHaveAttribute("open");
    await user.click(summary);
    expect(summary.closest("details")).toHaveAttribute("open");
  });
});

