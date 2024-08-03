import { Grid } from "@mui/material";
import React, { lazy, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrdersByStatus, fetchUserOrders } from "../../../State/Order/Action";

const OrderCard = lazy(() => import("./OrderCard"));

const orderStatus = [
  {
    label: "Placed",
    value: "PLACED",
  },
  {
    label: "Confirmed",
    value: "CONFIRMED",
  },
  {
    label: "Shipped",
    value: "SHIPPED",
  },
  {
    label: "Delivered",
    value: "DELIVERED",
  },
  {
    label: "Canceled",
    value: "CANCELED", // Updated to uppercase for consistency
  },
];

const Order = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.order);
  const jwt = localStorage.getItem("jwt");
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    if (jwt) {
      if (selectedStatus.length > 0) {
        dispatch(getOrdersByStatus(jwt, selectedStatus.join(',')));
      } else {
        dispatch(fetchUserOrders(jwt)); // Fetch all orders if no status is selected
      }
    }
  }, [dispatch, jwt, selectedStatus]);

  const handleStatusChange = (status) => {
    setSelectedStatus((prevSelected) => {
      if (prevSelected.includes(status)) {
        // Remove status if already selected
        return prevSelected.filter((item) => item !== status);
      } else {
        // Add status if not selected
        return [...prevSelected, status];
      }
    });
  };

  return (
    <div className="px-5 py-10 lg:px-20">
      <Grid container sx={{ justifyContent: "space-between" }} className="space-y-5 sm:space-y-0">
        <Grid item xs={12} sm={2.5}>
          <div className="sticky h-auto p-5 bg-white shadow-lg top-5">
            <h1 className="text-lg font-bold">Filter</h1>
            <div className="mt-10 space-y-4">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={selectedStatus.includes(option.value)}
                    onChange={() => handleStatusChange(option.value)}
                    className="w-4 h-4 text-indigo-600 border-gray-300 focus:text-indigo-500"
                    id={option.value}
                  />
                  <div className="ml-2 text-sm text-gray-600">
                    <label htmlFor={option.value}>{option.label}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        <Grid item xs={12} sm={9}>
          <div className="space-y-5">
            {orders.map((order) => (
              <OrderCard item={order} key={order.id} />
            ))}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default Order;
