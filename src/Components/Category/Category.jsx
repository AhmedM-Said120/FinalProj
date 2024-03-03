import axios from "axios";
import React from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import style from "./Category.module.scss";
import { Helmet } from "react-helmet";
export default function Category() {
  async function getCategory() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  let { data, isLoading, isFetching } = useQuery("category", getCategory);
  return (
    <>
     <Helmet>
                <title>Categories</title>
            </Helmet>
      <div className="container">
        <div className="row">
          {data?.data.data.map((cate) => {
            return (
              <div
                className={`col-lg-2  col-md-8 col-md-12     `}
                key={cate._id}
              >
                <Link to={`/detailsCategory/${cate._id}`}>
                  <div className="content text-center">
                    <img
                      src={cate?.image}
                      className={`${style.imground} ${style.cardImage}`}
                      alt={cate?.image}
                    />
                    <p>{cate?.name} ss</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      ;
    </>
  );
}
