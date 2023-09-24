import React from 'react';
import { Product } from '../../../interfaces/interfaces';
import { CAddCartButton } from '../CAddCartButton/CAddCartButton';
import { CDetailsButton } from '../CDetailsButton/CDetailsButton';
import { useAppSelector } from '../../../Redux/hooks';
import { getUserId } from '../../../Redux/Auth/AuthSlice';
import { COutOfStockMessage } from '../COutOfStockMessage/COutOfStockMessage';
import './GridProductCard.scss';
import { CRatingStars } from '../CRatingStars/CRatingStars';

interface GridProductCardProps {
    product: Product
}

export const GridProductCard: React.FC<GridProductCardProps> = ({
    product
}) => {

    const isLoggedIn = !!useAppSelector(getUserId);
    let stars = product.rating.reduce((acc, next) => acc + next.rating!, 0);
    if (product.rating.length > 0) {
        stars = stars / product.rating.length;
    }

    const UserButtons = () => {
        return (
            <>
                {
                    product.countInStock > 0
                        ? <>
                            <CAddCartButton />
                        </>
                        : <COutOfStockMessage />
                }
            </>
        )
    };

    return (
        <article className='grid__card'>
            <section className='grid__card__image__wrapper'>
                <img src={product.image} alt="" />
            </section>
            <section className='grid__card__content'>
                <h4>{product.productName}</h4>
                <p className='grid__card__content__price'>${product.price.toFixed(2)}</p>
                <div className='grid__card__content__stars'>
                    {
                        <CRatingStars stars={stars} />
                    }
                </div>
                <div className='grid__card__content__buttons'>
                    <CDetailsButton productId={product._id}/>
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
