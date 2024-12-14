import {Route, Routes} from "react-router-dom";

// Auth
import Logout from "./views/Auth/Logout";
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import Landing from "./views/Auth/Landing";
import ForgotPassword from "./views/Auth/ForgotPassword";
import ConfirmEmail from "./views/Auth/ConfirmEmail";
import ResetPassword from "./views/Auth/ResetPassword";

// Profile
import Profile from "./views/Profile/Profile";

// Advertisement
import Advertisement from "./views/Advertisement/Advertisement";
import Offer from "./views/Advertisement/Offer";
import PublishAdvertisement from "./views/Advertisement/PublishAdvertisement";

// Action
import Compare from "./views/Action/Compare";
import Favorite from "./views/Action/Favorite";

// Other
import PageNotFound from "./views/PageNotFound";

// Route Guards
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

function AppRoutes({isLoggedIn, setIsLoggedIn}) {
    return (
        <Routes>
            <Route path="/landing" element={<PublicRoute isLoggedIn={isLoggedIn}><Landing/></PublicRoute>}/>
            <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn}><Login setIsLoggedIn={setIsLoggedIn} /></PublicRoute>}/>
            <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><Register/></PublicRoute>}/>
            <Route path="/forgot-password" element={<PublicRoute isLoggedIn={isLoggedIn}><ForgotPassword/></PublicRoute>}/>
            <Route path="/confirm-email" element={<PublicRoute isLoggedIn={isLoggedIn}><ConfirmEmail/></PublicRoute>}/>
            <Route path="/reset-password" element={<PublicRoute isLoggedIn={isLoggedIn}><ResetPassword/></PublicRoute>}/>
            <Route path="/logout" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Logout/></ProtectedRoute>}/>
            <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Advertisement/></ProtectedRoute>}/>
            <Route path="/advertisement" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Advertisement/></ProtectedRoute>}/>
            <Route path="/offer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Offer/></ProtectedRoute>}/>
            <Route path="/publishAd" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PublishAdvertisement/></ProtectedRoute>}/>
            <Route path="/profile" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile/></ProtectedRoute>}/>
            <Route path="/compare" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Compare/></ProtectedRoute>}/>
            <Route path="/favorite" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Favorite/></ProtectedRoute>}/>
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );
}

export default AppRoutes;
