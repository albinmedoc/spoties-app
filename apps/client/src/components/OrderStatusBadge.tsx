import { useMemo } from "react";
import { Badge } from "@shopify/polaris";

type Status = "success" | "attention" | "info";

export function OrderStatusBadge(props) {
  const status = useMemo((): { title: string; color: Status } => {
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
