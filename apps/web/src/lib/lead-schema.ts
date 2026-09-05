import { z } from "zod";

const trimmed = (label: string, max: number) => z.string().trim().min(1, `${label} is required.`).max(max, `${label} is too long.`);

export const audienceOptions = ["residential", "commercial"] as const;
export const projectTypeOptions = ["new-home", "renovation", "retrofit", "commercial-fit-out", "system-refresh", "not-sure"] as const;
export const buildTypeOptions = ["new-build", "renovation", "retrofit", "not-sure"] as const;
export const stageOptions = ["exploring", "design", "pre-construction", "under-construction", "existing-space"] as const;
export const contactMethodOptions = ["email", "phone", "either"] as const;
export const timingOptions = ["morning", "afternoon", "evening", "flexible"] as const;
export const serviceOptions = ["automation", "lighting-shading", "audio-video", "networking", "comfort", "access-readiness", "not-sure"] as const;

export const leadSchema = z.object({
  name: trimmed("Name", 100),
  email: z.string().trim().email("Enter a valid email address.").max(160),
  phone: z.string().trim().min(7, "Enter a valid phone number.").max(30).regex(/^[+()\-\s.0-9]+$/, "Enter a valid phone number."),
  audience: z.enum(audienceOptions, { message: "Choose residential or commercial." }),
  projectType: z.enum(projectTypeOptions, { message: "Choose a project type." }),
  location: trimmed("Project location", 140),
  servicesOfInterest: z.array(z.enum(serviceOptions)).min(1, "Choose at least one service.").max(serviceOptions.length),
  buildType: z.enum(buildTypeOptions, { message: "Choose a build type." }),
  stage: z.enum(stageOptions, { message: "Choose a project stage." }),
  preferredContactMethod: z.enum(contactMethodOptions, { message: "Choose a contact method." }),
  preferredTiming: z.enum(timingOptions, { message: "Choose a consultation time." }),
  message: z.string().trim().min(20, "Please add at least 20 characters about the project.").max(3000, "Message is too long."),
  privacyAcknowledgement: z.literal(true, { message: "You must acknowledge the privacy notice." }),
  turnstileToken: z.string().max(2048).optional().default(""),
  website: z.string().max(0).optional().default("")
}).strict();

export type LeadPayload = z.infer<typeof leadSchema>;

