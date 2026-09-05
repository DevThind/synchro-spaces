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
  const firstLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    if (open) firstLink.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("menu-open");
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
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
      <div id="mobile-navigation" className="mobile-panel" data-open={open} aria-hidden={!open}>
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
