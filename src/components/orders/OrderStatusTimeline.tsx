import { Pill } from "@/components/ui/Pill";
import { formatOrderDateTime } from "@/lib/orders/format";
import { getOrderTimeline } from "@/lib/orders/timeline";
import type { OrderSummary } from "@/lib/orders/types";

type OrderStatusTimelineProps = {
  order: OrderSummary;
};

export function OrderStatusTimeline({ order }: OrderStatusTimelineProps) {
  const timeline = getOrderTimeline(order);

  return (
    <div className="mt-4 rounded-lg border border-ink-200/70 bg-paper-50 p-4" aria-label="Statusverlauf">
      <p className="font-sans text-sm font-semibold text-navy-900">Statusverlauf</p>
      <ol className="mt-3 space-y-3">
        {timeline.map((item) => (
          <li key={item.id} className="rounded-lg border border-ink-200/70 bg-paper-100 p-3">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <p className="font-sans text-sm font-semibold text-navy-900">{item.title}</p>
              <Pill tone={item.kind === "revision" ? "clay" : "azure"}>
                {item.statusLabel ?? (item.kind === "revision" ? "Revision" : "Status")}
              </Pill>
            </div>
            <p className="mt-2 font-sans text-xs text-navy-700">{item.message}</p>
            <p className="mt-2 font-sans text-xs text-ink-500">{formatOrderDateTime(item.timestamp)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
