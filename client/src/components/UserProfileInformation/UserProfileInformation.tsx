import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './UserProfileInformation.scss';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import { getUserId } from '../../Redux/Auth/AuthSlice';
import { userInformation } from '../../Redux/User/UserActions';
import { userInfo } from '../../Redux/User/UserSlice';

interface UserProfileInformationProps {
    setIsUpdate: (update: boolean) => void;
}

export const UserProfileInformation: React.FC<UserProfileInformationProps> = ({
    setIsUpdate,
}) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(getUserId);
    const user = useAppSelector(userInfo);

    useEffect(() => {
        dispatch(userInformation({ userId }));
    }, [])

    const updateHandler = () => {
        setIsUpdate(true);
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
            <h2 className='information__card__title' role='profile-title'>Hello, {`${user.userName}`}!</h2>
            <section className='information__card__content'>
                <section className='information__card__content__image'>
                    <div className='information__card__content__image__wrapper'>
                        <div className='information__card__content__image__inside'>
                            {
                                user.userImage
                                ? <img src={user.userImage} alt="" />
                                :<img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt="" />
                            }
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
                            <p>{user.userName}</p>
                        </li>
                        <li className='information__card__content__information__list__item' role='information-list-item'>
                            <h4>email:</h4>
                            <p>{user.email}</p>
                        </li>
                        <li className='information__card__content__information__list__item' role='information-list-item'>
                            <h4>phone number:</h4>
                            {
                                user.phoneNumber
                                    ? <p>{user.phoneNumber}</p>
                                    : <p>- - - - - - - -</p>
                            }
                        </li>
                        <li className='information__card__content__information__list__item' role='information-list-item'>
                            <h4>Delivery address:</h4>
                            {
                                user.deliveryAddress
                                    ? <p>{user.deliveryAddress}</p>
                                    : <p>- - - - - - - -</p>
                            }
                        </li>
                    </ul>
                </section>
            </section>
            <button onClick={updateHandler} className='update__profile__button'>update profile</button>
        </motion.article>
    )
}
