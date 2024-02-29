import * as yup from "yup";

export const wardrobeSchema = yup.object().shape({
  category: yup.string().required("Select a dress category"),
  group: yup.string().required("Select a dress group"),
});
