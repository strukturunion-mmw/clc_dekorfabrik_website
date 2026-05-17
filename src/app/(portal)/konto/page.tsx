import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/sections/PageShell";
import { LogoutButton } from "@/components/auth/LogoutButton";
import { OrderHistoryEmptyState } from "@/components/orders/OrderHistoryEmptyState";
import { OrderHistoryView } from "@/components/orders/OrderHistoryView";
import { createPageMetadata } from "@/lib/metadata";
import { getCurrentSessionUser } from "@/lib/auth/session";
import { getOrdersForUser } from "@/lib/orders/store";
import { OrderHistoryErrorState } from "@/components/orders/OrderHistoryErrorState";

export const metadata: Metadata = createPageMetadata({
  title: "Mein Konto",
  description:
    "Portalübersicht für registrierte Dekorfabrik-Kund:innen mit Einstieg in Aufträge und Downloads.",
  path: "/konto",
  index: false,
  follow: false,
});

type AccountDashboardPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AccountDashboardPage({ searchParams }: AccountDashboardPageProps) {
  const user = await getCurrentSessionUser();

  if (!user) {
    redirect("/konto/anmelden");
  }

  const resolvedSearchParams = searchParams ? await searchParams : {};
  const downloadErrorRaw = Array.isArray(resolvedSearchParams.downloadError)
    ? resolvedSearchParams.downloadError[0]
    : resolvedSearchParams.downloadError;
  const downloadError = downloadErrorRaw ?? "";

  const orders = getOrdersForUser(user);

  return (
    <PageShell>
      <section className="mx-auto max-w-content px-6 pt-12 pb-20 lg:pt-16">
        <div className="mx-auto max-w-5xl rounded-xl bg-paper-50 p-8 shadow-md md:p-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="font-brand text-xs uppercase tracking-brand text-ink-500">Kundenportal</p>
              <h1 className="mt-3 font-display text-d4 font-normal text-balance text-navy-900">
                Willkommen, {user.fullName}.
              </h1>
              <p className="mt-4 max-w-3xl font-sans text-sm leading-relaxed text-navy-700">
                Hier sehen Sie Ihre bisherigen Aufträge und können gelieferte Dateien sicher herunterladen.
                Für Rückfragen oder neue Projektanfragen steht der Kontaktweg jederzeit bereit.
              </p>
            </div>

            <LogoutButton />
          </div>

          <div className="mt-8 space-y-4">
            {downloadError ? <OrderHistoryErrorState body={downloadError} /> : null}
            {orders.length > 0 ? <OrderHistoryView orders={orders} /> : <OrderHistoryEmptyState />}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
