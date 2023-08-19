import React, { useState } from 'react';
import { PageWrapper } from '../common/PageWrapper/PageWrapper';
import { SignUp } from '../SignUp/SignUp';
import { Login } from '../Login/Login';
import { BsArrowUpLeftCircle,BsFillArrowUpRightCircleFill, BsFillArrowUpLeftCircleFill } from 'react-icons/bs';
import './LoginSignUp.scss';

export const LoginSignUp = () => {
    const [isRotate, setIsRotate] = useState(false);

    const rotateButtonHandler = () => {
        setIsRotate(!isRotate);
    }

    const setIsRotateFalse =() => {
        setIsRotate(true);
    }

    const setIsRotateTrue =() => {
        setIsRotate(false);
    }

    return (
        <PageWrapper>
            <div className='flip__wrapper'>
                <div className='flip__titles__wrapper'>
                    <h3 onClick={setIsRotateFalse}>Login</h3>
                    <h3 onClick={setIsRotateTrue}>SignUp</h3>
                </div>
                <div className='flip__button' onClick={rotateButtonHandler}>
                    <BsFillArrowUpLeftCircleFill className={!isRotate ?'arrow move__right' : 'arrow move__left'}/>
                </div>
                <div className='flip'>
                    <div className={!isRotate ? 'flip__inner rotate' : 'flip__inner'}>
                        <div className='flip__inner__front'>
                            <Login />
                        </div>
                        <div className="flip__inner__back">
                            <SignUp />
                        </div>
                    </div>
                </div>
            </div>

        </PageWrapper>
    )
}
