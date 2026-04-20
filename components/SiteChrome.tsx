"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const primaryNav = [
  { label: "System", href: "/#system" },
  { label: "Domains", href: "/#domains" },
  { label: "Deployments", href: "/#deployments" },
  { label: "Contact", href: "/#contact" }
] as const;

const domainNav = [
  { label: "Land", href: "/land-systems" },
  { label: "Business", href: "/business-systems" },
  { label: "Media", href: "/media-systems" },
  { label: "Research", href: "/research-lab" }
] as const;

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isHomeRoute = pathname === "/";

  if (isHomeRoute) {
    return children;
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <div className="site-header__inner">
          <Link href="/" className="site-brand" aria-label="Mimicorp Systems home">
            <span className="site-brand__mark">M</span>
            <span className="site-brand__text">
              <span>mimicorp.systems</span>
              <span>operational systems</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Primary">
            {primaryNav.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <div className="site-main">{children}</div>

      <footer className="site-footer">
        <div className="site-footer__inner">
          <div className="site-footer__block">
            <p className="site-footer__eyebrow">Mimicorp Systems</p>
            <p className="site-footer__body">
              Operational systems for land, business, media, and research.
            </p>
          </div>

          <div className="site-footer__links" aria-label="Domain links">
            {domainNav.map((item) => (
              <Link key={item.label} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>

          <div className="site-footer__block site-footer__block--right">
            <p className="site-footer__eyebrow">Principle</p>
            <p className="site-footer__body">Engines fueled by belief + movement.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
