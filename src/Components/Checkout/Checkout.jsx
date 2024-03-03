import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../Context/userTokenContext";
import { useFormik } from "formik";
import { cartContext } from "../../Context/cartContext";
import { Helmet } from "react-helmet";
export default function Checkout() {
  const [isLoading, setLoading] = useState(false);
  const [errMesg, setErrMesg] = useState(null);
  let { checkoutPayment, userToken, setToken, getCart } =
    useContext(cartContext);
  // let id = "65e14f13be8b52323593aeb9";

  let [cartId, setCartId] = useState("");

  useEffect(() => {
    (async () => {
      let data = await getCart();
      setCartId(data.data.data._id);
      // console.log(data.data.data._id);
    })();
  }, []);

  async function patment(val) {
    let data = await checkoutPayment(cartId, val);
    if (data.data.status === "success") {
      window.location = data.data.session.url;
    }
  }

  let formik = useFormik({
    initialValues: {
      details: "",
      city: "",
      phone: ""
    },

    onSubmit: patment
  });
  return (
    <>
     <Helmet>
                <title>Chekout</title>
            </Helmet>
    <div className="container-fluid d-flex align-items-center justify-content-center  ">
      <div className="row ">
        <form onSubmit={formik.handleSubmit}>
          <div className={`col-md-6 m-auto p-4  shadow  `}>
            <h1 className="text-center text-primary ">Payment Form</h1>
            <div className="row  ">
              <div className="col-md-12 col-sm-12">
                <label htmlFor="userEmail">details</label>
                <input
                  className="form-control"
                  type="text"
                  id="userEmail"
                  value={formik.details}
                  onChange={formik.handleChange}
                  name="details"
                />
              </div>

              <div className="col-md-12 col-sm-12">
                <label htmlFor="yourCity">city</label>
                <input
                  className="form-control"
                  id="yourCity"
                  value={formik.city}
                  onChange={formik.handleChange}
                  name="city"
                  type="text"
                />
              </div>

              <div className="col-md-12 col-sm-12">
                <label htmlFor="yourPhone">Phone</label>
                <input
                  className="form-control"
                  id="yourPhone"
                  value={formik.phone}
                  onChange={formik.handleChange}
                  name="city"
                  type="tel"
                />
              </div>
            </div>

            <div className="col-md-3 col-sm-12 my-2 ms-auto">
              <button type="submit" className="btn btn-primary ">
                Pay
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
    </div></>
  );
}
