import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import "./Header.css";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const openBurgerMenu = () => {
    setIsActive(!isActive);

    console.log(isActive);
  };
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to={"/"}>
              <img src="eShopLogo.png" className="navLogo" />
            </Link>
          </li>
          <li>
            <NavLink
              to={"/products"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contacts"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Wish List
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/login"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Contacs
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/about"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/login"}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Login
            </NavLink>
          </li>
          <li className="basket-container">
            <SlBasket className="basketIcon" />
            <p className="numberItemsInBasket">5</p>
          </li>
          <li className="burgerMenu">
            <button
              className={isActive ? "hamburger active" : "hamburger"}
              onClick={openBurgerMenu}
            >
              <span className="line"></span>
              <span className="line"></span>
              <span className="line"></span>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
