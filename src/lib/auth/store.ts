import { randomUUID } from "node:crypto";
import type { AuthUser, SafeAuthUser, SessionRecord } from "./types";

type AuthStore = {
  usersByEmail: Map<string, AuthUser>;
  sessionsByToken: Map<string, SessionRecord>;
};

const globalForAuth = globalThis as typeof globalThis & {
  __dekorfabrikAuthStore?: AuthStore;
};

function getStore(): AuthStore {
  if (!globalForAuth.__dekorfabrikAuthStore) {
    globalForAuth.__dekorfabrikAuthStore = {
      usersByEmail: new Map<string, AuthUser>(),
      sessionsByToken: new Map<string, SessionRecord>(),
    };
  }

  return globalForAuth.__dekorfabrikAuthStore;
}

export function findUserByEmail(email: string) {
  return getStore().usersByEmail.get(email.toLowerCase());
}

export function findUserById(userId: string) {
  for (const user of getStore().usersByEmail.values()) {
    if (user.id === userId) {
      return user;
    }
  }

  return null;
}

export function createUser(input: {
  email: string;
  fullName: string;
  passwordHash: string;
}) {
  const email = input.email.toLowerCase();

  const user: AuthUser = {
    id: randomUUID(),
    email,
    fullName: input.fullName,
    passwordHash: input.passwordHash,
    createdAt: new Date().toISOString(),
  };

  getStore().usersByEmail.set(email, user);

  return user;
}

export function createSession(input: {
  token: string;
  userId: string;
  expiresAt: string;
}) {
  const record: SessionRecord = {
    token: input.token,
    userId: input.userId,
    createdAt: new Date().toISOString(),
    expiresAt: input.expiresAt,
  };

  getStore().sessionsByToken.set(input.token, record);

  return record;
}

export function findSession(token: string) {
  return getStore().sessionsByToken.get(token);
}

export function deleteSession(token: string) {
  getStore().sessionsByToken.delete(token);
}

export function sanitizeUser(user: AuthUser): SafeAuthUser {
  return {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    createdAt: user.createdAt,
  };
}
