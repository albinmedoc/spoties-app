import type { AppBridgeState, ClientApplication } from "@shopify/app-bridge";
import { userLoggedInFetch } from "@client/helpers";
import { Order } from "@types";

const fetchOrders = (app: ClientApplication<AppBridgeState>, orders: Order[], responseType: string) => {
  const fetch = userLoggedInFetch(app);

  return fetch("/sheet/orders", {
    method: "POST",
    headers: {
      Accept: responseType,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orders),
  });
};

const fetchOrdersCSV = (app: ClientApplication<AppBridgeState>, orders: Order[]) => fetchOrders(app, orders, "text/csv");

const fetchOrdersExcel = (app: ClientApplication<AppBridgeState>, orders: Order[]) =>
  fetchOrders(app, orders, "application/vnd.ms-excel");

export { fetchOrdersCSV, fetchOrdersExcel };
