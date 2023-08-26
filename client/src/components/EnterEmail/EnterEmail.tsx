import React, { useState } from 'react';
import { CLable } from '../common/CLable/CLable'
import { CInput } from '../common/CInput/CInput';
import './EnterEmail.scss';
import { CInputSubmit } from '../common/CInputSubmit/CInputSubmit';

interface EnterEmailProps {
    setRotateVerification: (rotate: boolean) => void;
};

export const EnterEmail: React.FC<EnterEmailProps> = ({
    setRotateVerification,
}) => {

    const [isValid, setIsValid] = useState({ isValid: false, message: '' });

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & { verificationEmail: { value: string } };
        const email: string = target.verificationEmail.value;
        if (isValid.isValid && email !== '') {
            //TODO api calls
            setRotateVerification(true);
            console.log(email);

        } else {
            console.log('no');

        }

    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsValid({ isValid: false, message: 'Email is required!' });
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
            setIsValid({ isValid: false, message: 'Invalid email!' });
        } else {
            setIsValid({ isValid: true, message: '' });
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
            setIsValid({ isValid: true, message: '' });
        }
    }

    return (
        <section className='enter__email'>
            <h1 className='enter__email__title'>Email verification</h1>

            <form onSubmit={submitHandler} className='enter__email__form'>
                <div className='enter__email__form__content__wrapper'>
                    <CLable inputId={'verificationEmail'} title={'Enter your account email address here:'} />
                    <CInput
                        type='email'
                        id='verificationEmail'
                        name='verificationEmail'
                        placeholder='jon.sillver@gmail.com'
                        onBlur={onBlurHandler}
                        onChange={onChangeHandler}
                        required
                    />
                    {
                        !isValid.isValid
                            ? <p className='error__message'>{isValid.message}</p>
                            : null
                    }
                </div>
                <CInputSubmit value='Send verification code' />
            </form>
        </section>
    )
}

