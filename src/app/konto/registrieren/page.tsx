import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { PageShell } from "@/components/sections/PageShell";
import { AuthFormShell } from "@/components/auth/AuthFormShell";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { createPageMetadata } from "@/lib/metadata";
import { getCurrentSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = createPageMetadata({
  title: "Konto erstellen",
  description:
    "Registrieren Sie Ihr Dekorfabrik-Konto, um Aufträge später im Kundenbereich nachzuverfolgen.",
  path: "/konto/registrieren",
});

export default async function RegisterPage() {
  const user = await getCurrentSessionUser();

  if (user) {
    redirect("/konto");
  }

  return (
    <PageShell>
      <AuthFormShell
        eyebrow="Kundenportal · Registrierung"
        title="Konto erstellen"
        intro="Mit Ihrem Konto erhalten Sie im nächsten Schritt Zugriff auf Verlauf, Downloads und Statusupdates zu Ihren Aufträgen."
        switchPrompt={
          <p>
            Bereits registriert?{" "}
            <Link href="/konto/anmelden" className="underline">
              Zur Anmeldung
            </Link>
          </p>
        }
      >
        <RegisterForm />
      </AuthFormShell>
    </PageShell>
  );
}
