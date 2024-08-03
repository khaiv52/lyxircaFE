import {
  Avatar,
  AvatarGroup,
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrders,
} from "../../State/Admin/Order/Action";

const OrdersTable = () => {
  const dispatch = useDispatch();
  const adminOrder = useSelector((store) => store.admin);

  useEffect(() => {
    dispatch(getOrders());
  }, [
    dispatch,
    adminOrder.confirmed,
    adminOrder.shipped,
    adminOrder.delivered,
    adminOrder.deleteOrder,
  ]);

  return (
    <div className="p-10">
      <Card className="mt-2 bg-[gray]">
        <CardHeader title="Recent Orders" />
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
                            key={orderItem.product.id}
                            src={orderItem.product.imageUrl}
                          />
                        ))}
                      </AvatarGroup>
                    </TableCell>

                    <TableCell align="left" scope="row">
                      {(item.orderItems || []).map((orderItem) => (
                        <p key={orderItem.product.id}>
                          {orderItem.product.title}
                        </p>
                      ))}
                    </TableCell>

                    <TableCell align="left">{item.id}</TableCell>

                    <TableCell align="left">
                      {(item.orderItems || []).map((orderItem) => (
                        <p key={orderItem.product.id}>
                          {orderItem.product.category?.name}
                        </p>
                      ))}
                    </TableCell>

                    <TableCell align="left">
                      {(item.orderItems || []).map((orderItem) => (
                        <div key={orderItem.product.id}>
                          {orderItem.product.quantity}
                        </div>
                      ))}
                    </TableCell>

                    <TableCell align="left">
                      {(item.orderItems || []).map((orderItem) => (
                        <div key={orderItem.product.id}>
                          ${orderItem.product.price}
                        </div>
                      ))}
                    </TableCell>

                    <TableCell align="left">
                      <span
                        className={` text-white px-5 py-2 rounded-full ${
                          item.orderStatus === "CONFIRMED"
                            ? "bg-[#369236]"
                            : item.orderStatus === "SHIPPED"
                            ? "bg-[#4141ff]"
                            : item.orderStatus === "PLACED"
                            ? "bg-[#02B290]"
                            : item.orderStatus === "PENDING"
                            ? "bg-[gray]"
                            : "bg-[#025720]"
                        }`}
                      >
                        {item.orderStatus}
                      </span>
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
