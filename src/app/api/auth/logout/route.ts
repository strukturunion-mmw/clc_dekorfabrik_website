import { clearUserSession } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function POST() {
  await clearUserSession();

  return Response.json({ ok: true, redirectTo: "/konto/anmelden" });
}
