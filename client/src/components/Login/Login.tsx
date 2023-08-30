import React, { useEffect } from 'react';
import { useState } from 'react';
import { AppDispatch } from '../../Redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CLable } from '../common/CLable/CLable';
import { CInput } from '../common/CInput/CInput';
import { CInputSubmit } from '../common/CInputSubmit/CInputSubmit';
import { VerifyEmailCodeForm } from '../common/VerifyEmailCodeForm/VerifyEmailCodeForm';
import { login } from '../../Redux/Auth/AuthAction';
import './Login.scss';
import { useAppSelector } from '../../Redux/hooks';
import { getIsVerified, getUserId } from '../../Redux/Auth/AuthSlice';

interface LoginProps {
    setIsPasswordForgot: (forgot: boolean) => void;
};

export const Login: React.FC<LoginProps> = ({
    setIsPasswordForgot,
}) => {

    const [isEmailValid, setIsEmailValid] = useState({ isValid: true, message: '' });
    const [isPasswordValid, setIsPasswordValid] = useState({ isValid: true, message: '' });
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const isVerified = useAppSelector(getIsVerified);
    const isLoggedIn = useAppSelector(getUserId);

    useEffect(() => {
        if (isVerified && isLoggedIn) {
            navigate('/');
        }
    }, [isVerified,isLoggedIn])


    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };

        const email = target.email?.value;
        const password = target.password?.value;

        if (isPasswordValid.isValid && email !== '' && isEmailValid.isValid && password !== '') {
            dispatch(login({ email, password }));
        }
    };

    const onBlurHandlerEmail = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsEmailValid({ isValid: false, message: 'Email is required!' });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
            setIsEmailValid({ isValid: false, message: 'Invalid email!' });
        } else {
            setIsEmailValid({ isValid: true, message: '' });
        }
    };

    const onBlurHandlerPassword = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsPasswordValid({ isValid: false, message: 'Password is required!' });
        } else if (e.target.value.length < 5) {
            setIsPasswordValid({ isValid: false, message: 'Password needs to be at least 5 characters long!' });
        } else {
            setIsPasswordValid({ isValid: true, message: '' });
        }
    };

    const forgotPasswordHandler = () => {
        setIsPasswordForgot(true);
    };

    return (
        <section className='login'>
            <h1 className='login__title'>Login</h1>
            {
                !isVerified && !isLoggedIn
                    ? <form onSubmit={submitHandler} className='login__form' role='login-form'>
                        <div className='login__form__content__wrapper'>
                            <CLable inputId={'loginEmail'} title={'Email'} />
                            <CInput
                                type='email'
                                id='loginEmail'
                                name='email'
                                placeholder='jon-green@gmail.com'
                                onBlur={onBlurHandlerEmail}
                            />
                            {
                                !isEmailValid.isValid
                                    ? <p className='error__message' role='validation-message'>{isEmailValid.message}</p>
                                    : null
                            }
                        </div>
                        <div className='login__form__content__wrapper'>
                            <CLable inputId={'loginPassword'} title={'Password'} />
                            <CInput
                                type='password'
                                id='loginPassword'
                                name='password'
                                placeholder='* * * * * * '
                                onBlur={onBlurHandlerPassword}
                            />
                            {
                                !isPasswordValid.isValid
                                    ? <p className='error__message' role='validation-message'>{isPasswordValid.message}</p>
                                    : null
                            }
                        </div>
                        <CInputSubmit value='Login' />
                        <p onClick={forgotPasswordHandler} className='forgot__password' >Forgot password?</p>
                    </form>
                    : <VerifyEmailCodeForm />
            }
        </section>
    )
}