// components/ProtectedRoute.js - Main protected route component
import { Navigate, useLocation } from "react-router";
import { useUser } from "../context/UserContext";

const ProtectedRoute = ({
  children,
  requiredRole = null,
  fallback = "/login",
}) => {
  const { user, isAuthenticated, isInitialized } = useUser();
  const location = useLocation();

  // Show loading while checking authentication status
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={fallback} state={{ from: location }} replace />;
  }

  // Check role-based access if required
  if (requiredRole && user?.isDriver !== requiredRole.isDriver) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
