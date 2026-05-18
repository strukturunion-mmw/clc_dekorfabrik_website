"use client";

import { trackEvent } from "@/lib/analytics/track";
import type { OrderSummary } from "@/lib/orders/types";
import { OrderHistoryCard } from "./OrderHistoryCard";

type OrderHistoryViewProps = {
  orders: OrderSummary[];
};

export function OrderHistoryView({ orders }: OrderHistoryViewProps) {
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
            }}
          />
        </li>
      ))}
    </ul>
  );
}
