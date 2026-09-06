"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { useHydrated } from "@/hooks/use-hydrated";

const links = [
  ["Residential", "/residential"],
  ["Commercial", "/commercial"],
  ["Projects", "/projects"],
  ["Control4", "/control4"],
  ["Process", "/process"],
  ["About", "/about"],
  ["Resources", "/resources"]
] as const;

export function MobileNavigation() {
  const hydrated = useHydrated();
  const instagram = siteConfig.socialProfiles.instagram;
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    const backgroundSelector = ".skip-link, .site-header .brand, .desktop-nav, main, footer, .cookie-banner, .cookie-manage";
    const setBackgroundInert = () => {
      document
        .querySelectorAll<HTMLElement>(backgroundSelector)
        .forEach((element) => element.setAttribute("inert", ""));
    };
    let observer: MutationObserver | undefined;

    if (open) {
      setBackgroundInert();
      observer = new MutationObserver(setBackgroundInert);
      observer.observe(document.body, { childList: true, subtree: true });
      firstLink.current?.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        event.preventDefault();
        trigger.current?.focus();
        setOpen(false);
        return;
      }

      if (event.key === "Tab" && open) {
        const links = panel.current
          ? [...panel.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')]
          : [];
        const focusable = trigger.current ? [trigger.current, ...links] : links;
        const first = focusable[0];
        const last = focusable.at(-1);
        if (!first || !last) return;

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      observer?.disconnect();
      document
        .querySelectorAll<HTMLElement>(backgroundSelector)
        .forEach((element) => element.removeAttribute("inert"));
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        ref={trigger}
        className="menu-button"
        data-hydrated={hydrated}
        disabled={!hydrated}
        aria-expanded={open}
        aria-controls="mobile-navigation"
        aria-label={open ? "Close navigation" : "Open navigation"}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
      </button>
      <div ref={panel} id="mobile-navigation" className="mobile-panel" data-open={open} aria-hidden={!open}>
        <nav className="container mobile-links" aria-label="Mobile navigation">
          {links.map(([label, href], index) => (
            <Link key={href} href={href} ref={index === 0 ? firstLink : undefined} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
              {label}<span aria-hidden="true">↗</span>
            </Link>
          ))}
          {instagram ? (
            <a
              href={instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram (opens in a new tab)"
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
            >
              Instagram <span aria-hidden="true">↗</span>
            </a>
          ) : null}
          <Link className="button button--primary" href="/contact" onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>Plan a consultation</Link>
        </nav>
      </div>
    </>
  );
}
