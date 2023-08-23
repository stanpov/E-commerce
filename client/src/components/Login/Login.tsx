import React from 'react';
import { useState } from 'react';
import { CLable } from '../common/CLable/CLable';
import { CInput } from '../common/CInput/CInput';
import { CInputSubmit } from '../common/CInputSubmit/CInputSubmit';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../../Redux/Auth/AuthAction';
import './Login.scss';
// import { Link } from 'react-router-dom';

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

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };

        const email = target.email.value;
        const password = target.password.value;

        if (isPasswordValid.isValid && email !== '' && isEmailValid.isValid && password !== '') {
            dispatch(login({email,password}));
            navigate('/');
            console.log(email, password);

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
            <form onSubmit={submitHandler} className='login__form'>
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
                            ? <p className='error__message'>{isEmailValid.message}</p>
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
                            ? <p className='error__message'>{isPasswordValid.message}</p>
                            : null
                    }
                </div>
                <CInputSubmit value='Login' />
                <p onClick={forgotPasswordHandler} className='forgot__password' >Forgot password?</p>
            </form>
        </section>
    )
}