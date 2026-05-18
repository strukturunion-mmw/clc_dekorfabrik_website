import type { OrderStatus } from "./types";

type OrderStatusMeta = {
  label: string;
  tone: "neutral" | "azure" | "clay" | "sky";
  canRequestRevision: boolean;
};

export const ORDER_STATUS_META: Record<OrderStatus, OrderStatusMeta> = {
  eingegangen: {
    label: "Eingegangen",
    tone: "neutral",
    canRequestRevision: false,
  },
  in_bearbeitung: {
    label: "In Bearbeitung",
    tone: "azure",
    canRequestRevision: false,
  },
  rueckfrage: {
    label: "Rückfrage",
    tone: "clay",
    canRequestRevision: true,
  },
  abgeschlossen: {
    label: "Abgeschlossen",
    tone: "sky",
    canRequestRevision: true,
  },
};
