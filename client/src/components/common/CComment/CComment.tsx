import React from 'react';
import { FaRegCommentAlt } from 'react-icons/fa';
import './CComment.scss';
import { Rating } from '../../../interfaces/interfaces';
import { dateConvert } from '../../../Utils/Utils';
import { CRatingStars } from '../CRatingStars/CRatingStars';

interface CCommentProps {
    product: Rating
};

export const CComment: React.FC<CCommentProps> = ({
    product
}) => {

    const createDate = dateConvert(product.createdAt as string);
    return (
        <article className='single__comment'>
            {/* <FaRegCommentAlt/> */}
            <p className=' single__comment__text'>{product.comment}</p>
            <div className='single__comment__stars'>{product.rating ? <CRatingStars stars={product.rating} key={Math.random() * Math.random()} /> : null}</div>
            <div>
                <p>added on: <br />{createDate}</p>
                <h5>{product.userName}</h5>
            </div>
        </article>
    )
}
