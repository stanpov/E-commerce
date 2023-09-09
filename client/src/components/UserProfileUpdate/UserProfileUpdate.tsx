import React, { useState } from 'react'
import { motion } from 'framer-motion';
import { CLable } from '../common/CLable/CLable';
import { CInput } from '../common/CInput/CInput';
import { CInputImage } from '../common/CInputImage/CInputImage';
import './UserProfileUpdate.scss';
import { CInputSubmit } from '../common/CInputSubmit/CInputSubmit';
import { useAppSelector } from '../../Redux/hooks';
import { userInfo } from '../../Redux/User/UserSlice';
import axios from 'axios';

interface UserProfileUpdateProps {
    setIsUpdate: (updata: boolean) => void;
}

export const UserProfileUpdate: React.FC<UserProfileUpdateProps> = ({
    setIsUpdate,
}) => {

    const [isUsernameValid, setIsUsernameValid] = useState({ isValid: true, message: '' });
    const [isPhoneValid, setIsPhoneValid] = useState({ isValid: true, message: '' });
    const [isAddressValid, setIsAddressValid] = useState({ isValid: true, message: '' });
    const [image, setImage] = useState<string | ArrayBuffer | null>('');
    const user = useAppSelector(userInfo);


    const saveHandler = () => {
        setIsUpdate(false);
        const data = {
            userImage: image,
            userName: 'pesho',
            phoneNumber: 55555555,
            deliveryAddress: 'sofia 5864',
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/users/updateuserinformation/64ef976eac08b376c69025f2`,
            data
        )
    }

    const imageChangeHandler = (e: React.ChangeEvent): void => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(55555);
        

        reader.onloadend = () => {
            setImage(reader.result)
            console.log(reader.result);
            
        }
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
                <form onSubmit={saveHandler} className='update__card__content__information'>
                    <section className='update__card__content__image'>
                        <div className='update__card__content__image__wrapper'>
                            <div className='update__card__content__image__inside'>
                                {
                                    user.userImage
                                        ? <img src={user.userImage} alt="" />
                                        : <img src='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png' alt="" />
                                }
                            </div>
                            <CInputImage onChange={(e)=>imageChangeHandler(e)} />
                        </div>
                    </section>
                    <ul className='update__card__content__information__list'>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'username'} title={'Username'} />
                            <CInput type={'text'} name={'username'} id={'username'} placeholder={user.userName} onBlur={onBlurHandlerUsername} required />
                            {
                                isUsernameValid
                                    ? <p className='update__card__error__message' role='validation-message'>{isUsernameValid.message}</p>
                                    : null
                            }
                        </li>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'phone'} title={'Phone number'} />
                            <CInput type={'number'} name={'phone'} id={'phone'} placeholder={user.phoneNumber ? user.phoneNumber : '8474341122'} onBlur={onBlurHandlerPhone} required />
                            {
                                isPhoneValid
                                    ? <p className='update__card__error__message' role='validation-message'>{isPhoneValid.message}</p>
                                    : null
                            }
                        </li>
                        <li className='update__card__content__information__list__item'>
                            <CLable inputId={'address'} title={'Delivery address'} />
                            <CInput type={'text'} name={'address'} id={'address'} placeholder={user.deliveryAddress ? user.deliveryAddress : '332, My Street, Kingston'} onBlur={onBlurHandlerAddress} required />
                            {
                                isAddressValid
                                    ? <p className='update__card__error__message' role='validation-message'>{isAddressValid.message}</p>
                                    : null
                            }
                        </li>
                        <input type='submit' className='save__button' value={'Save'} />
                    </ul>
                </form>
            </section>
            {/* <button onClick={saveHandler} className='save__button'>save</button> */}
        </motion.article>

    )
}
