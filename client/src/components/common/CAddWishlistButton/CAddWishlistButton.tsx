import React, { useState } from 'react';
import { BsSuitHeartFill, BsSuitHeart } from 'react-icons/bs';
import { motion } from 'framer-motion';
import './CAddWishlistButton.scss';

interface CAddWishlistButtonProps { }

export const CAddWishlistButton: React.FC<CAddWishlistButtonProps> = () => {

    const [isAddedToWishlist, setIsAddedToWishlist] = useState<boolean>(false);

    const wishlistButtonHandler = () => {
        setIsAddedToWishlist(!isAddedToWishlist);
    }

    const AddToWishlistButton = () => {
        return (
            <button className='wishlist__button add__wishlist__button' onClick={wishlistButtonHandler}>  <BsSuitHeart />add to wishlist </button>
        )
    }

    const RemoveFromwishlistButton = () => {
        return (
            <button className='wishlist__button added__wishlist__button' onClick={wishlistButtonHandler}>   <BsSuitHeartFill />added to wishlist  </button>
        )
    }

    return (
        <>
            {
                isAddedToWishlist
                    ? <AddToWishlistButton />
                    : <RemoveFromwishlistButton />
            }
        </>
    )
}
