import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { CLable } from '../common/CLable/CLable';
import { CInput } from '../common/CInput/CInput';
import { CInputImage } from '../common/CInputImage/CInputImage';
import './UserProfileUpdate.scss';
import { CInputSubmit } from '../common/CInputSubmit/CInputSubmit';

interface UserProfileUpdateProps {
    setIsUpdate: (updata: boolean) => void;
}

export const UserProfileUpdate: React.FC<UserProfileUpdateProps> = ({
    setIsUpdate,
}) => {

    const [isUsernameValid, setIsUsernameValid] = useState({ isValid: true, message: '' });
    const [isPhoneValid, setIsPhoneValid] = useState({ isValid: true, message: '' });
    const [isAddressValid, setIsAddressValid] = useState({ isValid: true, message: '' });


    const saveHandler = () => {
        setIsUpdate(false)
    }

    const onBlurHandlerUsername = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsUsernameValid({ isValid: false, message: 'Username is required!' });
        } else if (e.target.value.length < 5) {
            setIsUsernameValid({ isValid: false, message: 'Username needs to be at least 5 characters long!' });
        } else {
            setIsUsernameValid({ isValid: true, message: '' });
        }
    };

    const onBlurHandlerPhone = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsPhoneValid({ isValid: false, message: 'Phone is required!' });
        } else if (e.target.value.length < 10 && e.target.value) {
            setIsPhoneValid({ isValid: false, message: 'Invalid phone number!' });
        } else {
            setIsPhoneValid({ isValid: true, message: '' });
        }
    };

    const onBlurHandlerAddress = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsAddressValid({ isValid: false, message: 'Address is required!' });
        } else {
            setIsAddressValid({ isValid: true, message: '' });
        }
    };

    return (
        <motion.article

            variants={{
                start: { opacity: 0, scale: 0.8 },
                end: { opacity: 1, scale: 1 }
            }}
            initial='start'
            animate='end'
            transition={{ duration: 1.3, delay: 0.2 }} className='update__card'>
            <h2 className='update__card__title'>update your profile</h2>
            <section className='update__card__content'>
                <section className='update__card__content__image'>
                    <div className='update__card__content__image__wrapper'>
                        <div className='update__card__content__image__inside'>
                            <img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt="" />
                        </div>
                        <CInputImage />
                    </div>
                </section>
                <form onSubmit={saveHandler} className='update__card__content__information'>
                    <ul className='update__card__content__information__list'>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'username'} title={'Username'} />
                            <CInput type={'text'} name={'username'} id={'username'} placeholder={'john-green'} onBlur={onBlurHandlerUsername} />
                            {
                                isUsernameValid
                                    ? <p className='update__card__error__message'>{isUsernameValid.message}</p>
                                    : null
                            }
                        </li>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'phone'} title={'Phone number'} />
                            <CInput type={'number'} name={'phone'} id={'phone'} placeholder={'212 456 7890'} onBlur={onBlurHandlerPhone} />
                            {
                                isPhoneValid
                                    ? <p className='update__card__error__message'>{isPhoneValid.message}</p>
                                    : null
                            }
                        </li>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'address'} title={'Delivery address'} />
                            <CInput type={'text'} name={'address'} id={'address'} placeholder={'332, My Street, Kingston'} onBlur={onBlurHandlerAddress} />
                            {
                                isAddressValid
                                    ? <p className='update__card__error__message'>{isAddressValid.message}</p>
                                    : null
                            }
                        </li>
                    <input type='submit' className='save__button' value={'Save'}/>
                    </ul>
                </form>
            </section>
            {/* <button onClick={saveHandler} className='save__button'>save</button> */}
        </motion.article>

    )
}
