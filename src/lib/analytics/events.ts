export type ContentAttribution = {
  articleSlug: string;
  articleCategory: string;
  ctaVariant?: string | null;
  targetServiceSlug?: string | null;
};

export type ScrollDepthMilestone = 25 | 50 | 75 | 100;

export type AnalyticsEventMap = {
  article_view: ContentAttribution & {
    articleTitle: string;
    pathname: string;
  };
  article_scroll_depth: ContentAttribution & {
    depth: ScrollDepthMilestone;
    pathname: string;
  };
  article_cta_click: ContentAttribution & {
    ctaVariant: string | null;
    targetServiceSlug: string | null;
    destinationPath: string;
  };
  service_link_click: ContentAttribution & {
    ctaVariant: string | null;
    targetServiceSlug: string;
    destinationPath: string;
  };
  contact_form_submit_from_content: ContentAttribution & {
    ctaVariant: string | null;
    targetServiceSlug: string | null;
    destinationPath: string;
  };
  signup_started: {
    entryPath: string;
  };
  signup_completed: {
    entryPath: string;
  };
  login_completed: {
    entryPath: string;
  };
};

export type AnalyticsEventName = keyof AnalyticsEventMap;

export type AnalyticsEventEnvelope<T extends AnalyticsEventName = AnalyticsEventName> = {
  event: T;
  emittedAt: string;
} & AnalyticsEventMap[T];
