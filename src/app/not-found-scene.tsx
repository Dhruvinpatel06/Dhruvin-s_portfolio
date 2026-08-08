"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

const NotFoundScene = () => {
  return <Spline scene="/assets/404.spline" style={{ height: "100vh" }} />;
};

export default NotFoundScene;
