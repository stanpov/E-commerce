import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.scss";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";


const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
      <ToastContainer/>
    </>
  );
};

export default Layout;
