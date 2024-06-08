import { Navigate, useLocation, useNavigate } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

// eslint-disable-next-line react/prop-types
const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    const navigate = useNavigate();

    if (loading || isAdminLoading) {
        return <progress className="progress w-56"></progress>;
    }

    if (!user) {
        // Redirect to login if user is not authenticated
        navigate("/login", { state: { from: location }, replace: true });
        return null;
    }

    if (!isAdmin) {
        // Handle the case where user is authenticated but not an admin
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default AdminRoute;
