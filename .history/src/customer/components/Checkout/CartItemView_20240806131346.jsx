import { Button, IconButton } from "@mui/material";
import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
const CartItemView = ({ item }) => {
  const dispatch = useDispatch();
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
    </div>
  );
};

export default CartItemView;
