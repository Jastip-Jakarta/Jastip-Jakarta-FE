import { useAuth } from "@/utils/context/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token, user } = useAuth();

  const protectedByToken = ["/orders", "/order"];
  const adminSProtected = ["/admin/orders", "/admin/dashboard", "/admin/region-code"];

  // KETIKA SUDAH LOGIN
  if (pathname === "/" || pathname === "/admin/login") {
    if (token) {
      return <Navigate to="/orders" />;
    }
  }

  // KETIKA BELUM LOGIN
  if (protectedByToken.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return <Navigate to={"/"} />;
    }
  }

  if (adminSProtected.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return <Navigate to={"/admin/login"} />;
    }
    if (user.role !== "Super") {
      return <Navigate to={"/orders"} />;
    }
  }
  return <Outlet />;
};

export default ProtectedRoute;
