import type { ReactNode } from "react";

type SiteHeaderProps = {
  children: ReactNode;
};

/**
 * Sticky shell for the nav pill + marquee ticker. Keeps the two elements
 * locked together on scroll so the semi-transparent nav pill never bleeds
 * the marquee behind it — they move as one band.
 *
 * The 18px top offset and 18px inner gap keep the nav pill floating, per
 * DESIGN.md.
 */
export function SiteHeader({ children }: SiteHeaderProps) {
  return (
    <header
      className="sticky z-30 flex flex-col gap-4 bg-paper-100"
      style={{ top: 0, paddingTop: 18 }}
    >
      {children}
    </header>
  );
}
