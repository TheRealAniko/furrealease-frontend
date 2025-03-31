import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/context";
import LayoutShell from "./LayoutShell";

const ProtectedLayout = () => {
    const { isAuthenticated } = useAuth();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to="/auth" state={{ next: location.pathname }} />;
    }

    return <LayoutShell />;
};

export default ProtectedLayout;
