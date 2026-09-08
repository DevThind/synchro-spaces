"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { primaryNavigation } from "@/config/navigation";
import { useHydrated } from "@/hooks/use-hydrated";

export function DesktopNavigation({ instagram }: { instagram?: string }) {
  const hydrated = useHydrated();
  const [projectsOpen, setProjectsOpen] = useState(false);
  const projectsGroup = useRef<HTMLDivElement>(null);
  const projectsButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!projectsOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!projectsGroup.current?.contains(event.target as Node)) {
        setProjectsOpen(false);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setProjectsOpen(false);
        projectsButton.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [projectsOpen]);

  return (
    <nav className="desktop-nav" aria-label="Primary navigation">
      {primaryNavigation.map((item) => {
        if (!("children" in item)) {
          return <Link key={item.href} href={item.href}>{item.label}</Link>;
        }

        return (
          <div className="desktop-nav__group" key={item.href} ref={projectsGroup}>
            <Link href={item.href}>{item.label}</Link>
            <button
              ref={projectsButton}
              type="button"
              data-hydrated={hydrated}
              disabled={!hydrated}
              aria-expanded={projectsOpen}
              aria-controls="desktop-project-sections"
              aria-label="Show project sections"
              onClick={() => setProjectsOpen((value) => !value)}
            >
              <ChevronDown size={14} aria-hidden="true" />
            </button>
            <div
              id="desktop-project-sections"
              className="desktop-nav__submenu"
              data-open={projectsOpen}
            >
              <span className="desktop-nav__submenu-label">Explore by space</span>
              {item.children.map((child) => (
                <Link key={child.href} href={child.href} onClick={() => setProjectsOpen(false)}>
                  {child.label}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
      {instagram ? (
        <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram (opens in a new tab)">
          Instagram
        </a>
      ) : null}
      <Link className="button button--primary" href="/contact">Plan a consultation</Link>
    </nav>
  );
}
