import React from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Protected = () => {
  const auth = localStorage.getItem("accessToken");

  // eslint-disable-next-line no-lone-blocks
  return auth ? <Outlet /> : <Navigate to={"/login"} />;
};

export default Protected;
