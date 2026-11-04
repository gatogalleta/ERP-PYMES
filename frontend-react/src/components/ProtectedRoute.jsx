
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
    const token = sessionStorage.getItem("erp_token");
    const usuario = sessionStorage.getItem("erp_usuario");

    if (!token || !usuario) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;
