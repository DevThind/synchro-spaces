import { describe, expect, it } from "vitest";
import { leadSchema } from "./lead-schema";

const validLead = {
  name: "Jordan Lee",
  email: "jordan@example.ca",
  phone: "+1 416 555 0142",
  audience: "residential",
  projectType: "renovation",
  location: "Toronto, Ontario",
  servicesOfInterest: ["automation", "lighting-shading"],
  buildType: "renovation",
  stage: "design",
  preferredContactMethod: "email",
  preferredTiming: "afternoon",
  message: "We are planning a full-floor renovation and want to coordinate infrastructure before rough-in.",
  privacyAcknowledgement: true,
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

  it("requires privacy acknowledgement and useful project context", () => {
    const result = leadSchema.safeParse({ ...validLead, privacyAcknowledgement: false, message: "short" });
    expect(result.success).toBe(false);
  });
});

