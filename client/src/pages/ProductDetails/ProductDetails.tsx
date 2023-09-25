import React from 'react';
import './ProductDetails.scss';
import { useAppSelector } from '../../Redux/hooks';
import { currentProduct } from '../../Redux/CurrentProduct/CurrentProductSlice';
import { CRatingStars } from '../../components/common/CRatingStars/CRatingStars';
import { CAddCartButton } from '../../components/common/CAddCartButton/CAddCartButton';
import { CCountToAdd } from '../../components/common/CCountToAdd/CCountToAdd';
import { CAddWishlistButton } from '../../components/common/CAddWishlistButton/CAddWishlistButton';
import { dateConvert } from '../../Utils/Utils';
import { lastReviewedItems } from '../../Redux/User/UserSlice';
import { GridProductCard } from '../../components/common/GridProductCard/GridProductCard';
import { Product } from '../../interfaces/interfaces';

interface ProductDetailsProps { }

export const ProductDetails: React.FC<ProductDetailsProps> = () => {
    
    const lastViewProducts = useAppSelector(lastReviewedItems);
    const product = useAppSelector(currentProduct);
    let stars = product.rating.reduce((acc: any, next: any) => acc + next.rating!, 0);
    if (product.rating.length > 0) {
        stars = stars / product.rating.length;
    }

    const createDate = dateConvert(product.createdAt);
    const lastUpdateDate = dateConvert(product.updatedAt);

    return (
        <section className='details__page'>
            {/* <article className='details__page__bg__image'>
            </article> */}
            <div className='details__page__card__wrapper'>

                <section className='details__page__card'>
                    <article className='details__page__card__images'>
                        <div className='details__page__card__images__main'>
                            <img src={product.image} alt="product" />
                        </div>
                        <div className='details__page__card__images__rest'>
                            <img src={product.image} alt="product" />
                            <img src={product.image} alt="product" />
                            <img src={product.image} alt="product" />
                        </div>
                    </article>
                    <article className='details__page__card__content'>
                        <h2>{product.productName}</h2>
                        <p className='details__page__card__content__price'>best price - ${product.price.toFixed(2)}</p>
                        <div className='details__page__card__content__rating'>
                            <CRatingStars stars={stars} />
                            reviews {product.rating.length}
                        </div>
                        <p className='details__page__card__content__description'>{product.description}</p>
                        <div className='details__page__card__content__add__cart'>
                            <CCountToAdd count={0} />
                            <CAddCartButton />
                        </div>
                        <div className='details__page__card__content__wishlist'>
                            <CAddWishlistButton />
                        </div>
                        <div className='details__page__card__content__information'>
                            <p>Brand: <span>{product.brand}</span></p>
                            <p>Stock: <span>{product.countInStock} items in stock</span></p>
                            <p>Category: <span>{product.category}</span></p>
                            <p>Added at: <span>{createDate}</span></p>
                            <p>Item &#8470;: <span>{product._id}</span></p>
                            <p>Last update: <span>{lastUpdateDate}</span></p>
                        </div>
                    </article>
                </section>

                <section className='last__view__products'>
                    <h3>Recently viewed products</h3>
                    <div className='last__view__products__list'>
                    {
                        lastViewProducts.map((x:Product)=><GridProductCard product={x} key={x._id}/>)
                    }
                    </div>
                </section>
            </div>
        </section>
    )
}
