import { hashPassword, verifyPassword } from "./password";
import { createUser, findUserByEmail, sanitizeUser } from "./store";
import type { SafeAuthUser } from "./types";

export class AuthError extends Error {
  constructor(
    message: string,
    public readonly code: "EMAIL_ALREADY_REGISTERED" | "INVALID_CREDENTIALS",
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export function registerUser(input: {
  fullName: string;
  email: string;
  password: string;
  consentGrantedAt: string;
  consentPolicyVersion: string;
}): SafeAuthUser {
  const existingUser = findUserByEmail(input.email);

  if (existingUser) {
    throw new AuthError(
      "Für diese E-Mail-Adresse existiert bereits ein Konto.",
      "EMAIL_ALREADY_REGISTERED",
    );
  }

  const user = createUser({
    fullName: input.fullName,
    email: input.email,
    passwordHash: hashPassword(input.password),
    consentGrantedAt: input.consentGrantedAt,
    consentPolicyVersion: input.consentPolicyVersion,
  });

  return sanitizeUser(user);
}

export function loginUser(input: { email: string; password: string }): SafeAuthUser {
  const user = findUserByEmail(input.email);

  if (!user || !verifyPassword(input.password, user.passwordHash)) {
    throw new AuthError(
      "Die Kombination aus E-Mail-Adresse und Passwort ist nicht korrekt.",
      "INVALID_CREDENTIALS",
    );
  }

  return sanitizeUser(user);
}
