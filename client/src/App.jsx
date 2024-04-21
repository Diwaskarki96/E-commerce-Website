import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const App = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h3>Welcome to my Page</h3>
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/register");
          }}
        >
          Register
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/register");
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default App;
