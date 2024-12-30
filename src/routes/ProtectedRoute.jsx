import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ isLoggedIn, children }) {
    const userRole = localStorage.getItem("userRole");
    const location = useLocation();

    if (isLoggedIn && userRole === "NewUser" && location.pathname !== "/new-user") {
        return <Navigate to="/new-user" replace />;
    }

    if (!isLoggedIn) {
        return <Navigate to="/landing" replace />;
    }

    return children;
}
