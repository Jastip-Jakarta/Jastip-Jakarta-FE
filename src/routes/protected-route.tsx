import { useAuth } from "@/utils/context/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token } = useAuth();

  const isAuthenticated = ["/orders", "/order"];

  if (pathname === "/") {
    if (token) {
      return <Navigate to="/orders" />;
    }
  }

  if (isAuthenticated.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return <Navigate to={"/"} />;
    }
  }
  return <Outlet />;
};

export default ProtectedRoute;
