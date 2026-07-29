import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
    const { user, loading } = useAuth();

    // Wait until AuthContext finishes loading
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // User is not logged in
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // User is authenticated
    return <Outlet />;
}