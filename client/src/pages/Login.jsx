import { Formik } from "formik";
import { useState } from "react";
import { loginValidationSchema } from "../validationSchema/loginValidationSchema";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, seterror] = useState(null);
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["Login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (res) => {
      navigate("/home");

      const firstName = res?.data?.userDetails?.firstName;
      const accessToken = res?.data?.token;
      const role = res?.data?.userDetails?.role;

      localStorage.setItem("firstName", firstName);
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("role", role);
    },
    onError: (error) => {
      seterror(error.response.data.msg);
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <>
      {isPending && <LinearProgress />}
      <div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <div style={{
                
              }}>
                {error && (
                  <Alert sx={{ marginBottom: "2rem" }} severity="error">
                    {error}
                  </Alert>
                )}

                <form
                  onSubmit={formik.handleSubmit}
                  style={{
                    boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                    display: "flex",

                    flexDirection: "column",
                    padding: "1rem",
                    gap: "1rem",
                    width: "350px",
                  }}
                >
                  <Typography variant="h4">Login</Typography>
                  <FormControl>
                    <TextField
                      label="Email"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.touched.email && formik.errors.email ? (
                      <FormHelperText error>
                        {formik.errors.email}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" required>
                      Password
                    </InputLabel>
                    <OutlinedInput
                      {...formik.getFieldProps("password")}
                      id="outlined-adornment-password"
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end" required>
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                    />
                    {formik.touched.password && formik.errors.password ? (
                      <FormHelperText error>
                        {formik.errors.password}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                  <Button
                    variant="contained"
                    color="secondary"
                    type="submit"
                    disabled={isPending}
                  >
                    Login
                  </Button>
                  <Link to={"/register"}>New here? Register</Link>
                </form>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Login;
