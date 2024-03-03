import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";
import toast, { Toaster } from "react-hot-toast";
import { wishListContext } from "../../Context/wishlistContext";
/*  */
/*  */
export default function Details() {
  let { addToCart, setCartNumber } = useContext(cartContext);
  let { setWishListCount } = useContext(wishListContext);
  const [details, setDetals] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let pram = useParams();
  let detailsId = pram.id;

  async function getDetails() {
    setLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${detailsId}`
    );

    setDetals(data.data);
    setLoading(false);
  }
  async function addToMyCart(id) {
    let { data } = await addToCart(id);

    if (data.status == "success") {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems);
    } else toast.error(data.message);
  }
  useEffect(() => {
    getDetails();
  }, []);

  /*  */

  let { addToWichList } = useContext(wishListContext);

  async function addToMywishList(id) {
    let { data } = await addToWichList(id);
    if (data.status == "success") {
      toast.success(data.message);
      setWishListCount(data.data.length);
    } else toast.error(data.message);
  }

  return (
    <div className="container">
      {!isLoading ? (
        <>
          <div className="row my-5 bg-light shadow py-5">
            <div className="col-lg-3 col-md-6 col-sm-12 rounded-2">
              {/*  */}
              <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide"
                data-bs-ride="carousel"
                data-bs-interval="true"
              >
                <div className="carousel-indicators  ">
                  <img
                    src={details?.imageCover}
                    alt={details?.description}
                    className="active w-25 rounded-5  h-25"
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to={0}
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  {/*  */}

                  <img
                    src={details?.images[3]}
                    className="active w-25 rounded-5  h-25"
                    alt={details?.description}
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to={3}
                    aria-label="Slide 4"
                  />
                  {/*  */}
                  <img
                    src={details?.images[1]}
                    className="active w-25 rounded-5  h-25"
                    alt={details?.description}
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                  />
                  {/*  */}
                  <img
                    src={details?.images[2]}
                    className="active w-25 rounded-5  h-25"
                    alt={details?.description}
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to={2}
                    aria-label="Slide 3"
                  />
                  {/*  */}

                  {/*  */}
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval={1000}>
                    <img
                      src={details?.imageCover}
                      alt={details?.description}
                      className="d-block w-100"
                    />
                  </div>
                  <div className="carousel-item active" data-bs-interval={1000}>
                    <img
                      src={details?.images[1]}
                      className="d-block w-100"
                      alt={details?.description}
                    />
                  </div>
                  <div className="carousel-item active" data-bs-interval={1000}>
                    <img
                      src={details?.images[2]}
                      className="d-block w-100"
                      alt={details?.description}
                    />
                  </div>
                  <div className="carousel-item active" data-bs-interval={1000}>
                    <img
                      src={details?.images[3]}
                      className="d-block w-100"
                      alt={details?.description}
                    />
                  </div>
                </div>
                <button
                  className="visually-hidden"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span className="visually-hidden" aria-hidden="true" />
                  <span className="visually-hidden"> </span>
                </button>
                <button
                  className=" visually-hidden  "
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span className="visually-hidden  " aria-hidden="true" />
                  <span className="visually-hidden"> </span>
                </button>
              </div>
            </div>
            <div className=" col-lg-9 col-md-6 col-sm-12 d-flex flex-column justify-content-around">
              <div className="heading">
                <h2>{details?.title}</h2>
                <p>{details?.description}</p>
              </div>
              <div className="bottom">
                <span>
                  <i className="fas fa-star text-warning"></i>{" "}
                  {details?.ratingsAverage}
                </span>
                <p>Category : {details?.category.name} </p>
                <p>Price : {details?.price} EG</p>
                <p>Only : {details?.quantity} in stock</p>
                <button
                  onClick={() => {
                    addToMywishList(details._id);
                  }}
                  className="btn "
                >
                  <i className="fas fa-heart"></i>
                </button>
                <button
                  onClick={() => {
                    addToMyCart(details._id);
                  }}
                  className="btn btn-secondary"
                >
                  Add to Cart{" "}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="vh-100 d-flex justify-content-center align-items-center">
          <TailSpin
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </div>
  );
}
