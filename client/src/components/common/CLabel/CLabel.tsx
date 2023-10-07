import React from "react";
import { LabelHTMLAttributes } from "react";
import './CLabel.scss';

interface CLableProps extends LabelHTMLAttributes<HTMLLabelElement> {
    inputId: string,
    title:string
}

export const CLable: React.FC<CLableProps> = ({
    inputId,
    title,
}) => {
    return (
        <label className="form__label" role="input-lable" htmlFor={inputId}>{title}</label>
    )
}
