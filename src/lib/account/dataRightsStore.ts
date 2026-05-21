import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";

export type DataRightsRequestType = "export" | "deletion";
export type DataRightsRequestStatus = "eingereicht" | "in_pruefung";

export type DataRightsRequestRecord = {
  id: string;
  userId: string;
  type: DataRightsRequestType;
  status: DataRightsRequestStatus;
  requestedAt: string;
  policyVersion: string;
  note: string | null;
};

type PersistedDataRightsStore = {
  requestsByUserId: Record<string, DataRightsRequestRecord[]>;
};

const runtimeStoreDir =
  process.env.DEKORFABRIK_RUNTIME_STORE_DIR?.trim() || "/tmp/dekorfabrik-runtime-store";
const dataRightsStorePath = path.join(runtimeStoreDir, "data-rights-store.json");

function ensureRuntimeStoreDir() {
  mkdirSync(runtimeStoreDir, { recursive: true });
}

function readStore(): PersistedDataRightsStore {
  ensureRuntimeStoreDir();

  if (!existsSync(dataRightsStorePath)) {
    return {
      requestsByUserId: {},
    };
  }

  try {
    const raw = readFileSync(dataRightsStorePath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      return {
        requestsByUserId: {},
      };
    }

    const requestsByUserId = (parsed as PersistedDataRightsStore).requestsByUserId;

    return {
      requestsByUserId:
        requestsByUserId && typeof requestsByUserId === "object" && !Array.isArray(requestsByUserId)
          ? requestsByUserId
          : {},
    };
  } catch {
    return {
      requestsByUserId: {},
    };
  }
}

function writeStore(store: PersistedDataRightsStore) {
  ensureRuntimeStoreDir();
  const tmpPath = `${dataRightsStorePath}.${process.pid}.tmp`;

  writeFileSync(tmpPath, JSON.stringify(store), "utf8");
  renameSync(tmpPath, dataRightsStorePath);
}

function sortByLatest(records: DataRightsRequestRecord[]) {
  return [...records].sort((left, right) => {
    const leftTs = new Date(left.requestedAt).getTime();
    const rightTs = new Date(right.requestedAt).getTime();

    return rightTs - leftTs;
  });
}

export function getDataRightsRequestsForUser(userId: string) {
  const store = readStore();
  const records = store.requestsByUserId[userId] ?? [];

  return sortByLatest(records);
}

export function submitDataRightsRequestForUser(input: {
  userId: string;
  type: DataRightsRequestType;
  policyVersion: string;
  note: string;
}) {
  const store = readStore();
  const existingRequests = store.requestsByUserId[input.userId] ?? [];
  const latestOfSameType = existingRequests
    .filter((request) => request.type === input.type)
    .sort((left, right) => new Date(right.requestedAt).getTime() - new Date(left.requestedAt).getTime())[0];

  if (latestOfSameType) {
    const hoursSinceLatest =
      (Date.now() - new Date(latestOfSameType.requestedAt).getTime()) / (1000 * 60 * 60);

    if (hoursSinceLatest < 24) {
      return {
        ok: false as const,
        reason: "RATE_LIMITED" as const,
      };
    }
  }

  const record: DataRightsRequestRecord = {
    id: randomUUID(),
    userId: input.userId,
    type: input.type,
    status: "eingereicht",
    requestedAt: new Date().toISOString(),
    policyVersion: input.policyVersion,
    note: input.note.trim() ? input.note.trim() : null,
  };

  store.requestsByUserId[input.userId] = sortByLatest([record, ...existingRequests]);
  writeStore(store);

  return {
    ok: true as const,
    request: record,
  };
}
