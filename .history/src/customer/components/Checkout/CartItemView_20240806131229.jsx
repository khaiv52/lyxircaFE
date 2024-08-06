import { Button, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleUpdateCartItem = (num) => {
    const data = {
      data: { quantity: item.quantity + num },
      cartItemId: item?.id,
    };
    dispatch(updateCartItem(data));
  };

  const handleRemoveCartItem = () => {
    dispatch(removeCartItem(item.id));
  };
  return (
    <div className="p-5 border rounded-md shadow-lg">
      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <LazyLoadImage
            className="object-cover object-top w-full h-full"
            src={item.product.imageUrl}
            alt="img"
            threshold={300}
            effect="opacity" // Thay đổi hiệu ứng thành opacity
            wrapperClassName="w-full h-full"
          />
        </div>

        <div className="ml-5 space-y-1">
          <p className="font-semibold">{item.product.title}</p>
          <p className="opacity-70">Size: {item.size} </p>
          <p className="opacity-70">Color: {item.product.color} </p>
          <p className="mt-2 opacity-70">Seller: {item.product.brand}</p>

          <div className="flex items-center pt-6 mt-10 space-x-5 text-gray-900">
            <p className="font-semibold">${item.price}</p>
            <p className="line-through opacity-50">${item.discountedPrice}</p>
            <p className="font-semibold text-green-600">
              {item.product.discountPercent} % Off
            </p>
          </div>
        </div>
      </div>
      <div className="items-center pt-4 lg:flex lg:space-x-10">
        <div className="flex items-center space-x-2">
          <IconButton
            sx={{ color: "red" }}
            onClick={() => handleUpdateCartItem(-1)}
            disabled={item.quantity <= 1}
          >
            <RemoveCircleOutlineIcon />
          </IconButton>
          <span className="py-1 border rounded-sm px-7">{item.quantity}</span>
          <IconButton
            sx={{ color: "green" }}
            onClick={() => handleUpdateCartItem(1)}
          >
            <AddCircleOutlineIcon />
          </IconButton>
          <div>
            <Button sx={{ color: "blueviolet" }} onClick={handleRemoveCartItem}>
              <DeleteOutlineIcon />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
