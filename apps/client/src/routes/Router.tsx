import { Routes, Route } from "react-router-dom";
import HomePage from "@client/routes/HomePage";
import OrdersOverview from "@client/routes/OrdersOverview";
import OrderDetails from "@client/routes/OrderDetails";
import ProductsOverview from "@client/routes/ProductsOverview";

const routes = [
  {
    id: "home",
    path: "/",
    element: <HomePage />,
  },
  {
    id: "ordersOverview",
    path: "/orders",
    element: <OrdersOverview />,
  },
  {
    id: "productsOverview",
    path: "/products",
    element: <ProductsOverview />,
  },
  {
    id: "orderDetails",
    path: "/orders/:id",
    element: <OrderDetails />,
  },
];

export default function Router() {
  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.id} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
