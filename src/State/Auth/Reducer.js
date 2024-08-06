import {
  GET_USER_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_ADMIN_DATA_REQUEST,
  GET_ADMIN_DATA_SUCCESS,
  GET_ADMIN_DATA_FAILURE,
  CONFIRM_EMAIL_USER_REQUEST,
  CONFIRM_EMAIL_USER_SUCCESS,
  CONFIRM_EMAIL_USER_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  users: [],
  adminData: null,
  email: null,
  success: null,
};

export const authReducer = (state = initialState, action) => {
  console.log("Auth reducer received action:", action.type);
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case GET_USER_REQUEST:
    case UPDATE_USER_REQUEST:
    case GET_ALL_USER_REQUEST:
    case GET_ADMIN_DATA_REQUEST:
    case CONFIRM_EMAIL_USER_REQUEST:
    case RESET_PASSWORD_REQUEST:
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, success: true, isLoading: false, error: null, jwt: action.payload };
    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, success: true, isLoading: false, error: null, user: action.payload };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
        error: null,
        users: action.payload,
      };
    case GET_ADMIN_DATA_SUCCESS:
      return {
        ...state,
        success: true,
        isLoading: false,
        error: null,
        adminData: action.payload,
      };
    case CONFIRM_EMAIL_USER_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return { ...state, success: true, isLoading: false, error: null };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case GET_ALL_USER_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case GET_ADMIN_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        adminData: null,
      };
    case CONFIRM_EMAIL_USER_FAILURE:
      return { ...state, isLoading: false, email: null, error: action.payload };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
