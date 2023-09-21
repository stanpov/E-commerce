import React from 'react';
import { BsInfoSquare } from 'react-icons/bs';
import './CDetailsButton.scss';
import { Link } from 'react-router-dom';

interface CDetailsButtonProps { }

export const CDetailsButton: React.FC<CDetailsButtonProps> = () => {
    return (
        <button className='details__card__button'>
            <Link to={''}>
                details <BsInfoSquare />
            </Link>
        </button>
    )
}
