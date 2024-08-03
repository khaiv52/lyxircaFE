import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import { updatePayment } from "../../../State/Payment/Action";
import { Alert, AlertTitle, Grid } from "@mui/material";

const OrderTracker = lazy(() => import("../Order/OrderTracker"));
const AddressCard = lazy(() => import("../AddressCard/AddressCard"));

const PaymentSuccess = () => {
  const [paymentId, setPaymentId] = useState();
  const [referenceId, setReferenceId] = useState();
  const [paymentStatus, setPaymentStatus] = useState();
  const { orderId } = useParams();

  const dispatch = useDispatch();
  const order = useSelector((store) => store.order);
  console.log(order.order);

  useEffect(() => {
    const urlParam = new URLSearchParams(window.location.search);
    setPaymentId(urlParam.get("razorpay_payment_id"));
    setPaymentStatus(urlParam.get("razorpay_payment_link_status"));
  }, []);

  useEffect(() => {
    if (paymentId) {
      const data = { orderId, paymentId };
      dispatch(getOrderById(orderId));
      dispatch(updatePayment(data));
    }
  }, [orderId, paymentId]);

  return (
    <div className="px-2 py-10 lg:px-36">
      <div className="flex flex-col items-center justify-center">
        <Alert
          variant="filled"
          severity="success"
          sx={{ mb: 6, width: "fit-content" }}
        >
          <AlertTitle>Payment Success</AlertTitle>
          Congratulation Your Order Get Placed
        </Alert>

        <OrderTracker activeStep={1} />

        <Grid container className="py-5 pt-20 space-y-5">
          {order.order?.orderItems.map((item, index) => (
            <Grid
              container
              item
              key = {index}
              className="p-5 rounded-md shadow-xl"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              <Grid item xs={6}>
                <div className="flex items-center">
                  <img
                    className="w-[5rem] h-[5rem] object-cover object-top"
                    src={item.product.imageUrl}
                    alt=""
                  />

                  <div className="ml-5 space-y-2">
                    <p>{item.product.title}</p>
                    <div className="space-x-5 text-xs font-semibold opacity-50">
                      <span>Color: {item.product.color}</span>
                      <span>
                        {item.product.sizes.map((size, index) => (
                          <div key={index}>
                            <p>Size: {size.name}</p>
                            <p>Quantity: {size.quantity}</p>
                          </div>
                        ))}
                      </span>
                    </div>
                    <p>Seller: {item.product.brand}</p>
                    <p>$ {item.product.price}</p>
                  </div>
                </div>
              </Grid>
              <Grid item>
                <AddressCard address={order.order?.shippingAddress} />
              </Grid>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
};

export default PaymentSuccess;
