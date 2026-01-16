// ProtectedRoutes.js
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the useAuth hook

const ProtectedRoutes = () => {
    const { user } = useAuth(); // Get the current user/auth status

    // If the user is authenticated, render the child routes; otherwise, redirect to login
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
