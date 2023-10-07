import React from 'react';
import { Rating } from '../../../interfaces/interfaces';
import { dateConvert } from '../../../Utils/Utils';
import { CRatingStars } from '../CRatingStars/CRatingStars';
import './CComment.scss';

interface CCommentProps {
    comment: Rating
};

export const CComment: React.FC<CCommentProps> = ({
    comment
}) => {

    const createDate = dateConvert(comment.createdAt as string);
    return (
        <article className='single__comment' data-testid={'single-comment'}>
            <p className=' single__comment__text'>{comment.comment}</p>
            <div className='single__comment__stars'>{comment.rating ? <CRatingStars stars={comment.rating} key={Math.random() * Math.random()} /> : null}</div>
            <div>
                <p>added on: <br />{createDate}</p>
                <h5>{comment.userName}</h5>
            </div>
        </article>
    )
}
