import React from 'react';
import { Product } from '../../../interfaces/interfaces';
import './GridProductCard.scss';
import { CAddCartButton } from '../CAddCartButton/CAddCartButton';
import { CAddWishlistButton } from '../CAddWishlistButton/CAddWishlistButton';
import { CDetailsButton } from '../CDetailsButton/CDetailsButton';
import { useAppSelector } from '../../../Redux/hooks';
import { getUserId } from '../../../Redux/Auth/AuthSlice';
import { COutOfStockMessage } from '../COutOfStockMessage/COutOfStockMessage';

interface GridProductCardProps extends Product {
    product: Product
}

export const GridProductCard: React.FC<GridProductCardProps> = ({
    product
}) => {

    const isLoggedIn = !!useAppSelector(getUserId);

    const UserButtons = () => {
        return (
            <>
                {
                    product.countInStock > 0
                        ? <>
                            <CAddCartButton />
                            <CAddWishlistButton />
                        </>
                        : <COutOfStockMessage />
                }
            </>
        )
    }

    return (
        <article className='grid__card'>
            <section className='grid__card__image__wrapper'>
                <img src={product.image} alt="" />
            </section>
            <section className='grid__card__content'>
                <h4>{product.productName}</h4>
                <div className='grid__card__content__text'>
                    <p>In stock: {product.countInStock}</p>
                    <p>${product.price}</p>
                </div>
                <div className='grid__card__content__buttons'>
                    <CDetailsButton />
                    {
                        isLoggedIn
                            ? <UserButtons />
                            : null
                    }
                </div>
            </section>
        </article>
    )
}
