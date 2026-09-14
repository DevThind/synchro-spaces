"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import { useHydrated } from "@/hooks/use-hydrated";
import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const hydrated = useHydrated();
  const [menuOpen, setMenuOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const projectsMenu = useRef<HTMLDetailsElement>(null);
  const projectsActive = ["/projects", "/residential", "/commercial"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    projectsMenu.current?.removeAttribute("open");
  }, [pathname]);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (menuOpen && header.current && !header.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [menuOpen]);

  function closeProjects() {
    projectsMenu.current?.removeAttribute("open");
  }

  function closeMenu() {
    setMenuOpen(false);
    closeProjects();
  }

  return (
    <header
      ref={header}
      className="site-topbar"
      data-overlay={pathname === "/"}
      data-menu-open={menuOpen}
      onKeyDown={(event) => {
        if (event.key === "Escape" && menuOpen) {
          event.preventDefault();
          closeMenu();
          menuButton.current?.focus();
        }
      }}
    >
      <div className="container site-topbar__inner">
        <Link className="brand site-brand" href="/" onClick={closeMenu} aria-label={`${siteConfig.companyName} home`} aria-current={pathname === "/" ? "page" : undefined}>
          <BrandMark />
          <span>{siteConfig.companyName}</span>
        </Link>
        <button
          ref={menuButton}
          className="site-menu-toggle"
          type="button"
          disabled={!hydrated}
          data-hydrated={hydrated}
          aria-expanded={menuOpen}
          aria-controls="site-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span>{menuOpen ? "Close" : "Menu"}</span>
          {menuOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
        </button>
        <nav id="site-navigation" className="site-page-links" aria-label="Site pages" data-open={menuOpen}>
          <Link href="/control4" onClick={closeMenu} aria-current={pathname === "/control4" ? "page" : undefined}>Control4</Link>
          <details
            ref={projectsMenu}
            className="site-project-menu"
            data-active={projectsActive}
            onKeyDown={(event) => {
              if (event.key === "Escape" && projectsMenu.current?.open) {
                event.preventDefault();
                projectsMenu.current.removeAttribute("open");
                projectsMenu.current.querySelector<HTMLElement>("summary")?.focus();
              }
            }}
          >
            <summary>Projects <span aria-hidden="true">+</span></summary>
            <div className="site-project-menu__links">
              <Link href="/projects" onClick={closeMenu} aria-current={pathname === "/projects" ? "page" : undefined} data-active={pathname.startsWith("/projects/")}>All projects</Link>
              <Link href="/residential" onClick={closeMenu} aria-current={pathname === "/residential" ? "page" : undefined} data-active={pathname.startsWith("/residential/")}>Residential</Link>
              <Link href="/commercial" onClick={closeMenu} aria-current={pathname === "/commercial" ? "page" : undefined} data-active={pathname.startsWith("/commercial/")}>Commercial</Link>
            </div>
          </details>
          <Link href="/process" onClick={closeMenu} aria-current={pathname === "/process" ? "page" : undefined}>Process</Link>
          <Link href="/services" onClick={closeMenu} aria-current={pathname === "/services" ? "page" : undefined}>Services</Link>
          <Link className="site-contact-link" href="/contact" onClick={closeMenu} aria-current={pathname === "/contact" ? "page" : undefined}>Start a conversation</Link>
        </nav>
      </div>
    </header>
  );
}
