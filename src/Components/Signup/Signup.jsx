import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "./Signup.module.scss";
import { Helmet } from "react-helmet";
export default function Signup() {
  const [isLoading, setLoading] = useState(false);
  const [errMesg, setErrMesg] = useState(null);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "min the name")
      .max(8, "max name is 8")
      .required("This name is requred"),
    email: Yup.string()
      .required("Email is requrired")
      .email("enter avalid name"),
    phone: Yup.string()
      .required()
      .matches(/^01[0125][0-9]{8}$/, "phone is required"),
    password: Yup.string()
      .required("this password is required")
      .matches(/^[A-Z][a-z0-9]{6,9}$/, "password is required"),
    rePassword: Yup.string()
      .required("this is not matched password")
      .oneOf([Yup.ref("password")])
  });

  //

  async function signUp(val) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, val)
      .catch((err) => {
        setErrMesg(err.response.data.message);
        setLoading(false);
      });
    if (data.message === "success") {
      navigate("/signin");
      setLoading(false);
    }
    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: ""
    },
    validationSchema: validationSchema,
    onSubmit: signUp
  });
  return (
<>
<Helmet>
                <title>Register </title>
            </Helmet>
    <div
      className={`container-fluid ${style.bgImg}   py-5 shadow d-flex align-items-center justify-content-center    `}
    >

      <div className="row  ">
        <form onSubmit={formik.handleSubmit}>
          <div
            className={`col-md-6 m-auto p-4  shadow ${style.bgShadow}   rounded`}
          >
            <h1 className="text-center text-primary">Signup Form</h1>
            <div className="row  ">
              <div className="col-md-12  col-sm-12">
                <label htmlFor="userName">Name</label>
                <input
                  className="form-control"
                  id="userName"
                  name="name"
                  type="text"
                  value={formik.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name ? (
                  <p className="text-danger">{formik.errors.name}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12 col-sm-12">
                <label htmlFor="userEmail">Email</label>
                <input
                  className="form-control"
                  type="email"
                  id="userEmail"
                  value={formik.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                />
                {formik.errors.email && formik.touched.email ? (
                  <p className="text-danger">{formik.errors.email}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12 col-sm-12">
                <label htmlFor="userPhone">Phone</label>
                <input
                  className="form-control"
                  id="userPhone"
                  name="phone"
                  type="tel"
                  value={formik.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.phone && formik.touched.phone ? (
                  <p className="text-danger"> {formik.errors.phone} </p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12 col-sm-12">
                <label htmlFor="userPassword">Password</label>
                <input
                  className="form-control"
                  id="userPassword"
                  value={formik.password}
                  onChange={formik.handleChange}
                  name="password"
                  onBlur={formik.handleBlur}
                  type="password"
                />
                {formik.errors.password && formik.touched.password ? (
                  <p className="text-danger">{formik.errors.password}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="col-md-12 col-sm-12">
                <label htmlFor="confairm">RePassword</label>
                <input
                  className="form-control"
                  type="password"
                  id="confairm"
                  name="rePassword"
                  value={formik.rePassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.rePassword && formik.touched.rePassword ? (
                  <p className="text-danger">{formik.errors.rePassword}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            {errMesg != null ? (
              <p className="text-bg-danger text-center my-3">{errMesg}</p>
            ) : (
              ""
            )}
            <div className="col-md-3 col-sm-12 my-2 ms-auto">
              <button
                disabled={!(formik.isValid && formik.dirty)}
                type="submit"
                className="btn btn-primary "
              >
                submit
                {isLoading ? (
                  <span>
                    <i className="fa-solid fa-spinner mx-2 text-light fa-spin"></i>
                  </span>
                ) : (
                  ""
                )}
              </button>
            </div>
            <p>
              I have account{" "}
              <Link to="/signin" className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div></>
  );
}
