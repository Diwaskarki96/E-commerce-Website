import { Formik } from "formik";
import { useState } from "react";
import {
  Alert,
  Button,
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { registrationValidationSchema } from "../validationSchema/registrationValidationSchema";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { $axios } from "../axios/axiosInstance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";

const Registration = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { isPending, mutate } = useMutation({
    mutationKey: ["Register-user"],
    mutationFn: async (values) => {
      return await $axios.post("/user/register", values);
    },
    onSuccess: (res) => {
      console.log(res);
      navigate("/login");
      dispatch(openSuccessSnackbar(res?.data?.message));
    },
    onError: (error) => {
      console.log(error);
      dispatch(openErrorSnackbar(error?.response?.data));
    },
  });
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "4rem",
      }}
    >
      {isPending && <LinearProgress />}
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          role: "",
          gender: "",
        }}
        validationSchema={registrationValidationSchema}
        onSubmit={(values) => {
          mutate(values);
        }}
      >
        {({ touched, errors, getFieldProps, handleSubmit }) => {
          return (
            <div>
              <form
                onSubmit={handleSubmit}
                style={{
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                  display: "flex",
                  flexDirection: "column",
                  padding: "1rem",
                  gap: "1rem",
                  width: "350px",
                }}
              >
                <Typography variant="h3">Registration</Typography>
                <FormControl>
                  <TextField
                    label="First Name"
                    {...getFieldProps("firstName")}
                    required
                  />
                  {touched.firstName && errors.firstName ? (
                    <FormHelperText error>{errors.firstName}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField
                    label="Last Name"
                    {...getFieldProps("lastName")}
                    required
                  />
                  {touched.lastName && errors.lastName ? (
                    <FormHelperText error>{errors.lastName}</FormHelperText>
                  ) : null}
                </FormControl>
                <FormControl>
                  <TextField
                    label="Email"
                    {...getFieldProps("email")}
                    required
                  />
                  {touched.email && errors.email ? (
                    <FormHelperText error>{errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl variant="outlined">
                  <InputLabel htmlFor="outlined-adornment-password" required>
                    Password
                  </InputLabel>
                  <OutlinedInput
                    {...getFieldProps("password")}
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
                  {touched.password && errors.password ? (
                    <FormHelperText error>{errors.password}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth required>
                  <InputLabel>Role</InputLabel>
                  <Select label="Role" {...getFieldProps("role")}>
                    <MenuItem value="buyer">Buyer</MenuItem>
                    <MenuItem value="seller">Seller</MenuItem>
                  </Select>
                  {touched.role && errors.role ? (
                    <FormHelperText error>{errors.role}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Gender</InputLabel>
                  <Select label="Gender" {...getFieldProps("gender")}>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                  </Select>

                  {touched.gender && errors.gender ? (
                    <FormHelperText error>{errors.gender}</FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isPending}
                >
                  Register
                </Button>
                <Link to={"/login"}>Already registered? Login</Link>
              </form>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default Registration;
