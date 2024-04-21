import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid Email")
    .required("Email is required")
    .lowercase(),
  password: Yup.string()
    .required("Password is required")
    .min(3, "Password must be min 3 characters")
    .max(24, "Password must be under 24 characters"),
});
