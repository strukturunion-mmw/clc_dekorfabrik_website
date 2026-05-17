"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics/track";
import type { OrderSummary } from "@/lib/orders/types";
import { OrderHistoryCard } from "./OrderHistoryCard";

type OrderHistoryViewProps = {
  orders: OrderSummary[];
};

export function OrderHistoryView({ orders }: OrderHistoryViewProps) {
  useEffect(() => {
    for (const order of orders) {
      trackEvent("order_opened", {
        orderId: order.id,
        orderReference: order.reference,
        orderStatus: order.status,
      });
    }
  }, [orders]);

  return (
    <ul className="max-h-[42rem] space-y-4 overflow-y-auto pr-1" aria-label="Auftragsliste">
      {orders.map((order) => (
        <li key={order.id}>
          <OrderHistoryCard order={order} />
        </li>
      ))}
    </ul>
  );
}
