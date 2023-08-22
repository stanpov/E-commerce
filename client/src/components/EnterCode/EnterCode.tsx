import React, { useState } from 'react';
import { CLable } from '../common/CLable/CLable';
import { CInput } from '../common/CInput/CInput';
import './EnterCode.scss';
import { CInputSubmit } from '../common/CInputSubmit/CInputSubmit';

interface EnterCodeProps {
    setIsPasswordForgot:(forgot:boolean) =>void;
};

export const EnterCode: React.FC<EnterCodeProps> = ({
    setIsPasswordForgot

}) => {
    const [isValid, setIsValid] = useState({ isValid: false, message: '' });

    const forgotPasswordHandler = () =>{
        setIsPasswordForgot(false);
    }

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & { verificationCode: { value: string } };

        const code = target.verificationCode.value;

        if (isValid.isValid) {
            forgotPasswordHandler();
            console.log(code);
        }
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === '') {
            setIsValid({ isValid: false, message: 'Verification code is required!' });
        // } else if (e.target.value.length < 5 || e.target.value.length > 15) {
        //     setIsValid({ isValid: false, message: 'Invalid verification code!' });
        } else {
            setIsValid({ isValid: true, message: '' });
        }
    }
    
    return (
        <section className='enter__code'>
            <h1 className='enter__code__title'>Verification code</h1>

            <form onSubmit={submitHandler} className='enter__code__form'>
                <div className='enter__code__form__content__wrapper'>
                    <CLable inputId={'verificationCode'} title={'Enter here:'} />
                    <CInput
                        type='text'
                        id='verificationCode'
                        name='verificationCode'
                        placeholder='* * * * * * * *'
                        onBlur={onBlurHandler}
                        required
                    />
                    {
                        !isValid.isValid
                            ? <p className='error__message'>{isValid.message}</p>
                            : null
                    }
                </div>
                <CInputSubmit value='Check verification code'/>
            </form>
        </section>
    )
}
