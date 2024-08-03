import axios from "axios";
import { api, API_BASE_URL } from "../../config/apiConfig";

// Action Types
import {
  GET_ADMIN_DATA_FAILURE,
  GET_ADMIN_DATA_REQUEST,
  GET_ADMIN_DATA_SUCCESS,
  GET_ALL_USER_FAILURE,
  GET_ALL_USER_REQUEST,
  GET_ALL_USER_SUCCESS,
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
  UPDATE_USER_FAILURE,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
} from "./ActionType";

// Token
// const token = localStorage.getItem("jwt");

// Register
const registerRequest = () => ({ type: REGISTER_REQUEST });
const registerSuccess = (user) => ({ type: REGISTER_SUCCESS, payload: user });
const registerFailure = (error) => ({ type: REGISTER_FAILURE, payload: error });

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(registerRequest());
    const response = await axios.post(`${API_BASE_URL}/auth/signup`, userData);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch(registerSuccess(user.jwt));
    }
  } catch (error) {
    // Xử lý lỗi CORS và các lỗi khác
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    dispatch(registerFailure(errorMessage));
  }
};

// LOGIN
const loginRequest = () => ({ type: LOGIN_REQUEST });
const loginSuccess = (user) => ({ type: LOGIN_SUCCESS, payload: user });
const loginFailure = (error) => ({ type: LOGIN_FAILURE, payload: error });

export const login = (userData) => async (dispatch) => {
  console.log('Login action started with userData:', userData);
  try {
    dispatch(loginRequest());
    console.log('Sending request to:', `${API_BASE_URL}/auth/login`);
    const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
    console.log('Received response:', response);
    const user = response.data;
    if (user.jwt) {
      localStorage.setItem("jwt", user.jwt);
      dispatch(loginSuccess(user.jwt));
    } else {
      console.log('No JWT in response');
    }
  } catch (error) {
    console.error('Login error:', error);
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    dispatch(loginFailure(errorMessage));
  }
};

// USER REQUEST
const getUserRequest = () => ({ type: GET_USER_REQUEST });
const getUserSuccess = (user) => ({ type: GET_USER_SUCCESS, payload: user });
const getUserFailure = (error) => ({ type: GET_USER_FAILURE, payload: error });

export const getUser = (jwt) => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const response = await axios.get(`${API_BASE_URL}/api/users/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      },
    });

    const user = response.data;
    console.log(user);
    dispatch(getUserSuccess(user));
  } catch (error) {
    // Xử lý lỗi CORS và các lỗi khác
    const errorMessage = error.response?.data?.message || error.message || "An error occurred";
    dispatch(getUserFailure(errorMessage));
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT, payload: null });
  localStorage.clear();
};

export const updateUser = (id, userData) => async (dispatch) => {
  dispatch({ type: UPDATE_USER_REQUEST });

  try {
    const response = await api.put(`/api/users/update/${id}`, userData); // Cập nhật đường dẫn API nếu cần
    dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
    console.log("Reponse from server: " + response);
  } catch (error) {
    console.error("Error updating user:", error);
    dispatch({ 
      type: UPDATE_USER_FAILURE, 
      payload: error.response ? error.response.data : 'An error occurred while updating the user.'
    });
    throw error; // Ném lỗi để có thể xử lý ở component nếu cần
  }
};

export const getAllUser = () => async (dispatch) => {
  dispatch({type: GET_ALL_USER_REQUEST});
  try {
    const response = await api.get("/api/users/getAll");
    // console.log(response.data)
    dispatch({type: GET_ALL_USER_SUCCESS, payload: response.data});
  }
  catch (error) {
    dispatch({type: GET_ALL_USER_FAILURE, payload: error.message})
  }
} 

// Admin data actions
const getAdminDataRequest = () => ({type: GET_ADMIN_DATA_REQUEST});
const getAdminDataSuccess = (data) => ({type: GET_ADMIN_DATA_SUCCESS, payload: data});
const getAdminDataFailure = (error) => ({type: GET_ADMIN_DATA_FAILURE, payload: error});

export const getAdminData = () => async (dispatch) => {
  dispatch(getAdminDataRequest);
  try {
    const response = await api.get("/api/admin");
    dispatch(getAdminDataSuccess(response.data));
  }
  catch (error) {
    if(error.response && error.response.status === 403) {
      dispatch(getAdminDataFailure("You don't have permission to access this page."));
    } else {
      dispatch(getAdminDataFailure(error.message || "An error occurred while fetching admin data."))
    }
  }
}
