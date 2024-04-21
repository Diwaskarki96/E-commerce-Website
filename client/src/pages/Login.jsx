import { Formik } from "formik";
import React from "react";
import { loginValidationSchema } from "../validationSchema/loginValidationSchema";
import {
  Button,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";

const Login = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["Login-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/login", values);
    },
    onSuccess: (res) => {
      console.log(res);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error.response.data.msg);
    },
  });
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
                  <TextField label="Email" {...formik.getFieldProps("email")} />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField
                    label="Password"
                    {...formik.getFieldProps("password")}
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
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Login;
