"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import {
  ORDER_REVISION_PRIORITY_META,
  ORDER_REVISION_PRIORITY_OPTIONS,
  ORDER_STATUS_META,
} from "@/lib/orders/status";
import {
  ORDER_REVISION_ATTACHMENT_REFERENCE_MAX_LENGTH,
  ORDER_REVISION_DESCRIPTION_MAX_LENGTH,
  getRevisionIneligibilityReason,
} from "@/lib/orders/revisionValidation";
import type { OrderRevisionPriority, OrderSummary } from "@/lib/orders/types";

type FieldErrors = Partial<Record<"description" | "priority" | "attachmentReference" | "form", string>>;

type OrderRevisionFormProps = {
  order: OrderSummary;
  onSubmitted: (payload: {
    orderId: string;
    priority: OrderRevisionPriority;
    hadAttachmentReference: boolean;
  }) => void;
  onSubmitFailed: (payload: {
    orderId: string;
    reason: string;
    statusCode?: number;
  }) => void;
};

const inputBaseClassName =
  "mt-2 w-full rounded-lg border border-ink-200/70 bg-paper-100 px-4 py-3 font-sans text-sm text-navy-900 shadow-xs outline-none transition-colors duration-base focus:border-clay-500";

export function OrderRevisionForm({ order, onSubmitted, onSubmitFailed }: OrderRevisionFormProps) {
  const ineligibilityReason = getRevisionIneligibilityReason(order);
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<OrderRevisionPriority>("normal");
  const [attachmentReference, setAttachmentReference] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (ineligibilityReason) {
      setFieldErrors({ form: ineligibilityReason });
      onSubmitFailed({
        orderId: order.id,
        reason: "ineligible_status",
      });
      return;
    }

    setIsSubmitting(true);
    setFieldErrors({});

    try {
      const response = await fetch(`/api/orders/${order.id}/revision`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description,
          priority,
          attachmentReference,
        }),
      });

      const payload = (await response.json()) as
        | { ok: true }
        | { ok: false; fieldErrors?: FieldErrors };

      if (!response.ok || !payload.ok) {
        const fallbackMessage =
          "Die Revisionsanfrage konnte nicht gesendet werden. Bitte prüfen Sie Ihre Eingaben.";
        const nextErrors =
          payload.ok === false && payload.fieldErrors
            ? payload.fieldErrors
            : {
                form: fallbackMessage,
              };

        setFieldErrors(nextErrors);
        onSubmitFailed({
          orderId: order.id,
          reason: nextErrors.form ? "server_rejected" : "validation_failed",
          statusCode: response.status,
        });
        return;
      }

      setDescription("");
      setAttachmentReference("");
      setFieldErrors({
        form: "Ihre Revisionsanfrage wurde eingereicht. Wir aktualisieren den Status nach der Prüfung.",
      });
      onSubmitted({
        orderId: order.id,
        priority,
        hadAttachmentReference: Boolean(attachmentReference.trim()),
      });
    } catch {
      setFieldErrors({
        form: "Die Revisionsanfrage konnte gerade nicht gesendet werden. Bitte versuchen Sie es erneut.",
      });
      onSubmitFailed({
        orderId: order.id,
        reason: "network_error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const latestRequest = order.revisionRequests[0] ?? null;

  return (
    <section className="mt-4 rounded-lg border border-ink-200/70 bg-paper-50 p-4" aria-label="Revisionsanfrage">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h4 className="font-sans text-sm font-semibold text-navy-900">Revisionsanfrage senden</h4>
        <span className="rounded-pill bg-paper-100 px-3 py-1 font-sans text-xs text-ink-600">
          Aktueller Status: {ORDER_STATUS_META[order.status].label}
        </span>
      </div>

      {latestRequest ? (
        <p className="mt-2 font-sans text-xs text-ink-600">
          Letzte Anfrage: {new Date(latestRequest.requestedAt).toLocaleString("de-DE", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      ) : null}

      {ineligibilityReason ? (
        <p className="mt-3 rounded-lg border border-ink-200/70 bg-paper-100 px-4 py-3 font-sans text-sm text-navy-700">
          {ineligibilityReason}
        </p>
      ) : (
        <form className="mt-3 space-y-4" onSubmit={handleSubmit} noValidate>
          <label className="block font-sans text-sm text-navy-800">
            <span className="font-medium">Gewünschte Korrektur *</span>
            <textarea
              className={`${inputBaseClassName} min-h-32 resize-y`}
              value={description}
              onChange={(event) => setDescription(event.currentTarget.value)}
              maxLength={ORDER_REVISION_DESCRIPTION_MAX_LENGTH}
              aria-invalid={fieldErrors.description ? "true" : undefined}
              aria-describedby={fieldErrors.description ? `order-${order.id}-revision-description-error` : undefined}
            />
            <p className="mt-1 font-sans text-xs text-ink-500">
              Präzise Hinweise helfen unserem Team bei der schnellen Umsetzung.
            </p>
            {fieldErrors.description ? (
              <p id={`order-${order.id}-revision-description-error`} className="mt-2 font-sans text-sm text-clay-700">
                {fieldErrors.description}
              </p>
            ) : null}
          </label>

          <label className="block font-sans text-sm text-navy-800">
            <span className="font-medium">Priorität *</span>
            <select
              className={inputBaseClassName}
              value={priority}
              onChange={(event) => setPriority(event.currentTarget.value as OrderRevisionPriority)}
              aria-invalid={fieldErrors.priority ? "true" : undefined}
              aria-describedby={fieldErrors.priority ? `order-${order.id}-revision-priority-error` : undefined}
            >
              {ORDER_REVISION_PRIORITY_OPTIONS.map((value) => (
                <option key={value} value={value}>
                  {ORDER_REVISION_PRIORITY_META[value].label}
                </option>
              ))}
            </select>
            <p className="mt-1 font-sans text-xs text-ink-500">{ORDER_REVISION_PRIORITY_META[priority].helper}</p>
            {fieldErrors.priority ? (
              <p id={`order-${order.id}-revision-priority-error`} className="mt-2 font-sans text-sm text-clay-700">
                {fieldErrors.priority}
              </p>
            ) : null}
          </label>

          <label className="block font-sans text-sm text-navy-800">
            <span className="font-medium">Dateihinweis (optional)</span>
            <input
              type="text"
              className={inputBaseClassName}
              value={attachmentReference}
              onChange={(event) => setAttachmentReference(event.currentTarget.value)}
              maxLength={ORDER_REVISION_ATTACHMENT_REFERENCE_MAX_LENGTH}
              placeholder="z. B. „Logo-Mockup-v3.pdf“"
              aria-invalid={fieldErrors.attachmentReference ? "true" : undefined}
              aria-describedby={
                fieldErrors.attachmentReference ? `order-${order.id}-revision-attachment-error` : undefined
              }
            />
            {fieldErrors.attachmentReference ? (
              <p id={`order-${order.id}-revision-attachment-error`} className="mt-2 font-sans text-sm text-clay-700">
                {fieldErrors.attachmentReference}
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
            {isSubmitting ? "Revisionsanfrage wird gesendet …" : "Revisionsanfrage absenden"}
          </Button>
        </form>
      )}
    </section>
  );
}
