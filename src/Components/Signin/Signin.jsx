import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { userContext } from "../../Context/userTokenContext";
import style from "./Signin.module.scss";
import { Helmet } from "react-helmet";
export default function Signin() {
  let { userToken, setToken } = useContext(userContext);
  const [isLoading, setLoading] = useState(false);
  const [errMesg, setErrMesg] = useState(null);
  let navigate = useNavigate();
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is requrired")
      .email("enter avalid name"),

    password: Yup.string()
      .required("this password is required")
      .matches(/^[A-Z][a-z0-9]{6,9}$/, "password is required")
  });

  async function signIn(val) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, val)
      .catch((err) => {
        setErrMesg(err.response.data.message);
        setLoading(false);
      });
    if (data.message === "success") {
      navigate("/home");

      localStorage.setItem("userToken", data.token);
      setToken(data.token);

      setLoading(false);
    }

    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: validationSchema,
    onSubmit: signIn
  });
  return (
    <>
     <Helmet>
                <title>Login </title>
            </Helmet>
    <div
      className={`container-fluid d-flex py-5 align-items-center justify-content-center  ${style.bgImg}`}
    >
      <div className="row ">
        <form onSubmit={formik.handleSubmit}>
          <div
            className={`col-md-12 col-lg-12 m-auto p-4 ${style.bgShadow} shadow  `}
          >
            <h1 className="text-center text-primary ">LogIn Form</h1>
            <div className="row  ">
              <div className="col-md-12 col-lg-12 col-sm-12">
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
                Login
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
              I Forget
              <Link to="/forgetPassword" className="text-primary">
                Password
              </Link>
            </p>
            <p className=" text-muted">
              I have account
              <Link to="/signup" className="text-primary">
                Reegister
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div></>
  );
}
