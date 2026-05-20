"use client";

import { useState } from "react";
import { Pill } from "@/components/ui/Pill";
import { ORDER_STATUS_META } from "@/lib/orders/status";
import { formatOrderDate, formatOrderDateTime, formatFileSize } from "@/lib/orders/format";
import type { OrderSummary } from "@/lib/orders/types";
import { DownloadFileButton } from "./DownloadFileButton";
import { OrderRevisionForm } from "./OrderRevisionForm";
import { OrderStatusTimeline } from "./OrderStatusTimeline";

type OrderHistoryCardProps = {
  order: OrderSummary;
  onOpenDetails: () => void;
  onRevisionRequested: (payload: {
    orderId: string;
    orderReference: string;
    orderStatus: string;
    priority: string;
    hasAttachmentReference: boolean;
  }) => void;
  onRevisionRequestFailed: (payload: {
    orderId: string;
    orderReference: string;
    orderStatus: string;
    reason: string;
    statusCode?: number;
  }) => void;
};

export function OrderHistoryCard({
  order,
  onOpenDetails,
  onRevisionRequested,
  onRevisionRequestFailed,
}: OrderHistoryCardProps) {
  const [revisionFormKey, setRevisionFormKey] = useState(0);
  const statusMeta = ORDER_STATUS_META[order.status];

  return (
    <article className="rounded-xl border border-ink-200/70 bg-paper-50 p-5 shadow-sm md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-brand text-xs uppercase tracking-brand text-ink-500">{order.reference}</p>
          <h3 className="mt-2 font-display text-xl font-normal text-navy-900">{order.serviceLabel}</h3>
          <p className="mt-2 font-sans text-sm text-navy-700">
            Erstellt am {formatOrderDate(order.createdAt)} · Letztes Update {formatOrderDateTime(order.updatedAt)}
          </p>
        </div>

        <Pill tone={statusMeta.tone} dot>
          {statusMeta.label}
        </Pill>
      </div>

      <details
        className="mt-5 rounded-lg border border-ink-200/70 bg-paper-100 p-4"
        onToggle={(event) => {
          if (event.currentTarget.open) {
            onOpenDetails();
          }
        }}
      >
        <summary className="cursor-pointer font-sans text-sm font-semibold text-navy-900">
          Auftragsdetails und Dateien anzeigen
        </summary>

        <ul className="mt-3 space-y-2" role="list">
          {order.files.map((file) => {
            const isDelivered = Boolean(file.deliveredAt);

            return (
              <li
                key={file.id}
                className="flex flex-col gap-3 rounded-lg border border-ink-200/70 bg-paper-50 p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <p className="font-sans text-sm font-medium text-navy-900">{file.fileName}</p>
                  <p className="mt-1 font-sans text-xs text-navy-700">
                    {file.formatLabel} · {formatFileSize(file.sizeBytes)} · Hochgeladen am {formatOrderDate(file.uploadedAt)}
                  </p>
                  <p className="mt-1 font-sans text-xs text-navy-700">
                    {isDelivered
                      ? `Geliefert am ${formatOrderDateTime(file.deliveredAt ?? file.uploadedAt)}`
                      : "Datei wird nach Fertigstellung bereitgestellt."}
                  </p>
                </div>

                {isDelivered ? (
                  <DownloadFileButton
                    orderId={order.id}
                    orderReference={order.reference}
                    fileId={file.id}
                    fileName={file.fileName}
                  />
                ) : (
                  <span className="inline-flex h-10 items-center justify-center rounded-pill border border-ink-300 bg-paper-50 px-4 font-sans text-sm text-ink-600">
                    Noch nicht verfügbar
                  </span>
                )}
              </li>
            );
          })}
        </ul>

        <OrderStatusTimeline order={order} />

        <OrderRevisionForm
          key={`${order.id}:${revisionFormKey}`}
          order={order}
          onSubmitted={(payload) => {
            onRevisionRequested({
              orderId: payload.orderId,
              orderReference: order.reference,
              orderStatus: order.status,
              priority: payload.priority,
              hasAttachmentReference: payload.hadAttachmentReference,
            });
            setRevisionFormKey((current) => current + 1);
          }}
          onSubmitFailed={(payload) => {
            onRevisionRequestFailed({
              orderId: payload.orderId,
              orderReference: order.reference,
              orderStatus: order.status,
              reason: payload.reason,
              statusCode: payload.statusCode,
            });
          }}
        />
      </details>

      <p className="mt-4 rounded-lg border border-ink-200/70 bg-paper-100 px-4 py-3 font-sans text-sm text-navy-700">
        {statusMeta.canRequestRevision
          ? "Revisionsanfragen sind für diesen Auftrag verfügbar. Nutzen Sie das Formular in den Auftragsdetails."
          : "Revisionsanfragen sind für diesen Status noch nicht verfügbar. Sie sehen die Funktion automatisch, sobald der Auftrag den passenden Bearbeitungsstand erreicht."}
      </p>
    </article>
  );
}
