import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
// import "./Header.css";

const Header = () => {
  const [isActive, setIsActive] = useState(false);

  const openBurgerMenu = () => {
    setIsActive(!isActive);

    console.log(isActive);
  };
  return (
    <header>
      <nav>
        <Link to={"/"} className="logoContainer">
          <img src="eShopLogo.png" alt="mainLogo" className="navLogo" />
        </Link>

        <ul className={isActive ? "burgerActive" : undefined}>
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
            {!isActive ? (
              <SlBasket className="basketIcon" />
            ) : (
              <NavLink
                to={"/cart"}
                className={({ isActive }) => (isActive ? "active" : undefined)}
              >
                My Cart
              </NavLink>
            )}

            <p className="numberItemsInBasket">5</p>
          </li>
        </ul>
        <div className="burgerMenu">
          <button
            className={isActive ? "hamburger active" : "hamburger"}
            onClick={openBurgerMenu}
          >
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
