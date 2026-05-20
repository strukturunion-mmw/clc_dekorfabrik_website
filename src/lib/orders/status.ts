import type { OrderRevisionPriority, OrderRevisionRequestStatus, OrderStatus } from "./types";

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

type RevisionPriorityMeta = {
  label: string;
  helper: string;
};

export const ORDER_REVISION_PRIORITY_META: Record<OrderRevisionPriority, RevisionPriorityMeta> = {
  niedrig: {
    label: "Niedrig",
    helper: "Kleine textliche oder visuelle Korrektur.",
  },
  normal: {
    label: "Normal",
    helper: "Standard-Änderung ohne Zeitdruck.",
  },
  hoch: {
    label: "Hoch",
    helper: "Zeitkritische Korrektur mit Priorität.",
  },
};

export const ORDER_REVISION_PRIORITY_OPTIONS: OrderRevisionPriority[] = ["niedrig", "normal", "hoch"];

type RevisionRequestStatusMeta = {
  label: string;
};

export const ORDER_REVISION_REQUEST_STATUS_META: Record<
  OrderRevisionRequestStatus,
  RevisionRequestStatusMeta
> = {
  eingereicht: {
    label: "Eingereicht",
  },
  in_pruefung: {
    label: "In Prüfung",
  },
};
