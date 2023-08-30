import React, { useState } from 'react'
import { CLable } from '../CLable/CLable';
import { CInput } from '../CInput/CInput';
import { CInputSubmit } from '../CInputSubmit/CInputSubmit';
import './VerifyEmailCodeForm.scss';

interface VerifyEmailCodeFormProps {

}

export const VerifyEmailCodeForm: React.FC<VerifyEmailCodeFormProps> = () => {

    const [isValid, setIsValid] = useState({ isValid: true, message: '' });

    const submitHandler = (e:React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            codeValue: {value: string};
        }
        if(isValid.isValid){
            //TODO api call
        }
    }

    const onBlurHandler =(e:React.FocusEvent<HTMLInputElement>):void => {
        if (e.target.value === '') {
            setIsValid({ isValid: false, message: 'Code is required!' });
        } else if (e.target.value.length < 5) {
            setIsValid({ isValid: false, message: 'Invalid code!' });
        } else {
            setIsValid({ isValid: true, message: '' });
        }
    };

    return (
        <form
            onSubmit={submitHandler}
            className="verify__email__form"
            data-testid="verify-email-form"
        >
            <div className="verify__email__form__content__wrapper">
                <CLable
                    inputId={"verifyEmail"}
                    title={"Verification code:"}
                />
                <CInput
                    type="text"
                    id="verifyEmail"
                    name="verifyEmail"
                    placeholder="********"
                    onBlur={onBlurHandler}
                    // onChange={onChangeHandler}
                    required
                />
                {!isValid.isValid ? (
                    <p className="error__message" role="verify-email-validation-message">
                        {isValid.message}
                    </p>
                ) : null}
            </div>
            <p className='code__message'>Verification code was sent to your email!</p>
            <CInputSubmit value="Verify email" />
        </form>
    )
}
