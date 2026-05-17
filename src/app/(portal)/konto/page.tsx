import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/sections/PageShell";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { AUTH_SESSION_COOKIE_NAME } from "@/lib/auth/constants";
import { getCurrentSessionUser } from "@/lib/auth/session";
import { createPageMetadata } from "@/lib/metadata";

export const metadata: Metadata = createPageMetadata({
  title: "Mein Konto",
  description:
    "Portalübersicht für registrierte Dekorfabrik-Kund:innen mit Einstieg in Aufträge und Downloads.",
  path: "/konto",
  index: false,
  follow: false,
});

export default async function AccountDashboardPage() {
  const cookieStore = await cookies();
  const hasSessionCookie = Boolean(cookieStore.get(AUTH_SESSION_COOKIE_NAME)?.value);
  const user = await getCurrentSessionUser();

  if (!user) {
    if (hasSessionCookie) {
      redirect("/konto/anmelden?reauth=1");
    }

    redirect("/konto/anmelden");
  }

  return (
    <PageShell>
      <section className="mx-auto max-w-content px-6 pt-12 pb-20 lg:pt-16">
        <div className="mx-auto max-w-4xl rounded-xl bg-paper-50 p-8 shadow-md">
          <p className="font-brand text-xs uppercase tracking-brand text-ink-500">
            Kundenportal
          </p>
          <h1 className="mt-3 font-display text-d4 font-normal text-balance text-navy-900">
            Willkommen, {user.fullName}.
          </h1>
          <p className="mt-4 max-w-2xl font-sans text-sm leading-relaxed text-navy-700">
            Ihr Konto ist aktiv. Die Auftragsübersicht und Dateidownloads folgen im nächsten
            Ausbauschritt (E5-US2). Bis dahin nutzen Sie bitte weiterhin den direkten Kontaktweg
            für Status- und Dateianfragen.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/kontakt"
              className="inline-flex h-11 items-center justify-center rounded-pill bg-azure-600 px-5 font-sans text-sm font-medium text-paper-50 transition-colors duration-base hover:bg-azure-700"
            >
              Anfrage senden
            </Link>
            <LogoutButton />
          </div>

          <div className="mt-8 rounded-lg border border-ink-200/70 bg-paper-100 p-5">
            <h2 className="font-display text-lg font-normal text-navy-900">Nächste Ausbaustufe</h2>
            <ul className="mt-3 space-y-2 font-sans text-sm text-navy-700" role="list">
              <li>• Auftragsverlauf mit Statusanzeige</li>
              <li>• Sichere Dateidownloads pro Auftrag</li>
              <li>• Revisionsanfragen direkt aus dem Portal</li>
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
