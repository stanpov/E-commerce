import React from 'react';
import './CCountToAdd.scss';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

interface CCountToAddProps {
    countInStock: number,
    count: number,
    increase: () => void,
    decrease: () => void
}

export const CCountToAdd: React.FC<CCountToAddProps> = ({
    countInStock,
    count,
    increase,
    decrease
}) => {


    return (
        <div className='add__count__wrapper'>
            <AiFillMinusCircle onClick={decrease} className={count > 1 ? 'decrease__count__button' : 'disable__count__button'} />
            <p>{count}</p>
            <AiFillPlusCircle onClick={increase} className={count < countInStock ? 'increase__count__button' : 'disable__count__button'} />
        </div>
    )
}
