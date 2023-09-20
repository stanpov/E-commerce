import React from 'react';
import './CAddCartButton.scss';
import { BsCartPlus } from 'react-icons/bs';

interface CAddCartButtonProps {

}

export const CAddCartButton: React.FC<CAddCartButtonProps> = () => {
    return (
        <button className='add__cart__button'>add to cart <BsCartPlus />  </button>
    )
}
