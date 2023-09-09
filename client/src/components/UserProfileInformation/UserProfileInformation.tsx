import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './UserProfileInformation.scss';

interface UserProfileInformationProps {
    setIsUpdate: (update: boolean) => void;
}

export const UserProfileInformation: React.FC<UserProfileInformationProps> = ({
    setIsUpdate,
}) => {

    const updateHandler = () => {
        setIsUpdate(true)


    }

    return (
        <motion.article
            variants={{
                start: { opacity: 0, scale: 0.8 },
                end: { opacity: 1, scale: 1 }
            }}
            initial='start'
            animate='end'
            transition={{ duration: 1.3, delay: 0.2 }}
            className='information__card'>
            <h2 className='information__card__title' role='profile-title'>Hello George123!</h2>
            <section className='information__card__content'>
                <section className='information__card__content__image'>
                    <div className='information__card__content__image__wrapper'>
                        <div className='information__card__content__image__inside'>
                            <img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt="" />
                        </div>
                    </div>
                    <div className='information__card__content__buttons'>
                        <Link className='information__card__content__button' to={'#'}>Wish List</Link>
                        <Link className='information__card__content__button' to={'#'}>orders</Link>
                    </div>
                </section>
                <section className='information__card__content__information'>
                    <ul className='information__card__content__information__list' role='information-list'>
                        <li className='information__card__content__information__list__item' role='information-list-item'>
                            <h4>username:</h4>
                            <p>george123</p>
                        </li>
                        <li className='information__card__content__information__list__item' role='information-list-item'>
                            <h4>email:</h4>
                            <p>george123@gmail.com</p>
                        </li>
                        <li className='information__card__content__information__list__item' role='information-list-item'>
                            <h4>phone number:</h4>
                            <p>212-456-7890</p>
                        </li>
                        <li className='information__card__content__information__list__item' role='information-list-item'>
                            <h4>Delivery address:</h4>
                            <p>332, My Street, Kingston, New York 12401</p>
                        </li>
                    </ul>
                </section>
            </section>
            <button onClick={updateHandler} className='update__profile__button'>update profile</button>
        </motion.article>
    )
}
