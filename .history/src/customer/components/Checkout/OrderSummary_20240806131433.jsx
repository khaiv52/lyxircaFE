import { Button } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";
import { createPayment } from "../../../State/Payment/Action";
import AddressCard from "../AddressCard/AddressCard";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("order_id");
  const order = useSelector((store) => store.order.order);
  const loading = useSelector((store) => store.order.loading);
  const error = useSelector((store) => store.order.error);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!order) {
    return <div>No order found</div>;
  }

  const handleCheckout = () => {
    dispatch(createPayment(orderId));
  };

  return (
    <div className="p-5 border shadow-lg rounded-s-md">
      {order.shippingAddress ? (
        <AddressCard address={order?.shippingAddress} />
      ) : (
        <div>No shipping address</div>
      )}
      <div className="mt-4">
        <div className="relative grid-cols-3 lg:grid">
          <div className="col-span-2">
            {order.orderItems && order.orderItems.length > 0 ? (
              order.orderItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))
            ) : (
              <div>No items in the order</div>
            )}
          </div>
          <div className="sticky top-0 px-5 h-[100vh] mt-5 lg:mt-0">
            <div className="p-4 border">
              <p className="pb-4 font-bold uppercase opacity-60">
                Price details
              </p>
              <hr />
              <div className="mb-5 space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>Price</span>
                  <span>${order?.totalPrice}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Discount</span>
                  <span className="text-green-600">${order?.discount}</span>
                </div>
                <div className="flex justify-between pt-3">
                  <span>Delivery Charges</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between pt-3 font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-600">
                    ${order?.totalDiscountedPrice}
                  </span>
                </div>
              </div>
              <Button
                variant="contained"
                sx={{
                  px: "2.5rem",
                  py: ".7rem",
                  width: "100%",
                  marginTop: "2rem",
                  bgcolor: "#4338CA",
                  "&:hover": {
                    bgcolor: "#4035b7",
                  },
                  transition: "bgcolor ease-out",
                }}
                onClick={handleCheckout}
              >
                Checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
