import { randomUUID } from "node:crypto";
import { chmodSync, existsSync, mkdirSync, readFileSync, renameSync, statSync, unlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import type { AuthUser, SafeAuthUser, SessionRecord } from "./types";

type PersistedAuthStore = {
  users: AuthUser[];
  sessions: SessionRecord[];
};

const runtimeStoreDir =
  process.env.DEKORFABRIK_RUNTIME_STORE_DIR?.trim() || "/tmp/dekorfabrik-runtime-store";
const authStorePath = path.join(runtimeStoreDir, "auth-store.json");
const authStoreLockPath = path.join(runtimeStoreDir, "auth-store.lock");
const LOCK_TIMEOUT_MS = 5000;
const LOCK_RETRY_MS = 25;
const STALE_LOCK_MS = 30000;
const sleepArray = new Int32Array(new SharedArrayBuffer(4));

function sleepMs(ms: number) {
  Atomics.wait(sleepArray, 0, 0, ms);
}

function ensureRuntimeStoreDir() {
  mkdirSync(runtimeStoreDir, { recursive: true, mode: 0o700 });

  try {
    chmodSync(runtimeStoreDir, 0o700);
  } catch {
    // Best effort hardening only.
  }
}

function ensureAuthStorePermissions() {
  if (!existsSync(authStorePath)) {
    return;
  }

  try {
    chmodSync(authStorePath, 0o600);
  } catch {
    // Best effort hardening only.
  }
}

function readStore(): PersistedAuthStore {
  ensureRuntimeStoreDir();

  if (!existsSync(authStorePath)) {
    return {
      users: [],
      sessions: [],
    };
  }

  ensureAuthStorePermissions();

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
  const tmpPath = `${authStorePath}.${process.pid}.${randomUUID()}.tmp`;

  writeFileSync(tmpPath, JSON.stringify(store), { encoding: "utf8", mode: 0o600 });
  renameSync(tmpPath, authStorePath);
  ensureAuthStorePermissions();
}

function acquireStoreLock() {
  ensureRuntimeStoreDir();
  const deadline = Date.now() + LOCK_TIMEOUT_MS;

  while (true) {
    try {
      writeFileSync(authStoreLockPath, `${process.pid}`, {
        encoding: "utf8",
        flag: "wx",
        mode: 0o600,
      });
      return;
    } catch (error) {
      const code = (error as NodeJS.ErrnoException).code;

      if (code !== "EEXIST") {
        throw error;
      }

      try {
        const lockAgeMs = Date.now() - statSync(authStoreLockPath).mtimeMs;

        if (lockAgeMs > STALE_LOCK_MS) {
          unlinkSync(authStoreLockPath);
          continue;
        }
      } catch (staleCheckError) {
        const staleCheckCode = (staleCheckError as NodeJS.ErrnoException).code;

        if (staleCheckCode === "ENOENT") {
          continue;
        }

        throw staleCheckError;
      }

      if (Date.now() >= deadline) {
        throw new Error("Timed out waiting for auth store lock");
      }

      sleepMs(LOCK_RETRY_MS);
    }
  }
}

function releaseStoreLock() {
  try {
    unlinkSync(authStoreLockPath);
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;

    if (code !== "ENOENT") {
      throw error;
    }
  }
}

function withStoreLock<T>(operation: () => T): T {
  acquireStoreLock();

  try {
    return operation();
  } finally {
    releaseStoreLock();
  }
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
  return withStoreLock(() => {
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
  });
}

export function createSession(input: {
  token: string;
  userId: string;
  expiresAt: string;
}) {
  return withStoreLock(() => {
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
  });
}

export function findSession(token: string) {
  return readStore().sessions.find((session) => session.token === token);
}

export function deleteSession(token: string) {
  withStoreLock(() => {
    const store = readStore();
    const nextSessions = store.sessions.filter((session) => session.token !== token);

    if (nextSessions.length === store.sessions.length) {
      return;
    }

    store.sessions = nextSessions;
    writeStore(store);
  });
}

export function sanitizeUser(user: AuthUser): SafeAuthUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
  };
}
