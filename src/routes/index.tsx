import Homepage from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Order from "@/pages/order/order";
import AddOrder from "@/pages/order/add-order";
import DetailOrder from "@/pages/order/detail-order";
import RegionCode from "@/pages/region_code/region-code";
import LoginAdmin from "@/pages/auth/login-admin";
import OrdersAdminS from "@/pages/admin/super/orders";
import DeliveryBatch from "@/pages/admin/perwakilan/delivery-batch";
import Customers from "@/pages/admin/order-process/customers";
import CustomerOrders from "@/pages/admin/order-process/customer-orders";
import Dashboard from "@/pages/admin/super/dashboard";
import RegionCodeAdminSuper from "@/pages/admin/super/region-code";
import DeliveryBatchAdminSuper from "@/pages/admin/super/delivery-batch";
import Users from "@/pages/admin/super/users";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: "/",
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
          path: "/customers/:batch/:code",
          element: <Customers />,
        },
        {
          path: "/customer-orders/:batch/:code/:customerName",
          element: <CustomerOrders />,
        },
        {
          path: "/kode-wilayah",
          element: <RegionCode />,
        },
        {
          path: "/batch-pengiriman",
          element: <DeliveryBatch />,
        },
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/admin/orders",
          element: <OrdersAdminS />,
        },
        {
          path: "/admin/batch-pengiriman",
          element: <DeliveryBatchAdminSuper />,
        },
        {
          path: "/admin/kode-wilayah",
          element: <RegionCodeAdminSuper />,
        },
        {
          path: "/admin/users",
          element: <Users />,
        },
        {
          path: "/admin/login",
          element: <LoginAdmin />,
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
