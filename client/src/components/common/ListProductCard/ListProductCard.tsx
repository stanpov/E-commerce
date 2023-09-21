import React from 'react';
import { Product } from '../../../interfaces/interfaces';
import { useAppSelector } from '../../../Redux/hooks';
import { getUserId } from '../../../Redux/Auth/AuthSlice';
import './ListProductCard.scss';
import { CAddCartButton } from '../CAddCartButton/CAddCartButton';
import { CAddWishlistButton } from '../CAddWishlistButton/CAddWishlistButton';
import { COutOfStockMessage } from '../COutOfStockMessage/COutOfStockMessage';
import { CDetailsButton } from '../CDetailsButton/CDetailsButton';

interface ListProductCardProps extends Product{
    product: Product
}

export const ListProductCard:React.FC<ListProductCardProps> = ({
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
    <article className='list__card'>
        <section className='list__card__image__wrapper'>
            <img src={product.image} alt="" />
        </section>
        <section  className='list__card__content'>
            <h4>{product.productName}</h4>
            <p>${product.price}</p>
            <p>In stock: {product.countInStock}</p>
            <div className='list__card__content__buttons'>
                <CDetailsButton/>
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
