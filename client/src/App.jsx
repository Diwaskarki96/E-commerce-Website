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
          sx={{ mr: "1rem" }}
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
            navigate("/login");
          }}
        >
          Login
        </Button>
        <br />
        <Button
          sx={{ mt: "1rem" }}
          variant="contained"
          color="primary"
          onClick={() => {
            navigate("/home");
          }}
        >
          Home
        </Button>
      </div>
    </div>
  );
};

export default App;
