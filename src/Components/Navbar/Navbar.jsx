import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { userContext } from "../../Context/userTokenContext";
import { cartContext } from "../../Context/cartContext";
import { wishListContext } from "../../Context/wishlistContext";

export default function Navbar() {
  let { userToken, setToken } = useContext(userContext);
  let { cartNumber, getCart, setCartNumber } = useContext(cartContext);
  let { wishListCount, getWishList, setWishListCount } =
    useContext(wishListContext);
  let navigate = useNavigate();

  function logOut() {
    localStorage.removeItem("userToken");

    setToken(null);

    navigate("/signin");
  }
  /*  */
  useEffect(() => {
    (async () => {
      let data = await getCart();
      setCartNumber(data.data.numOfCartItems);
    })();
    /*  */
    (async () => {
      let data = await getWishList();
      setWishListCount(data.data.count);
    })();
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <div className="container">
          <NavLink className="navbar-brand" to="home">
            <i className="fa-solid text_main fa-cart-shopping">
              <span className="fw-bold">FreshCart</span>
            </i>
          </NavLink>
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapsibleNavId"
            aria-controls="collapsibleNavId"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavId">
            {userToken !== null ? (
              <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" to="home">
                    Home
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="product">
                    product
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="category">
                    category
                  </NavLink>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="brands">
                    brands
                  </NavLink>
                </li>
              </ul>
            ) : (
              ""
            )}

            {/* !! left items  */}
            <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
              {userToken == null ? (
                <>
                  {" "}
                  <li className="nav-item">
                    <NavLink className="nav-link" to="signup">
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="signin">
                      login
                    </NavLink>
                  </li>
                </>
              ) : (
                ""
              )}

              {userToken !== null ? (
                <>
                  <li className="nav-item d-flex align-items-center">
                    <i className="fa-brands fa-facebook mx-3" />
                    <i className="fa-brands fa-twitter mx-3" />
                    <i className="fa-brands fa-instagram mx-3" />
                    <i className="fa-brands fa-linkedin mx-3" />
                  </li>

                  <li className="nav-item  ms-5 me-5">
                    <Link className="nav-link" to="wishList">
                      <i className="fas fa-heart " aria-hidden="true"></i>
                      <span className="badge bg-success text-light   bottom-25 position-absolute ">
                        {wishListCount}
                      </span>
                    </Link>
                  </li>

                  <li className="nav-item position-relative">
                    <Link className="nav-link" to="cart">
                      <i
                        className="fa fa-shopping-cart "
                        aria-hidden="true"
                      ></i>
                      <span className="badge bg-danger text-light   bottom-25 position-absolute ">
                        {cartNumber}
                      </span>
                    </Link>
                  </li>
                  <li
                    onClick={() => {
                      logOut();
                    }}
                    className="nav-item"
                  >
                    <Link className="nav-link ms-3">
                      <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    </Link>
                  </li>
                </>
              ) : (
                ""
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
