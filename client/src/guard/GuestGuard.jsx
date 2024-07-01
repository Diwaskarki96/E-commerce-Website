import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestGuard = (props) => {
  const isUserLoggedIn = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  useEffect(() => {
    if (isUserLoggedIn) {
      navigate("/home", { replace: "true" });
    }
  }, [isUserLoggedIn, navigate]);
  return <div>{!isUserLoggedIn && props.children}</div>;
};

export default GuestGuard;
