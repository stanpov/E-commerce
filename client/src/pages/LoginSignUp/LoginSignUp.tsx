import React, { useState } from 'react';
import { PageWrapper } from '../../components/common/PageWrapper/PageWrapper';
import { SignUp } from '../../components/SignUp/SignUp';
import { Login } from '../../components/Login/Login';
import { BsFillArrowUpLeftCircleFill } from 'react-icons/bs';
import './LoginSignUp.scss';
import { EnterEmail } from '../../components/EnterEmail/EnterEmail';
import { EnterCode } from '../../components/EnterCode/EnterCode';

export const LoginSignUp = () => {
    const [isRotate, setIsRotate] = useState<boolean>(false);
    const [rotateVerification, setRotateVerification] = useState<boolean>(false);
    const [isPasswordForgot, setIsPasswordForgot] = useState<boolean>(false);

    const rotateButtonHandler = () => {
        setIsRotate(!isRotate);
    }

    const setIsRotateFalse = () => {
        setIsRotate(true);
    }

    const setIsRotateTrue = () => {
        setIsRotate(false);
    }


    return (
        <PageWrapper>
            <div className='flip__height'>

                <div className={!isPasswordForgot ? 'flip__wrapper first__left' : 'flip__wrapper first__right'} role='flip-container-one'>
                    <div className='flip__titles__wrapper'>
                        <h3 onClick={setIsRotateFalse} role='option-title'>Login</h3>
                        <h3 onClick={setIsRotateTrue} role='option-title'>SignUp</h3>
                    </div>
                    <div className='flip__button' onClick={rotateButtonHandler} role='flip-button'>
                        <BsFillArrowUpLeftCircleFill className={!isRotate ? 'arrow flip__right' : 'arrow flip__left'} role='arrow' />
                    </div>
                    <div className='flip'>
                        <div className={!isRotate ? 'flip__inner rotate' : 'flip__inner'} role='flip-inner-one'>
                            <div className='flip__inner__front'>
                                <Login
                                    setIsPasswordForgot={setIsPasswordForgot}
                                />
                            </div>
                            <div className="flip__inner__back">
                                <SignUp />
                            </div>
                        </div>
                    </div>
                </div>

                <div className={!isPasswordForgot ? 'flip__wrapper second__left' : 'flip__wrapper second__right'} role='flip-container-two'>
                    <div className='flip'>
                        <div className={rotateVerification ? 'flip__inner rotate' : 'flip__inner'} role='flip-inner-two'>
                            <div className='flip__inner__front'>
                                <EnterEmail
                                    setRotateVerification={setRotateVerification}
                                />
                            </div>
                            <div className="flip__inner__back">
                                <EnterCode
                                    setIsPasswordForgot={setIsPasswordForgot}

                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </PageWrapper>
    )
}
