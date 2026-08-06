import React, { Suspense } from "react";
import type { Metadata } from "next";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description: "The page you're looking for doesn't exist or has been moved.",
};

const NotFoundPage = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Spline scene="/assets/404.spline" style={{ height: "100vh" }} />
      </Suspense>
    </>
  );
};

export default NotFoundPage;
