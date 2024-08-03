import { Grid } from "@mui/material";
import React from "react";
import AdjustIcon from "@mui/icons-material/Adjust";
import { useNavigate } from "react-router-dom";

const OrderCard = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/account/order/${item.id}`);
  };

  // Chọn item đầu tiên từ danh sách orderItems
  const firstItem = item.orderItems[0];

  const getStatusText = (status) => {
    switch (status) {
      case "PLACED":
        return "Your order has been placed.";
      case "SHIPPED":
        return "Your order has been shipped.";
      case "CONFIRMED":
        return "Your order has been confirmed.";
      case "DELIVERED":
        return `Delivered on ${new Date(
          item.deliveryDate
        ).toLocaleDateString()}`;
      case "CANCELED":
        return "Your order has been canceled.";
      default:
        return "Order status unknown.";
    }
  };

  return (
    <div
      onClick={handleClick}
      className="p-4 mb-4 border shadow-md cursor-pointer hover:shadow-2xl md:mb-0" // Thêm margin bottom cho màn hình nhỏ
    >
      <Grid
        container
        spacing={2}
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid item xs={12} sm={6} md={6}>
          {firstItem && (
            <div className="flex items-center space-x-4">
              <img
                className="object-cover object-center w-24 h-24"
                src={firstItem.product.imageUrl}
                alt={firstItem.product.title}
              />
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium">{firstItem.product.title}</p>
                <p className="text-xs font-semibold text-gray-600">
                  Size: {firstItem.size}
                </p>
                <p className="text-xs font-semibold text-gray-600">
                  Color: {firstItem.product.color}
                </p>
              </div>
            </div>
          )}
        </Grid>

        <Grid item xs={12} sm={4} md={2} className="flex items-center">
          <p className="text-sm font-semibold lg:text-md">
            ${item.totalPrice.toFixed(2)}
          </p>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          {item.orderStatus === "PLACED" && (
            <div className="flex items-center">
              <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className="mr-2 text-orange-600"
              />
              <span className="text-sm">{getStatusText("PLACED")}</span>
            </div>
          )}
          {item.orderStatus === "SHIPPED" && (
            <div className="flex items-center">
              <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className="mr-2 text-purple-600"
              />
              <span className="text-sm">{getStatusText("SHIPPED")}</span>
            </div>
          )}
          {item.orderStatus === "CONFIRMED" && (
            <div className="flex items-center">
              <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className="mr-2 text-blue-600"
              />
              <span className="text-sm">{getStatusText("CONFIRMED")}</span>
            </div>
          )}
          {item.orderStatus === "DELIVERED" && (
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <AdjustIcon
                  sx={{ width: "15px", height: "15px" }}
                  className="mr-2 text-green-600"
                />
                <span className="text-sm">{getStatusText("DELIVERED")}</span>
              </div>
              <p className="text-xs text-gray-600">
                Your item has been delivered.
              </p>
            </div>
          )}
          {item.orderStatus === "CANCELED" && (
            <div className="flex items-center">
              <AdjustIcon
                sx={{ width: "15px", height: "15px" }}
                className="mr-2 text-red-600"
              />
              <span className="text-sm">{getStatusText("CANCELED")}</span>
            </div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default OrderCard;
