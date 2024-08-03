import { api } from "../../config/apiConfig";
import { CREATE_ORDER_FAILURE } from "../Order/ActionType";
import { CREATE_PAYMENT_REQUEST, UPDATE_PAYMENT_REQUEST } from "./ActionType"

export const createPayment = (orderId) => async (dispatch) => {
    dispatch({type: CREATE_PAYMENT_REQUEST});
    
    try {
        const { data } = await api.post(`/api/payments/${orderId}`, {});
        console.log("API Response:", data);
        
        if (data.payment_link_url) {
            window.location.href = data.payment_link_url;
        } else {
            console.error("Payment link_url is missing in API response.");
            dispatch({type: CREATE_ORDER_FAILURE, payload: "Payment link_url is missing in API response."});
        }
    }
    catch (error) {
        // Log lỗi chi tiết
        console.error("Error creating payment:", error.response ? error.response.data : error.message);
        dispatch({type: CREATE_ORDER_FAILURE, payload: error.response ? error.response.data.error.description : error.message});
    }
}

export const updatePayment = (reqData) => async (dispatch) => {
    dispatch({ type: UPDATE_PAYMENT_REQUEST });
    
    try {
        const { data } = await api.get(`/api/payments?payment_id=${reqData.paymentId}&order_id=${reqData.orderId}`);
        
        console.log("Update payment : - ", data);
        // Dispatch success action or navigate if needed
    } catch (error) {
        console.error("Error in updatePayment:", error);
        dispatch({ type: CREATE_ORDER_FAILURE, payload: error.message });
    }
};
