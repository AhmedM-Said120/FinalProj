import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useNavigate } from 'react-router-dom';
export default function RestPassword() {

  let navigate=  useNavigate();
  async function restPass(val) {
    let { data } = await axios.put(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      val
    );
      if(data.token != null){
        navigate('/signin')

      }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      newPassword: ""
    },
    onSubmit: restPass
  });

  return (
    <div>
      <div>
        <h2>Rest password form</h2>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="">Email:</label>

          <input
            type="email"
            className="form-control"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />

          <label htmlFor="">new Password:</label>

          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />

          <button className="btn btn-danger text-light my-2">
            rest password
          </button>
        </form>
      </div>
    </div>
  );
}
