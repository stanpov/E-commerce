import React from 'react';
import { starsCount } from '../../../Utils/Utils';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import './CRatingStars.scss';

interface CRatingStarsProps {
    stars: number
}

export const CRatingStars: React.FC<CRatingStarsProps> = ({
    stars
}) => {

    const ratingStarsCount = starsCount(stars);

    return (
        <div className='rating__stars'>
            {
                ratingStarsCount.map((x) => x === 1 ? <BsStarFill key={Math.random()} /> : null)
            }
            {
                ratingStarsCount.map(x => x === 0.5 ? <BsStarHalf key={Math.random()} /> : null)
            }
            {
                ratingStarsCount.map(x => x === 0 ? <BsStar key={Math.random()} /> : null)
            }
        </div>
    )
}
