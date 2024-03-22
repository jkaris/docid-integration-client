import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserAuthentication from "./UserAuthentication.jsx";

const ProtectedRoute = ({ children }) => {
    const { user } = useAuth();
    if (!user) {
        // user not authenticated
        return <Navigate to="/" {...<UserAuthentication/>}/>
    }
    return children;
}

export default ProtectedRoute;
