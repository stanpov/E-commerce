import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { About } from "./pages/About/About";
import { Home } from "./pages/Home/Home";
import Cart from "./components/Cart/Cart";
import Products from "./pages/Products/Products";
import WishList from "./pages/WishList/WishList";
import { Contacts } from "./pages/Contacts/Contacts";
import { LoginSignUp } from "./pages/LoginSignUp/LoginSignUp";
import { UserProfile } from "./pages/UserProfile/UserProfile";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="products" element={<Products />} />
          <Route path="products/:id" element={<ProductDetails/>}  />
          <Route path="contacts" element={<Contacts />} />
          <Route path="wishlist" element={<WishList />} />
          <Route path="login-signup" element={<LoginSignUp />} />
          <Route path="my-profile" element={<UserProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
