import React, { useState } from 'react';
import { useAppSelector } from '../../Redux/hooks';
import { currentProduct, getCurrentProductImages } from '../../Redux/CurrentProduct/CurrentProductSlice';
import { CRatingStars } from '../../components/common/CRatingStars/CRatingStars';
import { CAddCartButton } from '../../components/common/CAddCartButton/CAddCartButton';
import { CCountToAdd } from '../../components/common/CCountToAdd/CCountToAdd';
import { CAddWishlistButton } from '../../components/common/CAddWishlistButton/CAddWishlistButton';
import { dateConvert } from '../../Utils/Utils';
import { lastReviewedItems } from '../../Redux/User/UserSlice';
import { GridProductCard } from '../../components/common/GridProductCard/GridProductCard';
import { Image, Product } from '../../interfaces/interfaces';
import { CCommentsAndRating } from '../../components/common/CCommentsAndRating/CCommentsAndRating';
import { CImageModal } from '../../components/common/CImageModal/CImageModal';
import './ProductDetails.scss';

interface ProductDetailsProps { }

export const ProductDetails: React.FC<ProductDetailsProps> = () => {

    const [openModal, setOpenModal] = useState(false);
    const [itemsCount, setItemsCount] = useState<number>(1);
    const [startIndex, setCurrentIndex] = useState(0);
    // const [isDisabled,setIsDisabled] = useState<boolean>(false);
    const lastViewProducts = useAppSelector(lastReviewedItems);
    const product = useAppSelector(currentProduct);
    const images = useAppSelector(getCurrentProductImages);
    const [mainImage, ...restImages] = images;
    let stars = product.rating.reduce((acc: any, next: any) => acc + next.rating!, 0);
    let imgIndex = 1;

    if (product.rating.length > 0) {
        stars = stars / product.rating.length;
    };

    const increaseItemsCount = () => {
        if (itemsCount < product.countInStock) {
            setItemsCount(itemsCount + 1);
        }
    };

    const decreaseItemsCount = () => {
        if (itemsCount > 1) {
            setItemsCount(itemsCount - 1);
        }
    };

    const closeModalHandler = () => {
        setOpenModal(false);
    };

    const openModalHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        setOpenModal(true);
        setCurrentIndex(Number(e.currentTarget.alt));
    };

    const createDate = dateConvert(product.createdAt);
    const lastUpdateDate = dateConvert(product.updatedAt);

    return (
        <>
            {openModal ? <CImageModal startIndex={startIndex} images={images} closeModal={closeModalHandler} /> : null}
            <section className='details__page' data-testid={'product-details-page'}>
                <div className='details__page__card__wrapper'>
                    <section className='details__page__card'>
                        <article className='details__page__card__images'>
                            <div className='details__page__card__images__main'>
                                <img src={mainImage?.imageUrl} alt="0" onClick={openModalHandler} />
                            </div>
                            <div className='details__page__card__images__rest'>
                                {
                                    restImages.map((x: Image) => <img src={x.imageUrl} alt={`${imgIndex++}`} key={x._id} onClick={openModalHandler} />)
                                }
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
                                <CCountToAdd count={itemsCount} countInStock={product.countInStock} increase={increaseItemsCount} decrease={decreaseItemsCount} />
                                <CAddCartButton countInStock={product.countInStock}/>
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
                                <p>Viewed by clients: <span>{product.numReviews} times</span></p>
                            </div>
                        </article>
                    </section>

                    <section className='details__page__card__content__comments__rating'>
                        <h3>comments & rating</h3>
                        <CCommentsAndRating />
                    </section>

                    <section className='last__view__products'>
                        <h3>Recently viewed products</h3>
                        <div className='last__view__products__list'>
                            {
                                lastViewProducts.map((x: Product) => <GridProductCard product={x} key={x._id} />)
                            }
                        </div>
                    </section>
                </div>
            </section>
        </>
    )
}
