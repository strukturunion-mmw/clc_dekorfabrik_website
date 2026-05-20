import { randomUUID } from "node:crypto";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { SafeAuthUser } from "@/lib/auth/types";
import {
  ORDER_REVISION_PRIORITY_META,
  ORDER_STATUS_META,
} from "./status";
import type {
  OrderActivityRecord,
  OrderRecord,
  OrderRevisionPriority,
  OrderRevisionRequestRecord,
  OrderSummary,
} from "./types";

type PersistedOrdersStore = {
  ordersByUserId: Record<string, OrderRecord[]>;
};

const runtimeStoreDir =
  process.env.DEKORFABRIK_RUNTIME_STORE_DIR?.trim() || "/tmp/dekorfabrik-runtime-store";
const ordersStorePath = path.join(runtimeStoreDir, "orders-store.json");

function ensureRuntimeStoreDir() {
  mkdirSync(runtimeStoreDir, { recursive: true });
}

function readStore(): PersistedOrdersStore {
  ensureRuntimeStoreDir();

  if (!existsSync(ordersStorePath)) {
    return {
      ordersByUserId: {},
    };
  }

  try {
    const raw = readFileSync(ordersStorePath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      return {
        ordersByUserId: {},
      };
    }

    const ordersByUserId = (parsed as PersistedOrdersStore).ordersByUserId;

    return {
      ordersByUserId:
        ordersByUserId && typeof ordersByUserId === "object" && !Array.isArray(ordersByUserId)
          ? ordersByUserId
          : {},
    };
  } catch {
    return {
      ordersByUserId: {},
    };
  }
}

function writeStore(store: PersistedOrdersStore) {
  ensureRuntimeStoreDir();
  const tmpPath = `${ordersStorePath}.${process.pid}.tmp`;

  writeFileSync(tmpPath, JSON.stringify(store), "utf8");
  renameSync(tmpPath, ordersStorePath);
}

function makeStableSeedId(userId: string, reference: string, key: string) {
  return createHash("sha256")
    .update(`${userId}:${reference}:${key}`)
    .digest("hex")
    .slice(0, 32);
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
    revisionRequests: order.revisionRequests.map((request) => ({ ...request })),
    activity: order.activity.map((activity) => ({ ...activity })),
  };
}

function makeOrderSeed(user: SafeAuthUser): Omit<OrderRecord, "id">[] {
  const firstName = user.fullName.split(" ")[0] ?? "Kund:in";
  const localPart = user.email.split("@")[0]?.toLowerCase() ?? "";

  if (localPart.includes("leer") || localPart.includes("empty")) {
    return [];
  }

  const year = new Date().getFullYear();
  const firstOrderReference = `DF-${year}-1042`;
  const secondOrderReference = `DF-${year}-1091`;

  const firstOrderRevision: OrderRevisionRequestRecord = {
    id: makeStableSeedId(user.id, firstOrderReference, "revision-1"),
    requestedAt: "2026-05-02T11:05:00.000Z",
    description:
      "Bitte die Wortmarke in der gelieferten PDF-Version etwas stärker und die Kontur am rechten Bogen glätten.",
    attachmentReference: `Logo-${firstName}-Korrekturhinweis.pdf`,
    priority: "normal",
    status: "in_pruefung",
  };

  const firstOrderActivity: OrderActivityRecord[] = [
    {
      id: makeStableSeedId(user.id, firstOrderReference, "activity-status-eingegangen"),
      kind: "status",
      timestamp: "2026-05-01T08:10:00.000Z",
      status: "eingegangen",
      title: "Auftrag eingegangen",
      message: "Ihre Dateien wurden übernommen und zur Bearbeitung vorbereitet.",
    },
    {
      id: makeStableSeedId(user.id, firstOrderReference, "activity-status-in-bearbeitung"),
      kind: "status",
      timestamp: "2026-05-01T12:45:00.000Z",
      status: "in_bearbeitung",
      title: "Bearbeitung gestartet",
      message: "Das Designteam arbeitet an Ihrer Vektorisierung.",
    },
    {
      id: makeStableSeedId(user.id, firstOrderReference, "activity-revision-1"),
      kind: "revision",
      timestamp: firstOrderRevision.requestedAt,
      title: "Revisionsanfrage eingereicht",
      message: "Ihre Korrekturwünsche wurden aufgenommen und geprüft.",
    },
    {
      id: makeStableSeedId(user.id, firstOrderReference, "activity-status-rueckfrage"),
      kind: "status",
      timestamp: "2026-05-02T11:06:00.000Z",
      status: "rueckfrage",
      title: "Status auf Rückfrage gesetzt",
      message: "Wir klären die gewünschte Korrektur und aktualisieren den Stand im Verlauf.",
    },
    {
      id: makeStableSeedId(user.id, firstOrderReference, "activity-status-abgeschlossen"),
      kind: "status",
      timestamp: "2026-05-03T15:20:00.000Z",
      status: "abgeschlossen",
      title: "Auftrag abgeschlossen",
      message: "Die finalen Dateien stehen als Download bereit.",
    },
  ];

  const secondOrderActivity: OrderActivityRecord[] = [
    {
      id: makeStableSeedId(user.id, secondOrderReference, "activity-status-eingegangen"),
      kind: "status",
      timestamp: "2026-05-10T09:30:00.000Z",
      status: "eingegangen",
      title: "Auftrag eingegangen",
      message: "Ihr Stickdatei-Auftrag wurde angelegt.",
    },
    {
      id: makeStableSeedId(user.id, secondOrderReference, "activity-status-in-bearbeitung"),
      kind: "status",
      timestamp: "2026-05-15T13:05:00.000Z",
      status: "in_bearbeitung",
      title: "Bearbeitung gestartet",
      message: "Ihr Auftrag befindet sich aktuell in der technischen Umsetzung.",
    },
  ];

  return [
    {
      reference: firstOrderReference,
      serviceLabel: "Vektorisierung · Logo-Redraw",
      status: "abgeschlossen",
      createdAt: "2026-05-01T08:10:00.000Z",
      updatedAt: "2026-05-03T15:20:00.000Z",
      files: [
        {
          id: makeStableSeedId(user.id, firstOrderReference, `Logo-${firstName}-Final.ai`),
          fileName: `Logo-${firstName}-Final.ai`,
          formatLabel: "Adobe Illustrator (.ai)",
          mimeType: "application/postscript",
          sizeBytes: 742211,
          uploadedAt: "2026-05-01T08:10:00.000Z",
          deliveredAt: "2026-05-03T15:20:00.000Z",
          downloadContent: `Dekorfabrik Demo-Datei: Logo Final für ${user.fullName}`,
        },
        {
          id: makeStableSeedId(user.id, firstOrderReference, `Logo-${firstName}-Print.pdf`),
          fileName: `Logo-${firstName}-Print.pdf`,
          formatLabel: "PDF Druckvorlage",
          mimeType: "application/pdf",
          sizeBytes: 324200,
          uploadedAt: "2026-05-01T08:10:00.000Z",
          deliveredAt: "2026-05-03T15:20:00.000Z",
          downloadContent: `Dekorfabrik Demo-Datei: Druck-PDF für ${user.fullName}`,
        },
      ],
      revisionRequests: [firstOrderRevision],
      activity: firstOrderActivity,
    },
    {
      reference: secondOrderReference,
      serviceLabel: "Stickdatei · Brustlogo",
      status: "in_bearbeitung",
      createdAt: "2026-05-10T09:30:00.000Z",
      updatedAt: "2026-05-15T13:05:00.000Z",
      files: [
        {
          id: makeStableSeedId(user.id, secondOrderReference, `Stickdatei-${firstName}-Preview.dst`),
          fileName: `Stickdatei-${firstName}-Preview.dst`,
          formatLabel: "Tajima DST",
          mimeType: "application/octet-stream",
          sizeBytes: 15890,
          uploadedAt: "2026-05-10T09:30:00.000Z",
          deliveredAt: null,
          downloadContent: `Dekorfabrik Vorschau-Datei (noch nicht geliefert) für ${user.fullName}`,
        },
      ],
      revisionRequests: [],
      activity: secondOrderActivity,
    },
  ];
}

function ensureOrdersForUser(user: SafeAuthUser) {
  const store = readStore();

  if (!store.ordersByUserId[user.id]) {
    const seeded = makeOrderSeed(user).map((order) => ({
      ...order,
      id: randomUUID(),
    }));

    store.ordersByUserId[user.id] = seeded;
    writeStore(store);
  }

  return store.ordersByUserId[user.id] ?? [];
}

export function getOrdersForUser(user: SafeAuthUser): OrderSummary[] {
  return withSortedOrders(ensureOrdersForUser(user)).map(toOrderSummary);
}

export function getOrderByIdForUser(user: SafeAuthUser, orderId: string) {
  const order = ensureOrdersForUser(user).find((candidate) => candidate.id === orderId);

  return order ? toOrderSummary(order) : null;
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

function hasRecentDuplicateRevision(
  requests: OrderRevisionRequestRecord[],
  description: string,
  windowHours: number,
) {
  const nowTs = Date.now();
  const normalizedDescription = description.trim().toLowerCase();

  return requests.some((request) => {
    const requestTs = new Date(request.requestedAt).getTime();
    const isWithinWindow = nowTs - requestTs <= windowHours * 60 * 60 * 1000;

    return isWithinWindow && request.description.trim().toLowerCase() === normalizedDescription;
  });
}

export function submitRevisionRequestForUser(
  user: SafeAuthUser,
  input: {
    orderId: string;
    description: string;
    priority: OrderRevisionPriority;
    attachmentReference: string;
  },
) {
  const store = readStore();
  const existingOrders = store.ordersByUserId[user.id];

  if (!existingOrders) {
    store.ordersByUserId[user.id] = makeOrderSeed(user).map((order) => ({
      ...order,
      id: randomUUID(),
    }));
    writeStore(store);
  }

  const orders = store.ordersByUserId[user.id] ?? [];
  const orderIndex = orders.findIndex((candidate) => candidate.id === input.orderId);

  if (orderIndex === -1) {
    return {
      ok: false as const,
      reason: "NOT_FOUND" as const,
    };
  }

  const order = orders[orderIndex];

  if (!ORDER_STATUS_META[order.status].canRequestRevision) {
    return {
      ok: false as const,
      reason: "INELIGIBLE" as const,
    };
  }

  const latestRequest = order.revisionRequests[0];

  if (latestRequest) {
    const latestTs = new Date(latestRequest.requestedAt).getTime();
    const minutesSinceLatest = (Date.now() - latestTs) / (1000 * 60);

    if (minutesSinceLatest < 10) {
      return {
        ok: false as const,
        reason: "RATE_LIMITED" as const,
      };
    }
  }

  if (hasRecentDuplicateRevision(order.revisionRequests, input.description, 24)) {
    return {
      ok: false as const,
      reason: "DUPLICATE" as const,
    };
  }

  const nowIso = new Date().toISOString();
  const request: OrderRevisionRequestRecord = {
    id: randomUUID(),
    requestedAt: nowIso,
    description: input.description.trim(),
    attachmentReference: input.attachmentReference.trim() || null,
    priority: input.priority,
    status: "eingereicht",
  };

  const revisionActivity: OrderActivityRecord = {
    id: randomUUID(),
    kind: "revision",
    timestamp: nowIso,
    title: "Revisionsanfrage eingereicht",
    message: `Priorität: ${ORDER_REVISION_PRIORITY_META[request.priority].label}. Ihre Anfrage wurde übermittelt und wird geprüft.`,
  };

  const statusActivity: OrderActivityRecord = {
    id: randomUUID(),
    kind: "status",
    status: "rueckfrage",
    timestamp: nowIso,
    title: "Status aktualisiert",
    message: "Der Auftrag wurde für die Abstimmung auf „Rückfrage“ gesetzt.",
  };

  const nextOrder: OrderRecord = {
    ...order,
    status: "rueckfrage",
    updatedAt: nowIso,
    revisionRequests: [request, ...order.revisionRequests],
    activity: [...order.activity, revisionActivity, statusActivity],
  };

  const nextOrders = [...orders];
  nextOrders[orderIndex] = nextOrder;
  store.ordersByUserId[user.id] = nextOrders;
  writeStore(store);

  return {
    ok: true as const,
    order: toOrderSummary(nextOrder),
    revisionRequest: request,
  };
}
