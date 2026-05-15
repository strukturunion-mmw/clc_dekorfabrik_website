import type {
  AnalyticsEventEnvelope,
  AnalyticsEventMap,
  AnalyticsEventName,
} from "./events";

type AnalyticsAdapter = (payload: AnalyticsEventEnvelope) => void;

declare global {
  interface Window {
    dataLayer?: AnalyticsEventEnvelope[];
  }
}

const dataLayerAdapter: AnalyticsAdapter = (payload) => {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(payload);
};

let activeAdapter: AnalyticsAdapter = dataLayerAdapter;

export function setAnalyticsAdapter(adapter: AnalyticsAdapter) {
  activeAdapter = adapter;
}

export function resetAnalyticsAdapter() {
  activeAdapter = dataLayerAdapter;
}

export function trackEvent<T extends AnalyticsEventName>(
  event: T,
  payload: AnalyticsEventMap[T],
) {
  const envelope: AnalyticsEventEnvelope<T> = {
    event,
    emittedAt: new Date().toISOString(),
    ...payload,
  };

  try {
    activeAdapter(envelope);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("analytics event emission failed", {
        event,
        error,
      });
    }
  }
}
