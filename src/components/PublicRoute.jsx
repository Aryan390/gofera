// components/PublicRoute.js - Routes that should redirect if already authenticated
import { Navigate } from "react-router";
import { useUser } from "../context/UserContext";

const PublicRoute = ({ children, redirectTo = "/dashboard" }) => {
  const { isAuthenticated, isInitialized } = useUser();

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

  // Redirect to dashboard if already authenticated
  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default PublicRoute;
