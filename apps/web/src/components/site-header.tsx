"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { siteConfig } from "@/config/site";
import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const projectsMenu = useRef<HTMLDetailsElement>(null);
  const projectsActive = ["/projects", "/residential", "/commercial"].some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  useEffect(() => {
    projectsMenu.current?.removeAttribute("open");
  }, [pathname]);

  function closeProjects() {
    projectsMenu.current?.removeAttribute("open");
  }

  return (
    <header className="site-topbar" data-overlay={pathname === "/"}>
      <div className="container site-topbar__inner">
        <Link className="brand site-brand" href="/" aria-label={`${siteConfig.companyName} home`} aria-current={pathname === "/" ? "page" : undefined}>
          <BrandMark />
          <span>{siteConfig.companyName}</span>
        </Link>
        <nav className="site-page-links" aria-label="Site pages">
          <Link href="/control4" aria-current={pathname === "/control4" ? "page" : undefined}>Control4</Link>
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
              <Link href="/projects" onClick={closeProjects} aria-current={pathname === "/projects" ? "page" : undefined} data-active={pathname.startsWith("/projects/")}>All projects</Link>
              <Link href="/residential" onClick={closeProjects} aria-current={pathname === "/residential" ? "page" : undefined} data-active={pathname.startsWith("/residential/")}>Residential</Link>
              <Link href="/commercial" onClick={closeProjects} aria-current={pathname === "/commercial" ? "page" : undefined} data-active={pathname.startsWith("/commercial/")}>Commercial</Link>
            </div>
          </details>
          <Link href="/process" aria-current={pathname === "/process" ? "page" : undefined}>Process</Link>
          <Link href="/services" aria-current={pathname === "/services" ? "page" : undefined}>Services</Link>
          <Link href="/contact" aria-current={pathname === "/contact" ? "page" : undefined}>Contact</Link>
        </nav>
      </div>
    </header>
  );
}
