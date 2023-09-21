import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { updateUser } from "../slices/usersSlice";

type EditUserFormProps = {
  user: any;
  onClose: () => void;
};

const EditUserForm: React.FC<EditUserFormProps> = ({ user, onClose }) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validationSchema: Yup.object({
      firstName: Yup.string()
        .min(5, "Minimum 5 characters")
        .max(44, "Maximum 44 characters")
        .required("Required!"),
      lastName: Yup.string()
        .max(55, "Maximum 55 characters")
        .required("Required!"),
    }),
    onSubmit: (values) => {
      axios
        .put(`http://localhost:3001/users/${user.username}`, values)
        .then((response) => {
          dispatch(updateUser({ ...values, username: user.username }));
          onClose();
        })
        .catch((error) => {
          console.error("There was an error updating the user:", error);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="firstName" className="text-lg">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          className={`p-2 border rounded ${
            formik.touched.firstName && formik.errors.firstName
              ? "border-red-500"
              : ""
          }`}
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="lastName" className="text-lg">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          className={`p-2 border rounded ${
            formik.touched.lastName && formik.errors.lastName
              ? "border-red-500"
              : ""
          }`}
        />
      </div>
      <div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Update User
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
