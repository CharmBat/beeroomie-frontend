import {Route, Routes} from "react-router-dom";

// Auth
import Login from "./views/Auth/Login";
import Register from "./views/Auth/Register";
import Landing from "./views/Auth/Landing";
import ForgotPassword from "./views/Auth/ForgotPassword";
import ConfirmEmail from "./views/Auth/ConfirmEmail";
import ResetPassword from "./views/Auth/ResetPassword";

// Profile
import Profile from "./views/Profile/Profile";
import EditProfile from "./views/Profile/EditProfile";
import NewUser from "./views/Profile/NewUser";

// Advertisement
import Advertisement from "./views/Advertisement/Advertisement";
import AdvertisementDetail from "./views/Advertisement/AdvertisementDetail";
import Offer from "./views/Advertisement/Offer";
import PublishAdvertisement from "./views/Advertisement/PublishAdvertisement";

// Action
import Compare from "./views/Action/Compare";
import Favorite from "./views/Action/Favorite";

// Other
import PageNotFound from "./views/PageNotFound";
import AdminPanel from "./views/AdminPanel";

// Route Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import AdminRoute from "./routes/AdminRoute";

function AppRoutes({isLoggedIn, setIsLoggedIn}) {
    const userRole = localStorage.getItem("userRole");
    return (
        <Routes>
            {/*  Public Routes  */}
            <Route path="/landing" element={<PublicRoute isLoggedIn={isLoggedIn}><Landing/></PublicRoute>}/>
            <Route path="/login" element={<PublicRoute isLoggedIn={isLoggedIn}><Login setIsLoggedIn={setIsLoggedIn} /></PublicRoute>}/>
            <Route path="/register" element={<PublicRoute isLoggedIn={isLoggedIn}><Register/></PublicRoute>}/>
            <Route path="/forgot-password" element={<PublicRoute isLoggedIn={isLoggedIn}><ForgotPassword/></PublicRoute>}/>
            <Route path="/confirm-email/:token" element={<PublicRoute isLoggedIn={isLoggedIn}><ConfirmEmail/></PublicRoute>}/>
            <Route path="/reset-password/:token" element={<PublicRoute isLoggedIn={isLoggedIn}><ResetPassword/></PublicRoute>}/>
            {/*  Protected Routes  */}
            <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Advertisement/></ProtectedRoute>}/>
            <Route path="/advertisement" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Advertisement/></ProtectedRoute>}/>
            <Route path="/advertisement/:adId" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AdvertisementDetail/></ProtectedRoute>}/>
            <Route path="/offer" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Offer/></ProtectedRoute>}/>
            <Route path="/publishAd" element={<ProtectedRoute isLoggedIn={isLoggedIn}><PublishAdvertisement/></ProtectedRoute>}/>
            <Route path="/profile/:userId" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Profile/></ProtectedRoute>}/>
            <Route path="/edit-profile/:userId" element={<ProtectedRoute isLoggedIn={isLoggedIn}><EditProfile/></ProtectedRoute>}/>
            <Route path="/compare" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Compare/></ProtectedRoute>}/>
            <Route path="/favorite" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Favorite/></ProtectedRoute>}/>
            <Route path="/new-user" element={<ProtectedRoute isLoggedIn={isLoggedIn}><NewUser/></ProtectedRoute>} />
            {/*  Admin  */}
            <Route path="/adminPanel" element={<AdminRoute isLoggedIn={isLoggedIn} isAdmin={userRole === "Admin"}><AdminPanel/></AdminRoute>}/>
            {/*  404  */}
            <Route path="*" element={<PageNotFound/>}/>
        </Routes>
    );
}

export default AppRoutes;
