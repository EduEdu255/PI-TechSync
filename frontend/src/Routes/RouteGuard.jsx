import { Navigate, Outlet, useLocation } from "react-router-dom";

export function UserRoutes() {
  const location = useLocation();
  const logged = sessionStorage.getItem("loggedUser");
  let user = null;
  if (logged) {
    user = JSON.parse(logged);
  }
  return user && user["@type"].includes("User") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export function CiaRoutes() {
  const location = useLocation();
  const logged = sessionStorage.getItem("loggedUser");
  let cia = null;
  if (logged) {
    cia = JSON.parse(logged);
  }
  return cia && cia["@type"] == "CiaAerea" ? (
    <Outlet />
  ) : (
    <Navigate to="/cia/login" state={{ from: location }} replace />
  );
}

export function AdminRoutes() {
  const location = useLocation();
  const logged = sessionStorage.getItem("loggedUser");
  let user = null;
  if (logged) {
    user = JSON.parse(logged);
  }
  return user && user["@type"].includes("User") && user.is_admin ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
