import axios from "axios";
import React from "react";
import { Helmet } from "react-helmet";
import { TailSpin } from "react-loader-spinner";
import { useQuery } from "react-query";

export default function Brands() {
  async function getBrands() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  let { data, isFetching, isLoading } = useQuery("brands", getBrands);
  console.log(data);
  return (
    <>
     <Helmet>
                <title>Brands</title>
            </Helmet>
      <div className="container">
        <div className="row">
          {!isLoading ? (
            <>
              {data?.data.data.map((brand) => {
                return (
                  <>
                    <div className="col-md-3">
                      <div className="content">
                        
                        <img
                          src={brand.image}
                          className="w-100"
                          alt={brand.name}
                        />
                      </div>
                    </div>
                  </>
                );
              })}
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
    </>
  );
}
