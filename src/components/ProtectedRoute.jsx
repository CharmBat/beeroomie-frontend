import { Navigate } from "react-router-dom";

function ProtectedRoute({ isLoggedIn, children }) {
    return isLoggedIn ? children : <Navigate to="/Landing" replace />;
}

export default ProtectedRoute;
