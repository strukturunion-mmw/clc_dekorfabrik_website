import { clearUserSession } from "@/lib/auth/session";

export const runtime = "nodejs";

export async function GET(request: Request) {
  await clearUserSession();

  const url = new URL(request.url);
  const redirectTo = url.searchParams.get("redirectTo") ?? "/konto/anmelden";

  return Response.redirect(new URL(redirectTo, url), 302);
}

export async function POST() {
  await clearUserSession();

  return Response.json({ ok: true, redirectTo: "/konto/anmelden" });
}
