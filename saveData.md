import axios from "axios";
import React, { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";
export default function Details() {
  const [details, setDetals] = useState(null);
  const [isLoading, setLoading] = useState(false);

  let pram = useParams();
  let detailsId = pram.id;

  async function getDetails() {
    setLoading(true);
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${detailsId}`
    );
    console.log(data);
    setDetals(data.data);
    setLoading(false);
  }

  useEffect(() => {
    getDetails();
  }, []);

  return (
    <div className="container">
      {!isLoading ? (
        <>
          <div className="row my-5">
            <div className="col-md-3">
              <img
                src={details?.imageCover}
                className="w-100"
                alt={details?.description}
              />
            </div>
            <div className="col-md-9 d-flex flex-column justify-content-around">
              <div className="heading">
                <h2>{details?.title}</h2>
                <p>{details?.description}</p>
                
              </div>
              <div className="bottom">
                <span>
                  <i className="fas fa-star text-warning"></i>
                  {details?.ratingsAverage}
                </span>

                <p>Price: {details?.price} EG</p>

                <button className="btn btn-secondary">Add to Cart </button>
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




-------------------------------------------------------------!part 2-----------------------------------------------------------




import axios from "axios";
import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
export default function Details() {
  let Pram = useParams();
  let detailsId = Pram.id;
  async function getDetails() {
    return await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${detailsId}`
    );
  }

  let { data, isLoading, isFetching } = useQuery("details", getDetails);
  console.log(data?.data.data);
  let dataShort = data?.data.data;
  return (
    <>
      <div className="container">
        {!isLoading ? (
          <>
            <div className="row">
              <div className="col-md-3">
                <img
                  src={dataShort.imageCover}
                  className="w-100"
                  alt={dataShort.description}
                />
              </div>

              <div className="col-md-9">
                <p>{dataShort.description}</p>
              </div>
            </div>
          </>
        ) : (
          <div className="vh-100 d-flex justify-content-center align-items-center">
            <ThreeDots
              visible={true}
              height="80"
              width="80"
              color="#4fa94d"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          </div>
        )}
      </div>
      ;
    </>
  );
}
