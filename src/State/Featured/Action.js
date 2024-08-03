import api from "../../config/apiConfig";
import { GET_ALL_FEATURES_FAILURE, GET_ALL_FEATURES_REQUEST, GET_ALL_FEATURES_SUCCESS } from "./ActionType"

export const getAllFeatures = () => async (dispatch) => {
    dispatch({type: GET_ALL_FEATURES_REQUEST});
    try {
        const response = await api.get("api/featured/getAll");
        console.log(response.data)
        dispatch({type: GET_ALL_FEATURES_SUCCESS, payload: response.data})
    } 
    catch (error) {
        dispatch({type: GET_ALL_FEATURES_FAILURE, payload: error.message})
    }  
} 