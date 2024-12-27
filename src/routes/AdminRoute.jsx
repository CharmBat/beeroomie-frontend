import { Navigate } from "react-router-dom";

export default function AdminRoute({ isLoggedIn, isAdmin, children }) {
    return !isLoggedIn ? ( <Navigate to="/Landing" replace /> ) : !isAdmin ? ( <Navigate to="/" replace /> ) : ( children );
}