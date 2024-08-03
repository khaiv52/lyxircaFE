import React, { useEffect, useState } from "react";
import CartItem from "./CartItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../State/Cart/Action";

const Cart = () => {
  const navigate = useNavigate();
  const cart = useSelector(store => store.cart);
  const dispatch = useDispatch();
  const handleCheckout = () => {
    navigate('/checkout/?step=2')
  }

  useEffect(() => {
    dispatch(getCart())
  }, [cart.updateCartItem, cart.deleteCartItem])
  return (
    <div className="py-10">
      <div className="relative grid-cols-3 lg:grid lg:px-16">
        <div className="col-span-2">
          {cart.cart?.cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="sticky top-0 px-5 h-[100vh] mt-5 lg:mt-0">
          <div className="p-4 border">
            <p className="pb-4 font-bold uppercase opacity-60">Price details</p>
            <hr />
            <div className="mb-5 space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black">
                <span>Price</span>
                <span>${cart.cart?.totalPrice}</span>
              </div>

              <div className="flex justify-between pt-3">
                <span>Discount</span>
                <span className="text-green-600">${cart.cart?.discount}</span>
              </div>

              <div className="flex justify-between pt-3">
                <span>Deliver Changes</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between pt-3 font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">${cart.cart?.totalDiscountedPrice}</span>
              </div>
            </div>
            <Button
              onClick={handleCheckout}
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
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
