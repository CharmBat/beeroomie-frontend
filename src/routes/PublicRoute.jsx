import { Navigate } from "react-router-dom";

export default function PublicRoute({ isLoggedIn, children }) {
    return !isLoggedIn ? children : <Navigate to="/" replace />;
}