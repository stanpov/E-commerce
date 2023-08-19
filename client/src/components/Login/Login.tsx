import React from 'react';
import { useState } from 'react';
import { CLable } from '../common/CLable/CLable';
import { CInput } from '../common/CInput/CInput';
import './Login.scss';
import { Link } from 'react-router-dom';

interface LoginProps {

};

export const Login: React.FC<LoginProps> = ({

}) => {

    const [isUsernameValid, setIsUsernameValid] = useState({ isValid: true, message: '' });
    const [isPasswordValid, setIsPasswordValid] = useState({ isValid: true, message: '' });

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            username: { value: string };
            password: { value: string };
        };

        const username = target.username.value;
        const password = target.password.value;

        if (isPasswordValid.isValid && isUsernameValid.isValid) {
            //TODO api calls
            console.log(username, password);

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
    }

    const onBlurHandlerPassword = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsPasswordValid({ isValid: false, message: 'Password is required!' });
        } else if (e.target.value.length < 5) {
            setIsPasswordValid({ isValid: false, message: 'Password needs to be at least 5 characters long!' });
        } else {
            setIsPasswordValid({ isValid: true, message: '' });
        }
    }

    return (
        <section className='login'>
            <h1 className='login__title'>Login</h1>
            <form onSubmit={submitHandler} className='login__form'>
                <div className='login__form__content__wrapper'>
                    <CLable inputId={'loginUsername'} title={'Username'} />
                    <CInput
                        type='text'
                        id='loginUsername'
                        name='username'
                        placeholder='jon-green'
                        onBlur={onBlurHandlerUsername}
                    />
                    {
                        !isUsernameValid.isValid
                            ? <p className='error__message'>{isUsernameValid.message}</p>
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
                <input type="submit" value={'Login'} className='form__submit__button' />
                <Link className='forgot__password' to={''}>Forgot password?</Link>
            </form>
        </section>
    )
}