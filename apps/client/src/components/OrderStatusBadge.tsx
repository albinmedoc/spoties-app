import { useMemo } from "react";
import { Badge } from "@shopify/polaris";
import type { OrderDisplayFulfillmentStatus } from '@types';

interface OrderStatusBadgeProps {
  status: OrderDisplayFulfillmentStatus,
  tags: string[]
}

export default function OrderStatusBadge(props: OrderStatusBadgeProps) {
  const status = useMemo((): { title: string; color?: "success" | "attention" | "info"  } => {
    if (props.status === "FULFILLED") {
      return { title: "Fulfilled", color: "success" };
    }
    if (props.status === "PARTIALLY_FULFILLED") {
      return { title: "Partial fulfilled", color: "attention" };
    }
    if (
      props.tags.includes("AliExpress") ||
      props.tags.includes("AliExpress")
    ) {
      return { title: "Handled", color: "info" };
    }
    return { title: "Unfulfilled", color: null };
  }, [props.status, props.tags]);

  return <Badge status={status.color}>{status.title}</Badge>;
}
