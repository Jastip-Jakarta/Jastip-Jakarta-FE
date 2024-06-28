import Homepage from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Order from "@/pages/order/order";
import AddOrder from "@/pages/order/add-order";
import DetailOrder from "@/pages/order/detail-order";
import RegionCode from "@/pages/region_code/region-code";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
