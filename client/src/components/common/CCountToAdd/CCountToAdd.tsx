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
            <AiFillMinusCircle onClick={decrease} />
            <p>{count}</p>
            <AiFillPlusCircle onClick={increase} />
        </div>
    )
}
