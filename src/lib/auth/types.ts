export type AuthUser = {
  id: string;
  email: string;
  fullName: string;
  passwordHash: string;
  createdAt: string;
  consentGrantedAt: string | null;
  consentPolicyVersion: string | null;
};

export type SessionRecord = {
  token: string;
  userId: string;
  createdAt: string;
  expiresAt: string;
};

export type SafeAuthUser = Omit<AuthUser, "passwordHash">;
