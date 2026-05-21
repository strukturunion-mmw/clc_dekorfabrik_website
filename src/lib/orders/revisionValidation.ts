import {
  ORDER_REVISION_PRIORITY_OPTIONS,
  ORDER_STATUS_META,
} from "./status";
import type { OrderRevisionPriority, OrderSummary } from "./types";

export const ORDER_REVISION_DESCRIPTION_MAX_LENGTH = 1600;
export const ORDER_REVISION_ATTACHMENT_REFERENCE_MAX_LENGTH = 240;

export type OrderRevisionFieldErrors = Partial<
  Record<"description" | "priority" | "attachmentReference" | "form", string>
>;

export type OrderRevisionInput = {
  description: string;
  priority: OrderRevisionPriority | "";
  attachmentReference: string;
};

export function normalizeOrderRevisionInput(input: {
  description: string;
  priority: string;
  attachmentReference: string;
}): OrderRevisionInput {
  const priority = input.priority.trim().toLowerCase();

  return {
    description: input.description.trim(),
    priority: ORDER_REVISION_PRIORITY_OPTIONS.includes(priority as OrderRevisionPriority)
      ? (priority as OrderRevisionPriority)
      : "",
    attachmentReference: input.attachmentReference.trim(),
  };
}

export function getRevisionIneligibilityReason(order: OrderSummary) {
  if (ORDER_STATUS_META[order.status].canRequestRevision) {
    return null;
  }

  return "Revisionsanfragen sind erst verfügbar, wenn Ihr Auftrag in den Status „Rückfrage“ oder „Abgeschlossen“ wechselt.";
}

export function validateOrderRevisionInput(order: OrderSummary, input: OrderRevisionInput) {
  const errors: OrderRevisionFieldErrors = {};

  const guardrailReason = getRevisionIneligibilityReason(order);

  if (guardrailReason) {
    errors.form = guardrailReason;
    return errors;
  }

  if (!input.description) {
    errors.description = "Bitte beschreiben Sie die gewünschte Korrektur.";
  } else if (input.description.length < 20) {
    errors.description =
      "Bitte geben Sie mindestens 20 Zeichen an, damit wir die Änderung eindeutig nachvollziehen können.";
  } else if (input.description.length > ORDER_REVISION_DESCRIPTION_MAX_LENGTH) {
    errors.description = `Bitte kürzen Sie die Beschreibung auf maximal ${ORDER_REVISION_DESCRIPTION_MAX_LENGTH} Zeichen.`;
  }

  if (!input.priority) {
    errors.priority = "Bitte wählen Sie eine Priorität für die Revisionsanfrage.";
  }

  if (input.attachmentReference.length > ORDER_REVISION_ATTACHMENT_REFERENCE_MAX_LENGTH) {
    errors.attachmentReference = `Bitte halten Sie den Dateihinweis unter ${ORDER_REVISION_ATTACHMENT_REFERENCE_MAX_LENGTH} Zeichen.`;
  }

  if (/\b\d{2}\.\d{2}\.\d{4}\b/.test(input.description) || /\b\d{2}\/\d{2}\/\d{4}\b/.test(input.description)) {
    errors.description =
      "Bitte vermeiden Sie unnötige personenbezogene Angaben wie konkrete Datumsangaben in der Revisionsbeschreibung.";
  }

  if (/\b\+?\d[\d\s/().-]{7,}\d\b/.test(input.description)) {
    errors.description =
      "Bitte vermeiden Sie unnötige personenbezogene Angaben wie Telefonnummern in der Revisionsbeschreibung.";
  }

  if (/\b[^\s@]+@[^\s@]+\.[^\s@]+\b/.test(input.description)) {
    errors.description =
      "Bitte vermeiden Sie unnötige personenbezogene Angaben wie E-Mail-Adressen in der Revisionsbeschreibung.";
  }

  const latestRequest = order.revisionRequests[0];

  if (latestRequest) {
    const latestTs = new Date(latestRequest.requestedAt).getTime();
    const nowTs = Date.now();
    const minutesSinceLatest = (nowTs - latestTs) / (1000 * 60);

    if (minutesSinceLatest < 10) {
      errors.form =
        "Sie haben vor kurzem bereits eine Revisionsanfrage gesendet. Bitte warten Sie kurz, bevor Sie eine weitere Anfrage einreichen.";
    }
  }

  return errors;
}
