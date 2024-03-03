import axios from "axios";
import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { Helmet } from "react-helmet";
export default function Allorders() {
  const token = localStorage.getItem("userToken");
  const { id } = jwtDecode(token);
  let baseUrl = `https://ecommerce.routemisr.com`;
  let [getdata, setData] = useState([]);
  async function getUserOrder() {
    let data = await axios.get(`${baseUrl}/api/v1/orders/user/${id}`);
    setData(data.data);
  }
  // error 404
  return (
    <div>
      {" "}
      <Helmet>
        <title>All orders</title>
      </Helmet>
    </div>
  );
}
