import React from 'react';
import { BsCartPlus } from 'react-icons/bs';
import './CAddCartButton.scss';

interface CAddCartButtonProps {
    countInStock: number
}

export const CAddCartButton: React.FC<CAddCartButtonProps> = ({
    countInStock
}) => {
    return (
        <button className={countInStock > 0 ? 'add__cart__button' : 'add__cart__button add__cart__button__disable'}>add to cart <BsCartPlus />  </button>
    )
}
