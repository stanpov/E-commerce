import React from 'react';
import { RiPlayListAddFill } from 'react-icons/ri';
import './CAddWishlistButton.scss';

interface CAddWishlistButtonProps { }

export const CAddWishlistButton: React.FC<CAddWishlistButtonProps> = () => {
    return (
        <button className='add__wishlist__button'>add to wishlist <RiPlayListAddFill /></button>
    )
}
