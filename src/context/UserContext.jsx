// contexts/UserContext.js
import { createContext, useContext, useReducer, useEffect } from "react";

// User reducer
import { userReducer } from "./reducers.js";

// User actions
import { userActions } from "./userActions.js";

// Initial state
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,
};

// Create contexts
const UserContext = createContext();
const UserDispatchContext = createContext();

// Custom hooks
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const useUserDispatch = () => {
  const context = useContext(UserDispatchContext);
  if (!context) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
};

// Custom hook for checking auth status
export const useAuthCheck = () => {
  const { isAuthenticated, isInitialized, user } = useUser();
  const { getCurrentUser } = useUserActions();

  const checkAuth = async () => {
    if (!isAuthenticated && isInitialized) {
      const result = await getCurrentUser();
      return result.success;
    }
    return isAuthenticated;
  };

  return {
    isAuthenticated,
    isInitialized,
    user,
    checkAuth,
  };
};

// Hook for easy user actions
export const useUserActions = () => {
  const dispatch = useUserDispatch();

  return {
    login: (credentials) => userActions.login(dispatch, credentials),
    register: (userData) => userActions.register(dispatch, userData),
    logout: () => userActions.logout(dispatch),
    updateProfile: (updateData) =>
      userActions.updateProfile(dispatch, updateData),
    // refreshToken: () => userActions.refreshToken(dispatch),
    deleteProfile: () => userActions.deleteProfile(dispatch),
    clearError: () => userActions.clearError(dispatch),
    getCurrentUser: () => userActions.getCurrentUser(dispatch),
  };
};

// Provider component
export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Initialize auth on mount
  useEffect(() => {
    userActions.initializeAuth(dispatch);
  }, []);

  // Auto token refresh (optional)
  // useEffect(() => {
  //   if (state.isAuthenticated && state.token) {
  //     const tokenRefreshInterval = setInterval(() => {
  //       userActions.refreshToken(dispatch);
  //     }, 15 * 60 * 1000); // Refresh every 15 minutes

  //     return () => clearInterval(tokenRefreshInterval);
  //   }
  // }, [state.isAuthenticated, state.token]);

  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};

// Higher-order component for protected routes
export const withAuth = (Component) => {
  return function AuthenticatedComponent(props) {
    const { isAuthenticated, isInitialized } = useUser();

    if (!isInitialized) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
        </div>
      );
    }

    if (!isAuthenticated) {
      // Redirect to login or show unauthorized message
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Unauthorized
            </h2>
            <p className="text-gray-600">Please log in to access this page.</p>
          </div>
        </div>
      );
    }

    return <Component {...props} />;
  };
};
