import { randomUUID } from "node:crypto";
import type { SafeAuthUser } from "@/lib/auth/types";
import type { OrderRecord, OrderSummary } from "./types";

type OrdersStore = {
  ordersByUserId: Map<string, OrderRecord[]>;
};

const globalForOrders = globalThis as typeof globalThis & {
  __dekorfabrikOrdersStore?: OrdersStore;
};

function getStore(): OrdersStore {
  if (!globalForOrders.__dekorfabrikOrdersStore) {
    globalForOrders.__dekorfabrikOrdersStore = {
      ordersByUserId: new Map<string, OrderRecord[]>(),
    };
  }

  return globalForOrders.__dekorfabrikOrdersStore;
}

function withSortedOrders(records: OrderRecord[]) {
  return [...records].sort((left, right) => {
    const leftTs = new Date(left.updatedAt).getTime();
    const rightTs = new Date(right.updatedAt).getTime();

    return rightTs - leftTs;
  });
}

function toOrderSummary(order: OrderRecord): OrderSummary {
  return {
    ...order,
    files: order.files.map((file) => ({
      id: file.id,
      fileName: file.fileName,
      formatLabel: file.formatLabel,
      mimeType: file.mimeType,
      sizeBytes: file.sizeBytes,
      uploadedAt: file.uploadedAt,
      deliveredAt: file.deliveredAt,
    })),
  };
}

function makeOrderSeed(user: SafeAuthUser): Omit<OrderRecord, "id">[] {
  const firstName = user.fullName.split(" ")[0] ?? "Kund:in";
  const localPart = user.email.split("@")[0]?.toLowerCase() ?? "";

  if (localPart.includes("leer") || localPart.includes("empty")) {
    return [];
  }

  return [
    {
      reference: `DF-${new Date().getFullYear()}-1042`,
      serviceLabel: "Vektorisierung · Logo-Redraw",
      status: "abgeschlossen",
      createdAt: "2026-05-01T08:10:00.000Z",
      updatedAt: "2026-05-03T15:20:00.000Z",
      files: [
        {
          id: randomUUID(),
          fileName: `Logo-${firstName}-Final.ai`,
          formatLabel: "Adobe Illustrator (.ai)",
          mimeType: "application/postscript",
          sizeBytes: 742211,
          uploadedAt: "2026-05-01T08:10:00.000Z",
          deliveredAt: "2026-05-03T15:20:00.000Z",
          downloadContent: `Dekorfabrik Demo-Datei: Logo Final für ${user.fullName}`,
        },
        {
          id: randomUUID(),
          fileName: `Logo-${firstName}-Print.pdf`,
          formatLabel: "PDF Druckvorlage",
          mimeType: "application/pdf",
          sizeBytes: 324200,
          uploadedAt: "2026-05-01T08:10:00.000Z",
          deliveredAt: "2026-05-03T15:20:00.000Z",
          downloadContent: `Dekorfabrik Demo-Datei: Druck-PDF für ${user.fullName}`,
        },
      ],
    },
    {
      reference: `DF-${new Date().getFullYear()}-1091`,
      serviceLabel: "Stickdatei · Brustlogo",
      status: "in_bearbeitung",
      createdAt: "2026-05-10T09:30:00.000Z",
      updatedAt: "2026-05-15T13:05:00.000Z",
      files: [
        {
          id: randomUUID(),
          fileName: `Stickdatei-${firstName}-Preview.dst`,
          formatLabel: "Tajima DST",
          mimeType: "application/octet-stream",
          sizeBytes: 15890,
          uploadedAt: "2026-05-10T09:30:00.000Z",
          deliveredAt: null,
          downloadContent: `Dekorfabrik Vorschau-Datei (noch nicht geliefert) für ${user.fullName}`,
        },
      ],
    },
  ];
}

function ensureOrdersForUser(user: SafeAuthUser) {
  const store = getStore();

  if (!store.ordersByUserId.has(user.id)) {
    const seeded = makeOrderSeed(user).map((order) => ({
      ...order,
      id: randomUUID(),
    }));

    store.ordersByUserId.set(user.id, seeded);
  }

  return store.ordersByUserId.get(user.id) ?? [];
}

export function getOrdersForUser(user: SafeAuthUser): OrderSummary[] {
  return withSortedOrders(ensureOrdersForUser(user)).map(toOrderSummary);
}

export function getDownloadableFileForUser(user: SafeAuthUser, fileId: string) {
  const orders = ensureOrdersForUser(user);

  for (const order of orders) {
    const file = order.files.find((candidate) => candidate.id === fileId);

    if (!file) {
      continue;
    }

    if (!file.deliveredAt) {
      return {
        ok: false as const,
        reason: "NOT_DELIVERED" as const,
      };
    }

    return {
      ok: true as const,
      file,
      order,
    };
  }

  return {
    ok: false as const,
    reason: "NOT_FOUND" as const,
  };
}
