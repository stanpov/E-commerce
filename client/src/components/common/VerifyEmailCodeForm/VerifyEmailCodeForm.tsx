import React, { useState } from 'react'
import { CLable } from '../CLabel/CLabel';
import { CInput } from '../CInput/CInput';
import { CInputSubmit } from '../CInputSubmit/CInputSubmit';
import './VerifyEmailCodeForm.scss';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { getUserId } from '../../../Redux/Auth/AuthSlice';
import { verify } from '../../../Redux/Auth/AuthAction';
import { useNavigate } from 'react-router-dom';

interface VerifyEmailCodeFormProps {

}

export const VerifyEmailCodeForm: React.FC<VerifyEmailCodeFormProps> = () => {

    const [isValid, setIsValid] = useState({ isValid: true, message: '' });
    const dispatch = useAppDispatch();
    const userId = useAppSelector(getUserId);
    const navigate = useNavigate();

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            verifyEmail: { value: string };
        }
        const otp  = target.verifyEmail?.value;
        if (isValid.isValid && otp !=='') {
            dispatch(verify({userId,otp}));
            navigate('/');
        }
    }

    const onBlurHandler = (e: React.FocusEvent<HTMLInputElement>): void => {
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
