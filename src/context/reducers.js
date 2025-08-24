import { USER_ACTIONS } from "./actions";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  isInitialized: false,
};

export const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN_START:
    case USER_ACTIONS.REGISTER_START:
    case USER_ACTIONS.UPDATE_PROFILE_START:
      return {
        ...state,
        isLoading: true,
        error: null,
      };

    case USER_ACTIONS.LOGIN_SUCCESS:
    case USER_ACTIONS.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        isLoading: false,
        error: null,
        isInitialized: true,
      };

    case USER_ACTIONS.LOGIN_FAILURE:
    case USER_ACTIONS.REGISTER_FAILURE:
    case USER_ACTIONS.UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuthenticated: false,
      };

    case USER_ACTIONS.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        user: { ...state.user, ...action.payload },
        isLoading: false,
        error: null,
      };

    case USER_ACTIONS.LOGOUT:
      return {
        ...initialState,
        isInitialized: true,
      };

    case USER_ACTIONS.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user || state.user,
      };

    case USER_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    case USER_ACTIONS.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case USER_ACTIONS.INITIALIZE_AUTH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: action.payload.isAuthenticated,
        isInitialized: true,
      };

    default:
      return state;
  }
};
