import { describe, expect, it } from "vitest";
import { routeForDocument } from "./routes";

describe("document route mapping", () => {
  it.each([
    ["service", "lighting", "/residential/lighting"],
    ["project", "lake-house", "/projects/lake-house"]
  ])("maps %s documents", (type, slug, expected) => {
    expect(routeForDocument(type, slug)).toBe(expected);
  });

  it("returns null for unsupported or incomplete documents", () => {
    expect(routeForDocument("unknown", "value")).toBeNull();
    expect(routeForDocument("project")).toBeNull();
  });
});
