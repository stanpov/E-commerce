import React from 'react';
import { BsSuitHeartFill } from 'react-icons/bs';
import './CAddWishlistButton.scss';

interface CAddWishlistButtonProps { }

export const CAddWishlistButton: React.FC<CAddWishlistButtonProps> = () => {
    return (
        <button className='add__wishlist__button'> <BsSuitHeartFill/>add to wishlist </button>
    )
}
