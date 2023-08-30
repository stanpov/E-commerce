import React, { useState } from "react";
import { CLable } from "../common/CLable/CLable";
import { CInput } from "../common/CInput/CInput";
import "./EnterCode.scss";
import { CInputSubmit } from "../common/CInputSubmit/CInputSubmit";
import { useAppDispatch } from "../../Redux/hooks";

interface EnterCodeProps {
    setIsPasswordForgot: (forgot: boolean) => void;
}

export const EnterCode: React.FC<EnterCodeProps> = ({
    setIsPasswordForgot,
}) => {
    const [isValidEmail, setIsValidEmail] = useState({ isValid: false, message: "" });
    const [isValidPassword, setIsValidPassword] = useState({ isValid: false, message: "" });
    const dispatch = useAppDispatch();

    //TODO add email inupt
    const forgotPasswordHandler = () => {
        setIsPasswordForgot(false);
    };

    const submitHandler = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            verificationCode: { value: string };
        };
        const code = target.verificationCode?.value;
        if (isValidEmail.isValid && isValidPassword.isValid) {
            forgotPasswordHandler();
        }
    };

    const onBlurHandlerEmail = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === "") {
            setIsValidEmail({ isValid: false, message: "Email is required!" });
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)
        ) {
            setIsValidEmail({ isValid: false, message: "Invalid email!" });
        } else {
            setIsValidEmail({ isValid: true, message: "" });
        }
    };

    const onBlurHandlerPassword = (e: React.FocusEvent<HTMLInputElement>): void => {
        if (e.target.value === "") {
            setIsValidPassword({ isValid: false, message: "Password is required!" });
        } else if (e.target.value.length < 5) {
            setIsValidPassword({ isValid: false, message: "Invalid password!" });
        } else {
            setIsValidPassword({ isValid: true, message: "" });
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(e.target.value)) {
            setIsValidEmail({ isValid: true, message: "" });
        }
    };

    return (
        <section className="enter__code">
            <h1 className="enter__code__title">Verification password</h1>

            <form onSubmit={submitHandler} className='enter__code__form'>
                <div className="enter__code__form__content__wrapper">
                    <CLable
                        inputId={"confirmEmail"}
                        title={"Email"}
                    />
                    <CInput
                        type="email"
                        id="confirmEmail"
                        name="confirmEmail"
                        placeholder="jon.sillver@gmail.com"
                        onBlur={onBlurHandlerEmail}
                        onChange={onChangeHandler}
                        required
                    />
                    {
                        !isValidEmail.isValid
                            ? <p className="error__message" role="email-validation-message"> {isValidEmail.message} </p>
                            : null
                    }
                </div>
                <div className='enter__code__form__content__wrapper'>
                    <CLable inputId={'verificationCode'} title={'Enter your new password:'} />
                    <CInput
                        type='text'
                        id='verificationCode'
                        name='verificationCode'
                        placeholder='* * * * * * * *'
                        onBlur={onBlurHandlerPassword}
                        required
                    />
                    {
                        !isValidPassword.isValid
                            ? <p className='error__message' role="password-validation-message">{isValidPassword.message}</p>
                            : null
                    }
                </div>

                <CInputSubmit value='Confirm new password' role='confirm-new-password-button' />
            </form>
        </section>
    )
}
