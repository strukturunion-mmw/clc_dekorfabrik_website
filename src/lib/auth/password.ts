import { pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";

const HASH_VERSION = "pbkdf2_sha512_v1";
const SALT_BYTES = 16;
const KEY_LENGTH = 64;
const ITERATIONS = 120_000;

export function hashPassword(password: string) {
  const salt = randomBytes(SALT_BYTES).toString("hex");
  const derived = pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, "sha512").toString(
    "hex",
  );

  return `${HASH_VERSION}:${ITERATIONS}:${salt}:${derived}`;
}

export function verifyPassword(password: string, encodedHash: string) {
  const [version, iterationsRaw, salt, storedHash] = encodedHash.split(":");

  if (!version || !iterationsRaw || !salt || !storedHash) {
    return false;
  }

  if (version !== HASH_VERSION) {
    return false;
  }

  const iterations = Number.parseInt(iterationsRaw, 10);

  if (!Number.isFinite(iterations) || iterations <= 0) {
    return false;
  }

  const derived = pbkdf2Sync(password, salt, iterations, KEY_LENGTH, "sha512").toString(
    "hex",
  );

  const storedBuffer = Buffer.from(storedHash, "hex");
  const derivedBuffer = Buffer.from(derived, "hex");

  if (storedBuffer.length !== derivedBuffer.length) {
    return false;
  }

  return timingSafeEqual(storedBuffer, derivedBuffer);
}
