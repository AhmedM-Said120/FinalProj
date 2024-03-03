import React, { useContext, useEffect, useState } from "react";
import { cartContext } from "../../Context/cartContext";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cart() {
  let { getCart, deleteCart, updateCart, setCartNumber, cartNumber } =
    useContext(cartContext);
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [, setOnePrice] = useState([]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      let data = await getCart();
      setData(data.data.data.products);
      setPrice(data.data.data.totalCartPrice);
      setOnePrice(data.data.data.products.price);
      setLoading(false);
    })();
  }, []);

  //

  async function updateProduct(id, count) {
    let data = await updateCart(id, count);
    setData(data.data.data.products);
    setPrice(data.data.data.totalCartPrice);
    setCartNumber(data.data.numOfCartItems);
    if (data.data.status === "success") {
      toast.success(data.data.status);
      setData(data.data.data.products);
      setCartNumber(data.data.numOfCartItems);
    } else toast.error(data.data);
  }

  /*  */
  async function removeProduct(id) {
    let data = await deleteCart(id);
    setData(data.data.data.products);
    setPrice(data.data.data.totalCartPrice);
    if (data.data.status === "success") {
      toast.success(data.data.status);
      setData(data.data.data.products);
      setCartNumber(data.data.numOfCartItems);
    } else toast.error(data.data);
  }
  return (
    <div>
       <Helmet>
                <title>Cart</title>
            </Helmet>
      <div className="container">
        <h2>Shopping Cart</h2>
        {!isLoading ? (
          <div className="row">
            <div className="col-md-11 bg-main-light shadow p-5 m-auto my-5">
              <h3>
                Total Prise <span className="text-center">{price}</span>
              </h3>
              {!price > 0 ? (
                <> </>
              ) : (
                <>
                  <div className="ms-auto">
                    <Link to="/checkout">
                      <button className="btn btn-outline-warning text-dark">
                        Proceed to Buy ( {cartNumber} )
                      </button>
                    </Link>
                  </div>
                </>
              )}
              {data.map((product) => {
                return (
                  <div className="row border-bottom py-5" key={product._id}>
                    <div className="col-md-2">
                      <img
                        src={product.product.imageCover}
                        alt=""
                        className="w-100"
                      />
                    </div>
                    <div className="col-md-10 d-flex justify-content-between align-items-center">
                      <div>
                        <h5>{product.product.title}</h5>
                        <p>{product.price}</p>
                        <button
                          onClick={() => {
                            removeProduct(product.product._id);
                          }}
                          className="btn btn-danger"
                        >
                          Remove <i className="fa-regular fa-trash-can"></i>
                        </button>
                      </div>
                      {/*  */}
                      <div>
                        {/*  */}
                        <button
                          onClick={() => {
                            updateProduct(
                              product.product._id,
                              product.count + 1
                            );
                          }}
                          className="btn btn-outline-danger"
                        >
                          <i className="fa-regular fas fa-plus"></i>
                        </button>
                        {/*  */}
                        <span> {product.count}</span>
                        {/*  */}
                        <button
                          onClick={() => {
                            updateProduct(
                              product.product._id,
                              product.count - 1
                            );
                          }}
                          className="btn btn-outline-danger"
                        >
                          <i className="fa-regular fas fa-minus"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
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
    </div>
  );
}

/*   */
