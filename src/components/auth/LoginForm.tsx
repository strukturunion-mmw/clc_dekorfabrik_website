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

export function LoginForm() {
  const router = useRouter();
  const [fieldErrors, setFieldErrors] = useState<AuthFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch("/api/auth/login", {
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
                form: "Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
              },
        );

        return;
      }

      trackEvent("login_completed", {
        entryPath: "/konto/anmelden",
      });

      router.push(payload.redirectTo);
    } catch {
      setFieldErrors({
        form: "Die Anmeldung konnte nicht abgeschlossen werden. Bitte versuchen Sie es erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <label className="block font-sans text-sm text-navy-800">
        <span className="font-medium">E-Mail *</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          className={inputBaseClassName}
          aria-invalid={fieldErrors.email ? "true" : undefined}
          aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
        />
        <FieldError id="login-email-error" message={fieldErrors.email} />
      </label>

      <label className="block font-sans text-sm text-navy-800">
        <span className="font-medium">Passwort *</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          className={inputBaseClassName}
          aria-invalid={fieldErrors.password ? "true" : undefined}
          aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
        />
        <FieldError id="login-password-error" message={fieldErrors.password} />
      </label>

      {fieldErrors.form ? (
        <div className={errorBoxClassName} role="alert">
          {fieldErrors.form}
        </div>
      ) : null}

      <Button type="submit" variant="brand" disabled={isSubmitting}>
        {isSubmitting ? "Anmeldung läuft …" : "Anmelden"}
      </Button>
    </form>
  );
}
