import React from "react";
import './Footer.scss';
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <section className="footer__content__section one">
                    <ul className="footer__content__section__list">
                        <h4>EShop</h4>
                        <li className="footer__content__section__list__item">
                            <Link to={''}>products</Link>
                        </li>
                        <li className="footer__content__section__list__item">
                            <Link to={''}>wish list</Link>
                        </li>
                        <li className="footer__content__section__list__item">
                            <Link to={''}>contacts</Link>
                        </li>
                        <li className="footer__content__section__list__item">
                            <Link to={''}>about</Link>
                        </li>
                    </ul>
                </section>

                <section className="footer__content__section two">
                    <ul className="footer__content__section__list">
                        <h4>Something</h4>
                        <li className="footer__content__section__list__item">
                            <Link to={''}>something</Link>
                        </li>
                        <li className="footer__content__section__list__item">
                            <Link to={''}>something</Link>
                        </li>
                        <li className="footer__content__section__list__item">
                            <Link to={''}>something</Link>
                        </li>
                        <li className="footer__content__section__list__item">
                            <Link to={''}>something</Link>
                        </li>
                    </ul>
                </section>

                <section className="footer__content__section three">
                    <h4>About us</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit ex, quod placeat optio molestias ullam animi expedita mollitia rerum facere veritatis nisi, necessitatibus nostrum sed delectus excepturi labore aspernatur quidem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates id ratione nam. Perspiciatis cumque maxime facere amet aperiam vel aut ut sit temporibus odit impedit quia, soluta fugiat neque placeat.</p>
                </section>
            </div>
            <p> All rights reserved &copy; 2023</p>
        </footer>
    )
};

export default Footer;
