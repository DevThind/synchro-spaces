"use client";

import { useEffect, useRef, useState } from "react";

export type ConsentChoice = "necessary" | "analytics";
export const CONSENT_KEY = "site-consent-v1";

export function CookiePreferences() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(false);
  const [settings, setSettings] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const banner = useRef<HTMLElement>(null);
  const manage = useRef<HTMLButtonElement>(null);
  const openedFromManage = useRef(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const stored = window.localStorage.getItem(CONSENT_KEY);
      if (stored) {
        try { setAnalytics((JSON.parse(stored) as { analytics?: boolean }).analytics === true); } catch { setVisible(true); }
      } else setVisible(true);
      setReady(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible && openedFromManage.current) banner.current?.focus();
  }, [visible]);

  function save(allowAnalytics: boolean) {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify({ necessary: true, analytics: allowAnalytics, updatedAt: new Date().toISOString() }));
    setAnalytics(allowAnalytics);
    setVisible(false);
    window.dispatchEvent(new CustomEvent("consent-changed", { detail: { analytics: allowAnalytics } }));
    if (openedFromManage.current) {
      openedFromManage.current = false;
      window.setTimeout(() => manage.current?.focus(), 0);
    }
  }

  if (!ready) return null;
  return <>
    {visible ? <aside ref={banner} className="cookie-banner" aria-labelledby="cookie-title" aria-describedby="cookie-description" tabIndex={-1}>
      <h2 id="cookie-title">Your privacy choices</h2>
      <p id="cookie-description">Necessary storage remembers this choice and protects form delivery. Optional analytics stay off unless you allow them.</p>
      {settings ? <div className="cookie-settings"><label className="privacy-check"><input type="checkbox" checked={analytics} onChange={(event) => setAnalytics(event.target.checked)} /><span><strong>Optional analytics</strong><br /><small>Helps understand page and enquiry journeys without recording form content.</small></span></label></div> : null}
      <div className="cookie-actions">
        <button className="button button--primary" type="button" onClick={() => save(settings ? analytics : true)}>Allow selected</button>
        <button className="button button--outline" type="button" onClick={() => save(false)}>Necessary only</button>
        <button className="cookie-trigger" type="button" onClick={() => setSettings((value) => !value)} aria-expanded={settings}>{settings ? "Hide details" : "Choose"}</button>
      </div>
    </aside> : <button ref={manage} className="cookie-manage" type="button" onClick={() => { openedFromManage.current = true; setSettings(true); setVisible(true); }}>Privacy choices</button>}
  </>;
}
