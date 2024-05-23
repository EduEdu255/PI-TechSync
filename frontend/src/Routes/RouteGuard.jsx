import { Navigate, Outlet, useLocation } from 'react-router-dom';


export function UserRoutes() {
    const location = useLocation();
    const user = sessionStorage.getItem("loggedUser");
    return user && user['@type'].includes("User") ?
        (<Outlet />) :
        <Navigate to="/login" state={{from: location}} replace/>
}

export function CiaRoutes() {
    const location = useLocation();
    const cia = sessionStorage.getItem("loggedUser");
    return cia && cia['@type'] == 'CiaAerea' ? 
        <Outlet /> :
        <Navigate to="/cia/login" state={{from: location}} replace />
}

export function AdminRoutes() {
    const location = useLocation();
    const user = sessionStorage.getItem("loggedUser");
    return user && user["@type"].includes("User") && user.is_admin ? (
      <Outlet />
    ) : (
      <Navigate to="/" state={{ from: location }} replace />
    );
}

