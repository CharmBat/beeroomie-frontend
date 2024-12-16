import { Navigate } from "react-router-dom";

function PublicRoute({ isLoggedIn, children }) {
    return !isLoggedIn ? children : <Navigate to="/" replace />;
}

export default PublicRoute;
