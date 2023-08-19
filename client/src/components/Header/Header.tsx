import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SlBasket } from "react-icons/sl";
import { Logo } from "../common/Logo/Logo";
import "./Header.scss";

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    const openBurgerMenu = () => {
        setIsActive(!isActive);
    };
    return (
        <header>
            <nav className="navigation">
                <div className="navigation__logo__wrapper">
                    <Logo />
                </div>
                <ul className={isActive ? "burger__active" : "navigation__list"}>
                    <li className="navigation__list__item">
                        <NavLink
                            to={"/products"}
                            className={({ isActive }) => (isActive ? "active" : undefined)}
                        >
                            Products
                        </NavLink>
                    </li>
                    <li className="navigation__list__item">
                        <NavLink
                            to={"/wishlist"}
                            className={({ isActive }) => (isActive ? "active" : undefined)}
                        >
                            Wish List
                        </NavLink>
                    </li>
                    <li className="navigation__list__item">
                        <NavLink
                            to={"/contacts"}
                            className={({ isActive }) => (isActive ? "active" : undefined)}
                        >
                            Contacts
                        </NavLink>
                    </li>
                    <li className="navigation__list__item">
                        <NavLink
                            to={"/about"}
                            className={({ isActive }) => (isActive ? "active" : undefined)}
                        >
                            About
                        </NavLink>
                    </li>
                    <li className="navigation__list__item">
                        <NavLink
                            to={"/login-signup"}
                            className={({ isActive }) => (isActive ? "active" : undefined)}
                        >
                            Login / SignUp
                        </NavLink>
                    </li>
                    {/* <li className="navigation__list__item">
                        <NavLink
                            to={"/sign-up"}
                            className={({ isActive }) => (isActive ? "active" : undefined)}
                        >
                            Sign Up
                        </NavLink>
                    </li> */}
                    <li className="navigation__list__basket">
                        {!isActive ? (
                            <NavLink to={"/cart"} data-testid="icon-test">
                                <SlBasket className="navigation__list__basket__icon" />
                            </NavLink>
                        ) : (
                            <NavLink
                                to={"/cart"}
                                className={({ isActive }) => (isActive ? "active" : undefined)}
                                data-testid="text-test"
                            >
                                My Cart
                            </NavLink>
                        )}

                        <p className="navigation__list__basket__count">5</p>
                    </li>
                </ul>

                <div className="burger__menu" data-testid="size-test">
                    <button
                        className={isActive ? "hamburger active" : "hamburger"}
                        onClick={openBurgerMenu}
                        data-testid="button-test"
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
