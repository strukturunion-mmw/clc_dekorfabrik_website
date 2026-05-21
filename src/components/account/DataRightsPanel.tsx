"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { DataRightsRequestRecord, DataRightsRequestType } from "@/lib/account/dataRightsStore";
import { AUTH_CONSENT_POLICY_VERSION } from "@/lib/auth/constants";

type FieldErrors = Partial<Record<"note" | "form", string>>;

type DataRightsPanelProps = {
  requests: DataRightsRequestRecord[];
};

const typeLabel: Record<DataRightsRequestType, string> = {
  export: "Datenexport",
  deletion: "Kontolöschung",
};

export function DataRightsPanel({ requests }: DataRightsPanelProps) {
  const [selectedType, setSelectedType] = useState<DataRightsRequestType>("export");
  const [note, setNote] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localRequests, setLocalRequests] = useState(requests);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/account/data-rights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: selectedType,
          note,
        }),
      });

      const payload = (await response.json()) as
        | { ok: true; requestId: string; type: DataRightsRequestType; requestedAt: string }
        | { ok: false; fieldErrors?: FieldErrors };

      if (!response.ok || !payload.ok) {
        setFieldErrors(
          payload.ok === false && payload.fieldErrors
            ? payload.fieldErrors
            : { form: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut." },
        );
        return;
      }

      setNote("");
      setLocalRequests((current) => [
        {
          id: payload.requestId,
          userId: "",
          type: payload.type,
          status: "eingereicht",
          requestedAt: payload.requestedAt,
          policyVersion: AUTH_CONSENT_POLICY_VERSION,
          note: null,
        },
        ...current,
      ]);
      setFieldErrors({ form: "Anfrage eingereicht. Wir melden uns mit den nächsten Schritten per E-Mail." });
    } catch {
      setFieldErrors({ form: "Die Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut." });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-ink-200/70 bg-paper-100 p-5" aria-label="Datenschutzrechte">
      <h2 className="font-display text-2xl font-normal text-navy-900">Datenschutzrechte verwalten</h2>
      <p className="mt-3 font-sans text-sm leading-relaxed text-navy-700">
        Sie können hier direkt einen Datenexport oder eine Löschanfrage für Ihr Konto starten. Wir bearbeiten
        eingehende Anfragen manuell und melden uns transparent zum weiteren Ablauf.
      </p>
      <p className="mt-2 font-sans text-xs text-ink-600">
        Hinweis zur Datenminimierung: Tragen Sie nur Informationen ein, die für die Zuordnung Ihrer Anfrage nötig sind.
      </p>

      <form className="mt-5 space-y-4" onSubmit={handleSubmit} noValidate>
        <fieldset>
          <legend className="font-sans text-sm font-medium text-navy-900">Anfragetyp</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            <label className="inline-flex items-center gap-2 rounded-lg border border-ink-200/70 bg-paper-50 px-3 py-2 font-sans text-sm text-navy-800">
              <input
                type="radio"
                name="dataRightsType"
                value="export"
                checked={selectedType === "export"}
                onChange={() => setSelectedType("export")}
              />
              Datenexport
            </label>
            <label className="inline-flex items-center gap-2 rounded-lg border border-ink-200/70 bg-paper-50 px-3 py-2 font-sans text-sm text-navy-800">
              <input
                type="radio"
                name="dataRightsType"
                value="deletion"
                checked={selectedType === "deletion"}
                onChange={() => setSelectedType("deletion")}
              />
              Kontolöschung
            </label>
          </div>
        </fieldset>

        <label className="block font-sans text-sm text-navy-800">
          <span className="font-medium">Optionaler Hinweis</span>
          <textarea
            className="mt-2 min-h-24 w-full rounded-lg border border-ink-200/70 bg-paper-50 px-4 py-3 font-sans text-sm text-navy-900 outline-none focus:border-clay-500"
            value={note}
            onChange={(event) => setNote(event.currentTarget.value)}
            maxLength={400}
            placeholder="Optional, z. B. gewünschte Kontaktzeit für Rückfragen."
            aria-invalid={fieldErrors.note ? "true" : undefined}
            aria-describedby={fieldErrors.note ? "data-rights-note-error" : undefined}
          />
          {fieldErrors.note ? (
            <p id="data-rights-note-error" className="mt-2 font-sans text-sm text-clay-700">
              {fieldErrors.note}
            </p>
          ) : null}
        </label>

        {fieldErrors.form ? (
          <p
            className={`rounded-lg border px-4 py-3 font-sans text-sm ${
              fieldErrors.form.includes("eingereicht")
                ? "border-sky-300 bg-sky-100 text-navy-800"
                : "border-clay-300 bg-clay-100 text-clay-700"
            }`}
            role="status"
          >
            {fieldErrors.form}
          </p>
        ) : null}

        <Button type="submit" variant="brand" disabled={isSubmitting}>
          {isSubmitting ? "Anfrage wird gesendet …" : "Datenschutzanfrage absenden"}
        </Button>
      </form>

      <div className="mt-6 rounded-lg border border-ink-200/70 bg-paper-50 p-4">
        <h3 className="font-sans text-sm font-semibold text-navy-900">Zuletzt eingereichte Anfragen</h3>
        {localRequests.length === 0 ? (
          <p className="mt-2 font-sans text-sm text-navy-700">Bisher wurden keine Datenschutzanfragen eingereicht.</p>
        ) : (
          <ul className="mt-3 space-y-2" role="list">
            {localRequests.slice(0, 5).map((request) => (
              <li key={request.id} className="rounded-lg border border-ink-200/70 bg-paper-100 px-3 py-2">
                <p className="font-sans text-sm text-navy-900">
                  {typeLabel[request.type]} · Status: {request.status === "eingereicht" ? "Eingereicht" : "In Prüfung"}
                </p>
                <p className="mt-1 font-sans text-xs text-ink-600">
                  {new Date(request.requestedAt).toLocaleString("de-DE", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  {` · Policy-Version ${request.policyVersion}`}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
