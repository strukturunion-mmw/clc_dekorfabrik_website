import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/sections/PageShell";
import { AuthFormShell } from "@/components/auth/AuthFormShell";
import { LoginForm } from "@/components/auth/LoginForm";
import { createPageMetadata } from "@/lib/metadata";
import { getCurrentSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = createPageMetadata({
  title: "Anmelden",
  description:
    "Melden Sie sich im Dekorfabrik-Kundenkonto an, um auf Ihre Auftragsdaten zuzugreifen.",
  path: "/konto/anmelden",
});

export default async function LoginPage() {
  const user = await getCurrentSessionUser();

  if (user) {
    redirect("/konto");
  }

  return (
    <PageShell>
      <AuthFormShell
        eyebrow="Kundenportal · Login"
        title="Anmelden"
        intro="Willkommen zurück. Nach der Anmeldung sehen Sie Ihren Portalbereich mit den nächsten Schritten zu Ihren Aufträgen."
        switchPrompt={
          <p>
            Noch kein Konto?{" "}
            <Link href="/konto/registrieren" className="underline">
              Jetzt registrieren
            </Link>
          </p>
        }
      >
        <LoginForm />
      </AuthFormShell>
    </PageShell>
  );
}
