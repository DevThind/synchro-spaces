import Link from "next/link";
import { siteConfig } from "@/config/site";
import { MobileNavigation } from "./mobile-navigation";

const links = [
  ["Residential", "/residential"],
  ["Commercial", "/commercial"],
  ["Projects", "/projects"],
  ["Control4", "/control4"],
  ["Process", "/process"],
  ["About", "/about"],
  ["Resources", "/resources"]
] as const;

export function BrandMark() {
  return (
    <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M9 29h22M11 29V17h9v12M20 29V11h10v18M14.5 21h2M24 16h2M24 20h2" fill="none" stroke="currentColor" strokeLinecap="square" strokeWidth="1.35" />
    </svg>
  );
}

export function Header() {
  const instagram = siteConfig.socialProfiles.instagram;

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link className="brand" href="/" aria-label={`${siteConfig.companyName} home`}>
          <BrandMark />
          <span className="brand-name">{siteConfig.companyName}</span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
          {instagram ? (
            <a href={instagram} target="_blank" rel="noreferrer" aria-label="Instagram (opens in a new tab)">
              Instagram
            </a>
          ) : null}
          <Link className="button button--primary" href="/contact">Plan a consultation</Link>
        </nav>
        <MobileNavigation />
      </div>
    </header>
  );
}
