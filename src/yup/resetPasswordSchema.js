import * as yup from "yup";

export const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password should be atleast 8 characters")
    .required("Enter your password"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password does not match")
    .required("Re-enter your password"),
});
