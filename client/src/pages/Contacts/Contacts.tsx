// import React from 'react';
import { Link } from 'react-router-dom';
import { GrMapLocation } from 'react-icons/gr';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineMail, AiFillInstagram } from 'react-icons/ai';
import { FaFacebookF, FaTwitter } from 'react-icons/fa';
import { Logo } from '../../components/common/Logo/Logo';
import './Contacts.scss';

export const Contacts = () => {
    return (
        <section className='contacts'>

            <article className='contacts__card'>
                <section className='contacts__card__image__wrapper'>
                    <div className='contacts__card__logo'>
                        <Logo />
                    </div>
                    <img src="bg2.jpg" alt="front" />
                    <img className='backside' src="bs.webp" alt="back" />
                    <div className='pulse'>
                        <div className="pulse__ring one"></div>
                        <div className="pulse__ring two"></div>
                        <div className="pulse__ring three"></div>
                        <div className="pulse__ring four"></div>
                        <h3 className='pulse__text'>Contacts</h3>
                    </div>
                </section>
                <section className='contacts__card__details'>
                    <div className='contacts__card__details__content'>
                        <h2>Contacts</h2>
                        <ul className='contacts__card__details__content__list'>
                            <li className='contacts__card__details__content__list__item'>
                                <GrMapLocation className='contacts__card__details__content__list__item__icon' />
                                <div className='contacts__card__details__content__list__item__text'>
                                    <h4>address</h4>
                                    <p>132, My Street, Kingston, New York 12401</p>
                                </div>
                            </li>
                            <li className='contacts__card__details__content__list__item'>
                                <FiPhoneCall className='contacts__card__details__content__list__item__icon' />
                                <div className='contacts__card__details__content__list__item__text'>
                                    <h4>phone number</h4>
                                    <p>(555) 555-1234</p>
                                </div>
                            </li>
                            <li className='contacts__card__details__content__list__item'>
                                <AiOutlineMail className='contacts__card__details__content__list__item__icon' />
                                <div className='contacts__card__details__content__list__item__text'>
                                    <h4>email</h4>
                                    <p>e-shop.beast@shop.com</p>
                                </div>
                            </li>
                        </ul>
                        <ul className='contacts__card__details__content__social'>
                            <li className='contacts__card__details__content__social__item'>
                                <Link to={''} >
                                    <FaFacebookF className='contacts__card__details__content__social__item__icon' />
                                </Link>
                            </li>
                            <li className='contacts__card__details__content__social__item'>
                                <Link to={''} >
                                    <FaTwitter className='contacts__card__details__content__social__item__icon' />
                                </Link>
                            </li>
                            <li className='contacts__card__details__content__social__item'>
                                <Link to={''}>
                                    <AiFillInstagram className='contacts__card__details__content__social__item__icon' />
                                </Link>
                            </li>
                        </ul>
                        <div className='contacts__card__details__content__logo'>
                            <Logo />
                        </div>
                    </div>

                </section>

            </article>

        </section>
    )
}
