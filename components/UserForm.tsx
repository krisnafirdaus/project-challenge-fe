"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../slices/usersSlice";

const UserForm: React.FC = () => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(4, "Minimum 4 characters")
        .max(48, "Maximum 48 characters")
        .required("Required!"),
      firstName: Yup.string()
        .min(5, "Minimum 5 characters")
        .max(44, "Maximum 44 characters")
        .required("Required!"),
      lastName: Yup.string()
        .max(55, "Maximum 55 characters")
        .required("Required!"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("http://localhost:3001/users", values);
        dispatch(addUser(values));
        resetForm();
      } catch (error) {
        console.error("There was an error creating the user:", error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-4">
      <div className="flex flex-col">
        <label htmlFor="username" className="text-lg">
          Username
        </label>
        <input
          id="username"
          type="text"
          name="username"
          placeholder="Username"
          onChange={formik.handleChange}
          value={formik.values.username}
          className={`p-2 border rounded ${
            formik.touched.username && formik.errors.username
              ? "border-red-500"
              : ""
          }`}
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-red-500">{formik.errors.username}</div>
        ) : null}
      </div>
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
        {formik.touched.firstName && formik.errors.firstName ? (
          <div className="text-red-500">{formik.errors.firstName}</div>
        ) : null}
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
        {formik.touched.lastName && formik.errors.lastName ? (
          <div className="text-red-500">{formik.errors.lastName}</div>
        ) : null}
      </div>
      <div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add User
        </button>
      </div>
    </form>
  );
};

export default UserForm;
