import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
export default function SliderComponent() {
  const [categortList, setCategory] = useState([]);

  async function getCategory() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    setCategory(data.data);
    console.log(data);
  }
  useEffect(() => {
    getCategory();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 1000,
    cssEase: "linear"
  };

  return (
    <>
      <div className="container">
        <Slider {...settings}>
          {categortList.map((cate) => {
            return (
              <div className="g-3 p-3" key={cate._id}>
                <div className="row">
                  <Link to="/product">
                    <img
                      src={cate.image}
                      className="w-100 "
                      height={200}
                      alt=""
                    />
                    {/* <p>{cate.name}</p> */}
                  </Link>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </>
  );
}
