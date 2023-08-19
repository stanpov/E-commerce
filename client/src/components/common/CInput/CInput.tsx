import React, { ChangeEventHandler, InputHTMLAttributes } from 'react';
import './CInput.scss';
import { log } from 'console';

interface CInputProps extends InputHTMLAttributes<HTMLInputElement> {
    type: 'text' | 'password' | 'number' | 'email',
    name: string,
    id: string,
    placeholder: string,
    value?: string | number,
    onChange?: ChangeEventHandler<HTMLInputElement>,
    onBlur?: ChangeEventHandler<HTMLInputElement>,
}

export const CInput: React.FC<CInputProps> = ({
    type,
    name,
    id,
    placeholder,
    value,
    onChange,
    onBlur
}) => {
    return (
        <input
            className='form__input'
            type={type}
            name={name}
            id={id}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
        />
    )
}
