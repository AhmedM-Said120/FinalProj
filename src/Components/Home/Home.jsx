import React, { useContext } from "react";
import Products from "./../Products/Products";
import SliderComponent from "../SliderComponent/SliderComponent";
import HomeSlider from "../HomeSlider/HomeSlider";
import Category from "../Category/Category";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
     <Helmet>
                <title>Home</title>
            </Helmet>
      <div className="container">
        <div>
          <HomeSlider />
        </div>
        <SliderComponent />
        <div className="row">
          <h2>Shop Popular Categories</h2>
          <div className="col-md-12">
            <Category />
          </div>
        </div>

        <h2>Products</h2>
        <Products />
      </div>
    </>
  );
}
