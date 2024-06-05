import Homepage from "@/pages";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./protected-route";
import Order from "@/pages/order/order";

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
          path: "/order",
          index: true,
          element: <Order />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;
