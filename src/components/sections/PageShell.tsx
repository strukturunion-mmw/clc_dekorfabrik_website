import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Marquee } from "./Marquee";
import { SiteHeader } from "./SiteHeader";
import { Nav } from "../ui/Nav";
import {
  siteFooterGroups,
  siteMarqueeItems,
  siteNavLinks,
  siteTagline,
} from "../siteContent";

type PageShellProps = {
  children: ReactNode;
  marqueeItems?: string[];
};

export function PageShell({
  children,
  marqueeItems = siteMarqueeItems,
}: PageShellProps) {
  return (
    <>
      <a
        href="#hauptinhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-navy-900 focus:px-4 focus:py-2 focus:text-paper-100"
      >
        Zum Inhalt springen
      </a>

      <SiteHeader>
        <div className="mx-auto w-full max-w-content px-6">
          <Nav links={siteNavLinks} />
        </div>
        <div className="hidden md:block">
          <Marquee items={marqueeItems} />
        </div>
      </SiteHeader>

      <main id="hauptinhalt">{children}</main>

      <Footer tagline={siteTagline} groups={siteFooterGroups} />
    </>
  );
}
