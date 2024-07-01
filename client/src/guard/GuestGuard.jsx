import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GuestGuard = (props) => {
  const isUserLoggedIn = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/home", { replace: "true" });
    }
    if (pathname === "/" && !isUserLoggedIn) {
      navigate("/login", { replace: true });
    }
  }, [isUserLoggedIn, navigate, pathname]);
  return <div>{!isUserLoggedIn && props.children}</div>;
};

export default GuestGuard;
