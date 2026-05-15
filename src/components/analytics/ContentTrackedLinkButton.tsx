"use client";

import type { MouseEvent, ReactNode } from "react";
import { LinkButton } from "@/components/ui/Button";
import type { AnalyticsEventMap } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

type SharedProps = {
  href: string;
  destinationPath: string;
  articleSlug: string;
  articleCategory: string;
  ctaVariant?: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "brand" | "accent" | "secondary" | "ghost";
  size?: "md" | "sm";
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

type ArticleCtaProps = SharedProps & {
  eventName: "article_cta_click";
  targetServiceSlug?: string;
};

type ServiceLinkProps = SharedProps & {
  eventName: "service_link_click";
  targetServiceSlug: string;
};

type ContentTrackedLinkButtonProps = ArticleCtaProps | ServiceLinkProps;

export function ContentTrackedLinkButton({
  eventName,
  destinationPath,
  articleSlug,
  articleCategory,
  ctaVariant,
  targetServiceSlug,
  onClick,
  ...linkProps
}: ContentTrackedLinkButtonProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);

    if (event.defaultPrevented) {
      return;
    }

    const basePayload = {
      articleSlug,
      articleCategory,
      ctaVariant: ctaVariant ?? null,
      destinationPath,
    };

    if (eventName === "service_link_click") {
      const payload: AnalyticsEventMap["service_link_click"] = {
        ...basePayload,
        targetServiceSlug,
      };

      trackEvent("service_link_click", payload);
      return;
    }

    const payload: AnalyticsEventMap["article_cta_click"] = {
      ...basePayload,
      targetServiceSlug: targetServiceSlug ?? null,
    };

    trackEvent("article_cta_click", payload);
  }

  return <LinkButton {...linkProps} onClick={handleClick} />;
}
