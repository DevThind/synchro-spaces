"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { trackEvent } from "./analytics";
import { TurnstileField } from "./turnstile-field";
import { useHydrated } from "@/hooks/use-hydrated";
import { leadSchema, type LeadPayload } from "@/lib/lead-schema";

type LeadInput = z.input<typeof leadSchema>;
const serviceChoices = [
  ["automation", "Whole-home / space automation"], ["lighting-shading", "Lighting & curtain control"], ["audio-video", "Audio, video & entertainment"], ["networking", "Networking & infrastructure"], ["comfort", "Comfort & daily routines"], ["access-readiness", "Smart access readiness"], ["not-sure", "Not sure yet"]
] as const;

export function LeadForm() {
  const hydrated = useHydrated();
  const [serverStatus, setServerStatus] = useState<{ ok: boolean; message: string; requestId?: string } | null>(null);
  const [started, setStarted] = useState(false);
  const { register, handleSubmit, reset, setError, setValue, formState: { errors, isSubmitting } } = useForm<LeadInput, unknown, LeadPayload>({
    resolver: zodResolver(leadSchema),
    defaultValues: { name: "", email: "", phone: "", location: "", message: "", servicesOfInterest: [], turnstileToken: "", website: "" }
  });
  const setTurnstileToken = useCallback((token: string) => setValue("turnstileToken", token), [setValue]);
  const fieldErrors = Object.values(errors).filter((error): error is NonNullable<typeof error> => Boolean(error && "message" in error));

  function startTracking() { if (!started) { setStarted(true); trackEvent("consultation_form_start"); } }

  async function submit(values: LeadPayload) {
    setServerStatus(null);
    try {
      const response = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(values) });
      const result = await response.json() as { ok: boolean; message?: string; requestId?: string; issues?: Record<string, string[]> };
      if (!response.ok || !result.ok) {
        if (result.issues) Object.entries(result.issues).forEach(([field, messages]) => { const message = messages?.[0]; if (message) setError(field as keyof LeadInput, { type: "server", message }); });
        setServerStatus({ ok: false, message: result.message ?? "We could not deliver the request.", requestId: result.requestId });
        window.setTimeout(() => document.getElementById("form-error-summary")?.focus(), 0);
        return;
      }
      setServerStatus({ ok: true, message: result.message ?? "Your consultation request has been received.", requestId: result.requestId });
      trackEvent("consultation_form_submit", result.requestId ? { request_id: result.requestId } : {});
      reset(); setStarted(false);
    } catch {
      setServerStatus({ ok: false, message: "A network error prevented delivery. Please try again later." });
      window.setTimeout(() => document.getElementById("form-error-summary")?.focus(), 0);
    }
  }

  return <form className="lead-form" noValidate inert={!hydrated} aria-busy={!hydrated} data-hydrated={hydrated} onSubmit={handleSubmit(submit)} onFocus={startTracking}>
    <p className="form-required-note"><span aria-hidden="true">*</span> Required fields</p>
    {(fieldErrors.length > 0 || serverStatus?.ok === false) ? <div className="error-summary" id="form-error-summary" tabIndex={-1} role="alert"><strong>Please review your request.</strong>{fieldErrors.length ? <ul>{fieldErrors.map((error, index) => <li key={`${String(error.message)}-${index}`}>{String(error.message)}</li>)}</ul> : null}{serverStatus?.ok === false ? <p>{serverStatus.message}{serverStatus.requestId ? ` Reference: ${serverStatus.requestId}` : ""}</p> : null}</div> : null}
    {serverStatus?.ok ? <div className="form-status" role="status"><strong>Request received.</strong><p>{serverStatus.message}{serverStatus.requestId ? ` Reference: ${serverStatus.requestId}` : ""}</p></div> : null}
    <div className="form-group"><label className="required-label" htmlFor="name">Name</label><input id="name" required autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />{errors.name ? <p id="name-error" className="field-error">{errors.name.message}</p> : null}</div>
    <div className="form-group"><label className="required-label" htmlFor="email">Email</label><input id="email" required type="email" autoComplete="email" inputMode="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />{errors.email ? <p id="email-error" className="field-error">{errors.email.message}</p> : null}</div>
    <div className="form-group"><label className="required-label" htmlFor="phone">Phone</label><input id="phone" required type="tel" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />{errors.phone ? <p id="phone-error" className="field-error">{errors.phone.message}</p> : null}</div>
    <div className="form-group"><label className="required-label" htmlFor="audience">Project context</label><select id="audience" required defaultValue="" aria-invalid={Boolean(errors.audience)} aria-describedby={errors.audience ? "audience-error" : undefined} {...register("audience")}><option value="" disabled>Choose one</option><option value="residential">Residential</option><option value="commercial">Commercial</option></select>{errors.audience ? <p id="audience-error" className="field-error">{errors.audience.message}</p> : null}</div>
    <div className="form-group"><label className="required-label" htmlFor="projectType">Project type</label><select id="projectType" required defaultValue="" aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? "projectType-error" : undefined} {...register("projectType")}><option value="" disabled>Choose one</option><option value="new-home">New home</option><option value="renovation">Residential renovation</option><option value="retrofit">Existing-system retrofit</option><option value="commercial-fit-out">Commercial fit-out</option><option value="system-refresh">System refresh</option><option value="not-sure">Not sure yet</option></select>{errors.projectType ? <p id="projectType-error" className="field-error">{errors.projectType.message}</p> : null}</div>
    <div className="form-group"><label className="required-label" htmlFor="location">Project location</label><input id="location" required autoComplete="address-level2" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? "location-error" : undefined} {...register("location")} />{errors.location ? <p id="location-error" className="field-error">{errors.location.message}</p> : null}</div>
    <fieldset className="fieldset" aria-invalid={Boolean(errors.servicesOfInterest)} aria-describedby={errors.servicesOfInterest ? "services-error" : undefined}><legend className="required-label">Services of interest</legend><div className="checkbox-grid">{serviceChoices.map(([value, label]) => <label className="check-label" key={value}><input type="checkbox" value={value} {...register("servicesOfInterest")} /><span>{label}</span></label>)}</div>{errors.servicesOfInterest ? <p id="services-error" className="field-error">{errors.servicesOfInterest.message}</p> : null}</fieldset>
    <div className="form-group"><label className="required-label" htmlFor="buildType">Build condition</label><select id="buildType" required defaultValue="" aria-invalid={Boolean(errors.buildType)} aria-describedby={errors.buildType ? "buildType-error" : undefined} {...register("buildType")}><option value="" disabled>Choose one</option><option value="new-build">New build</option><option value="renovation">Renovation</option><option value="retrofit">Retrofit</option><option value="not-sure">Not sure</option></select>{errors.buildType ? <p id="buildType-error" className="field-error">{errors.buildType.message}</p> : null}</div>
    <div className="form-group"><label className="required-label" htmlFor="stage">Approximate stage</label><select id="stage" required defaultValue="" aria-invalid={Boolean(errors.stage)} aria-describedby={errors.stage ? "stage-error" : undefined} {...register("stage")}><option value="" disabled>Choose one</option><option value="exploring">Exploring options</option><option value="design">Design underway</option><option value="pre-construction">Pre-construction</option><option value="under-construction">Under construction</option><option value="existing-space">Existing occupied space</option></select>{errors.stage ? <p id="stage-error" className="field-error">{errors.stage.message}</p> : null}</div>
    <div className="form-group"><label className="required-label" htmlFor="preferredContactMethod">Preferred contact method</label><select id="preferredContactMethod" required defaultValue="" aria-invalid={Boolean(errors.preferredContactMethod)} aria-describedby={errors.preferredContactMethod ? "preferredContactMethod-error" : undefined} {...register("preferredContactMethod")}><option value="" disabled>Choose one</option><option value="email">Email</option><option value="phone">Phone</option><option value="either">Either</option></select>{errors.preferredContactMethod ? <p id="preferredContactMethod-error" className="field-error">{errors.preferredContactMethod.message}</p> : null}</div>
    <div className="form-group"><label className="required-label" htmlFor="preferredTiming">Preferred consultation timing</label><select id="preferredTiming" required defaultValue="" aria-invalid={Boolean(errors.preferredTiming)} aria-describedby={errors.preferredTiming ? "preferredTiming-error" : undefined} {...register("preferredTiming")}><option value="" disabled>Choose one</option><option value="morning">Weekday morning</option><option value="afternoon">Weekday afternoon</option><option value="evening">Early evening</option><option value="flexible">Flexible</option></select>{errors.preferredTiming ? <p id="preferredTiming-error" className="field-error">{errors.preferredTiming.message}</p> : null}</div>
    <div className="form-group form-group--full"><label className="required-label" htmlFor="message">Project overview</label><textarea id="message" required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-help message-error" : "message-help"} {...register("message")} /><p id="message-help" className="field-help">Share goals and timing. Do not include passwords, alarm or door codes, network credentials, or detailed security layouts.</p>{errors.message ? <p id="message-error" className="field-error">{errors.message.message}</p> : null}</div>
    <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
    {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <TurnstileField siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} onToken={setTurnstileToken} /> : null}
    <div className="form-group form-group--full"><div className="privacy-check"><input id="privacyAcknowledgement" required type="checkbox" aria-invalid={Boolean(errors.privacyAcknowledgement)} aria-describedby={errors.privacyAcknowledgement ? "privacy-help privacy-error" : "privacy-help"} {...register("privacyAcknowledgement")} /><div className="privacy-check__copy"><label className="required-label" htmlFor="privacyAcknowledgement">I have read the privacy notice and understand this form is for general project enquiries—not credentials or sensitive security information.</label><p id="privacy-help" className="field-help"><Link href="/privacy" target="_blank" rel="noreferrer" aria-label="Review the privacy notice (opens in a new tab)">Review the privacy notice <span aria-hidden="true">↗</span></Link></p></div></div>{errors.privacyAcknowledgement ? <p id="privacy-error" className="field-error">{errors.privacyAcknowledgement.message}</p> : null}</div>
    <div className="form-group form-group--full"><button className="button button--dark" type="submit" disabled={!hydrated || isSubmitting}>{isSubmitting ? "Sending securely…" : "Send consultation request"}</button></div>
  </form>;
}
