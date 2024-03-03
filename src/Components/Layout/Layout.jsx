import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { userContext } from "../../Context/userTokenContext";

export default function Layout() {
  let { setToken } = useContext(userContext);

  useEffect(() => {
    if (localStorage.getItem("userToken") !== null) {
      setToken(localStorage.getItem("userToken"));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
