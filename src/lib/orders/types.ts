export type OrderStatus = "eingegangen" | "in_bearbeitung" | "rueckfrage" | "abgeschlossen";

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

export type OrderRecord = {
  id: string;
  reference: string;
  serviceLabel: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  files: OrderFileRecord[];
};

export type OrderFileSummary = Omit<OrderFileRecord, "downloadContent">;

export type OrderSummary = Omit<OrderRecord, "files"> & {
  files: OrderFileSummary[];
};
