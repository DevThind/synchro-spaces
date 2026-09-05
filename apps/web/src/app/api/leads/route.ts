import { NextResponse } from "next/server";
import { getCrmAdapter } from "@/integrations/crm";
import { confirmationMail, getEmailAdapter, teamMail } from "@/integrations/email";
import { leadSchema } from "@/lib/lead-schema";
import { captureSanitizedError } from "@/lib/monitoring";
import { leadRateLimiter } from "@/lib/rate-limit";
import { getBotVerifier } from "@/lib/turnstile";

const MAX_BODY_BYTES = 16_384;

export async function POST(request: Request) {
  const requestId = crypto.randomUUID();
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "The request is too large.", requestId }, { status: 413 });

  const ip = request.headers.get("cf-connecting-ip") ?? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rate = await leadRateLimiter.check(ip);
  if (!rate.allowed) return NextResponse.json({ ok: false, message: "Too many attempts. Please wait before trying again.", requestId }, { status: 429, headers: { "Retry-After": String(rate.retryAfter) } });

  try {
    const raw = await request.text();
    if (new TextEncoder().encode(raw).byteLength > MAX_BODY_BYTES) return NextResponse.json({ ok: false, message: "The request is too large.", requestId }, { status: 413 });
    let json: unknown;
    try { json = JSON.parse(raw); } catch { return NextResponse.json({ ok: false, message: "The form could not be read.", requestId }, { status: 400 }); }
    const parsed = leadSchema.safeParse(json);
    if (!parsed.success) return NextResponse.json({ ok: false, message: "Review the highlighted fields and try again.", issues: parsed.error.flatten().fieldErrors, requestId }, { status: 422 });
    if (parsed.data.website) return NextResponse.json({ ok: true, requestId });

    const verified = await getBotVerifier().verify(parsed.data.turnstileToken, ip === "unknown" ? undefined : ip);
    if (!verified) return NextResponse.json({ ok: false, message: "We could not verify this request. Please try again.", requestId }, { status: 400 });

    await getCrmAdapter().submit(parsed.data, requestId);
    const email = getEmailAdapter();
    const messages = [email.send(confirmationMail(parsed.data))];
    if (process.env.LEAD_TEAM_EMAIL) messages.push(email.send(teamMail(parsed.data, requestId, process.env.LEAD_TEAM_EMAIL)));
    await Promise.all(messages);

    return NextResponse.json({ ok: true, message: "Your consultation request has been received.", requestId });
  } catch (error) {
    captureSanitizedError("lead_submission", error, requestId);
    return NextResponse.json({ ok: false, message: "We could not deliver your request. Please try again later.", requestId }, { status: 502 });
  }
}

