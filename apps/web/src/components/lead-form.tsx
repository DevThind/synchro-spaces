"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import type { z } from "zod";
import { trackEvent } from "./analytics";
import { TurnstileField } from "./turnstile-field";
import { useHydrated } from "@/hooks/use-hydrated";
import { leadSchema, type LeadPayload } from "@/lib/lead-schema";

type LeadInput = z.input<typeof leadSchema>;
const serviceChoices = [
  ["automation", "Whole-home / space automation"],
  ["lighting-shading", "Lighting & curtain control"],
  ["audio-video", "Audio systems & entertainment"],
  ["networking", "Networking & infrastructure"],
  ["comfort", "Comfort & daily routines"],
  ["access-readiness", "Integrated security & access"],
  ["remote-management", "Remote management"],
  ["not-sure", "Not sure yet"]
] as const;

export function LeadForm() {
  const hydrated = useHydrated();
  const [serverStatus, setServerStatus] = useState<{ ok: boolean; message: string; requestId?: string } | null>(null);
  const [started, setStarted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setError,
    setValue,
    control,
    formState: { errors, isSubmitting }
  } = useForm<LeadInput, unknown, LeadPayload>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      preferredContactMethod: undefined,
      email: "",
      phone: "",
      location: "",
      message: "",
      audience: undefined,
      servicesOfInterest: [],
      stage: undefined,
      preferredTiming: undefined,
      turnstileToken: "",
      website: ""
    }
  });
  const contactMethod = useWatch({ control, name: "preferredContactMethod" });
  const setTurnstileToken = useCallback((token: string) => setValue("turnstileToken", token), [setValue]);
  const fieldErrors = Object.values(errors).filter(
    (error): error is NonNullable<typeof error> => Boolean(error && "message" in error)
  );

  function startTracking() {
    if (!started) {
      setStarted(true);
      trackEvent("consultation_form_start");
    }
  }

  async function submit(values: LeadPayload) {
    setServerStatus(null);
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const result = await response.json() as {
        ok: boolean;
        message?: string;
        requestId?: string;
        issues?: Record<string, string[]>;
      };
      if (!response.ok || !result.ok) {
        if (result.issues) {
          Object.entries(result.issues).forEach(([field, messages]) => {
            const message = messages?.[0];
            if (message) setError(field as keyof LeadInput, { type: "server", message });
          });
        }
        setServerStatus({
          ok: false,
          message: result.message ?? "We could not deliver the request.",
          requestId: result.requestId
        });
        window.setTimeout(() => document.getElementById("form-error-summary")?.focus(), 0);
        return;
      }
      setServerStatus({
        ok: true,
        message: result.message ?? "Your consultation request has been received.",
        requestId: result.requestId
      });
      trackEvent("consultation_form_submit", result.requestId ? { request_id: result.requestId } : {});
      reset();
      setStarted(false);
    } catch {
      setServerStatus({ ok: false, message: "A network error prevented delivery. Please try again later." });
      window.setTimeout(() => document.getElementById("form-error-summary")?.focus(), 0);
    }
  }

  return (
    <form
      className="lead-form"
      noValidate
      inert={!hydrated}
      aria-busy={!hydrated || isSubmitting}
      data-hydrated={hydrated}
      onSubmit={handleSubmit(submit)}
      onFocus={startTracking}
    >
      <div className="form-intro form-group--full">
        <span className="eyebrow">A simple first step</span>
        <h2>Tell us the essentials.</h2>
        <p>Five short details are enough to begin. Fields marked <span aria-hidden="true">*</span><span className="sr-only">with an asterisk</span> are required. Optional project detail can be added below.</p>
      </div>

      {(fieldErrors.length > 0 || serverStatus?.ok === false) ? (
        <div className="error-summary" id="form-error-summary" tabIndex={-1} role="alert">
          <strong>Please review your request.</strong>
          {fieldErrors.length ? <ul>{fieldErrors.map((error, index) => <li key={`${String(error.message)}-${index}`}>{String(error.message)}</li>)}</ul> : null}
          {serverStatus?.ok === false ? <p>{serverStatus.message}{serverStatus.requestId ? ` Reference: ${serverStatus.requestId}` : ""}</p> : null}
        </div>
      ) : null}
      {serverStatus?.ok ? <div className="form-status" role="status"><strong>Request received.</strong><p>{serverStatus.message}{serverStatus.requestId ? ` Reference: ${serverStatus.requestId}` : ""}</p></div> : null}

      <div className="form-group">
        <label className="required-label" htmlFor="name">Name</label>
        <input id="name" required autoComplete="name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} {...register("name")} />
        {errors.name ? <p id="name-error" className="field-error">{errors.name.message}</p> : null}
      </div>
      <div className="form-group">
        <label className="required-label" htmlFor="preferredContactMethod">Preferred contact method</label>
        <select id="preferredContactMethod" required defaultValue="" aria-invalid={Boolean(errors.preferredContactMethod)} aria-describedby={errors.preferredContactMethod ? "preferredContactMethod-error" : undefined} {...register("preferredContactMethod")}>
          <option value="" disabled>Choose email or phone</option>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        {errors.preferredContactMethod ? <p id="preferredContactMethod-error" className="field-error">{errors.preferredContactMethod.message}</p> : null}
      </div>

      {contactMethod === "email" ? <div className="form-group form-group--full">
        <label className="required-label" htmlFor="email">Email address</label>
        <input id="email" required type="email" autoComplete="email" inputMode="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} {...register("email")} />
        {errors.email ? <p id="email-error" className="field-error">{errors.email.message}</p> : null}
      </div> : null}
      {contactMethod === "phone" ? <div className="form-group form-group--full">
        <label className="required-label" htmlFor="phone">Phone number</label>
        <input id="phone" required type="tel" autoComplete="tel" inputMode="tel" aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? "phone-error" : undefined} {...register("phone")} />
        {errors.phone ? <p id="phone-error" className="field-error">{errors.phone.message}</p> : null}
      </div> : null}

      <div className="form-group form-group--full">
        <label className="required-label" htmlFor="location">Project location</label>
        <input id="location" required autoComplete="address-level2" placeholder="City or area" aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? "location-error" : undefined} {...register("location")} />
        {errors.location ? <p id="location-error" className="field-error">{errors.location.message}</p> : null}
      </div>
      <div className="form-group form-group--full">
        <label className="required-label" htmlFor="message">Short project description</label>
        <textarea id="message" required placeholder="For example: new build, four bedrooms, lighting and audio planning before electrical first fix." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-help message-error" : "message-help"} {...register("message")} />
        <p id="message-help" className="field-help">A room list, goals and approximate timing are useful. Never include passwords, access codes or security layouts.</p>
        {errors.message ? <p id="message-error" className="field-error">{errors.message.message}</p> : null}
      </div>

      <details className="form-optional form-group--full">
        <summary>Share more project detail <span>Optional</span></summary>
        <div className="form-optional__grid">
          <div className="form-group">
            <label htmlFor="audience">Project context <span className="optional-label">Optional</span></label>
            <select id="audience" defaultValue="" {...register("audience")}><option value="">Not specified</option><option value="residential">Residential</option><option value="commercial">Commercial</option></select>
          </div>
          <div className="form-group">
            <label htmlFor="stage">Project stage <span className="optional-label">Optional</span></label>
            <select id="stage" defaultValue="" {...register("stage")}><option value="">Not specified</option><option value="exploring">Exploring options</option><option value="design">Design underway</option><option value="pre-construction">Pre-construction</option><option value="under-construction">Under construction</option><option value="existing-space">Existing occupied space</option></select>
          </div>
          <fieldset className="fieldset">
            <legend>Services of interest <span className="optional-label">Optional</span></legend>
            <div className="checkbox-grid">{serviceChoices.map(([value, label]) => <label className="check-label" key={value}><input type="checkbox" value={value} {...register("servicesOfInterest")} /><span>{label}</span></label>)}</div>
          </fieldset>
          <div className="form-group">
            <label htmlFor="preferredTiming">Consultation timing <span className="optional-label">Optional</span></label>
            <select id="preferredTiming" defaultValue="" {...register("preferredTiming")}><option value="">No preference</option><option value="morning">Weekday morning</option><option value="afternoon">Weekday afternoon</option><option value="evening">Early evening</option><option value="flexible">Flexible</option></select>
          </div>
        </div>
      </details>

      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" tabIndex={-1} autoComplete="off" {...register("website")} /></div>
      {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ? <TurnstileField siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} onToken={setTurnstileToken} /> : null}
      <div className="form-submit form-group--full">
        <p>By sending this form, you agree that we may use these details to respond to your enquiry. Read our <Link href="/privacy">privacy notice</Link>.</p>
        <button className="button button--dark" type="submit" disabled={!hydrated || isSubmitting}>{isSubmitting ? "Sending securely…" : "Send consultation request"}</button>
        {isSubmitting ? <span className="sr-only" role="status" aria-live="polite">Sending your consultation request.</span> : null}
      </div>
    </form>
  );
}
