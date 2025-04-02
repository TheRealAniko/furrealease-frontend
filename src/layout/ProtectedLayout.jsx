import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/context";
import LayoutShell from "./LayoutShell";

const ProtectedLayout = () => {
    const { isAuthenticated, checkSession } = useAuth();
    const location = useLocation();
    if (checkSession) return null;

    if (!isAuthenticated) {
        return <Navigate to="/auth" state={{ next: location.pathname }} />;
    }

    return <LayoutShell />;
};

export default ProtectedLayout;
