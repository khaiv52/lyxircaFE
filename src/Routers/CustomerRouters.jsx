import React, { lazy, Suspense } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import ErrorPage from "../error/ErrorPage";
import TawkMessenger from "../chat/TawkMessenger";

// Lazy loading
const HomePage = lazy(() => import("../customer/pages/HomePage/HomePage"));
const Cart = lazy(() => import("../customer/components/Cart/Cart"));
const Checkout = lazy(() => import("../customer/components/Checkout/Checkout"));
const Footer = lazy(() => import("../customer/components/Footer/Footer"));
const Navigation = lazy(() =>
  import("../customer/components/Navigation/Navigation")
);
const Order = lazy(() => import("../customer/components/Order/Order"));
const OrderDetails = lazy(() =>
  import("../customer/components/Order/OrderDetails")
);
const Product = lazy(() => import("../customer/components/Product/Product"));
const ProductDetails = lazy(() =>
  import("../customer/components/ProductDetails/ProductDetails")
);
const PaymentSuccess = lazy(() =>
  import("../customer/components/Payment/PaymentSuccess")
);

const Profile = lazy(() => import("../customer/components/Profile/Profile"));
const ProfileEditForm = lazy(() =>
  import("../customer/components/Profile/ProfileEditForm")
);

const SearchProduct = lazy(() => import("../customer/components/Product/SearchProduct"));

const LoadingFallback = () => (
  <div className="flex items-center justify-center w-screen h-screen bg-white">
    <h1 className="text-2xl font-bold">Loading...</h1>
  </div>
);

const CustomerRouters = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Suspense fallback={<LoadingFallback />}>
        <Navigation />
        <div className="flex-grow">
          <Routes>
            <Route path="/login" element={<HomePage />} />
            <Route path="/register" element={<HomePage />} />
            <Route path="/error" element={<ErrorPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/:id" element={<ProfileEditForm />} />

            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/:levelOne/:levelTwo/:levelThree"
              element={<Product />}
            />
            <Route path="/products" element={<SearchProduct />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/account/order" element={<Order />} />
            <Route path="/account/order/:orderId" element={<OrderDetails />} />
            <Route path="/payment/:orderId" element={<PaymentSuccess />} />
          </Routes>
          <Outlet />
        </div>
        <TawkMessenger />
        <Footer />
      </Suspense>
    </div>
  );
};

export default CustomerRouters;
