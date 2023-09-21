import React from 'react';
import { Product } from '../../../interfaces/interfaces';
import { useAppSelector } from '../../../Redux/hooks';
import { getUserId } from '../../../Redux/Auth/AuthSlice';
import { CAddCartButton } from '../CAddCartButton/CAddCartButton';
import { COutOfStockMessage } from '../COutOfStockMessage/COutOfStockMessage';
import { CDetailsButton } from '../CDetailsButton/CDetailsButton';
import { CRatingStars } from '../CRatingStars/CRatingStars';
import './ListProductCard.scss';

interface ListProductCardProps {
    product: Product
}

export const ListProductCard: React.FC<ListProductCardProps> = ({
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
                        </>
                        : <COutOfStockMessage />
                }
            </>
        )
    }

    return (
        <article className='list__card'>
            <section className='list__card__image__wrapper'>
                <img src={product.image} alt="" />
            </section>
            <section className='list__card__content'>
                <h4>{product.productName}</h4>
                <p className='list__card__content__price'>${product.price}</p>
                <div className='list__card__content__stars'>
                    {
                        <CRatingStars stars={product.rating}/>
                    }
                </div>
                <div className='list__card__content__buttons'>
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
