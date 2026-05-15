"use client";

import { useEffect, useMemo, useRef } from "react";
import type { ContentAttribution, ScrollDepthMilestone } from "@/lib/analytics/events";
import { trackEvent } from "@/lib/analytics/track";

type ContentEngagementTrackerProps = {
  articleSlug: string;
  articleCategory: string;
  articleTitle: string;
};

const scrollMilestones: ScrollDepthMilestone[] = [25, 50, 75, 100];

function buildContentAttribution(input: {
  articleSlug: string;
  articleCategory: string;
}): ContentAttribution {
  return {
    articleSlug: input.articleSlug,
    articleCategory: input.articleCategory,
  };
}

export function ContentEngagementTracker({
  articleSlug,
  articleCategory,
  articleTitle,
}: ContentEngagementTrackerProps) {
  const attribution = useMemo(
    () => buildContentAttribution({ articleSlug, articleCategory }),
    [articleCategory, articleSlug],
  );
  const seenMilestonesRef = useRef<Set<ScrollDepthMilestone>>(new Set());

  useEffect(() => {
    const pathname = window.location.pathname;

    trackEvent("article_view", {
      ...attribution,
      articleTitle,
      pathname,
    });

    const emitScrollDepth = () => {
      const root = document.documentElement;
      const maxScrollable = root.scrollHeight - root.clientHeight;

      if (maxScrollable <= 0) {
        return;
      }

      const scrolledRatio = Math.min(1, window.scrollY / maxScrollable);
      const depth = Math.round(scrolledRatio * 100);

      for (const milestone of scrollMilestones) {
        if (depth >= milestone && !seenMilestonesRef.current.has(milestone)) {
          seenMilestonesRef.current.add(milestone);

          trackEvent("article_scroll_depth", {
            ...attribution,
            depth: milestone,
            pathname,
          });
        }
      }
    };

    emitScrollDepth();
    window.addEventListener("scroll", emitScrollDepth, { passive: true });

    return () => {
      window.removeEventListener("scroll", emitScrollDepth);
    };
  }, [articleTitle, attribution]);

  return null;
}
