import React from "react";
import Slider from "react-slick";
import img1 from "../../Assets/img/Slider/slider-image-1.jpg";
import img2 from "../../Assets/img/Slider/slider-image-2.jpg";
import img3 from "../../Assets/img/Slider/slider-image-3.jpg";
import { Link } from "react-router-dom";
import style from "./HomeSlider.module.scss";

export default function HomeSlider() {
  const settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    waitForAnimate: false
  };

  return (
    <div>
      <div className="container ">
        <div className="row  py-4">
          <div className="col-md-7 ">
            <Slider {...settings}>
              <div className="layout1">
                <img
                  src={img1}
                  className="w-100 rounded-4 "
                  height={500}
                  alt=""
                />
                <div className="card-img-overlay d-flex flex-column p-5  justify-content-center align-item-center">
                  <div className="headTital  ">
                    <span>Exclusive Offer </span>
                    <span className="bg-danger text-white p-1 rounded fw-bold   ">
                      35%
                    </span>
                  </div>
                  <h2
                    className="card-title fw-bolder  mt-4"
                    style={{ color: "#001E2B" }}
                  >
                    Best Online Deals,
                    <br /> Free Stuff
                  </h2>
                  <p className="card-text mt-3">
                    Only on this week... Don’t miss
                  </p>
                  <p className="card-text">Last updated 3 mins ago</p>
                  <div>
                    <Link to="/product" className="btn btn-primary">
                      Go somewhere <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="layout1">
                <img
                  src={img3}
                  className="w-100 rounded-4 "
                  height={500}
                  alt=""
                />
                <div className="card-img-overlay d-flex flex-column p-5  justify-content-center align-item-center">
                  <div className="headTital  ">
                    <span>Exclusive Offer</span>
                    <span>45%</span>
                  </div>
                  <h2
                    className="card-title fw-bold mt-4"
                    style={{ color: "#001E2B" }}
                  >
                    Cokoladni Kolutici <br /> Lasta
                  </h2>
                  <p className="card-text mt-3">
                    Only on this week... Don’t miss
                  </p>
                  <p className="card-text">Last updated 3 mins ago</p>
                  <div>
                    <Link to="/product" className="btn btn-primary">
                      Go somewhere <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="layout1">
                <img
                  src={img2}
                  className="w-100 rounded-4 "
                  height={500}
                  alt=""
                />
                <div className="card-img-overlay d-flex flex-column p-5  justify-content-center align-item-center">
                  <div className="headTital  ">
                    <span>Exclusive Offer</span>
                    <span>45%</span>
                  </div>
                  <h2
                    className="card-title fw-bold mt-4"
                    style={{ color: "#001E2B" }}
                  >
                    Chocozay wafer-rolls Deals
                  </h2>
                  <p className="card-text mt-3">
                    Only on this week... Don’t miss
                  </p>
                  <p className="card-text">Last updated 3 mins ago</p>
                  <div>
                    <Link to="/product" className="btn btn-primary">
                      Go somewhere <i className="fa-solid fa-arrow-right" />
                    </Link>
                  </div>
                </div>
              </div>
            </Slider>
          </div>
          <div className="col-md-5  ">
            <div className="position-relative">
              <img src={img1} className="w-100 rounded-4" height={250} alt="" />
              <div className="card-img-overlay py-5 lh-lg p-3">
                <h5 className="card-title fw-bolder" style={{ color: "#001E2B" }}>
                  10% cashback on personal care
                </h5>
                <p className="card-text text-muted">Max cashback: $12</p>
                <p className="card-text">
                  Code: <span>CARE12</span>{" "}
                </p>
                <button className="  btn btn-info ">Shop Now</button>
              </div>
            </div>
            <div className="position-relative ">
              <img
                src={img2}
                className="w-100 rounded-4 "
                height={250}
                alt=""
              />
              <div className="card-img-overlay py-5 lh-lg p-3 ">
                <h5 className="card-title  lh-lg">Say yes to season’s fresh</h5>
                <p className="card-text ">Refresh your day the fruity way</p>
                <button className="  btn btn-info ">Shop Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
