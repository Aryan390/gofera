import { USER_ACTIONS } from "./actions";
import { UserService } from "./UserService";
// User actions
export const userActions = {
  login: async (dispatch, credentials) => {
    dispatch({ type: USER_ACTIONS.LOGIN_START });

    try {
      const response = await UserService.login(credentials);

      dispatch({
        type: USER_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: response.data.user,
        },
      });

      return { success: true, data: response };
    } catch (error) {
      dispatch({
        type: USER_ACTIONS.LOGIN_FAILURE,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  },

  register: async (dispatch, userData) => {
    dispatch({ type: USER_ACTIONS.REGISTER_START });

    try {
      const response = await UserService.register(userData);

      dispatch({
        type: USER_ACTIONS.REGISTER_SUCCESS,
        payload: response,
      });

      return { success: true, data: response };
    } catch (error) {
      dispatch({
        type: USER_ACTIONS.REGISTER_FAILURE,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  },

  logout: async (dispatch) => {
    try {
      await UserService.logout();
    } catch (error) {
      console.warn("Logout API call failed:", error.message);
    } finally {
      // Cookie is cleared by server, just clear state
      dispatch({ type: USER_ACTIONS.LOGOUT });
    }
  },

  updateProfile: async (dispatch, updateData) => {
    dispatch({ type: USER_ACTIONS.UPDATE_PROFILE_START });

    try {
      const response = await UserService.updateProfile(updateData);

      dispatch({
        type: USER_ACTIONS.UPDATE_PROFILE_SUCCESS,
        payload: response.data.user,
      });

      return { success: true, data: response };
    } catch (error) {
      dispatch({
        type: USER_ACTIONS.UPDATE_PROFILE_FAILURE,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  },

  refreshToken: async (dispatch) => {
    try {
      const response = await UserService.refreshToken();

      dispatch({
        type: USER_ACTIONS.REFRESH_TOKEN_SUCCESS,
        payload: response,
      });

      return { success: true, data: response };
    } catch (error) {
      // If refresh fails, logout user
      userActions.logout(dispatch);
      return { success: false, error: error.message };
    }
  },

  clearError: (dispatch) => {
    dispatch({ type: USER_ACTIONS.CLEAR_ERROR });
  },

  initializeAuth: async (dispatch) => {
    try {
      // Check if user is authenticated by calling a protected endpoint
      const response = await UserService.checkAuth();
      dispatch({
        type: USER_ACTIONS.INITIALIZE_AUTH,
        payload: {
          user: response.data.user,
          isAuthenticated: true,
        },
      });
    } catch (error) {
      // If check fails, user is not authenticated
      dispatch({
        type: USER_ACTIONS.INITIALIZE_AUTH,
        payload: {
          user: null,
          isAuthenticated: false,
        },
      });
    }
  },
  // Get current user profile
  getCurrentUser: async (dispatch) => {
    dispatch({ type: USER_ACTIONS.SET_LOADING, payload: true });

    try {
      const response = await UserService.getUserProfile();

      dispatch({
        type: USER_ACTIONS.LOGIN_SUCCESS,
        payload: { user: response.data.user },
      });

      return { success: true, data: response };
    } catch (error) {
      dispatch({
        type: USER_ACTIONS.LOGIN_FAILURE,
        payload: error.message,
      });
      return { success: false, error: error.message };
    }
  },
};
