import * as yup from "yup";

export const registraionSchema = yup.object().shape({
  name: yup.string().required("This field is required"),
  gender: yup.string().required("This field is required"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("This field is required"),
  phone: yup
    .number()
    .positive()
    .min(10, "mobile number should be 10 digits")
    .required("This field is required"),
  dateOfBirth: yup.date().required("Date of birth required"),
  country: yup.string().required("This field is required"),
  city: yup.string().required("This field is required"),
  password: yup
    .string()
    .min(8, "Password should be atleast 8 characters")
    .required("Password cannot be empty"),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Password not mactch")
    .required("Password cannot be empty"),
});
