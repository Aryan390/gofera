import { Link } from "react-router";
import { Shield, ArrowLeft, Home } from "lucide-react";
import { useUser } from "../context/UserContext";

const Unauthorized = () => {
  const { user, isAuthenticated } = useUser();

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 animate-scale-in  ">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <Shield className="w-16 h-16 text-red-500" />
        </div>

        <div className="mt-6 text-center">
          <h2 className="text-3xl font-bold text-gray-50">Access Denied</h2>
          <p className="mt-2 text-sm text-gray-400">
            {isAuthenticated
              ? "You don't have permission to access this page."
              : "Please log in to access this page."}
          </p>
        </div>

        <div className="mt-8 glass-card py-8 px-4 shadow sm:rounded-lg sm:px-10 ">
          <div className="space-y-4">
            {isAuthenticated ? (
              <div className="text-center">
                <p className="text-sm text-gray-50 mb-4">
                  Logged in as:{" "}
                  <span className="font-medium">{user?.email}</span>
                </p>
                <p className="text-sm text-gray-50 mb-6">
                  Your current role:{" "}
                  <span className="font-medium capitalize">
                    {user?.role || "user"}
                  </span>
                </p>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-6">
                  You need to be logged in to access this resource.
                </p>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="w-full flex justify-center items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-700"
              >
                <Home className="w-4 h-4 mr-2" />
                Go to Home
              </Link>

              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="w-full flex justify-center items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="w-full flex justify-center items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;
