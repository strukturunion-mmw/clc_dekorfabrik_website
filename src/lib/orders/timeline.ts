import { ORDER_REVISION_REQUEST_STATUS_META, ORDER_STATUS_META } from "./status";
import type {
  OrderActivityRecord,
  OrderRevisionRequestStatus,
  OrderSummary,
} from "./types";

type OrderTimelineItem = {
  id: string;
  timestamp: string;
  title: string;
  message: string;
  kind: "status" | "revision";
  statusLabel?: string;
};

function isStatusActivity(activity: OrderActivityRecord): activity is Extract<OrderActivityRecord, { kind: "status" }> {
  return activity.kind === "status";
}

export function getOrderTimeline(order: OrderSummary): OrderTimelineItem[] {
  const items = order.activity.map((activity) => {
    if (isStatusActivity(activity)) {
      return {
        id: activity.id,
        timestamp: activity.timestamp,
        title: activity.title,
        message: activity.message,
        kind: activity.kind,
        statusLabel: ORDER_STATUS_META[activity.status].label,
      };
    }

    const matchedRequest = order.revisionRequests.find(
      (request) => request.requestedAt === activity.timestamp,
    );
    const revisionStatus: OrderRevisionRequestStatus =
      matchedRequest?.status ?? "in_pruefung";

    return {
      id: activity.id,
      timestamp: activity.timestamp,
      title: activity.title,
      message: activity.message,
      kind: activity.kind,
      statusLabel: ORDER_REVISION_REQUEST_STATUS_META[revisionStatus].label,
    };
  });

  return items.sort((left, right) => {
    const leftTs = new Date(left.timestamp).getTime();
    const rightTs = new Date(right.timestamp).getTime();

    return rightTs - leftTs;
  });
}
