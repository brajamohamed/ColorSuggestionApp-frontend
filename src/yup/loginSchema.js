import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Enter your email"),
  password: yup.string().required("Enter password to login"),
});
