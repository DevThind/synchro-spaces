"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { CONSENT_KEY } from "./cookie-preferences";

declare global { interface Window { dataLayer?: Record<string, unknown>[]; gtag?: (...args: unknown[]) => void; } }

export type AnalyticsEvent = "consultation_form_start" | "consultation_form_submit" | "phone_click" | "email_click" | "booking_click" | "project_view" | "service_cta_click";

export function trackEvent(event: AnalyticsEvent, details: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  const consent = window.localStorage.getItem(CONSENT_KEY);
  if (!consent) return;
  try { if (!(JSON.parse(consent) as { analytics?: boolean }).analytics) return; } catch { return; }
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...details });
}

export function Analytics() {
  const [allowed, setAllowed] = useState(false);
  const ga4 = process.env.NEXT_PUBLIC_GA4_ID;
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;

  useEffect(() => {
    const read = () => {
      const value = window.localStorage.getItem(CONSENT_KEY);
      try { setAllowed(Boolean(value && (JSON.parse(value) as { analytics?: boolean }).analytics)); } catch { setAllowed(false); }
    };
    read();
    window.addEventListener("consent-changed", read);
    const click = (event: MouseEvent) => {
      const target = (event.target as Element | null)?.closest<HTMLElement>("[data-analytics-event]");
      const name = target?.dataset.analyticsEvent as AnalyticsEvent | undefined;
      if (name) trackEvent(name, target?.dataset.analyticsLabel ? { label: target.dataset.analyticsLabel } : {});
    };
    document.addEventListener("click", click);
    return () => { window.removeEventListener("consent-changed", read); document.removeEventListener("click", click); };
  }, []);

  if (!allowed) return null;
  return <>
    {gtm ? <><Script id="gtm" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];window.dataLayer.push({'gtm.start':new Date().getTime(),event:'gtm.js'});`}</Script><Script src={`https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtm)}`} strategy="afterInteractive" /></> : null}
    {ga4 && !gtm ? <><Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4)}`} strategy="afterInteractive" /><Script id="ga4" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};window.gtag=gtag;gtag('js',new Date());gtag('config','${ga4}',{anonymize_ip:true});`}</Script></> : null}
  </>;
}

