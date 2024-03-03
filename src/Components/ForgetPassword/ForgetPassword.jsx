import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./ForgetPassword.module.scss";
import { Helmet } from 'react-helmet';
export default function ForgetPassword() {
  const [isLoading, setLoading] = useState(false);
  const [errMesg, setErrMesg] = useState(null);
  let validationSchema = Yup.object({
    email: Yup.string()
      .required("Email is requrired")
      .email("enter avalid email")
  });
  let navigate = useNavigate();
  async function forgetPass(val) {
    setLoading(true);
    let { data } = await axios.post(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      val
    );
    if (data.statusMsg === "success") {
      document.querySelector(".forgetPassword").classList.add("d-none");
      document.querySelector(".verifyCode").classList.remove("d-none");
      setLoading(false);
    }
    setLoading(false);
  }

  let formik = useFormik({
    initialValues: {
      email: ""
    },
    validationSchema: validationSchema,
    onSubmit: forgetPass
  });
  /*  */
  /*  */
  /*  */
  let validationSchema2 = Yup.object({
    resetCode: Yup.string().required("Enter A valid Code")
  });

  async function sendCode(val) {
    setLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, val)
      .catch((err) => {
        setErrMesg(err.response.data.message);
        setLoading(false);
      });
    if (data.status === "Success") {
      navigate("/restPassword");
      setLoading(false);
    }
    setLoading(false);
  }

  let Verfiyformik = useFormik({
    initialValues: {
      resetCode: ""
    },
    validationSchema: validationSchema2,
    onSubmit: sendCode
  });

  return (
    <>
     <Helmet>
                <title>Forget Password</title>
            </Helmet>
      <div
        className={`${style.bgImg} container-fluid d-flex align-items-center justify-content-center forgetPassword `}
      >
        <div className="row ">
          <form onSubmit={formik.handleSubmit}>
            <div className={`col-md-12 m-auto p-4 ${style.bgShadow} shadow  `}>
              <h1 className="text-center text-primary ">
                Forget Password Form
              </h1>
              <div className="row  ">
                <div className="col-md-12 col-sm-12">
                  <label htmlFor="email">Email</label>
                  <input
                    className="form-control"
                    type="email"
                    id="email"
                    value={formik.values.email}
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
            </div>
          </form>
        </div>
      </div>

      {/* ! Rest Code impout */}

      <div
        className={`${style.bgImg}container-fluid d-none align-items-center justify-content-center  verifyCode `}
      >
        <div className="row ">
          <form onSubmit={Verfiyformik.handleSubmit}>
            <div className={`col-md-12 m-auto p-4  shadow ${style.bgShadow} `}>
              <h1 className="text-center text-primary ">verify Code</h1>
              <div className="row  ">
                <div className="col-md-12 col-sm-12">
                  <label htmlFor="resetCode">resetCode</label>
                  <input
                    className="form-control"
                    type="text"
                    id="resetCode"
                    value={Verfiyformik.values.resetCode}
                    onChange={Verfiyformik.handleChange}
                    onBlur={Verfiyformik.handleBlur}
                    name="resetCode"
                  />
                  {Verfiyformik.touched.resetCode &&
                  Verfiyformik.errors.resetCode ? (
                    <p className="text-danger">
                      {Verfiyformik.errors.resetCode}
                    </p>
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
              <div className="col-md-12 col-sm-12 my-2 m-auto">
                <button
                  disabled={!(Verfiyformik.isValid && Verfiyformik.dirty)}
                  type="submit"
                  className="btn btn-primary "
                >
                  Send A Code
                  {isLoading ? (
                    <span>
                      <i className="fa-solid fa-spinner mx-2 text-light fa-spin"></i>
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
