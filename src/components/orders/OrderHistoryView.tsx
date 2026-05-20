"use client";

import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics/track";
import type { OrderSummary } from "@/lib/orders/types";
import { OrderHistoryCard } from "./OrderHistoryCard";

type OrderHistoryViewProps = {
  orders: OrderSummary[];
};

export function OrderHistoryView({ orders }: OrderHistoryViewProps) {
  const router = useRouter();

  return (
    <ul className="max-h-[42rem] space-y-4 overflow-y-auto pr-1" aria-label="Auftragsliste">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderHistoryCard
            order={order}
            onOpenDetails={() => {
              trackEvent("order_opened", {
                orderId: order.id,
                orderReference: order.reference,
                orderStatus: order.status,
              });

              trackEvent("status_viewed", {
                orderId: order.id,
                orderReference: order.reference,
                orderStatus: order.status,
              });
            }}
            onRevisionRequested={(payload) => {
              trackEvent("revision_requested", {
                orderId: payload.orderId,
                orderReference: payload.orderReference,
                orderStatus: payload.orderStatus,
                priority: payload.priority,
                hasAttachmentReference: payload.hasAttachmentReference,
              });

              router.refresh();
            }}
            onRevisionRequestFailed={(payload) => {
              trackEvent("revision_request_failed", {
                orderId: payload.orderId,
                orderReference: payload.orderReference,
                orderStatus: payload.orderStatus,
                reason: payload.reason,
                statusCode: payload.statusCode,
              });
            }}
          />
        </li>
      ))}
    </ul>
  );
}
