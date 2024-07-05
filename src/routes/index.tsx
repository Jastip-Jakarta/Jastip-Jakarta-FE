import Homepage from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Order from "@/pages/order/order";
import AddOrder from "@/pages/order/add-order";
import DetailOrder from "@/pages/order/detail-order";
import RegionCode from "@/pages/region_code/region-code";
import LoginAdmin from "@/pages/auth/login-admin";
import OrdersAdminS from "@/pages/admin/super/orders";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
          index: true,
          element: <Homepage />,
        },
        {
          path: "/orders",
          element: <Order />,
        },
        {
          path: "/order",
          element: <AddOrder />,
        },
        {
          path: "/order/:orderId",
          element: <DetailOrder />,
        },
        {
          path: "/kode-wilayah",
          element: <RegionCode />,
        },
        {
          path: "/admin",
          children: [
            {
              path: "orders",
              element: <OrdersAdminS />,
            },
            {
              path: "dashboard",
              element: <div>Dashboard admin super</div>,
            },
            {
              path: "login",
              element: <LoginAdmin />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <p className="text-center pt-24 text-lg">404 Error - Nothing here...</p>,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
