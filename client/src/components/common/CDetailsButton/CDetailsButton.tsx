import React from 'react';
import { BsInfoSquare } from 'react-icons/bs';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { getProductById } from '../../../Redux/CurrentProduct/CurrentProductActions';
import { userInformation } from '../../../Redux/User/UserActions';
import { getUserId } from '../../../Redux/Auth/AuthSlice';
import './CDetailsButton.scss';

interface CDetailsButtonProps {
    productId: string
}

export const CDetailsButton: React.FC<CDetailsButtonProps> = ({
    productId
}) => {

    const dispatch = useAppDispatch();
    const userId = useAppSelector(getUserId);
    const isUserLoggedIn = !!useAppSelector(getUserId);
    const navigate = useNavigate();


    const getDetailsHandler = () => {
        if (isUserLoggedIn) {
            dispatch(getProductById(productId));
            dispatch(userInformation({ userId }));
        }else{
            navigate('/login-signup');
        }
    }

    return (
        <button className='details__card__button' onClick={getDetailsHandler}>
            <Link to={`/products/${productId}`}>
                details <BsInfoSquare />
            </Link>
        </button>
    )
}
