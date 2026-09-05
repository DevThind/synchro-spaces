import type { LeadPayload } from "@/lib/lead-schema";

export type Mail = { to: string; subject: string; text: string; replyTo?: string };
export interface EmailAdapter { send(message: Mail): Promise<{ provider: string; reference: string }> }

export class DevelopmentEmailAdapter implements EmailAdapter { async send(message: Mail) { void message; return { provider: "development-no-send", reference: crypto.randomUUID() }; } }

export class PostmarkAdapter implements EmailAdapter {
  constructor(private readonly token: string, private readonly from: string) {}
  async send(message: Mail) { const response = await fetch("https://api.postmarkapp.com/email", { method: "POST", headers: { "X-Postmark-Server-Token": this.token, "Content-Type": "application/json" }, body: JSON.stringify({ From: this.from, To: message.to, Subject: message.subject, TextBody: message.text, ReplyTo: message.replyTo }), cache: "no-store" }); if (!response.ok) throw new Error("EMAIL_SEND_FAILED"); const result = await response.json() as { MessageID: string }; return { provider: "postmark", reference: result.MessageID }; }
}

export class ResendAdapter implements EmailAdapter {
  constructor(private readonly token: string, private readonly from: string) {}
  async send(message: Mail) { const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${this.token}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: this.from, to: [message.to], subject: message.subject, text: message.text, reply_to: message.replyTo }), cache: "no-store" }); if (!response.ok) throw new Error("EMAIL_SEND_FAILED"); const result = await response.json() as { id: string }; return { provider: "resend", reference: result.id }; }
}

export function getEmailAdapter(): EmailAdapter {
  const from = process.env.LEAD_FROM_EMAIL;
  if (process.env.EMAIL_PROVIDER === "postmark" && process.env.POSTMARK_SERVER_TOKEN && from) return new PostmarkAdapter(process.env.POSTMARK_SERVER_TOKEN, from);
  if (process.env.EMAIL_PROVIDER === "resend" && process.env.RESEND_API_KEY && from) return new ResendAdapter(process.env.RESEND_API_KEY, from);
  return new DevelopmentEmailAdapter();
}

export function confirmationMail(lead: LeadPayload): Mail { return { to: lead.email, subject: "Synchro Spaces received your enquiry", text: `Hello ${lead.name},\n\nThank you for sharing the initial context for your ${lead.audience} project with Synchro Spaces. The team will review your enquiry and respond using your preferred contact method.\n\nFor your security, never email automation passwords, alarm codes, door codes, network credentials, or sensitive security layouts.\n\nThis is an acknowledgement, not confirmation of project scope, compatibility, schedule, or availability.` }; }
export function teamMail(lead: LeadPayload, requestId: string, teamEmail: string): Mail { return { to: teamEmail, replyTo: lead.email, subject: `Website consultation · ${lead.audience} · ${requestId}`, text: `Request: ${requestId}\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nAudience: ${lead.audience}\nProject type: ${lead.projectType}\nBuild type: ${lead.buildType}\nStage: ${lead.stage}\nLocation: ${lead.location}\nServices: ${lead.servicesOfInterest.join(", ")}\nPreferred contact: ${lead.preferredContactMethod}\nPreferred timing: ${lead.preferredTiming}\n\nMessage:\n${lead.message}` }; }
