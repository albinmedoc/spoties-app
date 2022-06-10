import { userLoggedInFetch } from "@client/helpers";

const fetchOrders = (app, orders, responseType) => {
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

const fetchOrdersCSV = (app, orders) => fetchOrders(app, orders, "text/csv");

const fetchOrdersExcel = (app, orders) =>
  fetchOrders(app, orders, "application/vnd.ms-excel");

export { fetchOrdersCSV, fetchOrdersExcel };
