import * as Yup from "yup";

export const registrationValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("First name is required")
    .min(2, "First name is too short")
    .max(50, "First Name is too long")
    .trim(),
  lastName: Yup.string()
    .required("Last name is required")
    .min(2, "Last name is too short")
    .max(50, "Last Name is too long")
    .trim(),
  email: Yup.string().email("Invalid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
  role: Yup.string()
    .required("Role is required")
    .oneOf(["buyer", "seller"], "Role must be buyer or seller"),
  gender: Yup.string().oneOf(
    ["male", "female"],
    "Gender must be male  or female"
  ),
});
