"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, LinkButton } from "@/components/ui/Button";
import { inquiryMailto } from "@/components/siteContent";
import {
  CONTACT_ALLOWED_EXTENSIONS,
  CONTACT_MAX_FILES,
  type ContactFieldErrors,
  getContactValues,
  validateContactValues,
} from "./contactValidation";

const inputBaseClassName =
  "mt-2 w-full rounded-lg border border-ink-200/70 bg-paper-100 px-4 py-3 font-sans text-sm text-navy-900 shadow-xs outline-none transition-colors duration-base focus:border-clay-500";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} className="mt-2 font-sans text-sm text-clay-700">
      {message}
    </p>
  );
}

export function ContactForm() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const values = getContactValues(formData);
    const validationErrors = validateContactValues(values);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });
      const payload = (await response.json()) as
        | { ok: true; redirectTo: string }
        | { ok: false; fieldErrors?: ContactFieldErrors };

      if (!response.ok || !payload.ok) {
        setFieldErrors(
          payload.ok === false && payload.fieldErrors
            ? payload.fieldErrors
            : {
                form: "Die Anfrage konnte nicht versendet werden. Bitte versuchen Sie es erneut.",
              },
        );
        return;
      }

      formRef.current?.reset();
      setSelectedFiles([]);
      router.push(payload.redirectTo);
    } catch {
      setFieldErrors({
        form: "Die Anfrage konnte nicht versendet werden. Bitte versuchen Sie es erneut.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      ref={formRef}
      className="rounded-xl bg-paper-50 p-6 shadow-md md:p-8"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block font-sans text-sm text-navy-800">
          <span className="font-medium">Name *</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            className={inputBaseClassName}
            aria-invalid={fieldErrors.name ? "true" : undefined}
            aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
          />
          <FieldError id="contact-name-error" message={fieldErrors.name} />
        </label>

        <label className="block font-sans text-sm text-navy-800">
          <span className="font-medium">E-Mail *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={inputBaseClassName}
            aria-invalid={fieldErrors.email ? "true" : undefined}
            aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
          />
          <FieldError id="contact-email-error" message={fieldErrors.email} />
        </label>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]">
        <label className="block font-sans text-sm text-navy-800">
          <span className="font-medium">Telefon (optional)</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            className={inputBaseClassName}
            aria-invalid={fieldErrors.phone ? "true" : undefined}
            aria-describedby={fieldErrors.phone ? "contact-phone-error" : undefined}
          />
          <FieldError id="contact-phone-error" message={fieldErrors.phone} />
        </label>

        <label className="block font-sans text-sm text-navy-800">
          <span className="font-medium">Projektbeschreibung *</span>
          <textarea
            name="details"
            rows={6}
            className={`${inputBaseClassName} min-h-40 resize-y`}
            aria-invalid={fieldErrors.details ? "true" : undefined}
            aria-describedby={fieldErrors.details ? "contact-details-error" : undefined}
          />
          <FieldError id="contact-details-error" message={fieldErrors.details} />
        </label>
      </div>

      <div className="mt-6">
        <label className="block font-sans text-sm text-navy-800">
          <span className="font-medium">Dateien hochladen *</span>
          <input
            name="files"
            type="file"
            multiple
            accept={CONTACT_ALLOWED_EXTENSIONS.join(",")}
            className={`${inputBaseClassName} file:mr-4 file:rounded-pill file:border-0 file:bg-azure-600 file:px-4 file:py-2 file:font-sans file:text-sm file:font-medium file:text-paper-50 hover:file:bg-azure-700`}
            aria-invalid={fieldErrors.files ? "true" : undefined}
            aria-describedby="contact-files-help contact-files-error"
            onChange={(event) => {
              const files = Array.from(event.currentTarget.files ?? []);
              setSelectedFiles(files.map((file) => file.name));
            }}
          />
        </label>
        <p id="contact-files-help" className="mt-2 font-sans text-sm text-navy-700">
          PDF, PNG, JPG, WEBP, GIF, TIFF oder BMP. Maximal {CONTACT_MAX_FILES} Dateien,
          bis 15 MB je Datei. Für den aktuellen Mail-Versand sollten die Dateien
          zusammen möglichst kompakt bleiben.
        </p>
        {selectedFiles.length > 0 ? (
          <ul className="mt-3 flex flex-wrap gap-2" role="list">
            {selectedFiles.map((fileName) => (
              <li
                key={fileName}
                className="rounded-pill bg-sky-100 px-3 py-1 font-sans text-xs text-navy-800"
              >
                {fileName}
              </li>
            ))}
          </ul>
        ) : null}
        <FieldError id="contact-files-error" message={fieldErrors.files} />
      </div>

      <div className="mt-6 rounded-lg border border-ink-200/70 bg-paper-100 p-4">
        <label className="flex items-start gap-3 font-sans text-sm text-navy-800">
          <input
            name="consent"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border border-ink-300"
            aria-invalid={fieldErrors.consent ? "true" : undefined}
            aria-describedby={fieldErrors.consent ? "contact-consent-error" : undefined}
          />
          <span>
            Ich stimme zu, dass meine Anfrage, Kontaktdaten und hochgeladenen
            Dateien zur Bearbeitung meines Projekts verarbeitet werden. Hinweise
            dazu finden Sie in der{" "}
            <a className="underline" href="/datenschutz">
              Datenschutzerklärung
            </a>
            .
          </span>
        </label>
        <FieldError id="contact-consent-error" message={fieldErrors.consent} />
      </div>

      {fieldErrors.form ? (
        <div
          className="mt-6 rounded-lg border border-clay-300 bg-clay-100 px-4 py-3 font-sans text-sm text-clay-700"
          role="alert"
        >
          {fieldErrors.form}
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Button type="submit" variant="brand" disabled={isSubmitting}>
          {isSubmitting ? "Anfrage wird gesendet …" : "Anfrage absenden"}
        </Button>
        <LinkButton href={inquiryMailto} variant="secondary">
          Lieber direkt per E-Mail?
        </LinkButton>
      </div>

      <p className="mt-4 font-sans text-xs text-ink-500">
        Wenn einzelne Dateien die Mailgrenzen sprengen, teilen Sie die Anfrage
        bitte in mehrere Schritte auf. Die Server-Prüfung wiederholt alle
        Dateiregeln vor dem Versand.
      </p>
    </form>
  );
}
