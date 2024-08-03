import { Radio, RadioGroup } from "@headlessui/react";
import { Box, Button, LinearProgress, Rating } from "@mui/material";
import { lazy, useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addItemToCart, getCart } from "../../../State/Cart/Action";
import {
  clearProductsByCategory,
  findProductById,
  getProductsByCategoryName,
} from "../../../State/Product/Action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ZoomImage from "./ZoomImage";
import { getRandomElements } from "./ShuffleRandomArray"; 

const HomeSectionCard = lazy(() =>
  import("../HomeSectionCard/HomeSectionCard")
);
const ProductReviewCard = lazy(() => import("./ProductReviewCard"));


const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProductDetails = () => {
  const [selectedSize, setSelectedSize] = useState("");
  // console.log(selectedSize);
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const products = useSelector((store) => store.products);
  const { productsByCategory } = useSelector((store) => store.products);
  const [similarProducts, setSimilarProducts] = useState([]);
  // console.log(products.product);
  // console.log(productsByCategory);
  console.log(similarProducts);

  const handleAddToCart = async () => {
    const data = { productId: params.productId, size: selectedSize.name };
    console.log(data);
    await dispatch(addItemToCart(data));
    await dispatch(getCart());

    // Check login
    const jwt = localStorage.getItem("jwt");
    if (!jwt) {
      toast.info("You need to register before adding items to the cart.");
      navigate("/register");
    } else {
      navigate("/cart");
    }
  };

  // console.log("Param", params);

  useEffect(() => {
    dispatch(findProductById(params.productId));
  }, [params.productId]);

  const category = String(products?.product?.category?.name ?? ""); // Convert to string with default empty string
  console.log(category);

  useEffect(() => {
    const clearAndGetProductByCategoryname = async () => {
      if (category) {
        // Check if category is not an empty string
        await dispatch(clearProductsByCategory());
        await dispatch(getProductsByCategoryName(category));
      }
    };
    clearAndGetProductByCategoryname();
  }, [dispatch, category]); // Add category as a dependency

  // Hàm để láy ra mảng sản phẩm tương tự theo danh mục
  useEffect(() => {
    const getProducts = () => {
      const categoryValues = Object.values(productsByCategory);
      console.log(categoryValues);
      if (categoryValues.length === 1) {
        // Nếu chỉ có một mảng thì sử dụng mảng đó
        setSimilarProducts(categoryValues[0]);
      } else if(categoryValues.length === 2) {
        setSimilarProducts(categoryValues[1]);
      } else {
        setSimilarProducts([]);
      }
    }
    getProducts();
  }, [productsByCategory])

  const randomSimilarProducts = getRandomElements(similarProducts, 10);

  return (
    <div className="py-10 bg-white sm:px-10 lg:px-20">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="flex items-center max-w-2xl px-4 mx-auto space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="w-4 h-5 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 px-4 pt-10 lg:grid-cols-2 gap-x-8 gap-y-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              {/* <LazyLoadImage
                alt={product.images[0].alt}
                src={products.product?.imageUrl}
                effect="opacity"
                threshold={300}
                className="object-cover object-center w-full h-full"
                wrapperClassName="w-full h-full" // Đảm bảo wrapper có kích thước đúng
                placeholderSrc="https://placehold.co/408x533"
              /> */}
              <ZoomImage
                src={products?.product?.imageUrl}
                alt={product?.images[0].alt}
              />
            </div>
            <div className="flex flex-wrap justify-center space-x-5">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg aspect-h-2 aspect-w-3 max-w-[5rem] max-h-[5rem] mt-4"
                >
                  <LazyLoadImage
                    alt={image.alt}
                    src={image.src}
                    className="object-cover object-center w-full h-full"
                    wrapperClassName="w-full h-full" // Đảm bảo wrapper có kích thước đúng
                    effect="opacity"
                    threshold={300}
                    placeholderSrc="https://placehold.co/80x80"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="max-w-2xl px-4 pb-16 mx-auto lg:col-span-1 sm:px-6 lg:max-w-7xl lg:px-8 lg:pb-24">
            <div className="lg:col-span-2">
              <h1 className="text-lg font-semibold text-gray-900 lg:text-xl">
                {products.product?.brand}
              </h1>
              <h1 className="pt-1 text-lg text-gray-900 opacity-60 lg:text-60">
                {products.product?.title}
              </h1>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <div className="flex items-center mt-6 space-x-5 text-lg text-gray-900 lg:text-xl">
                <p className="font-semibold">
                  ${products.product?.discountedPrice}
                </p>
                <p className="line-through opacity-50">
                  ${products.product?.price}
                </p>
                <p className="font-semibold text-green-600">
                  ${products.product?.discountPercent}
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating name="read-only" value={5.5} readOnly />
                  <p className="text-sm opacity-50">6350 Ratings</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    350 Reviews
                  </p>
                </div>
              </div>

              <form className="mt-10">
                {/* Colors */}
                {/* <div>
                  <h3 className="text-sm font-medium text-gray-900">Color</h3>

                  <fieldset aria-label="Choose a color" className="mt-4">
                    <RadioGroup
                      value={selectedColor}
                      onChange={setSelectedColor}
                      className="flex items-center space-x-3"
                    >
                      {product.colors.map((color) => (
                        <Radio
                          key={color.name}
                          value={color}
                          aria-label={color.name}
                          className={classNames(
                            color.selectedClass,
                            "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1"
                          )}
                        >
                          <span
                            aria-hidden="true"
                            className={classNames(
                              color.class,
                              "h-8 w-8 rounded-full border border-black border-opacity-10"
                            )}
                          />
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div> */}

                {/* Sizes */}
                <div className="mt-10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-sm"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="absolute border-2 border-gray-200 rounded-md pointer-events-none -inset-px"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 w-full h-full text-gray-200 stroke-2"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                <Button
                  variant="contained"
                  onClick={handleAddToCart}
                  sx={{
                    px: "2rem",
                    py: "1rem",
                    width: "100%",
                    marginTop: "2rem",
                    bgcolor: "#4338CA",
                    "&:hover": {
                      bgcolor: "#4035b7",
                    },
                    transition: "bgcolor ease-out",
                  }}
                >
                  Add to Cart
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="pl-4 space-y-2 text-sm list-disc">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ratings and Reviews */}
        <section>
          <h1 className="pb-4 text-lg font-bold">Recent Review & Rating</h1>

          <div className="p-5 border">
            <div className="grid gap-7 sm:grid-cols-1 lg:grid-cols-2">
              <div className="space-y-5">
                {[1, 1, 1].map((item, index) => (
                  <ProductReviewCard key={index} />
                ))}
              </div>

              <div className="px-3 sm:px-4">
                <h1 className="pb-2 text-xl font-semibold">Product Ratings</h1>
                <div className="flex items-center space-x-3">
                  <Rating value={4.6} precision={0.5} readOnly />
                  <p className="opacity-60"> 59480 Ratings</p>
                </div>

                <Box className="mt-5 space-y-3">
                  <div className="flex items-center space-x-3">
                    <p className="w-1/4">Excellent</p>
                    <LinearProgress
                      sx={{
                        bgcolor: "#d0d0d0",
                        borderRadius: 4,
                        height: 7,
                        flexGrow: 1,
                      }}
                      variant="determinate"
                      value={40}
                      color="success"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="w-1/4">Very Good</p>
                    <LinearProgress
                      sx={{
                        bgcolor: "#d0d0d0",
                        borderRadius: 4,
                        height: 7,
                        flexGrow: 1,
                      }}
                      variant="determinate"
                      value={30}
                      color="success"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="w-1/4">Good</p>
                    <LinearProgress
                      sx={{
                        bgcolor: "#d0d0d0",
                        borderRadius: 4,
                        height: 7,
                        flexGrow: 1,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "yellow",
                        },
                      }}
                      variant="determinate"
                      value={25}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="w-1/4">Average</p>
                    <LinearProgress
                      sx={{
                        bgcolor: "#d0d0d0",
                        borderRadius: 4,
                        height: 7,
                        flexGrow: 1,
                      }}
                      variant="determinate"
                      value={20}
                      color="warning"
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <p className="w-1/4">Poor</p>
                    <LinearProgress
                      sx={{
                        bgcolor: "#d0d0d0",
                        borderRadius: 4,
                        height: 7,
                        flexGrow: 1,
                      }}
                      variant="determinate"
                      value={15}
                      color="error"
                    />
                  </div>
                </Box>
              </div>
            </div>
          </div>
        </section>

        {/* Similar Products */}
        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold">Similar Products</h1>
          <div className="grid grid-cols-1 mt-5 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {randomSimilarProducts.map((item, index) => (
              <HomeSectionCard key={index} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
