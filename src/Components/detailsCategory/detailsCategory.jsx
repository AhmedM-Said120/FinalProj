import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";

export default function DetailsCategory() {
  let para = useParams();
  const [isLoading, setLoading] = useState(false);
  const [getDetails, setDetails] = useState(null);
  const paramId = para.id;

  async function getDetailsCategory() {
    setLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories/${paramId}`
    );
    setDetails(data?.data);
    console.log(data?.data);
    setLoading(false);
  }

  useEffect(() => {
    getDetailsCategory();
  }, []);
  return (
    <div> 
       <Helmet>
                <title>Details </title>
            </Helmet>
      <div className="container">
        {!isLoading ? (
          <>
            <div className="row py-5">
              <div className="col-md-6">
                <img
                  src={getDetails?.image}
                  className="w-100 rounded"
                  alt={getDetails?.name}
                />
              </div>
              <div className="col-md-6 position-relative ">
                <p className=" fw-bolder fs-2 position-absolute top-50 ">
                  Name: {getDetails?.name}
                </p>
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
    </div>
  );
}
