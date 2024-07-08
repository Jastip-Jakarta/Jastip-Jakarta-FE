import { useAuth } from "@/utils/context/auth";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { pathname } = useLocation();
  const { token, user } = useAuth();
  const protectedByToken = ["/orders", "/order"];
  const adminSProtected = ["/admin/orders", "/admin/dashboard", "/admin/region-code"];
  const adminPProtected = ["/batch-pengiriman"];

  if (pathname === "/admin") {
    return <Navigate to={"/"} />;
  }

  // KETIKA SUDAH LOGIN
  if (pathname === "/" || pathname === "/admin/login") {
    if (token) {
      return <Navigate to="/orders" />;
    }
  }

  // KETIKA BELUM LOGIN | LOGIN SEBAGAI SUPER
  if (protectedByToken.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return <Navigate to={"/"} />;
    }
    if (user.role === "Super") {
      return <Navigate to={"/admin/orders"} />;
    }
  }
  // ADMIN SUPER
  if (adminSProtected.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return <Navigate to={"/admin/login"} />;
    }

    if (user.role === "Super") {
      return <Outlet />;
    }
  }
  // ADMIN PERWAKILAN
  if (adminPProtected.some((path) => pathname.startsWith(path))) {
    if (!token) {
      return <Navigate to={"/"} />;
    }
    if (user.role !== "Perwakilan") {
      return <Navigate to={"/"} />;
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
