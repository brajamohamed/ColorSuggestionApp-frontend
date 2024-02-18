import * as yup from "yup";

export const contactSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  mobile: yup.number().required("Mobile number is requied"),
  message: yup
    .string()
    .min(15, "Minimum 15 characters required")
    .required("Enter your message"),
});
