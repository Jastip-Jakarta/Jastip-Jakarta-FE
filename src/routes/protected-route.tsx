import { useAuth } from "@/utils/context/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token } = useAuth();

  if (pathname === "/") {
    if (token) {
      return <Navigate to="/order" />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
