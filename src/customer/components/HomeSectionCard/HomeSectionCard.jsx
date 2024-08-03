import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const HomeSectionCard = ({ product }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  // const {productsByCategory} = useSelector(store => store.products);
  // console.log(productsByCategory)
  const handleClick = () => {
    navigate(`/product/${product.id}`); // Redirect to the product detail page
    // Tro lên vị trí đàu trang khi chọn sọn phẩm khác
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  };

  return (
    <div
      className="flex flex-col justify-center items-center overflow-hidden bg-white rounded-lg shadow-lg cursor-pointer mx-5 mb-2 border h-[340px] transition-transform duration-300 transform hover:scale-105"
      onClick={handleClick}
    >
      <div className="h-[13rem] w-[10rem] flex flex-shrink-0 overflow-hidden">
        <LazyLoadImage
          className="object-cover object-top w-full h-full"
          src={product.imageUrl}
          alt="image"
          threshold={300}
          effect="opacity"
          wrapperClassName="w-full h-full"
          placeholderSrc="https://placehold.co/160x208"
        />
      </div>

      <div className="flex flex-col flex-auto p-4 transition-transform duration-300 transform hover:scale-105">
        <h3 className="h-8 text-lg font-medium text-gray-900 text-nowrap line-clamp-1">
          {product.brand}
        </h3>
        <p className="text-sm text-gray-500 h-18 text-clip line-clamp-3">
          {product.title}
        </p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
