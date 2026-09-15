import { describe, expect, it } from "vitest";
import { leadSchema } from "./lead-schema";

const validLead = {
  name: "Jordan Lee",
  email: "jordan@example.ca",
  phone: "",
  preferredContactMethod: "email",
  location: "Toronto, Ontario",
  message: "We are planning a full-floor renovation and want to coordinate infrastructure before rough-in.",
  turnstileToken: "",
  website: ""
};

describe("leadSchema", () => {
  it("accepts a bounded consultation request", () => {
    expect(leadSchema.safeParse(validLead).success).toBe(true);
  });

  it("rejects unexpected fields and security-code shaped noise", () => {
    const result = leadSchema.safeParse({ ...validLead, controllerPassword: "do-not-collect" });
    expect(result.success).toBe(false);
  });

  it("requires useful project context", () => {
    const result = leadSchema.safeParse({ ...validLead, message: "short" });
    expect(result.success).toBe(false);
  });

  it("requires only the contact detail that matches the selected method", () => {
    expect(leadSchema.safeParse({ ...validLead, email: "" }).success).toBe(false);
    expect(leadSchema.safeParse({ ...validLead, preferredContactMethod: "phone", email: "", phone: "+91 7210800077" }).success).toBe(true);
  });

  it("accepts optional planning details when supplied", () => {
    expect(leadSchema.safeParse({
      ...validLead,
      audience: "residential",
      stage: "design",
      servicesOfInterest: ["automation", "lighting-shading"],
      preferredTiming: "afternoon"
    }).success).toBe(true);
  });
});
