import React from "react";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Layout.css";
import { LayoutProps } from "../../interfaces/interfaces";

const Layout = (props: LayoutProps) => {
  return (
    <>
      <Header />
      {props && props.children}
      <Footer />
    </>
  );
};

export default Layout;
