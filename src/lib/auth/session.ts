import { cookies } from "next/headers";
import { randomBytes } from "node:crypto";
import { AUTH_SESSION_COOKIE_NAME, AUTH_SESSION_MAX_AGE_SECONDS } from "./constants";
import { createSession, deleteSession, findSession, findUserById, sanitizeUser } from "./store";

function buildExpiryDate() {
  return new Date(Date.now() + AUTH_SESSION_MAX_AGE_SECONDS * 1000);
}

function createSessionToken() {
  return randomBytes(32).toString("hex");
}

export async function createUserSession(userId: string) {
  const token = createSessionToken();
  const expiresAt = buildExpiryDate();

  createSession({
    token,
    userId,
    expiresAt: expiresAt.toISOString(),
  });

  const cookieStore = await cookies();

  cookieStore.set(AUTH_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export async function clearUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (token) {
    deleteSession(token);
  }

  cookieStore.delete(AUTH_SESSION_COOKIE_NAME);
}

export async function getCurrentSessionUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  const session = findSession(token);

  if (!session) {
    return null;
  }

  if (new Date(session.expiresAt).getTime() <= Date.now()) {
    deleteSession(token);
    return null;
  }

  const user = findUserById(session.userId);

  if (!user) {
    deleteSession(token);
    return null;
  }

  return sanitizeUser(user);
}
