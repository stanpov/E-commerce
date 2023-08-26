import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import { CLable } from '../common/CLable/CLable';
import { CInput } from '../common/CInput/CInput';
import { CInputSubmit } from '../common/CInputSubmit/CInputSubmit';
import './SignUp.scss';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../Redux/Auth/AuthAction';
import { AppDispatch } from '../../Redux';

interface SignUpProps {

};

export const SignUp: React.FC<SignUpProps> = ({

}) => {

    const [isUsernameValid, setIsUsernameValid] = useState({ isValid: true, message: '' });
    const [isPasswordValid, setIsPasswordValid] = useState({ isValid: true, message: '' });
    const [isEmailValid, setIsEmailValid] = useState({ isValid: true, message: '' });

    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            userName: { value: string };
            password: { value: string };
            email: { value: string };
        };

        const userName = target.userName.value;
        const password = target.password.value;
        const email = target.email.value;

        if (isEmailValid.isValid && userName !== '' && isPasswordValid.isValid && password !== '' && isUsernameValid.isValid && email !== '') {
            console.log(userName, password, email);
            console.log(target);
            
            dispatch(register({userName,password,email}));
            navigate('/');
            //TODO notifications
        } else {

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

    const onBlurHandlerEmail = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsEmailValid({ isValid: false, message: 'Email is required!' });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
            setIsEmailValid({ isValid: false, message: 'Invalid email!' });
        } else {
            setIsEmailValid({ isValid: true, message: '' });
        }
    }


    return (

        <section className='sign__up'>
            <h1 className='sign__up__title'>Sign Up</h1>
            <form onSubmit={submitHandler} className='sign__up__form'>
                <div className='sign__up__form__content__wrapper'>
                    <CLable inputId={'userName'} title={'Username'} />
                    <CInput
                        type='text'
                        id='userName'
                        name='userName'
                        placeholder='jon-green'
                        onBlur={onBlurHandlerUsername}
                        required
                    />
                    {
                        !isUsernameValid.isValid
                            ? <p className='error__message'>{isUsernameValid.message}</p>
                            : null
                    }
                </div>
                <div className='sign__up__form__content__wrapper'>
                    <CLable inputId={'password'} title={'Password'} />
                    <CInput
                        type='password'
                        id='password'
                        name='password'
                        placeholder='* * * * * * '
                        onBlur={onBlurHandlerPassword}
                        required
                    />
                    {
                        !isPasswordValid.isValid
                            ? <p className='error__message'>{isPasswordValid.message}</p>
                            : null
                    }
                </div>
                <div className='sign__up__form__content__wrapper'>
                    <CLable inputId={'email'} title={'Email'} />
                    <CInput
                        type='email'
                        id='email'
                        name='email'
                        placeholder='jon.green@gmail.com'
                        onBlur={onBlurHandlerEmail}
                        required
                    />
                    {
                        !isEmailValid.isValid
                            ? <p className='error__message'>{isEmailValid.message}</p>
                            : null
                    }
                </div>
                <CInputSubmit value='Sign Up' />
            </form>
        </section>
    )
}