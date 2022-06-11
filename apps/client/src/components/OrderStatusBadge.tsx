import { useMemo } from "react";
import { Badge } from "@shopify/polaris";
import type { Order } from '@types';

interface OrderStatusBadgeProps {
  order: Order;
}

export default function OrderStatusBadge(props: OrderStatusBadgeProps) {
  const status = useMemo((): { title: string; color?: "success" | "attention" | "info"  } => {
    const order = props.order;
    if (order.displayFulfillmentStatus === "FULFILLED") {
      return { title: "Fulfilled", color: "success" };
    }
    if (order.displayFulfillmentStatus === "PARTIALLY_FULFILLED") {
      return { title: "Partial fulfilled", color: "attention" };
    }
    if (
      order.tags.includes("AliExpress") ||
      order.tags.includes("AliExpress")
    ) {
      return { title: "Handled", color: "info" };
    }
    return { title: "Unfulfilled", color: null };
  }, [props.order]);

  return <Badge status={status.color}>{status.title}</Badge>;
}
