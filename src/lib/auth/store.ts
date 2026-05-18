import { randomUUID } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { AuthUser, SafeAuthUser, SessionRecord } from "./types";

type PersistedAuthStore = {
  users: AuthUser[];
  sessions: SessionRecord[];
};

const runtimeStoreDir =
  process.env.DEKORFABRIK_RUNTIME_STORE_DIR?.trim() || "/tmp/dekorfabrik-runtime-store";
const authStorePath = path.join(runtimeStoreDir, "auth-store.json");

function ensureRuntimeStoreDir() {
  mkdirSync(runtimeStoreDir, { recursive: true });
}

function readStore(): PersistedAuthStore {
  ensureRuntimeStoreDir();

  if (!existsSync(authStorePath)) {
    return {
      users: [],
      sessions: [],
    };
  }

  try {
    const raw = readFileSync(authStorePath, "utf8");
    const parsed: unknown = JSON.parse(raw);

    if (!parsed || typeof parsed !== "object") {
      return {
        users: [],
        sessions: [],
      };
    }

    const users = Array.isArray((parsed as PersistedAuthStore).users)
      ? (parsed as PersistedAuthStore).users
      : [];
    const sessions = Array.isArray((parsed as PersistedAuthStore).sessions)
      ? (parsed as PersistedAuthStore).sessions
      : [];

    return {
      users,
      sessions,
    };
  } catch {
    return {
      users: [],
      sessions: [],
    };
  }
}

function writeStore(store: PersistedAuthStore) {
  ensureRuntimeStoreDir();
  const tmpPath = `${authStorePath}.${process.pid}.tmp`;

  writeFileSync(tmpPath, JSON.stringify(store), "utf8");
  renameSync(tmpPath, authStorePath);
}

function toEmailKey(email: string) {
  return email.trim().toLowerCase();
}

export function findUserByEmail(email: string) {
  const emailKey = toEmailKey(email);
  return readStore().users.find((user) => user.email === emailKey);
}

export function findUserById(userId: string) {
  return readStore().users.find((user) => user.id === userId) ?? null;
}

export function createUser(input: {
  email: string;
  fullName: string;
  passwordHash: string;
}) {
  const store = readStore();
  const email = toEmailKey(input.email);

  const user: AuthUser = {
    id: randomUUID(),
    email,
    fullName: input.fullName,
    passwordHash: input.passwordHash,
    createdAt: new Date().toISOString(),
  };

  store.users.push(user);
  writeStore(store);

  return user;
}

export function createSession(input: {
  token: string;
  userId: string;
  expiresAt: string;
}) {
  const store = readStore();

  const record: SessionRecord = {
    token: input.token,
    userId: input.userId,
    createdAt: new Date().toISOString(),
    expiresAt: input.expiresAt,
  };

  store.sessions = store.sessions.filter((candidate) => candidate.token !== input.token);
  store.sessions.push(record);
  writeStore(store);

  return record;
}

export function findSession(token: string) {
  return readStore().sessions.find((session) => session.token === token);
}

export function deleteSession(token: string) {
  const store = readStore();
  const nextSessions = store.sessions.filter((session) => session.token !== token);

  if (nextSessions.length === store.sessions.length) {
    return;
  }

  store.sessions = nextSessions;
  writeStore(store);
}

export function sanitizeUser(user: AuthUser): SafeAuthUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
  };
}
