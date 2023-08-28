import React from "react";
import { InputHTMLAttributes } from "react";
import './CInputSubmit.scss';

interface CInputSubmitProps extends InputHTMLAttributes<HTMLLabelElement> {
    value:string
}

export const CInputSubmit: React.FC<CInputSubmitProps> = ({
    value,
}) => {
    return (
        <input type="submit" value={value} className='form__submit__button' role="submit-input" />
    )
}
