import { z } from "zod";

const trimmed = (label: string, max: number) =>
  z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);

const optionalEnum = <T extends readonly [string, ...string[]]>(values: T) =>
  z.preprocess((value) => value === "" ? undefined : value, z.enum(values).optional());

export const audienceOptions = ["residential", "commercial"] as const;
export const stageOptions = ["exploring", "design", "pre-construction", "under-construction", "existing-space"] as const;
export const contactMethodOptions = ["email", "phone"] as const;
export const timingOptions = ["morning", "afternoon", "evening", "flexible"] as const;
export const serviceOptions = ["automation", "lighting-shading", "audio-video", "networking", "comfort", "access-readiness", "remote-management", "not-sure"] as const;

const emailField = z.string().trim().max(160, "Email is too long.").refine(
  (value) => value === "" || z.email().safeParse(value).success,
  "Enter a valid email address."
);

const phoneField = z.string().trim().max(30, "Phone number is too long.").refine(
  (value) => value === "" || (/^[+()\-\s.0-9]+$/.test(value) && value.replace(/\D/g, "").length >= 7),
  "Enter a valid phone number."
);

export const leadSchema = z.object({
  name: trimmed("Name", 100),
  preferredContactMethod: z.enum(contactMethodOptions, { message: "Choose a contact method." }),
  email: emailField,
  phone: phoneField,
  location: trimmed("Project location", 140),
  message: z.string().trim().min(20, "Please add at least 20 characters about the project.").max(3000, "Message is too long."),
  audience: optionalEnum(audienceOptions),
  servicesOfInterest: z.array(z.enum(serviceOptions)).max(serviceOptions.length).optional().default([]),
  stage: optionalEnum(stageOptions),
  preferredTiming: optionalEnum(timingOptions),
  turnstileToken: z.string().max(2048).optional().default(""),
  website: z.string().max(0).optional().default("")
}).strict().superRefine((lead, context) => {
  if (lead.preferredContactMethod === "email" && !lead.email) {
    context.addIssue({ code: "custom", path: ["email"], message: "Enter the email address you would like us to use." });
  }
  if (lead.preferredContactMethod === "phone" && !lead.phone) {
    context.addIssue({ code: "custom", path: ["phone"], message: "Enter the phone number you would like us to use." });
  }
});

export type LeadPayload = z.infer<typeof leadSchema>;
