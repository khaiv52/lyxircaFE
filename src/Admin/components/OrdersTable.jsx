import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmedOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
  deleteOrder,
  canceledOrder,
  deliveringOrder,
} from "../../State/Admin/Order/Action";
import {
  Avatar,
  AvatarGroup,
  Button,
  Card,
  CardHeader,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector((store) => store.admin);
  const [anchorEl, setAnchorEl] = useState([]);
  const open = Boolean(anchorEl);

  const handleClick = (event, index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorEl(newAnchorElArray);
  };

  const handleClose = (index) => {
    const newAnchorElArray = [...anchorEl];
    newAnchorElArray[index] = null;
    setAnchorEl(newAnchorElArray);
  };

  useEffect(() => {
    dispatch(getOrders());
  }, [
    dispatch,
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivering,
    adminOrder.delivered,
    adminOrder.canceled,
    adminOrder.deleteOrder,
  ]);

  const handleShippedOrder = (orderId) => {
    dispatch(shipOrder(orderId));
    handleClose();
  };

  const handleConfirmedOrder = (orderId) => {
    dispatch(confirmedOrder(orderId));
    console.log("handle confirmed order", orderId);
    handleClose();
  };

  const handleDeliveringOrder = (orderId) => {
    dispatch(deliveringOrder(orderId));
    handleClose();
  };

  const handleDeliveredOrder = (orderId) => {
    dispatch(deliveredOrder(orderId));
    handleClose();
  };

  const handleCanceledOrder = (orderId) => {
    dispatch(canceledOrder(orderId));
    handleClose();
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
    handleClose();
  };
  return (
    <div className="p-10">
      <Card className="mt-2 bg-[gray]">
        <CardHeader title="All Products" />
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell align="left">Title</TableCell>
                <TableCell align="left">Id</TableCell>
                <TableCell align="left">Category</TableCell>
                <TableCell align="left">Quantity</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Status</TableCell>
                <TableCell align="left">Update</TableCell>
                <TableCell align="left">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminOrder?.orders?.length ? (
                adminOrder.orders.map((item, index) => (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">
                      <AvatarGroup max={3} sx={{ justifyContent: "start" }}>
                        {(item.orderItems || []).map((orderItem) => (
                          <Avatar
                            key={orderItem?.product?.id}
                            src={orderItem?.product?.imageUrl}
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>

                    <TableCell align="left" scope="row">
                      {(item.orderItems || []).map((orderItem) => (
                        <p key={orderItem?.product?.id}>
                          {orderItem?.product?.title}
                        </p>
                      ))}
                    </TableCell>

                    <TableCell align="left">{item.id}</TableCell>

                    <TableCell align="left">
                      {(item.orderItems || []).map((orderItem) => (
                        <p key={orderItem?.product?.id}>
                          {orderItem?.product?.category?.name}
                        </p>
                      ))}
                    </TableCell>

                    <TableCell align="left">
                      {(item.orderItems || []).map((orderItem) => (
                        <div key={orderItem?.product?.id}>
                          {orderItem?.product?.quantity}
                        </div>
                      ))}
                    </TableCell>

                    <TableCell align="left">
                      {(item.orderItems || []).map((orderItem) => (
                        <div key={orderItem?.product?.id}>
                          ${orderItem?.product?.price}
                        </div>
                      ))}
                    </TableCell>

                    <TableCell align="left">
                      <span
                        className={` text-white px-5 py-2 rounded-full ${
                          item.orderStatus === "CONFIRMED"
                            ? "bg-[navy]"
                            : item.orderStatus === "SHIPPED"
                            ? "bg-[#4141ff]"
                            : item.orderStatus === "PLACED"
                            ? "bg-[#02B290]"
                            : item.orderStatus === "DELIVERING"
                            ? "bg-[#5cb820eb]"
                            : item.orderStatus === "DELIVERED"
                            ? "bg-[green]"
                            : "bg-[red]"
                        }`}
                      >
                        {item.orderStatus}
                      </span>
                    </TableCell>

                    <TableCell align="left">
                      <Button
                        id="basic-button"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, index)}
                        aria-controls={`basic-menu-${item.id}`}
                        aria-expanded={Boolean(anchorEl[index])}
                      >
                        Status
                      </Button>
                      <Menu
                        id={`basic-menu-${item.id}`}
                        anchorEl={anchorEl[index]}
                        open={Boolean(anchorEl[index])}
                        onClose={() => handleClose(index)}
                        MenuListProps={{
                          "aria-labelledby": "basic-button",
                        }}
                      >
                        <MenuItem onClick={() => handleConfirmedOrder(item.id)}>
                          Confirmed Order
                        </MenuItem>
                        <MenuItem onClick={() => handleShippedOrder(item.id)}>
                          Shipped Order
                        </MenuItem>
                        <MenuItem
                          onClick={() => handleDeliveringOrder(item.id)}>
                          Delivering Order
                        </MenuItem>
                        <MenuItem onClick={() => handleDeliveredOrder(item.id)}>
                          Delivered Order
                        </MenuItem>
                        <MenuItem onClick={() => handleCanceledOrder(item.id)}>
                          Canceled Order
                        </MenuItem>
                      </Menu>
                    </TableCell>
                    <TableCell align="left">
                      <Button
                        onClick={() => handleDeleteOrder(item.id)}
                        variant="outlined"
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    No orders available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </div>
  );
};

export default OrdersTable;
