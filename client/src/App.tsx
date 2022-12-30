import React from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import "./variables.css";
import Layout from "./components/Layout/Layout";
import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./components/Products/Products";
import Contacts from "./pages/Contacts/Contacts";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="contacts" element={<Contacts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
