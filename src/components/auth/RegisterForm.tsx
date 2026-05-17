"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import {
  FieldError,
  errorBoxClassName,
  inputBaseClassName,
} from "@/components/auth/fieldStyles";
import { trackEvent } from "@/lib/analytics/track";
import type { AuthFieldErrors } from "@/lib/auth/validation";

export function RegisterForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      trackEvent("signup_started", {
        entryPath: "/konto/registrieren",
      });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        body: formData,
      });

      const payload = (await response.json()) as
        | { ok: true; redirectTo: string }
        | { ok: false; fieldErrors?: AuthFieldErrors };

      if (!response.ok || !payload.ok) {
        setFieldErrors(
          payload.ok === false && payload.fieldErrors
            ? payload.fieldErrors
            : {
                form: "Die Registrierung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
              },
        );

        return;
      }

      trackEvent("signup_completed", {
        entryPath: "/konto/registrieren",
      });

      router.push(payload.redirectTo);
    } catch {
      setFieldErrors({
        form: "Die Registrierung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <label className="block font-sans text-sm text-navy-800">
        <span className="font-medium">Name *</span>
        <input
          name="fullName"
          type="text"
          autoComplete="name"
          className={inputBaseClassName}
          aria-invalid={fieldErrors.fullName ? "true" : undefined}
          aria-describedby={fieldErrors.fullName ? "register-fullName-error" : undefined}
        />
        <FieldError id="register-fullName-error" message={fieldErrors.fullName} />
      </label>

      <label className="block font-sans text-sm text-navy-800">
        <span className="font-medium">E-Mail *</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={inputBaseClassName}
          aria-invalid={fieldErrors.email ? "true" : undefined}
          aria-describedby={fieldErrors.email ? "register-email-error" : undefined}
        />
        <FieldError id="register-email-error" message={fieldErrors.email} />
      </label>

      <label className="block font-sans text-sm text-navy-800">
        <span className="font-medium">Passwort *</span>
        <input
          name="password"
          type="password"
          autoComplete="new-password"
          className={inputBaseClassName}
          aria-invalid={fieldErrors.password ? "true" : undefined}
          aria-describedby={fieldErrors.password ? "register-password-error" : undefined}
        />
        <FieldError id="register-password-error" message={fieldErrors.password} />
        <p className="mt-2 font-sans text-xs text-ink-500">
          Mindestens 12 Zeichen, mit Groß-/Kleinbuchstaben und einer Zahl.
        </p>
      </label>

      <label className="block font-sans text-sm text-navy-800">
        <span className="font-medium">Passwort bestätigen *</span>
        <input
          name="confirmPassword"
          type="password"
          autoComplete="new-password"
          className={inputBaseClassName}
          aria-invalid={fieldErrors.confirmPassword ? "true" : undefined}
          aria-describedby={
            fieldErrors.confirmPassword ? "register-confirmPassword-error" : undefined
          }
        />
        <FieldError
          id="register-confirmPassword-error"
          message={fieldErrors.confirmPassword}
        />
      </label>

      <div className="rounded-lg border border-ink-200/70 bg-paper-100 p-4">
        <label className="flex items-start gap-3 font-sans text-sm text-navy-800">
          <input
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border border-ink-300"
            aria-invalid={fieldErrors.consent ? "true" : undefined}
            aria-describedby={fieldErrors.consent ? "register-consent-error" : undefined}
          />
          <span>
            Ich stimme zu, dass meine Kontodaten für die Portalnutzung verarbeitet werden.
            Details stehen in der <a className="underline" href="/datenschutz">Datenschutzerklärung</a>.
          </span>
        </label>
        <FieldError id="register-consent-error" message={fieldErrors.consent} />
      </div>

      {fieldErrors.form ? (
        <div className={errorBoxClassName} role="alert">
          {fieldErrors.form}
        </div>
      ) : null}

      <Button type="submit" variant="brand" disabled={isSubmitting}>
        {isSubmitting ? "Konto wird erstellt …" : "Konto erstellen"}
      </Button>
    </form>
  );
}
