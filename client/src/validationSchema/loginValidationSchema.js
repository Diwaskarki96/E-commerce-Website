import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required")
    .lowercase(),
  password: Yup.string().required("Password is required"),
});
