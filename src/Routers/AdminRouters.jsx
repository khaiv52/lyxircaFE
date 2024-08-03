  import React, { lazy, Suspense } from "react";
  import { Route, Routes } from "react-router-dom";

  const Admin = lazy(() => import("../Admin/Admin"));

  const LoadingFallback = () => (
    <div className="flex items-center justify-center w-screen h-screen bg-white">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );

  const AdminRouters = () => {
    return (
      <div className="flex flex-col min-h-screen">
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="*" element={<Admin />} />
          </Routes>
        </Suspense>
      </div>
    );
  };

  export default AdminRouters;
