import React, { useState } from 'react';
import './CAddStarsRadios.scss';
import { FaStar } from 'react-icons/fa';

interface CAddStarsRadiosProps { }

export const CAddStarsRadios: React.FC<CAddStarsRadiosProps> = () => {

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    return (
        <div className='add__stars__radio__inputs__wrapper'>
            {[...Array(5)].map((star, index: number) => {
                const currentRating = index + 1;
                return (
                    <label htmlFor={`${currentRating}`}  key={Math.random()}>
                       
                        <input
                            type="radio"
                            name='star'
                            id={`${currentRating}`}
                            value={currentRating}
                            onClick={() => setRating(currentRating)}
                        />
                        <FaStar
                            className='add__stars__radio__icon'
                            color={currentRating <= (hover || rating) ? '#ff6600' : '#c9ced6'}
                            onMouseEnter={() => setHover(currentRating)}
                            onMouseLeave={() => setHover(0)}
                        />
                    </label>
                )
            })}
        </div>
    )
}
