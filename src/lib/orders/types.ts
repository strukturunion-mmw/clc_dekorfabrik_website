export type OrderStatus = "eingegangen" | "in_bearbeitung" | "rueckfrage" | "abgeschlossen";

export type OrderRevisionPriority = "niedrig" | "normal" | "hoch";

export type OrderRevisionRequestStatus = "eingereicht" | "in_pruefung";

export type OrderFileRecord = {
  id: string;
  fileName: string;
  formatLabel: string;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  deliveredAt: string | null;
  downloadContent: string;
};

export type OrderRevisionRequestRecord = {
  id: string;
  requestedAt: string;
  description: string;
  attachmentReference: string | null;
  priority: OrderRevisionPriority;
  status: OrderRevisionRequestStatus;
};

export type OrderStatusActivityRecord = {
  id: string;
  timestamp: string;
  kind: "status";
  status: OrderStatus;
  title: string;
  message: string;
};

export type OrderRevisionActivityRecord = {
  id: string;
  timestamp: string;
  kind: "revision";
  title: string;
  message: string;
};

export type OrderActivityRecord = OrderStatusActivityRecord | OrderRevisionActivityRecord;

export type OrderRecord = {
  id: string;
  reference: string;
  serviceLabel: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  files: OrderFileRecord[];
  revisionRequests: OrderRevisionRequestRecord[];
  activity: OrderActivityRecord[];
};

export type OrderFileSummary = Omit<OrderFileRecord, "downloadContent">;

export type OrderSummary = Omit<OrderRecord, "files"> & {
  files: OrderFileSummary[];
};
