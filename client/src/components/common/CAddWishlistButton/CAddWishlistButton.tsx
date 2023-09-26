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
            <motion.button

                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                // exit={{ opacity: 0 }}

                transition={{ duration: 0.2, delay: 0 }}
                className='wishlist__button add__wishlist__button'
                onClick={wishlistButtonHandler}>
                <BsSuitHeart />add to wishlist
            </motion.button>
        )
    }

    const RemoveFromwishlistButton = () => {
        return (
            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                // exit={{ opacity: 0 }}

                transition={{ duration: 0.2, delay: 0 }}
                className='wishlist__button added__wishlist__button'
                onClick={wishlistButtonHandler}>
                <BsSuitHeartFill />added to wishlist
            </motion.button>
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
