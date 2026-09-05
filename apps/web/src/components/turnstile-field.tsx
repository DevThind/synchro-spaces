"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render(element: HTMLElement, options: { sitekey: string; callback: (token: string) => void; "error-callback": () => void; theme: "light" }): string;
      remove(widgetId: string): void;
    };
  }
}

export function TurnstileField({ siteKey, onToken }: { siteKey: string; onToken: (token: string) => void }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let widgetId: string | undefined;
    const render = () => { if (host.current && window.turnstile && !widgetId) widgetId = window.turnstile.render(host.current, { sitekey: siteKey, callback: onToken, "error-callback": () => onToken(""), theme: "light" }); };
    if (window.turnstile) render();
    else {
      const existing = document.querySelector<HTMLScriptElement>('script[data-turnstile="true"]');
      if (existing) existing.addEventListener("load", render, { once: true });
      else { const script = document.createElement("script"); script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; script.async = true; script.defer = true; script.dataset.turnstile = "true"; script.addEventListener("load", render, { once: true }); document.head.appendChild(script); }
    }
    return () => { if (widgetId && window.turnstile) window.turnstile.remove(widgetId); };
  }, [onToken, siteKey]);
  return <div className="form-group form-group--full"><div ref={host} /><p className="field-help">Anti-bot verification protects form delivery.</p></div>;
}

