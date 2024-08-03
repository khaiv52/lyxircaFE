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
} from "./ActionType";

const initialState = {
  user: null,
  isLoading: false,
  error: null,
  jwt: null,
  users: [],
  adminData: null,
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
      return { ...state, isLoading: true, error: null };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return { ...state, isLoading: false, error: null, jwt: action.payload };
    case GET_USER_SUCCESS:
    case UPDATE_USER_SUCCESS:
      return { ...state, isLoading: false, error: null, user: action.payload };
    case GET_ALL_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        users: action.payload,
      };
    case GET_ADMIN_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        adminData: action.payload,
      };
    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case GET_USER_FAILURE:
    case UPDATE_USER_FAILURE:
    case GET_ALL_USER_FAILURE:
      return { ...state, isLoading: false, error: action.payload };
    case GET_ADMIN_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        adminData: null,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
