import axios from "axios";
import React, { useContext } from "react";
import { useQuery } from "react-query";
import style from "./Products.module.scss";
import { TailSpin } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "./../../Context/cartContext";
import toast, { Toaster } from "react-hot-toast";
import { wishListContext } from "../../Context/wishlistContext";
import { Helmet } from "react-helmet";

export default function Products() {
  let { addToCart, setCartNumber } = useContext(cartContext);
  let { setWishListCount } = useContext(wishListContext);

  async function getProduct() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading, isFetching } = useQuery("product", getProduct);

  async function addToMyCart(id) {
    let { data } = await addToCart(id);

    if (data.status == "success") {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems);
    } else toast.error(data.message);
  }

  let { addToWichList } = useContext(wishListContext);

  async function addToMywishList(id) {
    let { data } = await addToWichList(id);
    if (data.status == "success") {
      toast.success(data.message);
      setWishListCount(data.data.length);
    } else toast.error(data.message);
  }

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      <div className="container">
        {!isLoading ? (
          <>
            <div className="row py-5 ">
              {data?.data.data.map((product) => {
                return (
                  <div
                    className="col-lg-3 col-md-6 col-sm-12"
                    key={product._id}
                  >
                    <div className={`${style.product} rounded `}>
                      <Link to={`/details/${product._id}`}>
                        <img
                          src={product.imageCover}
                          className="  w-100"
                          alt={product.title}
                        />
                      </Link>
                      <div className="py-1 ">
                        <p className="text-muted">{product.category.name}</p>
                        <h6>{product.title}</h6>
                        <div className="d-flex justify-content-between align-content-center">
                          <p>{product.price} EG</p>
                          <p>
                            {product.ratingsAverage}{" "}
                            <i className="fa-solid fa-star text-warning"></i>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          addToMywishList(product._id);
                        }}
                        className="btn "
                      >
                        <i className="fas fa-heart"></i>
                      </button>
                      <div className={`${style.overlayBtns}  `}>
                        <button
                          onClick={() => {
                            addToMyCart(product._id);
                          }}
                          className="btn bg-info  w-100"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
    </>
  );
}
