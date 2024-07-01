import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = (props) => {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem("accessToken");
  useEffect(() => {
    if (!isUserLoggedIn) {
      navigate("/login");
    }
  }, [isUserLoggedIn, navigate]);
  return <div>{isUserLoggedIn && props.children}</div>;
};

export default AuthGuard;
