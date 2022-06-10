import { Routes, Route } from "react-router-dom";
import { HomePage } from "@client/routes/HomePage";
import { OrdersOverview } from "@client/routes/OrdersOverview";
import { OrderDetails } from "@client/routes/OrderDetails";

const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/orders",
    element: <OrdersOverview />,
  },
  {
    path: "/orders/:id",
    element: <OrderDetails />,
  },
];

export default function Router() {
  return (
    <Routes>
      {routes.map((route, i) => (
        <Route key={i} {...route} />
      ))}
    </Routes>
  );
}
