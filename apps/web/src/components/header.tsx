import Link from "next/link";
import { siteConfig } from "@/config/site";
import { DesktopNavigation } from "./desktop-navigation";
import { MobileNavigation } from "./mobile-navigation";

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
        <DesktopNavigation instagram={instagram} />
        <MobileNavigation />
      </div>
    </header>
  );
}
