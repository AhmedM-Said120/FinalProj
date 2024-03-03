import React, { useContext, useEffect, useState } from "react";
import { wishListContext } from "./../../Context/wishlistContext";
import { TailSpin } from "react-loader-spinner";
import { cartContext } from "../../Context/cartContext";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";
export default function WishList() {
  let { addToCart, setCartNumber } = useContext(cartContext);
  async function addToMyCart(id) {
    let { data } = await addToCart(id);
    if (data.status === "success") {
      toast.success(data.message);
      setCartNumber(data.numOfCartItems);
    } else toast.error(data.message);
  }
  //
  let { getWishList, deleteWishList } = useContext(wishListContext);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);

  async function removeProduct(id) {
    let data = await deleteWishList(id);
    if (data.status === "success") {
      toast.success(data.data.message);
      setData(data);
    } else {
      toast.error(data.data.message);
    }

  }

  useEffect(() => {
    (async () => {
      setLoading(true);
      let data = await getWishList();
      setLoading(false);
      setData(data.data.data);
    })();
  }, []);

  return (
    <>
     <Helmet>
                <title>WishList</title>
            </Helmet>
    <div>
      <div className="container">
        <h2>Wish List</h2>
        {!isLoading ? (
          <>
            {" "}
            <div className="row">
              <div className="col-md-11 bg-main-light shadow p-5 m-auto ">
                {data.map((product) => {
                  return (
                    <div className="row border-bottom py-5 " key={product._id}>
                      <div className="col-md-12  "></div>

                      <div className="col-md-2">
                        <img
                          src={product.imageCover}
                          className="w-100"
                          alt=""
                        />
                      </div>
                      <div className="col-md-10 ">
                        <div className="row">
                          <div className="col-md-6">
                            <p>Name : {product.title}</p>
                            <p>Price : {product.price}</p>
                            <p>Soled : {product.sold}</p>
                            <p>Description : {product.description}</p>
                          </div>
                          <div className="col-md-6 d-flex justify-content-around">
                            <div>
                              <button
                                onClick={() => {
                                  addToMyCart(product._id);
                                }}
                                className="btn btn-success"
                              >
                                add To Cart
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() => {
                                  removeProduct(product._id);
                                }}
                                className="btn btn-danger"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
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
    </div></>
  );
}
