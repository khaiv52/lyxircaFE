import { StarBorder } from "@mui/icons-material";
import AdjustIcon from "@mui/icons-material/Adjust";
import { Box } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../../State/Order/Action";

const AddressCard = lazy(() => import("../AddressCard/AddressCard"));
const OrderTracker = lazy(() => import("./OrderTracker"));
const OrderTrackerCancel = lazy(() => import("./OrderTrackerCancel"));

const OrderDetails = () => {
  const dispatch = useDispatch();
  const { orderId } = useParams();
  const jwt = localStorage.getItem("jwt");

  const order = useSelector((store) => store.order.order);
  // const [statusOrderCancel, setStatusOrderCancel] = useState(false);

  useEffect(() => {
    if (jwt) {
      dispatch(getOrderById(orderId)); // Fetch specific order when component mounts
    }
  }, [dispatch, jwt, orderId]);

  if (!order) {
    return (
      <div className="flex items-start justify-center w-full text-2xl font-bold h-[100vh]">
        Loading...
      </div>
    );
  }

  const getStatusText = (status) => {
    switch (status) {
      case "PLACED":
        return "Your order has been placed.";
      case "SHIPPED":
        return "Your order has been shipped.";
      case "CONFIRMED":
        return "Your order has been confirmed.";
      case "DELIVERING":
        return "Your order has been delivering";
      case "DELIVERED":
        return `Delivered on ${new Date(
          order.deliveryDate
        ).toLocaleDateString()}`;
      case "CANCELED":
        return "Your order has been canceled.";
      default:
        return "Order status unknown.";
    }
  };

  // Determine the active step based on orderStatus
  const getActiveStep = (status) => {
    switch (status) {
      case "CONFIRMED":
        return 2;
      case "SHIPPED":
        return 3;
      case "DELIVERING":
        return 4;
      case "DELIVERED":
        return 5;
      case "CANCELED":
        return 1; // Assuming canceled is not part of the steps, adjust if needed
      default:
        return 0;
    }
  };

  return (
    <div className="px-5 py-10 lg:px-20">
      <div>
        <h1 className="text-lg font-bold py-7">Delivery Address</h1>
        <AddressCard address={order.shippingAddress} />
      </div>

      <div className="py-20">
        {order.orderStatus === "CANCELED" ? <OrderTrackerCancel activeStep={3} /> : <OrderTracker activeStep={getActiveStep(order.orderStatus)}  />}
      </div>

      <div className="mb-10 space-y-5">
        <div className="grid items-center justify-between grid-cols-1 p-5 space-y-5 border rounded-md shadow-xl md:grid-cols-2">
          <div className="flex flex-col space-y-4">
            {order?.orderItems.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  className="w-[5rem] h-[5rem] object-cover object-top"
                  src={
                    item.product.imageUrl ||
                    "https://lh3.googleusercontent.com/d/1aG48ZYJBe6vle-rmRbw_NSt918DC2Nqg"
                  }
                  alt={item.product.title || "img"}
                />
                <div className="ml-5 space-y-2">
                  <p className="font-semibold">
                    {item.product.title || "Product Title"}
                  </p>
                  <p className="space-x-5 text-xs font-semibold opacity-50">
                    <span>Color: {item.product.color || "Color"}</span>
                    <span>Size: {item.size || "Size"}</span>
                  </p>
                  <p>{item.product.brand || "Brand"}</p>
                  <p>${item.price || "0.00"}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-start space-y-4">
            <p className="text-lg font-bold">{order.orderStatus}</p>
            <div className="flex items-center">
              {order.orderStatus === "PLACED" && (
                <div className="flex items-center">
                  <AdjustIcon
                    sx={{ width: "15px", height: "15px" }}
                    className="mr-2 text-orange-600"
                  />
                  <span className="text-sm">{getStatusText("PLACED")}</span>
                </div>
              )}
              {order.orderStatus === "SHIPPED" && (
                <div className="flex items-center">
                  <AdjustIcon
                    sx={{ width: "15px", height: "15px" }}
                    className="mr-2 text-blue-600"
                  />
                  <span className="text-sm">{getStatusText("SHIPPED")}</span>
                </div>
              )}
              {order.orderStatus === "CONFIRMED" && (
                <div className="flex items-center">
                  <AdjustIcon
                    sx={{ width: "15px", height: "15px" }}
                    className="mr-2 text-blue-800"
                  />
                  <span className="text-sm">{getStatusText("CONFIRMED")}</span>
                </div>
              )}
              {order.orderStatus === "DELIVERING" && (
                <div className="flex items-center">
                  <AdjustIcon
                    sx={{ width: "15px", height: "15px" }}
                    className="mr-2 text-green-600"
                  />
                  <span className="text-sm">{getStatusText("DELIVERING")}</span>
                </div>
              )}
              {order.orderStatus === "DELIVERED" && (
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <AdjustIcon
                      sx={{ width: "15px", height: "15px" }}
                      className="mr-2 text-green-700"
                    />
                    <span className="text-sm">
                      {getStatusText("DELIVERED")}
                    </span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Your item has been delivered.
                  </p>
                </div>
              )}
              {order.orderStatus === "CANCELED" && (
                <div className="flex items-center">
                  <AdjustIcon
                    sx={{ width: "15px", height: "15px" }}
                    className="mr-2 text-red-600"
                  />
                  <span className="text-sm">{getStatusText("CANCELED")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center mt-5 space-x-4">
            <Box sx={{ color: deepPurple[500] }} className="flex items-center">
              <StarBorder sx={{ fontSize: "2rem" }} className="text-xl" />
              <span>Rate & Reviews Product</span>
            </Box>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
