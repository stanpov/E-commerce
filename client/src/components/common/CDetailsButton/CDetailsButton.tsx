import React from 'react';
import { BsInfoSquare } from 'react-icons/bs';
import './CDetailsButton.scss';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../Redux/hooks';
import { getProductById } from '../../../Redux/CurrentProduct/CurrentProductActions';

interface CDetailsButtonProps {
    productId: string
}

export const CDetailsButton: React.FC<CDetailsButtonProps> = ({
    productId
}) => {

    const dispatch = useAppDispatch();

    const getDetailsHandler = () => {
        dispatch(getProductById(productId))
    }

    return (
        <button className='details__card__button' onClick={getDetailsHandler}>
            <Link to={''}>
                details <BsInfoSquare />
            </Link>
        </button>
    )
}
