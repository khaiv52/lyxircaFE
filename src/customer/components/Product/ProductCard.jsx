import React from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="productCard w-[15rem] m-3 transition-all cursor-pointer"
    >
      <div>
        <img
          src={product.imageUrl}
          className="object-cover object-left-top w-full h-[300px]"
          alt=""
        />
      </div>

      <div className="p-3 bg-white textPart">
        <div>
          <p className="font-semibold opacity-60">{product.brand}</p>
          <p>{product.title}</p>
        </div>
        <div className="flex items-center space-x-2">
          <p className="font-semibold">${product.discountedPrice}</p>
          <p className="line-through opacity-50">${product.price}</p>
          <p className="text-green-600">{product.discountPercent}% off</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
