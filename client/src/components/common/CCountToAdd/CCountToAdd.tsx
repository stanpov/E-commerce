import React from 'react';
import './CCountToAdd.scss';
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

interface CCountToAddProps {
    count:number
 }

export const CCountToAdd:React.FC<CCountToAddProps> = ({
    count
}) => {
    return (
        <div className='add__count__wrapper'>
            <AiFillMinusCircle/>
            <p>{count}</p>
            <AiFillPlusCircle/>
        </div>
    )
}
