import React from "react";

const AuthGuard = (props) => {
  return <div>{props.children}</div>;
};

export default AuthGuard;
