import Link from "next/link";
import { getResourceCategory, type ResourceCategorySlug } from "@/lib/resources/types";

type ResourceCategoryPillProps = {
  category: ResourceCategorySlug;
  active?: boolean;
  href?: string;
  count?: number;
};

export function ResourceCategoryPill({
  category,
  active = false,
  href,
  count,
}: ResourceCategoryPillProps) {
  const categoryMeta = getResourceCategory(category);

  const className = [
    "inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 font-sans text-xs font-medium transition-colors",
    active
      ? "border-navy-900 bg-navy-900 text-paper-100"
      : "border-navy-900/20 bg-paper-50 text-navy-800 hover:bg-navy-900/5",
  ].join(" ");

  const content = (
    <>
      <span>{categoryMeta.label}</span>
      {typeof count === "number" ? (
        <span
          className={[
            "inline-flex min-w-[1.5rem] justify-center rounded-pill px-1.5 py-0.5 font-mono text-[11px]",
            active ? "bg-paper-100/20 text-paper-100" : "bg-navy-900/10 text-navy-700",
          ].join(" ")}
        >
          {count}
        </span>
      ) : null}
    </>
  );

  if (!href) {
    return <span className={className}>{content}</span>;
  }

  return (
    <Link href={href} className={className} aria-current={active ? "page" : undefined}>
      {content}
    </Link>
  );
}
